! function (e) {
    window.XDomainRequest && (e.ajaxTransport(function (t) {
        if (t.crossDomain && t.async) {
            t.timeout && (t.xdrTimeout = t.timeout, delete t.timeout);
            var i;
            return {
                send: function (n, s) {
                    function o(t, n, o, r) {
                        i.onload = i.onerror = i.ontimeout = e.noop, i = void 0, s(t, n, o, r)
                    }
                    var r;
                    t.url = t.url.replace(/\?|(.)$/, "$1?format=json&"), n.Authorization && (r = n.Authorization.split(" ")[1], t.url = t.url.replace(/\?|(.)$/, "$1?oauth_token=" + r + "&")), i = new window.XDomainRequest, i.open(t.type, t.url), i.onload = function () {
                        o(200, "OK", {
                            text: i.responseText
                        }, "Content-Type: " + i.contentType)
                    }, i.onerror = function () {
                        o(404, "Not Found")
                    }, i.onprogress = function () {}, t.xdrTimeout && (i.ontimeout = function () {
                        o(0, "timeout")
                    }, i.timeout = t.xdrTimeout), i.send(t.hasContent && t.data || null)
                },
                abort: function () {
                    i && (i.onerror = e.noop(), i.abort())
                }
            }
        }
    }), $.ajaxPrefilter(function (e, t) {
        var i = e.type,
            n = t.data;
        if ("POST" !== i && "GET" !== i) {
            if (e.type = "POST", "string" == typeof n) try {
                n = JSON.parse(n)
            } catch (s) {}
            e.data = $.param($.extend(n, {
                _method: i
            })), "application/json" === e.contentType && (e.data = decodeURI(e.data), e.data = e.data.replace(/\[[0-9]+\]/g, "[]"), e.data = encodeURI(e.data))
        }
    }))
}(jQuery), RegExp.escape = function (e) {
    return e.replace(/[-\/\\$\^*+?.()|\[\]{}]/g, "\\$&")
}, window.atob = window.atob || (window.atob = function (e) {
    var t, i, n, s, o, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    if (e = e.replace(/=+$/, ""), e.length % 4 === 1) throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    for (t = 0, i = 0, n = ""; o = e.charAt(i++);~ o && (s = t % 4 ? 64 * s + o : o, t++ % 4) ? n += String.fromCharCode(255 & s >> (-2 * t & 6)) : 0) o = r.indexOf(o);
    return n
}), Function.prototype.bind || (Function.prototype.bind = function (e) {
    var t = Array.prototype.slice,
        i = t.call(arguments, 1),
        n = this,
        s = function () {}, o = function () {
            if (s.prototype && this instanceof s) {
                var o = n.apply(new s, i.concat(t.call(arguments)));
                return Object(o) === o ? o : n
            }
            return n.apply(e, i.concat(t.call(arguments)))
        };
    return s.prototype = n.prototype, o.prototype = new s, o
}),
function (e) {
    var t = e.prototype,
        i = 6e4,
        n = 864e5,
        s = {
            millisecond: 1,
            sec: 1e3,
            min: 60,
            hour: 60,
            day: 24,
            month: 30,
            year: 12
        }, o = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        r = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    t.toRelativeTime = function (t, i) {
        i = i || e.now();
        var n, o = i - this,
            r = o > 0,
            a = null;
        if (t = t && parseInt(t, 10) || 1e3, o = Math.abs(o), t >= o) return r ? "Just now" : "Right now";
        for (n in s)
            if (s.hasOwnProperty(n)) {
                if (o < s[n]) break;
                a = n, o /= s[n]
            }
        return o = Math.floor(o), 1 !== o && (a += "s"), [r ? "" : "In", o, a].filter(Boolean).join(" ")
    }, t.format = function (e) {
        var t, i, n, s, a;
        if ("relative" === e) return this.toRelativeTime();
        switch (t = this.getDate(), i = this.getDay(), n = this.getMonth(), s = this.getFullYear(), a = ("0" + this.getMinutes()).substr(-2), e) {
        case "readable":
            return t + " " + o[n] + " " + s;
        case "readable_time":
            return [t, o[n], s, [this.getHours(), a].join(":")].join(" ");
        case "readable_with_weekday":
            return r[i] + ", " + [t, o[n], s].join(" ");
        default:
            return t + "/" + (n + 1) + "/" + s
        }
    }, e.fromString = function (t) {
        var i = e.parse(t);
        return new e(i ? i : t)
    },
    function () {
        var t = 0;
        e.setServerTime = function (i) {
            var s, o;
            return s = "number" == typeof i ? new e(i) : e.fromString(i), o = s - e.now(), Math.abs(o) > 7 * n ? !1 : (t = o, !0)
        }, e.atServer = function () {
            return new e(e.now() + t)
        }, e.nowAtServer = function () {
            return e.now() + t
        }, e.guessTimezone = function () {
            var s = t % n,
                o = (new e).getTimezoneOffset();
            return Math.abs(s) > 20 * i && (s = 30 * Math.round(s / (30 * i)) * i, o += s / i), o
        }, e.getTimezoneFormatted = function (e) {
            var t = e > 0 ? "-" : "+";
            return e = Math.abs(e), t + ("0" + Math.floor(e / 60)).substr(-2) + ("0" + e % 60).substr(-2)
        }
    }()
}(Date),
function (e, t, i) {
    function n(e, t, n, o) {
        if (!e[t]) {
            var r = s(t);
            i.some(function (i) {
                return o && (i = s(i)), e[t] = e[i + r], e[t]
            }), e[t] = e[t] || n
        }
    }

    function s(e) {
        return e && (e = e[0].toUpperCase() + e.substr(1)), e
    }
    n(e, "MutationObserver", null, !0), n(t, "getUserMedia"), n(e, "AudioContext"), n(e, "BlobBuilder", null, !0), n(e, "URL"), n(e, "requestAnimationFrame", function (t) {
        return e.setTimeout(t, 16)
    }), n(e, "cancelAnimationFrame", function (t) {
        e.clearTimeout(t)
    })
}(window, navigator, ["webkit", "moz", "o", "ms"]), jQuery.extend(jQuery.Event.prototype, {
    isMetaKey: function () {
        return this.metaKey || this.shiftKey || this.ctrlKey || this.altKey
    },
    isInput: function () {
        return this.target && /input|textarea|select/i.test(this.target.nodeName)
    },
    isMiddleClick: function () {
        return 2 === this.which
    }
}), jQuery.event.props.push("dataTransfer"), jQuery.whenAll = function (e) {
    if (e && e.length) {
        var t, i, n = jQuery.Deferred(),
            s = e.length,
            o = !1,
            r = [];
        return i = function (e) {
            r[e] = [].slice.call(arguments, 1), --s || n[o ? "reject" : "resolve"].apply(n, r)
        }, t = function () {
            o = !0
        }, r.length = e.length, e.forEach(function (e, n) {
            e.fail(t).always(i.bind(null, n))
        }), n
    }
    return jQuery.Deferred().resolve()
}, jQuery.extend(jQuery.expr[":"], {
    data: function (e, t, i) {
        return !!$.data(e, i[3])
    },
    focusable: function (e) {
        var t = e.nodeName.toLowerCase(),
            i = $.attr(e, "tabindex");
        return (/input|select|textarea|button|object/.test(t) ? !e.disabled : "a" === t || "area" === t ? e.href || !isNaN(i) : !isNaN(i)) && !$(e)["area" === t ? "parents" : "closest"](":hidden").length
    },
    tabbable: function (e) {
        var t = $.attr(e, "tabindex");
        return (isNaN(t) || t >= 0) && $(e).is(":focusable")
    }
}),
define("application", [], function (e, t, i) {
    function n(t) {
        function i() {
            r.fetch().done(l.resolve).fail(function (i) {
                403 === i.status ? ((x || (x = e("lib/connect"))).logout(), l.reject(i)) : t ? n(t - 1, l) : ((x || (x = e("lib/connect"))).logout().always(function () {
                    window.location.reload()
                }), l.reject(i))
            })
        }
        var s, o, r = (w || (w = e("config"))).get("me"),
            a = J.get("me"),
            l = arguments[1];
        return r.baseUrl = "me", void 0 === t && (t = 2), l || (l = $.Deferred().done(function () {
            (Y || (Y = e("models/user"))).instances.add(r), (S || (S = e("event-bus"))).trigger("connect:hasUserData")
        })), a && (o = (y || (y = e("lib/cookies"))).get("i")) && o !== String(a.id) ? (x || (x = e("lib/connect"))).loginWithCookies().done(i).fail(l.reject) : a ? (s = a.lastFetchTime || Date.now(), delete a.lastFetchTime, r.lastFetchTime = s, r.set(a), l.resolve(), setTimeout(function () {
            r.fetch().fail(function (t) {
                403 === t.status && (x || (x = e("lib/connect"))).logout()
            })
        }, et)) : i(), l
    }

    function s() {
        var t, i = (G || (G = e("lib/url"))).getQueryParam(Z),
            n = !1;
        void 0 !== i && i && ((y || (y = e("lib/cookies"))).set(Z, i), n = !0), n && (t = {
            _: Date.now()
        }, t[Z] = null, window.location = (G || (G = e("lib/url"))).modify(window.location.href, {
            query: t
        }))
    }

    function o() {
        var t;
        (D || (D = e("lib/rollouts"))).get("payments_show_opt_in_banner") && (t = new(R || (R = e("collections/products"))), t.fetch().done((S || (S = e("event-bus"))).trigger.bind(S || (S = e("event-bus")), "products:fetched", t)))
    }

    function r() {
        var e = 10;
        ! function t() {
            $(document).one("ajaxSuccess", function (i, n) {
                !Date.setServerTime(n.getResponseHeader("Date")) && --e && t()
            })
        }()
    }

    function a() {
        (p || (p = e("lib/api-wrapper"))).initialize({
            statusCode: M || (M = e("lib/global-xhr-handlers"))
        }), (V || (V = e("lib/helpers/title-helper"))).initialize()
    }

    function l() {
        var t = new(Y || (Y = e("models/user")))({
            avatar_url: (N || (N = e("lib/helpers/image-helper"))).getDefaultImage("user", 40)
        });
        t.on("change", function () {
            J.set("me", (f || (f = e("underscore"))).extend({
                lastFetchTime: t.lastFetchTime
            }, t.attributes))
        }), (w || (w = e("config"))).set("me", t)
    }

    function u() {
        var t, i;
        t = new(B || (B = e("router"))), t.setRoutes(q || (q = e("config/routes")), j || (j = e("config/route-builders"))), (f || (f = e("underscore"))).delay(o, 3e3), (v || (v = e("lib/app-instances"))) && (v || (v = e("lib/app-instances"))).initialize(), (w || (w = e("config"))).set("router", t), (O || (O = e("lib/play-manager"))).setAdManager(g || (g = e("lib/ad-manager"))), (O || (O = e("lib/play-manager"))).setFallbackSource(z || (z = e("collections/related-sounds")), function (t) {
            return (B || (B = e("router"))).getRoute("listenNetwork", t, "related")
        }), i = new(m || (m = e("views/app")))({
            el: $("#app"),
            appVersion: X
        }), i.render(), (K || (K = e("lib/tracking"))).initialize(), (b || (b = e("lib/backbone"))).history.start({
            root: "/",
            pushState: !0
        })
    }

    function c() {
        var t = new(Y || (Y = e("models/user")))({
            id: 193
        });
        t.release = t.hold = $.noop
    }

    function d(t) {
        var i = Date.now();
        (f || (f = e("underscore"))).each(t, function (t, n) {
            var s = (L || (L = e("lib/loader"))).get(n);
            t.forEach(function (e) {
                var t, n = i;
                e.lastFetchTime && (n = e.lastFetchTime, delete e.lastFetchTime), t = new s(e), t.lastFetchTime = n, t.release()
            })
        })
    }

    function h() {
        var t = (G || (G = e("lib/url"))).getQueryParams();
        (f || (f = e("underscore"))).each(t, function (t, i) {
            var n, s, o = /^exp\.([^.]+)\.([^.]+)$/.exec(i),
                r = t;
            o && (n = o[1], s = o[2]), n && s && r && (E || (E = e("vendor/experiments/experiments"))).set(n, s, r)
        })
    }
    var p, f, g, m, v, b, _, y, w, x, k, S, C, T, E, A, D, I, P, M, N, L, F, O, R, U, z, B, j, q, H, V, W, G, Y, K, Q, X, J = new(F || (F = e("lib/persistent-store")))("auth"),
        Z = "stage",
        et = 5e3,
        tt = 7e3;
    i.exports = {
        start: function (t, i) {
            s(), (y || (y = e("lib/cookies"))).set("web-ver", "2", 365), window.console && window.console.info("You like to look under the hood? Why not help us build the engine? http://soundcloud.com/jobs"), X = t || "DEVELOPMENT", (w || (w = e("config"))).set("app_version", X), i && (L || (L = e("lib/loader"))).setPackageMap(i), window._scPreload && (d(window._scPreload), window._scPreload = null), (H || (H = e("lib/support"))).audio ? Q() : Q().always((S || (S = e("event-bus"))).trigger.bind(S || (S = e("event-bus")), "error:audio_support"))
        }
    }, Q = (f || (f = e("underscore"))).once(function () {
        function t() {
            i = n(), setTimeout((x || (x = e("lib/connect"))).loginToClassicSoundCloud, tt)
        }
        var i, s, o = $.Deferred(),
            d = $.Deferred(),
            p = $.Deferred();
        return r(), a(), l(), c(), (W || (W = e("lib/helpers/upsell-helper"))).startPlayTracking(), !(x || (x = e("lib/connect"))).isLoggedIn() && (s = (G || (G = e("lib/url"))).getQueryParam("oauth_token")) && (x || (x = e("lib/connect"))).setAuthToken(s), ((x || (x = e("lib/connect"))).isLoggedIn() ? $.Deferred().resolve() : (x || (x = e("lib/connect"))).loginWithCookies()).done(t).fail(function () {
            (S || (S = e("event-bus"))).one("connect:login", t), (w || (w = e("config"))).get("me").lastFetchTime = Date.now(), i = $.Deferred().resolve()
        }).always(function () {
            i.done(function () {
                (E || (E = e("vendor/experiments/experiments"))).initialize(A || (A = e("config/experiments"))).fetchAssignments().done(function (t) {
                    h(), (C || (C = e("vendor/event-logger/event-logger"))).setExperiments(t), o.resolve()
                }).fail(o.reject), (D || (D = e("lib/rollouts"))).setup(I || (I = e("config/rollouts"))).fetch().done(d.resolve).fail(d.reject)
            }).fail((T || (T = e("models/exception"))).ajaxFatal((k || (k = e("config/error-messages"))).USER_INFO_NOT_LOADED)), $.whenAll([i, o, d]).always(u).done(p.resolve).fail(p.reject)
        }), (_ || (_ = e("lib/browser"))).isIE || p.always(function () {
            ! (x || (x = e("lib/connect"))).isLoggedIn() && (U || (U = e("lib/referrer"))).facebook && (P || (P = e("lib/integrations/facebook"))).isLoggedIn().done(function (t) {
                t && (x || (x = e("lib/connect"))).loginWithFacebook((P || (P = e("lib/integrations/facebook"))).getAccessToken())
            })
        }), p
    })
}),
define("lib/api-wrapper", [], function (e, t, i) {
    var n, s, o, r, a, l = /^https?:\/\/.+?\//,
        u = /^https?/,
        c = {
            likes: "favorites",
            groups: "groups",
            people: "users",
            sound: "track",
            sounds: "tracks"
        };
    n = i.exports = {
        EDGE: "e1/",
        initialize: function (t) {
            var i = (s || (s = e("config"))).get("client_id"),
                n = (s || (s = e("config"))).get("public_api_host");
            $.ajaxSetup({
                statusCode: t.statusCode,
                xhr: a,
                progress: null,
                timeout: 4e4,
                beforeSend: function (t, a) {
                    var u, c = this.isPublicApiEndpoint(a.url);
                    a.crossDomain = !0, (c || this.isApiV2Endpoint(a.url)) && ((o || (o = e("lib/connect"))).isLoggedIn() && t.setRequestHeader("Authorization", "OAuth " + (o || (o = e("lib/connect"))).getAuthToken()), c && (u = n + a.url.replace(l, ""), a.url = (r || (r = e("lib/url"))).modify(u, {
                        query: {
                            client_id: i,
                            app_version: (s || (s = e("config"))).get("app_version")
                        }
                    })))
                }.bind(this)
            })
        },
        isPublicApiEndpoint: function (t) {
            return !u.test(t) || 0 === t.indexOf((s || (s = e("config"))).get("public_api_host"))
        },
        isApiV2Endpoint: function (t) {
            return 0 === t.indexOf((s || (s = e("config"))).get("api_v2_host"))
        },
        toAPIResource: function (e) {
            return c[e] || e
        }
    }, a = function () {
        var e, t = $.ajaxSettings.xhr,
            i = ["Date"];
        return e = function () {
            var e = this,
                t = e._getAllResponseHeaders();
            return t || 200 !== this.status ? t : i.map(function (t) {
                return e.getResponseHeader(t) ? t + ": " + e.getResponseHeader(t) : void 0
            }).filter(Boolean).join("\n") + "\n"
        },
        function () {
            var i = t();
            return i._getAllResponseHeaders = i.getAllResponseHeaders, i.getAllResponseHeaders = e, this.progress && i.upload.addEventListener("progress", this.progress.bind(this)), i
        }
    }()
}),
define("underscore", [], function (e, t, i) {
    var n;
    i.exports = n || (n = e("vendor/underscore")), (n || (n = e("vendor/underscore"))).mixin({
        toAttributesString: function (t) {
            var i, s, o = [];
            return (n || (n = e("vendor/underscore"))).each(t, function (t, r) {
                i = r + '="', s = [], (n || (n = e("vendor/underscore"))).isObject(t) ? (n || (n = e("vendor/underscore"))).each(t, function (e, t) {
                    s.push(t + ":" + e)
                }) : s.push(t), o.push(i + s.join(";") + '"')
            }), o.join(" ")
        },
        arrayDiff: function (t, i) {
            return {
                add: (n || (n = e("vendor/underscore"))).difference(i, t),
                remove: (n || (n = e("vendor/underscore"))).difference(t, i)
            }
        }
    })
}),
define("lib/ad-manager", [], function (e, t, i) {
    function n() {
        for (var e, t = b || []; e = t.pop();) e.isResolved() || e.abort()
    }

    function s() {
        return v || (v = new(p || (p = e("lib/circuit-breaker")))({
            giveUp: 1
        })), v
    }

    function o(e, t) {
        e.sound && !t.isRejected() ? r.call(this, e, t) : t.resolve()
    }

    function r(e, t) {
        var i = e.sound;
        this._currentAd = e, i.on("finish", this._onAdFinish.bind(this, e, t)).on("pause", this._onAdPause.bind(this, e)).on("play", this._onAdPlay.bind(this, e)), i.play()
    }

    function a(e) {
        var t = e.sound,
            i = this.getCurrentSound();
        t && (t.off("finish", this._onAdFinish).off("pause", this._onAdPause).off("play", this._onAdPlay), t.pause()), this.getCurrentAd() === e && i && (i.release(), this._currentAd = null)
    }
    var l, u, c, d, h, p, f, g, m, v, b, _ = 6e4,
        y = 60 * _,
        w = 1e3,
        x = 5 * _,
        k = 20 * _,
        S = 12 * y,
        C = {
            AD_PLAY: "ad:play",
            AD_PAUSE: "ad:pause",
            AD_SKIP: "ad:skip",
            AD_FINISH: "ad:finish"
        };
    l = i.exports = (u || (u = e("underscore"))).extend({}, (h || (h = e("lib/backbone"))).Events, {
        _adDeferred: null,
        _currentAd: null,
        prefetchAudioAd: function (t) {
            (u || (u = e("underscore"))).delay(function () {
                var i = new(d || (d = e("models/audio-ad")))({
                    resource_id: t.id
                }),
                    n = s();
                !i.isPopulated() && n.enabled && i.fetch().fail(n.failed).done(n.succeeded)
            }, w)
        },
        isUserAdConsumer: function () {
            return !(!(m || (m = e("lib/rollouts"))).get("audio_ads") || this._isUserWithinGracePeriod())
        },
        getCurrentSound: function () {
            return this._currentAd && this._currentAd.sound
        },
        getCurrentAd: function () {
            return this._currentAd
        },
        skip: function () {
            var t = this._adDeferred,
                i = this._currentAd;
            n(), t && (this.getCurrentSound() && (this.trigger(C.AD_SKIP, this._currentAd), (c || (c = e("lib/integrations/adswizz"))).trackEvent("skip", {
                tracking: i.get("tracking")
            })), t.reject())
        },
        whenAdFinished: function (t) {
            var i = this._adDeferred,
                r = new(d || (d = e("models/audio-ad")))({
                    resource_id: t.id
                }),
                l = s(),
                u = b || [];
            return i && "pending" === i.state() && this.skip(), i = this._adDeferred = $.Deferred(), i.always(a.bind(this, r)), r.sound && r.sound.progress() > 0 ? i.resolve() : !r.isPopulated() && l.enabled ? (u.push(r.fetch().fail(function () {
                l.failed(), this.skip()
            }.bind(this)).done(function () {
                l.succeeded(), o.call(this, r, i), n()
            }.bind(this))), i) : (o.call(this, r, i), i)
        },
        _onAdFinish: function (t, i) {
            this.trigger(C.AD_FINISH, t), (c || (c = e("lib/integrations/adswizz"))).trackEvent("finish", {
                tracking: t.get("tracking")
            }), i.resolve()
        },
        _onAdPause: function (e) {
            this.trigger(C.AD_PAUSE, e)
        },
        _onAdPlay: function (t) {
            this.trigger(C.AD_PLAY, t), (c || (c = e("lib/integrations/adswizz"))).trackEvent("play", {
                tracking: t.get("tracking")
            })
        },
        _isUserWithinGracePeriod: function () {
            var t = (g || (g = e("lib/play-log"))).select({
                field: "timestamp",
                playState: "played"
            }),
                i = (f || (f = e("lib/connect"))).isLoggedIn() ? k : x,
                n = Date.now(),
                s = t.some(function (e) {
                    return n - i > e && e > n - S
                });
            return !s
        }
    })
}),
define("lib/app-instances", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d, h, p, f, g, m = 3e4,
        v = 1e3,
        b = "inst_",
        _ = b + Date.now(),
        y = new RegExp(b + "\\d{13}$");
    (u || (u = e("lib/support"))).localStorage ? (n = i.exports = {
            initialize: function () {
                var t, i, n, r;
                for (g = window.localStorage, c = {}, this.current = c[_] = new s(_), c[_].store.write(), ["each", "some", "every", "map", "filter", "find"].forEach(function (t) {
                    this[t] = (o || (o = e("underscore")))[t].bind(o || (o = e("underscore")), c)
                }.bind(this)), t = 0, i = g.length; i > t; ++t) n = g.key(t), n !== this.current.store.keyName && (r = y.exec(n)) && (c[r[0]] = new s(r[0]));
                setInterval(f, m), (a || (a = e("event-bus"))).on("broadcast:instances:ping", d), $(window).on("unload", p), window.addEventListener("storage", h, !1)
            },
            size: function () {
                return Object.keys(c).length
            }
        }, s = function (t) {
            this.store = new(l || (l = e("lib/persistent-store")))(t), t === _ && (this.set = this.store.set.bind(this.store))
        }, (o || (o = e("underscore"))).extend(s.prototype, {
            get: function (e) {
                return this.store.get(e)
            },
            dispose: function () {
                return this.store.dispose()
            }
        })) : n = i.exports = null, p = function () {
            n.current.dispose()
    }, h = function (e) {
        if (e.key) {
            var t, i, o, r;
            t = y.exec(e.key), t && (o = g.getItem(e.key), i = t[0], r = c[i], r && null === o ? r === n.current ? r.store.write() : (r.dispose(), delete c[i]) : !r && o && (c[i] = new s(i)))
        }
    }, f = function () {
        if ((r || (r = e("config"))).get("pageVisible") && n.size() > 1) {
            var t = 1679616,
                i = ("0000" + (Math.random() * t).toString(36)).substr(-4);
            (a || (a = e("event-bus"))).broadcast({
                    excludeThis: !0
                }, "instances:ping", i), (o || (o = e("underscore"))).delay(function () {
                    (r || (r = e("config"))).get("pageVisible") && n.each(function (e, t) {
                        if (t !== _) {
                            var n = e.get("pong");
                            n !== i && (e.dispose(), delete c[t])
                        }
                    })
                }, v)
        }
    }, d = function (e) {
        n.current.set("pong", e)
    }
}),
define("lib/backbone", [], function (e, t, i) {
    var n, s, o, r = (s || (s = e("backbone"))).Collection,
        a = (s || (s = e("backbone"))).Model,
        l = r.prototype,
        u = a.prototype,
        c = (s || (s = e("backbone"))).History.prototype;
    if (i.exports = s || (s = e("backbone")), c.getFragment = function (e) {
        var t = /\/*(?:[#?].*)?$/;
        return function (i, n, s) {
            var o = e.apply(this, arguments);
            return s ? o : o.replace(t, "")
        }
    }(c.getFragment), window.history && window.history.pushState) {
        var d = function () {
            window.history.replaceState({
                scrollTop: document.body.scrollTop || document.documentElement.scrollTop
            }, "", window.location.href)
        };
        c.navigate = function (e) {
            return function () {
                return d(), e.apply(this, arguments)
            }
        }(c.navigate), $(window).on("unload", d)
    }! function () {
        function t(e, t) {
            return function () {
                delete e._requests[t]
            }
        }

        function i(i) {
            return function (s) {
                var o;
                return s = (n || (n = e("underscore"))).extend({
                    url: (n || (n = e("underscore"))).result(this, "url"),
                    jqAjax: !1,
                    saveRequest: !1
                }, s), this._requests || (this._requests = {}), o = this._requests[s.url], o ? (s.success && o.done(s.success.bind(s, this)), s.error && o.fail(s.error)) : (o = this._requests[s.url] = s.jqAjax ? $.ajax(s) : i.call(this, s), o[s.saveRequest ? "fail" : "always"](t(this, s.url))), o
            }
        }
        u.fetch = i(u.fetch), l.fetch = i(l.fetch)
    }(), u.change = function () {
        var t = 0;
        return function (i) {
            var s;
            if (i && i.force && (this._changed = this._changed || {}, i.force.forEach(function (e) {
                this._changed[e] = this.get(e)
            }.bind(this))), this._changing || !this.hasChanged()) return this;
            this._changing = !0, this._moreChanges = !0, ++t;
            for (s in this._changed) this._changed.hasOwnProperty(s) && this.trigger("change:" + s, this, this._changed[s], i, t);
            for (; this._moreChanges;) this._moreChanges = !1, ++t, this.trigger("change", this, i, t);
            return this._previousAttributes = (n || (n = e("underscore"))).clone(this.attributes), delete this._changed, this._changing = !1, this
        }
    }(), u.resetChanges = function () {
        delete this._changed, this._previousAttributes = (n || (n = e("underscore"))).clone(this.attributes)
    }, a.extend = r.extend = (s || (s = e("backbone"))).View.extend = function (t) {
        return function () {
            var i = (n || (n = e("underscore"))).toArray(arguments),
                s = i.filter(function (t) {
                    return t instanceof(o || (o = e("lib/mixin")))
                }),
                r = s.length,
                a = t.apply(this, i.slice(r));
            return s.forEach(function (e) {
                e.applyTo(a.prototype)
            }), a
        }
    }((s || (s = e("backbone"))).View.extend), l.add = function (t, i) {
        var s, o, r, a, l, u, c, d, h = {}, p = {};
        for (i || (i = {}), t = (n || (n = e("underscore"))).isArray(t) ? t.slice() : [t], t = t.reduce(function (e, t) {
            var n;
            return (n = this._prepareModel(t, i)) && e.push(n), e
        }.bind(this), []), s = t.length; s--;) c = !1, a = t[s], (h[l = a.cid] || this._byCid[l] || null !== (u = a.id) && u !== d && (p[u] || this._byId[u]) || this.indexOfEquivalentModel && (this.indexOfEquivalentModel(a, t.slice(0, s)) > -1 || this.indexOfEquivalentModel(a) > -1)) && (a.release(this._usageCount()), c = !0), c ? t.splice(s, 1) : h[l] = p[u] = a;
        for (s = 0, r = t.length; r > s; s++)(a = t[s]).on("all", this._onModelEvent, this), this._byCid[a.cid] = a, null !== a.id && a.id !== d && (this._byId[a.id] = a);
        if (this.length += r, o = null !== i.at && i.at !== d ? i.at : this.models.length, Array.prototype.splice.apply(this.models, [o, 0].concat(t)), this.comparator && this.sort({
            silent: !0
        }), i.silent) return this;
        for (s = 0, r = this.models.length; r > s; s++) h[(a = this.models[s]).cid] && (i.index = s, a.trigger("add", a, this, i));
        return this
    }, l._reset = function () {
        this.length = 0, this.models ? this.models.length = 0 : this.models = [], this._byId = {}, this._byCid = {}
    }, l._prepareModel = function (e) {
        return function () {
            var t = e.apply(this, arguments);
            return t.collection = this, t
        }
    }(l._prepareModel)
}),
define("lib/browser", [], function (e, t, i) {
    var n, s = navigator.userAgent.toLowerCase(),
        o = function (e) {
            return e.test(s)
        };
    n = i.exports = {}, n.isOpera = void 0 !== window.opera && "[object Opera]" === window.opera.toString() || o(/ opr\/\d/), n.isChrome = o(/chrome/), n.isWebKit = o(/webkit/), n.isSafari = !n.isChrome && o(/safari/), n.isIE = !n.isOpera && o(/msie/), n.isIE9 = n.isIE && o(/msie 9/), n.isPhantom = o(/phantom/), n.isGecko = !n.isWebKit && o(/gecko/), n.isWindows = o(/windows|win32/), n.isMac = o(/macintosh|mac os x/), n.isLinux = o(/linux/), n.isMobile = o(/mobile|android|iphone|ipod|ipad|playBook|skyfire/), n.isAndroid = o(/android/), n.isIEMobile = n.isMobile && n.isIE, n.isSecure = /^https/i.test(window.location.protocol), n.isHiDPI = window.devicePixelRatio ? window.devicePixelRatio > 1 : !1, n.backingStoreRatio = function () {
        var e = document.createElement("canvas").getContext("2d");
        return e ? e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || 1 : void 0
    }(), n.isChrome15 = n.isChrome && o(/chrome\/15/)
}),
define("lib/cookies", [], function (e, t, i) {
    var n, s, o, r = window.location.hostname.replace(/.*\.(.+\..+)/, "$1"),
        a = "." + r,
        l = 864e5;
    n = i.exports = {
        get: function (e) {
            return o || (o = {}, document.cookie.split(/\s*;\s*/).forEach(function (e) {
                var t = e.split("=");
                o[t[0]] = t[1]
            })), o[e]
        },
        set: function (e, t, i) {
            document.cookie = [e + "=" + t, i ? "expires=" + new Date(Date.now() + i * l).toGMTString() : "", "path=/", "domain=" + a].filter(Boolean).join(";"), s()
        },
        unset: function (e) {
            n.set(e, "", -1), s()
        }
    }, s = function () {
        o = null
    }
}),
define("config", [], function (e, t, i) {
    var n, s, o, r, a, l, u = i.exports = new(o || (o = e("lib/store")));
    (n || (n = e("lib/mixins/stores/observing"))).applyTo(u), r = "b45b1aa10f1ac2941910a7f0d10f8e28", a = "19507961798", l = "a272b87ff3174a67b5598d1e5124c2f5", (s || (s = e("underscore"))).each({
        app_id: 1e3 * String(Date.now()).substr(-8) + Math.floor(1e3 * Math.random()),
        app_version: null,
        public_api_host: "https://api.soundcloud.com/",
        api_v2_host: "https://api-web.soundcloud.com/",
        client_application_id: 46941,
        client_id: r,
        dashbox_host: "https://dashbox.soundcloud.com",
        eventlogger_tracking_url: "https://eventlogger.soundcloud.com",
        fb_app_id: a,
        instagram_client_id: l,
        playHistoryLength: 50,
        maxComments: 200,
        me: null,
        mixi_api_key: "1403ed11563185e9cff6cfeedf4f2ecf77fa459e",
        notifications: null,
        notificationsUri: "wss://pushers.soundcloud.com/",
        oauth_token: null,
        pageVisible: !0,
        preferFlashAudio: !0,
        promotedContentServer: "https://promoted.soundcloud.com/promo",
        promotedContentAccessToken: "web",
        restoreToSound: null,
        router: null,
        songkick_api_key: "ZWsLr2h7FF5sHG54",
        versionUpdateInterval: 36e5,
        visualsHost: "https://visuals.soundcloud.com",
        visualsQueueHost: "https://visuals-queue.soundcloud.com/visuals",
        wisHost: "https://wis.sndcdn.com"
    }, function (e, t) {
        u.set(t, e, {
            silent: !0
        })
    }), u.finalize()
}),
define("lib/connect", [], function (e, t, i) {
    function n(t, i, n) {
        return (m || (m = e("lib/helpers/popup-helper"))).centered(t, i, n, "connectWithSoundCloud")
    }

    function s() {
        D.reset()
    }

    function o() {
        return $.ajax({
            url: "https://soundcloud.com/logout",
            type: "DELETE",
            dataType: "text"
        }).promise()
    }

    function r(t) {
        var i = document.createElement("form");
        return (u || (u = e("underscore"))).each(t, function (e, t) {
            "data" !== t && i.setAttribute(t, e)
        }), (u || (u = e("underscore"))).each(t.data, function (e, t) {
            var n = document.createElement("input");
            n.setAttribute("type", "text"), n.setAttribute("name", t), n.setAttribute("value", e), i.appendChild(n)
        }), i
    }

    function a() {
        return !0 && ["auth_token", "p", "v"].some(function (t) {
            return void 0 !== (p || (p = e("lib/cookies"))).get(t)
        })
    }
    var l, u, c, d, h, p, f, g, m, v, b, _, y, w = "soundcloud-callback.html",
        x = "oauth_token",
        k = 150,
        S = "non-expiring fast-connect purchase upload",
        C = "https://soundcloud.com/connect/token",
        T = "onboarding",
        E = "signup_denied",
        A = new(g || (g = e("lib/persistent-store")))("anonymous-user"),
        D = new(g || (g = e("lib/persistent-store")))("auth");
    D.on(x, function (e) {
        var t = e.current;
        t ? l.setAuthToken(t) : l.logout()
    }), l = i.exports = (u || (u = e("underscore"))).extend({}, (d || (d = e("lib/backbone"))).Events, {
        _redirectAfterSignupRoute: T,
        setAuthToken: function (e) {
            D.set(x, e)
        },
        getAuthToken: function () {
            return D.get(x)
        },
        isLoggedIn: function () {
            return !!this.getAuthToken()
        },
        login: function (t) {
            var i, s, o;
            return t = t || {}, o = t.redirectRoute, null !== o && (this._redirectAfterSignupRoute = o), y ? b && !b.closed && b.focus && b.focus() : (y = $.Deferred().fail(function () {
                y = null
            }), this.isLoggedIn() ? y.resolve() : t.facebook ? (_ = document.createElement("iframe"), _.name = "loginIframe", _.style.display = "none", document.body.appendChild(_), s = r({
                action: (v || (v = e("lib/url"))).stringify({
                    host: (h || (h = e("config"))).get("public_api_host").replace("api.", ""),
                    path: ["connect", "via", "facebook"],
                    query: {
                        client_id: (h || (h = e("config"))).get("client_id"),
                        response_type: "token",
                        scope: S,
                        native_signup: "true",
                        redirect_uri: location.protocol + "//" + location.host + "/" + w
                    }
                }),
                method: "post",
                target: "loginIframe",
                data: {
                    facebook_token: t.fb_token
                }
            }), document.body.appendChild(s), s.submit(), document.body.removeChild(s)) : (i = (v || (v = e("lib/url"))).stringify({
                host: (h || (h = e("config"))).get("public_api_host").replace("api.", ""),
                path: ["connect"],
                query: {
                    client_id: (h || (h = e("config"))).get("client_id"),
                    response_type: "token",
                    scope: S,
                    display: "next",
                    redirect_uri: location.protocol + "//" + location.host + "/" + w,
                    highlight: t.signup ? "signup" : null
                }
            }), b = n(i, 500, 500), function a() {
                b && !b.closed || l.isLoggedIn() || !y ? b.closed ? y && (f || (f = e("event-bus"))).one("connect:hasUserData", y.resolve).trigger("connect:login", "login") : setTimeout(a, k) : y.reject()
            }())), y
        },
        signup: function (e) {
            return e = e || {}, e.signup = !0, l.login(e)
        },
        hasSignedUp: function () {
            this._redirectAfterSignupRoute && (h || (h = e("config"))).get("router").navigateToRoute(this._redirectAfterSignupRoute, null, {
                trigger: !0
            }), (f || (f = e("event-bus"))).trigger("signup:successful"), (c || (c = e("vendor/includes/adwords"))).include(), this._redirectAfterSignupRoute = T
        },
        hasLoggedIn: function () {
            (f || (f = e("event-bus"))).trigger("login:successful")
        },
        loginWithFacebook: function (e) {
            return l.login({
                facebook: !0,
                fb_token: e
            })
        },
        logout: function () {
            return o().always(function () {
                s(), (f || (f = e("event-bus"))).trigger("connect:logout", "logout")
            })
        },
        currentUserId: function () {
            return (h || (h = e("config"))).get("me").id
        },
        removeIframe: function () {
            _ && (_.parentNode.removeChild(_), _ = null, l.isLoggedIn() && (f || (f = e("event-bus"))).one("connect:hasUserData", y.resolve).trigger("connect:login", "login"))
        },
        loginFailed: function (t) {
            (f || (f = e("event-bus"))).trigger("login:failed"), t && t.error === E && (f || (f = e("event-bus"))).trigger("connect:signupDenied"), y && y.reject()
        },
        getUserIdentifier: function () {
            var e;
            return e = l.isLoggedIn() ? l.currentUserId() : l.getAnonymousUserIdentifier()
        },
        getAnonymousUserIdentifier: function () {
            for (var e = A.get("id"); !e || 1e3 > e;) e = Math.floor(1e9 * Math.random()), A.set("id", e);
            return e
        },
        loginWithCookies: function () {
            var t, i = $.Deferred();
            return a() ? (t = (v || (v = e("lib/url"))).modify(C, {
                query: {
                    client_id: (h || (h = e("config"))).get("client_id"),
                    scope: S
                }
            }), $.ajax(t, {
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            }).done(function (e) {
                l.setAuthToken(e.access_token), i.resolve()
            }).fail(i.reject)) : i.reject(), i
        },
        loginToClassicSoundCloud: function () {
            a() || $.ajax({
                type: "post",
                url: "https://soundcloud.com/session",
                data: {
                    access_token: l.getAuthToken(),
                    format: "json"
                }
            })
        }
    })
}),
define("config/error-messages", [], function (e, t, i) {
    var n, s = {
            buttonText: "I need help",
            buttonLink: "http://help.soundcloud.com"
        }, o = {
            buttonText: "Get latest status",
            buttonLink: "http://status.soundcloud.com"
        };
    i.exports = {
        UNKNOWN: (n || (n = e("underscore"))).extend({
            title: "Sorry! Something went wrong",
            message: "A report has been sent to our tech team,<br> and they're looking in to the problem.<br>Please check back in a bit."
        }, o),
        PAGE_NOT_FOUND: (n || (n = e("underscore"))).extend({
            title: "Sorry! We can't find that page."
        }, s),
        SOUND_NOT_FOUND: (n || (n = e("underscore"))).extend({
            title: "Sorry! We can't find that track.",
            message: "Did you try to access a private track, but were not logged in?<br>Maybe the track has been removed."
        }, s),
        PRIVATE_SOUND: {
            title: "This track is private.",
            message: "You'll need to sign in to hear it.",
            login_required: !0
        },
        PLAYLIST_NOT_FOUND: (n || (n = e("underscore"))).extend({
            title: "Sorry! We can't find that playlist.",
            message: "Did you try to access a private playlist, but were not logged in?<br>Maybe the playlist has been removed."
        }, s),
        GROUP_NOT_FOUND: (n || (n = e("underscore"))).extend({
            title: "Sorry! We can't find that group."
        }, s),
        USER_NOT_FOUND: (n || (n = e("underscore"))).extend({
            title: "Sorry! We can't find that user."
        }, s),
        USER_INFO_NOT_LOADED: (n || (n = e("underscore"))).extend({
            title: "Error loading user information."
        }, s)
    }
}),
define("event-bus", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c = new(a || (a = e("lib/persistent-store")))("broadcast"),
        d = (r || (r = e("config"))).get("app_id");
    c.on("broadcast", function (e) {
        var t = e.current;
        t && t.appId !== d && u.call(n, t)
    }), n = i.exports = (s || (s = e("underscore"))).extend({}, (o || (o = e("lib/backbone"))).Events, {
        broadcast: function (e, t) {
            var i, n;
            return "string" == typeof e ? (i = [].slice.call(arguments, 1), t = e, e = {}) : i = [].slice.call(arguments, 2), n = l(t, i), c.set("broadcast", n), e.excludeThis || u.call(this, n), this
        }
    }), l = function (e, t) {
        return {
            type: e,
            timestamp: Date.now(),
            appId: d,
            args: t
        }
    }, u = function (e) {
        this.trigger.apply(this, ["broadcast:" + e.type].concat(e.args || []))
    }
}),
define("models/exception", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (r || (r = e("lib/model"))).extend({
        url: null,
        lastFetchTime: 1,
        initialize: function (t) {
            t = t || {}, this.id || (t.id = this.id = this.cid, n.instances.set(this.id, this)), this.fatal = !! t.fatal, (r || (r = e("lib/model"))).prototype.initialize.apply(this, arguments)
        }
    }, {
        raise: function (t, i) {
            var s = new n(t);
            if (s.release(), i = i || {}, i.hard) throw s;
            (o || (o = e("event-bus"))).trigger("exception", s)
        },
        ajaxFatal: function (t) {
            return function (i, o) {
                "abort" !== o && n.raise((s || (s = e("underscore"))).extend(t, {
                    xhr: i,
                    fatal: !0
                }))
            }
        },
        ajaxNonFatal: function (e) {
            return function (t, i) {
                "abort" !== i && n.raise({
                    message: e,
                    xhr: t,
                    fatal: !1
                })
            }
        }
    })
}),
define("config/experiments", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = {
        version: 3,
        availableLayers: ["v2-ui"],
        anonymousUserId: (o || (o = e("vendor/event-logger/event-logger"))).getAnonymousId(),
        assignmentServiceUrl: (s || (s = e("config"))).get("api_v2_host") + "assignments/",
        localStorageKey: "V2::local::assignments",
        localStorageEnabled: (r || (r = e("lib/support"))).localStorage
    }
}),
define("lib/rollouts", [], function (e, t, i) {
    function n() {
        if (!x && (g || (g = e("lib/connect"))).isLoggedIn()) {
            var t = (g || (g = e("lib/connect"))).isLoggedIn() ? "" : "anonymous-";
            x = new(m || (m = e("lib/persistent-store")))("rollouts-" + t + (g || (g = e("lib/connect"))).getUserIdentifier()), x.each(function (e, t) {
                k.hasOwnProperty(t) && s(t).indexOf(e) > -1 ? l(t, e) : x.unset(t)
            })
        }
    }

    function s(t) {
        var i = [],
            n = k[t];
        return n && (i = (p || (p = e("underscore"))).pluck(n.groups, "value")), i
    }

    function o(e, t) {
        l(t, d(e, t))
    }

    function r(e, t) {
        return t.length ? $.ajax({
            url: h.getRolloutAPIEndpoint(t),
            type: "GET"
        }).done(function (e) {
            e.forEach(function (e) {
                var t = a(e.mnemonic),
                    i = e.enabled;
                l.call(this, t, i)
            }, this)
        }.bind(this)) : $.Deferred().resolve()
    }

    function a(t) {
        var i;
        return (p || (p = e("underscore"))).find(k, function (e, n) {
            return t === e.rolloutId ? (i = n, !0) : !1
        }), i
    }

    function l(e, t) {
        w.isReadOnly || w.set(e, t), x && x.set(e, t)
    }

    function u(e) {
        return "false" === e ? !1 : "true" === e ? !0 : /^[0-9.]+$/.test(e) ? parseFloat(e) : e
    }

    function c() {
        var t = new(b || (b = e("lib/store")));
        return (v || (v = e("lib/mixins/read-only"))).applyTo(t), t
    }

    function d(e, t) {
        var i, n, s, o, r = k[t],
            a = 0;
        if (n = r.groups.reduce(function (e, t) {
            return e + (t.ratio || 0)
        }, 0), !n) return r.groups[r.groups.length - 1].value;
        for (s = Math.floor(t.length / 2); s--;) e *= t.charCodeAt(2 * s) / t.charCodeAt(2 * s + 1);
        for (e = Math.floor(e) % n, s = 0, o = r.groups.length; o > s; ++s)
            if (i = r.groups[s], a += i.ratio || 0, a > e) return i.value;
        return null
    }
    var h, p, f, g, m, v, b, _, y, w, x, k, S = (f || (f = e("config"))).get("api_v2_host") + "features/",
        C = 1e4;
    h = i.exports = {
        setup: function (e) {
            return this.reset(), k = e, n(), this
        },
        get: function (e) {
            return w ? w.get(e) : void 0
        },
        reset: function () {
            x && (x.dispose(), x = null), w = c()
        },
        fetch: function (t) {
            var i, a = [],
                c = (g || (g = e("lib/connect"))).getUserIdentifier(),
                d = !0,
                h = (y || (y = e("lib/url"))).getQueryParams();
            return n(), (p || (p = e("underscore"))).each(k, function (t, i) {
                var n = h["exp_" + i],
                    r = !0,
                    f = t.rolloutId && (g || (g = e("lib/connect"))).isLoggedIn();
                void 0 !== n ? (f = !1, w.set(i, u(n))) : r = f && void 0 !== w.get(i), f ? (a.push(i), r || (d = !1, l(i, (p || (p = e("underscore"))).last(s(i))))) : r || o(c, i)
            }), d ? (w.makeReadOnly(), clearTimeout(this._fetchTimeoutId), this._fetchTimeoutId = setTimeout(r.bind(null, c, a), t || C), i = $.Deferred().resolve()) : i = r(c, a).always(w.makeReadOnly.bind(w)), i
        },
        serialize: function (t) {
            return w ? t ? w.map(function (t, i) {
                return t = t === !0 ? 1 : t === !1 ? 0 : t, (_ || (_ = e("vendor/shorthash"))).unique(i) + ":" + t
            }).join(",") : w.map(function (e, t) {
                return t + ":" + e
            }).join(",") : ""
        },
        getRolloutAPIEndpoint: function (e) {
            return S + e.map(function (e) {
                return k[e].rolloutId
            }).join(",")
        },
        getGroupValue: d
    }
}),
define("config/rollouts", [], function (e, t, i) {
    i.exports = {
        payments_show_opt_in_banner: {
            rolloutId: "payments_show_opt_in_banner",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        rate_new_search: {
            rolloutId: "rate_new_search",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        thisismyjam_sharing: {
            rolloutId: "thisismyjam_sharing",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        edit_page_on_next: {
            rolloutId: "edit_page_on_next",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        scheduled_publishings: {
            rolloutId: "scheduled_publishings",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        scheduled_publishings_only_sunrise_to_public: {
            rolloutId: "scheduled_publishings_only_sunrise_to_public",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        geo_blocking_settings: {
            rolloutId: "geo_blocking_settings",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        embed_avatars: {
            groups: [{
                value: !0,
                ratio: 0
            }, {
                value: !1,
                ratio: 100
            }]
        },
        new_stats: {
            rolloutId: "new_stats",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        new_stats_tracks: {
            rolloutId: "new_stats_tracks",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        profile_menu_prototype: {
            rolloutId: "profile_menu_prototype",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        },
        audio_ads: {
            rolloutId: "audio_ads",
            groups: [{
                value: !0
            }, {
                value: !1
            }]
        }
    }
}),
define("lib/integrations/facebook", [], function (e, t, i) {
    var n, s, o, r, a = "//connect.facebook.net/en_US/all.js";
    n = i.exports = {
        initialized: !1,
        appId: (s || (s = e("config"))).get("fb_app_id"),
        init: function () {
            return r || (r = $.Deferred().done(function () {
                n.initialized = !0
            }), o()), r
        },
        isLoggedIn: function () {
            var e = $.Deferred();
            return n.init().done(function () {
                FB.getLoginStatus(function (t) {
                    e.resolve("connected" === t.status)
                })
            }), e.promise()
        },
        login: function () {
            var e = $.Deferred();
            return FB.login(function (t) {
                var i = !! t.authResponse;
                e.resolve(i, i ? t.authResponse.accessToken : null)
            }), e.promise()
        },
        getAccessToken: function () {
            return FB.getAuthResponse().accessToken
        },
        parseXFBML: function (e) {
            FB.XFBML.parse(e)
        }
    }, o = function () {
        window.fbAsyncInit = function () {
            FB.init({
                appId: n.appId,
                status: !0,
                cookie: !0,
                xfbml: !0
            }), delete window.fbAsyncInit, r.resolve()
        };
        var e, t, i = document,
            s = "facebook-jssdk",
            o = i.getElementsByTagName("script")[0];
        i.getElementById(s) || (t = i.createElement("div"), t.id = "fb-root", i.body.appendChild(t), e = i.createElement("script"), e.id = s, e.async = !0, e.src = a, o.parentNode.insertBefore(e, o))
    }
}),
define("lib/global-xhr-handlers", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = {
        401: function (t) {
            (s || (s = e("lib/connect"))).isLoggedIn() && (s || (s = e("lib/connect"))).logout()
        },
        429: function (t) {
            var i = JSON.parse(t.responseText),
                n = i.errors[0] || i.errors,
                s = new(o || (o = e("models/exception")))({
                    xhr: t,
                    error: n,
                    message: n.reason_phrase
                });
            (r || (r = e("event-bus"))).trigger("spam-warning", s), s.release()
        },
        422: function (t) {
            var i = t.responseText;
            try {
                i = JSON.parse(i).errors[0].error_message
            } catch (n) {
                i = null
            }(r || (r = e("event-bus"))).trigger("error:ajax", i, t)
        }
    }
}),
define("lib/helpers/image-helper", [], function (e, t, i) {
    function n(e) {
        f.lastIndex = 0;
        var t, i = f.exec(e);
        return i && (t = i[3].charCodeAt(0) % 4 + 1, 1 !== t && (e = e.replace("//i1.", "//i" + t + "."))), e
    }

    function s(e) {
        h[e.type][e.key] |= 1 << e.index
    }
    var o, r, a, l, u, c, d, h, p, f, g, m, v, b, _;
    d = /default/, f = /^.*(artworks|avatars)-0*([0-9]+)-([a-z0-9]+)-([a-z0-9]+)\.jpg.*$/i, b = /\/images\/default\/.*?x[0-9]+(?:-[a-z0-9]+)?\.png$/, h = {
        artworks: {},
        avatars: {}
    }, c = [
        [20, "t20x20"],
        [50, "t50x50"],
        [120, "t120x120"],
        [200, "t200x200"],
        [500, "t500x500"]
    ], g = ["alt", "class", "height", "src", "title", "width"], v = {
        cloud: {
            40: "https://a-v2.sndcdn.com/assets/images/default/cloudx40-1ec56ce9.png",
            50: "https://a-v2.sndcdn.com/assets/images/default/cloudx50-1ec56ce9.png",
            80: "https://a-v2.sndcdn.com/assets/images/default/cloudx80-38b02b00.png",
            120: "https://a-v2.sndcdn.com/assets/images/default/cloudx120-38b02b00.png",
            200: "https://a-v2.sndcdn.com/assets/images/default/cloudx200-38b02b00.png",
            500: "https://a-v2.sndcdn.com/assets/images/default/cloudx500-5487e231.png"
        },
        group: {
            40: "https://a-v2.sndcdn.com/assets/images/default/groupx40-38b02b00.png",
            50: "https://a-v2.sndcdn.com/assets/images/default/groupx50-38b02b00.png",
            80: "https://a-v2.sndcdn.com/assets/images/default/groupx80-38b02b00.png",
            120: "https://a-v2.sndcdn.com/assets/images/default/groupx120-38b02b00.png",
            200: "https://a-v2.sndcdn.com/assets/images/default/groupx200-38b02b00.png",
            500: "https://a-v2.sndcdn.com/assets/images/default/groupx500-06d61caf.png"
        },
        user: {
            40: "https://a-v2.sndcdn.com/assets/images/default/userx40-38b02b00.png",
            50: "https://a-v2.sndcdn.com/assets/images/default/userx50-38b02b00.png",
            80: "https://a-v2.sndcdn.com/assets/images/default/userx80-38b02b00.png",
            120: "https://a-v2.sndcdn.com/assets/images/default/userx120-38b02b00.png",
            200: "https://a-v2.sndcdn.com/assets/images/default/userx200-38b02b00.png",
            500: "https://a-v2.sndcdn.com/assets/images/default/userx500-06d61caf.png"
        }
    }, o = i.exports = {
        load: function (t) {
            var i = new Image,
                n = $.Deferred();
            return (u || (u = e("lib/support"))).corsImg && (i.crossOrigin = location.host, t += "?xd=true"), $(i).on("load", function () {
                n.resolve(this)
            }).on("error", function () {
                n.reject(this)
            }), i.src = t, n
        },
        markup: function (t, i) {
            return (a || (a = e("underscore"))).defaults(i, {
                src: o.urlFrom(t, i.size),
                width: i.size,
                height: i.size,
                alt: o.getAltText(t)
            }), o.getMarkup(i)
        },
        getMarkup: function (t) {
            var i, n = [];
            return (a || (a = e("underscore"))).each(t, function (t, i) {
                -1 !== (a || (a = e("underscore"))).indexOf(g, i) && n.push(i + '="' + t + '"')
            }), i = p(t.src), i && s(i), "<img " + n.join(" ") + ">"
        },
        getAltText: function (t) {
            return t.username ? (r || (r = e("lib/helpers/name-helper"))).get(t, !0) + " avatar" : (r || (r = e("lib/helpers/name-helper"))).get(t)
        },
        getPlaceholderUrl: function (t, i) {
            var n, s, r, l, u;
            if (r = p(o.setFormat(t, i))) {
                if (n = r.key, h[r.type][n])
                    for (s = (a || (a = e("underscore"))).find(c, function (e, t) {
                        return u = t, i <= e[0]
                    }); u >= 0;) {
                        if (h[r.type][n] & 1 << u) {
                            l = c[u];
                            break
                        }--u
                    }
                if (s && l === s) return !1;
                if (l) return o.setFormat(t, l[0])
            }
            return null
        },
        urlFrom: function (t, i) {
            var s = t && (t.artwork_url || t.avatar_url || t.user && t.user.avatar_url) || "";
            return i && (l || (l = e("lib/browser"))).isHiDPI && (i *= 2), o.isDefaultImage(s) ? o.getDefaultImage(t.kind, i) : (s = n(s), i ? o.setFormat(s, i) : s)
        },
        isDefaultImage: function (e) {
            return !e || d.test(e)
        },
        getDefaultImage: function (e, t) {
            return (v[e] || v.cloud)[_(t)]
        },
        setFormat: function (e, t, i) {
            if (b.test(e)) return e.replace(/[0-9]+((?:-[a-z0-9]+)?\.png)$/, _(t) + "$1");
            f.lastIndex = 0;
            var s = f.exec(e),
                o = s[1],
                r = s[4],
                a = m(o, t);
            return a && (e = e.replace(r, a)), i ? n(e) : e
        },
        flagCachedImage: function (e) {
            var t = p(e);
            t && s(t)
        }
    }, p = function (t) {
        var i, n, s;
        return f.lastIndex = 0, i = t.replace(f, function (t, i, o, r, l) {
            return (a || (a = e("underscore"))).find(c, function (e, t) {
                return e[1] === l ? (n = t, !0) : void 0
            }), s = i, o
        }), s ? {
            index: n,
            key: parseInt(i, 10),
            type: s
        } : null
    }, m = function (t, i) {
        var n = (a || (a = e("underscore"))).find(c, function (e) {
            return e[0] >= i
        }) || (a || (a = e("underscore"))).last(c);
        return "t20x20" === n[1] && "artworks" === t ? "tiny" : n[1]
    }, _ = function () {
        var t, i = Object.keys(v.cloud);
        return i.sort(function (e, t) {
            return e - t
        }), t = (a || (a = e("underscore"))).last(i), (a || (a = e("underscore"))).memoize(function (e) {
            var n, s;
            for (n = 0; s = i[n]; ++n)
                if (s >= e) return s;
            return t
        })
    }()
}),
define("lib/loader", [], function (e, t, i) {
    var n, s, o, r = {};
    n = i.exports = {
        setPackageMap: function (t) {
            t._prefix && (s || (s = e("underscore"))).each(t, function (e, i) {
                "_" !== i.charAt(0) && (t[i] = t._prefix + e)
            }), this.packageMap = t
        },
        loadLayout: function (t) {
            var i, s, a = this.packageMap,
                l = a && a[t],
                u = r[t];
            return u ? u : l ? (i = $.Deferred(), s = function () {
                i.resolve(e(t))
            }, (o || (o = e("lib/helpers/dom-helper"))).insertScript(l, {
                onload: s,
                onerror: i.reject
            }), u = r[t] = i.promise()) : n.load(t)
        },
        load: function (t) {
            var i = $.Deferred();
            return (s || (s = e("underscore"))).isArray(t) || (t = [t]), e(t, i.resolve), i
        },
        get: function (t) {
            return e(t)
        }
    }
}),
define("lib/persistent-store", [], function (e, t, i) {
    var n, s, o, r;
    r = i.exports = (n || (n = e("lib/store"))).extend(), (s || (s = e("lib/mixins/stores/persistent"))).applyTo(r.prototype), (o || (o = e("lib/mixins/stores/observing"))).applyTo(r.prototype)
}),
define("lib/play-manager", [], function (e, t, i) {
    function n(e) {
        var t;
        e.playlist && e.playlist.getNextSound() ? L.prefetchAudioAd(e.playlist.getNextSound()) : (t = m.call(this, this.sourceCursor + 1, this.source), t && L.prefetchAudioAd(t.getCurrentSound()))
    }

    function s(t, i) {
        t && t !== this.getCurrentSound() || (null != i.seek && t.seek(i.seek), t.play(i), t.playlist && t === this.source && (v.call(this, t.playlist, i && i.restoreUrl), _.call(this, 0)), (N || (N = e("lib/play-log"))).addSound(t, i))
    }

    function o() {
        var t = (P || (P = e("config"))).get("router").getLayoutInfo();
        return {
            args: t.args,
            layoutName: t.layoutName,
            url: window.location.href.replace(/^https?:\/\/[^\/]+\//, "")
        }
    }

    function r() {
        var t = this.source;
        t && (this.sourceIsCollection = t instanceof(M || (M = e("lib/collection"))), this.sourceIsCollection && (t.on("add", l, this).on("remove", u, this).on("reset", c, this), t.isPopulated() || t.fetch()), t.hold())
    }

    function a(t) {
        t instanceof(M || (M = e("lib/collection"))) && t.off("add", l, this).off("remove", u, this).off("reset", c, this), t.release()
    }

    function l(e, t, i) {
        i.index <= this.sourceCursor && _.call(this, this.sourceCursor + 1)
    }

    function u(e, t, i) {
        this.sourceCursor && i.index <= this.sourceCursor && _.call(this, this.sourceCursor - 1)
    }

    function c() {
        _.call(this, -1)
    }

    function d(e) {
        e.sound.release()
    }

    function h(e) {
        e.sound.hold()
    }

    function p(e, t) {
        t[e]("finish", f, this)
    }

    function f(e) {
        var t = e.sound;
        this.playNext({
            userInitiated: !1
        }), t.playlist && t === t.playlist.getLastSound() ? t.playlist.seek(0) : t.seek(0)
    }

    function g() {
        if (this.FallbackSource) {
            var e, t = this.getCurrentSound();
            if (t && t.isPublic()) {
                if (e = new this.FallbackSource(null, {
                    resource_id: t.id,
                    resource_type: t.resource_type
                }), this.source !== e) return v.call(this, e, this.fallbackRestoreFn(t)), !0;
                e.release()
            }
        }
        return v.call(this, null), !1
    }

    function m(t, i) {
        return i instanceof(M || (M = e("lib/collection"))) ? t > -1 ? (i.audibleAt || i.at).call(i, t) : void 0 : 0 === t ? i : void 0
    }

    function v(e, t, i) {
        var n = this.source;
        return n !== e ? (this.source = e, this.restoreUrl = t, r.call(this), _.call(this, -1), n && a.call(this, n), i && i.silent || this.trigger("change:source", this.source), !0) : !1
    }

    function b(e, t, i) {
        var n, s, o = e || $.Deferred(),
            r = null == t ? R : t;
        if ("pending" === o.state()) {
            if (this._fetchDeferred && this._fetchDeferred !== o && this._fetchDeferred.reject(), this._fetchDeferred || (this._fetchDeferred = o, o.always(function () {
                this._fetchDeferred = null
            }.bind(this))), this.historyCursor < this.history.length - 1) o.resolve(this.history[this.historyCursor + 1].sound, {
                historyCursor: this.historyCursor + 1
            });
            else if (this.queue.length) o.resolve(this.queue[0], {
                queueIndex: 0
            });
            else if (this.source)
                if (this.sourceIsCollection) {
                    for (s = -1; !n && this.sourceCursor + ++s < this.source.length;) n = this.sourceCursor + s > -1 && m(this.sourceCursor + s, this.source), n = n && (0 === s ? n.getNextSound() : n.getFirstSound());
                    n ? o.resolve(n, {
                        sourceCursor: this.sourceCursor + s,
                        initialFallback: !! i
                    }) : !this.source.isFullyPopulated() && r ? this.source.fetch({
                        add: !0
                    }).fail(o.reject).done(b.bind(this, o, r - 1)) : g.call(this) ? b.call(this, o, r, !0) : o.resolve(void 0)
                } else n = -1 === this.sourceCursor ? this.source.getFirstSound() : this.source.getNextSound(), n ? o.resolve(n, {
                    sourceCursor: 0
                }) : (g.call(this), b.call(this, o, r, !0));
                else o.reject();
            return o
        }
    }

    function _(e) {
        this.sourceCursor = "number" == typeof e ? e : this.sourceIsCollection ? this.indexOfSoundInSource(e, this.source) : 0
    }

    function y(e) {
        var t, i = this.getCurrentSound();
        this.historyCursor !== e && (i && p.call(this, "off", i), this.historyCursor = e, t = this.getCurrentSound(), t && p.call(this, "on", t), this.trigger("change:currentSound", {
            prev: i,
            current: t
        }))
    }

    function w(t, i, n, s) {
        return i instanceof w ? i : (this.sound = t, this.layoutInfo = (A || (A = e("underscore"))).clone(n), this.sourceInfo = i && i.getSourceInfo(), void(this.restoreUrl = s))
    }

    function x(e) {
        S.call(this, this.history, e, !0), S.call(this, this.queue, e), k.call(this, e)
    }

    function k(t) {
        var i = this.source;
        i && (i instanceof(M || (M = e("lib/collection"))) ? (i.remove(t), t.release()) : "sound" === i.resource_type && (i.release(), this.unsetInitialSource(i)))
    }

    function S(e, t, i) {
        for (var n = e.length; n--;) e[n].sound === t && (d(e[n]), i && (this.historyCursor > n || this.historyCursor === n && n === e.length - 1) && this.historyCursor--, e.splice(n, 1))
    }

    function C(t) {
        var i = t ? "on" : "off";
        (D || (D = e("lib/action-controller")))[i]("destroy", T, this)
    }

    function T(e) {
        "sound" === e.targetType && x.call(this, e.targetModel)
    }
    var E, A, D, I, P, M, N, L, F = 5e3,
        O = 3,
        R = 3;
    E = i.exports = (A || (A = e("underscore"))).extend({}, (I || (I = e("lib/backbone"))).Events, {
        history: [],
        historyCursor: -1,
        source: null,
        sourceCursor: -1,
        initialSourcePriority: -1 / 0,
        queue: [],
        layoutInfo: {},
        restoreUrl: null,
        FallbackSource: null,
        _fetchDeferred: null,
        _sessionPlays: 0,
        setInitialSource: function (e, t, i) {
            t = t || 0, -1 === this.sourceCursor && t > this.initialSourcePriority && (this.initialSourcePriority = t, this.saveLayout(), v.call(this, e, i))
        },
        unsetInitialSource: function (e) {
            -1 === this.sourceCursor && this.source === e && (v.call(this, null), this.initialSourcePriority = -1 / 0)
        },
        indexOfSoundInSource: function (t, i) {
            var n = -1;
            return i instanceof(M || (M = e("lib/collection"))) ? (i.any(function (e, s) {
                var o = m(s, i);
                return o && o.getSoundIndex(t) > -1 ? (n = s, !0) : void 0
            }), n) : i.getSoundIndex(t)
        },
        hasPrevSound: function () {
            return this.historyCursor > 0
        },
        hasNextSound: function () {
            var e = this.source,
                t = this.getCurrentSound();
            return !!(this.historyCursor < this.history.length - 1 || this.queue.length > 0 || e && this.sourceIsCollection && (!e.isFullyPopulated() || e.length && this.sourceCursor < e.length - 1) || e && !this.sourceIsCollection && (this.sourceCursor < 0 ? e.getFirstSound() : e.getNextSound()) || t && t.isPublic() && this.FallbackSource)
        },
        hasCurrentSound: function () {
            return !(!this.getCurrentSound() && !this.hasNextSound())
        },
        getCurrentSound: function () {
            var e = this.history[this.historyCursor];
            return e && e.sound
        },
        getPrevSound: function () {
            var e = this.history[this.historyCursor - 1];
            return e && e.sound
        },
        addToQueue: function (e, t) {
            var i = this.queue;
            (0 === i.length || i[i.length - 1].sound.id !== e.id) && this.queue.push(new w(e, t, o()))
        },
        getSessionPlays: function () {
            return this._sessionPlays
        },
        addToHistory: function (t, i) {
            var n, s, o, r, a = t !== this.getCurrentSound();
            n = this.historyCursor + (a ? 1 : 0), s = (P || (P = e("config"))).get("playHistoryLength"), r = new w(t, i, this.layoutInfo, this.restoreUrl), this.history.splice(n).forEach(d), this.history.push(r), h(r), o = Math.max(0, this.history.length - s), o && (this.history.splice(0, o).forEach(d), this.historyCursor -= o), y.call(this, this.history.length - 1)
        },
        reset: function () {
            var e = this.getCurrentSound();
            e && e.pause(), this.history.forEach(function (e) {
                e.sound.release()
            }), y.call(this, -1), this.history = [], this._sessionPlays = 0, this.queue.forEach(function (e) {
                e.release()
            }), this.queue = [], this.layoutInfo = {}, this._fetchDeferred && this._fetchDeferred.reject(), v.call(this, null), this.FallbackSource = this.fallbackRestoreFn = this.restoreUrl = null, this.initialSourcePriority = -1 / 0
        },
        play: function (e, t) {
            t = t || {};
            var i, n = t.keepSource ? this.source : t.source || e.playlist || e,
                s = e.getCurrentSound(),
                o = this.getCurrentSound() !== s;
            i = v.call(this, n, t.restoreUrl, {
                silent: !0
            }), _.call(this, s), o && this.pauseCurrent(t), (i || o) && this.addToHistory(s, n), i && this.trigger("change:source", n), this.playCurrent(t)
        },
        playSource: function (e, t) {
            t = t || {}, v.call(this, e, t.restoreUrl) ? this.playNext(t) : this._fetchDeferred || this.playCurrent(t)
        },
        toggle: function (e, t) {
            e.isPlaying() ? this.pause(e, t) : this.play(e, t)
        },
        pause: function (e, t) {
            e.pause(t)
        },
        playCurrent: function (e) {
            var t = this.getCurrentSound();
            t ? (e = e || {}, L.isUserAdConsumer() ? (L.whenAdFinished(t).always(s.bind(this, t, e)), n.call(this, t)) : s.call(this, t, e)) : (E.saveLayout(), E.playNext(e))
        },
        pauseCurrent: function (e) {
            var t = this.getCurrentSound();
            t && t.pause(e)
        },
        toggleCurrent: function (e) {
            var t, i = this.getCurrentSound();
            if (i) {
                if (L.isUserAdConsumer() && (t = L.getCurrentSound())) return void t.toggle(e);
                i.toggle(e)
            } else this.playCurrent(e)
        },
        playNext: function (t) {
            return t = (A || (A = e("underscore"))).extend({
                seek: 0
            }, t), this.pauseCurrent(), b.call(this).done(function (e, i) {
                var n;
                e && (null != i.historyCursor ? y.call(this, i.historyCursor) : (null != i.queueIndex ? n = this.queue.shift() : null != i.sourceCursor && (_.call(this, i.sourceCursor), n = this.source, this.sourceIsCollection && i.sourceCursor >= this.source.length - O && !this.source.isFullyPopulated() && this.source.fetch({
                    add: !0
                })), this.addToHistory(e, n)), this.playCurrent(t), i.initialFallback && this.trigger("fallback"))
            }.bind(this))
        },
        playPrev: function (t) {
            var i = this.getCurrentSound(),
                n = this.getPrevSound();
            t = (A || (A = e("underscore"))).extend({
                seek: 0
            }, t), i && i.currentTime() > F ? (i.seek(0), i.isPlaying() || i.play()) : n && (this.pauseCurrent(), y.call(this, this.historyCursor - 1), this.playCurrent(t))
        },
        setFallbackSource: function (e, t) {
            this.FallbackSource = e, this.fallbackRestoreFn = t
        },
        setAdManager: function (e) {
            L = e
        },
        restoreState: function () {
            var t, i = this.getCurrentRestoreUrl(),
                n = this.getCurrentSound(),
                s = (P || (P = e("config"))).get("router");
            i ? (t = n.playlist || n, s.navigate(i, {
                trigger: !0
            }), (P || (P = e("config"))).set("restoreToSound", t.resource_type + t.resource_id)) : n && s.navigateToRoute("listen", [n], {
                trigger: !0
            })
        },
        getCurrentRestoreUrl: function () {
            var e = this.history[this.historyCursor];
            return e && e.restoreUrl || ""
        },
        getCurrentMetadata: function () {
            var e = L.isUserAdConsumer() ? L.getCurrentSound() : null;
            return e ? new w(e, e, o()) : this.history[this.historyCursor]
        },
        saveLayout: function () {
            this.layoutInfo = o()
        }
    }), C.call(E, !0)
}),
define("collections/products", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c;
    n = i.exports = (o || (o = e("lib/collection"))).extend({
        model: l || (l = e("models/product")),
        defaults: {
            category: "creator-subscription",
            ref: null
        },
        setup: function () {
            (a || (a = e("event-bus"))).one("connect:hasUserData", this.onLogin, this)
        },
        onLogin: function () {
            this.next_href = null, this.fetch()
        },
        baseUrl: function () {
            var t = this.options,
                i = "creator-subscription" === t.category ? "creator" : "creator-gift";
            return (c || (c = e("lib/url"))).stringify({
                path: "/subscriptions/" + i,
                query: {
                    ref: t.ref
                }
            }, (r || (r = e("config"))).get("api_v2_host"))
        },
        parse: function (t) {
            var i = (s || (s = e("underscore"))).values(t.packages.reduce(function (t, i) {
                var n = i.product + "-" + i.plan,
                    o = t[n];
                return o || (o = t[n] = i), (s || (s = e("underscore"))).extend(o, i), o.id = n, o[i.term] = {
                    urn: i.urn,
                    price: i.price.display,
                    currency: i.price.currency
                }, delete o.price, delete o.urn, delete o.name, delete o.vendor, delete o.term, delete o.plan, delete o.product, t
            }, {}));
            return i.forEach(function (e) {
                e.opt_in = e.opt_in || !1
            }), i.unshift((u || (u = e("config/products"))).free), i
        }
    }, {
        onCleanup: function (t) {
            (a || (a = e("event-bus"))).off("connect:hasUserData", t.onLogin, t)
        },
        hashFn: function (e, t) {
            return t ? t.category : "creator-subscription"
        }
    })
}),
define("lib/referrer", [], function (e, t, i) {
    var n, s, o = ((s || (s = e("lib/url"))).getQueryParam("utm_medium") || "").toLowerCase();
    n = i.exports = {
        facebook: "facebook" === o || /\bfacebook\.com/.test(document.referrer) || !! (s || (s = e("lib/url"))).getQueryParam("fb_action_ids"),
        googleplus: "googleplus" === o
    }
}),
define("collections/related-sounds", [], function (e, t, i) {
    function n(e) {
        return e.resource_type = "playlist" === e.kind ? "playlist" : "sound", e
    }
    var s, o, r, a, l, u, c = null;
    s = i.exports = (a || (a = e("lib/collection"))).extend(r || (r = e("lib/mixins/audio-source")), {
        model: o || (o = e("models/audible")),
        audioSourceVersion: null,
        defaults: {
            resource_id: null,
            resource_type: null
        },
        getSourceInfo: function () {
            return {
                type: "recommender",
                version: this.audioSourceVersion,
                resourceId: this.options.resource_id,
                resourceType: this.options.resource_type
            }
        },
        parse: function (e) {
            return this.audioSourceVersion = e.version || "no_version", e.collection.map(n)
        },
        baseUrl: function () {
            var t = (l || (l = e("config"))).get("me").id || null;
            return t || c || (c = Math.floor(1e8 * Math.random())), (u || (u = e("lib/url"))).stringify({
                path: ["tracks", this.options.resource_id, "related"],
                query: {
                    user_id: t,
                    anon_user_id: t ? null : c
                }
            })
        }
    }, {
        hashFn: function (e, t) {
            return t.resource_id
        }
    })
}),
define("router", [], function (e, t, i) {
    function n(e) {
        0 === e.indexOf("route:") && ++x
    }

    function s(t, i) {
        var n, s;
        this.currentLayout && (t !== this.currentLayout && this.currentLayout.dispose(), (p || (p = e("event-bus"))).trigger("layout:beforeChange", this._currentLayoutInfo)), this.currentLayout = t, s = this._currentLayoutInfo = t.getChangeEventData(i), n = $("#content"), t.render(), n.children()[0] !== t.el && n.empty()[0].appendChild(t.el), (p || (p = e("event-bus"))).trigger("layout:change", s)
    }

    function o(t) {
        return t._navigationBlocks.filter(r).map(function (e) {
            return e.callback
        }).filter((u || (u = e("underscore"))).identity).reduce(function (e, t) {
            return t(e) !== !1 && e
        }, !0)
    }

    function r(e) {
        return !e.condition || e.condition()
    }

    function a() {
        return (m || (m = e("lib/support"))).pushState ? window.location.href : "https://" + window.location.hostname + "/" + window.location.hash.replace(/^[#\/]/, "")
    }
    var l, u, c, d, h, p, f, g, m, v, b, _, y, w = 300,
        x = 0;
    l = i.exports = (c || (c = e("lib/backbone"))).Router.extend({
        currentLayout: null,
        _currentLayoutInfo: null,
        _navigationBlocks: null,
        initialize: function () {
            this.on("all", n), this._navigationBlocks = [], this.onBeforeUnload = this.onBeforeUnload.bind(this)
        },
        setRoutes: function (e, t) {
            b = e, _ = t, y = b.slice(0).reverse(), e.forEach(function (e) {
                this.route(e.route, e.name, e.handler)
            }.bind(this))
        },
        reload: function () {
            this.match(window.location.href.replace(/^https?:\/\/[^\/]+\//, ""))
        },
        addNavigationBlock: function (t, i, n) {
            var s, o = (u || (u = e("underscore"))).uniqueId();
            return s = this._navigationBlocks.unshift({
                id: o,
                exitSiteMessage: t,
                callback: i,
                condition: n
            }), 1 === s && $(window).on("beforeunload", this.onBeforeUnload), o
        },
        removeNavigationBlock: function (e) {
            var t, i = this._navigationBlocks;
            for (t = i.length; t--;)
                if (i[t].id === e) {
                    i.splice(t, 1);
                    break
                }
            i.length || $(window).off("beforeunload", this.onBeforeUnload)
        },
        isNavigationBlocked: function () {
            return this._navigationBlocks.some(r)
        },
        onBeforeUnload: function () {
            var t = (u || (u = e("underscore"))).find(this._navigationBlocks, r);
            return t && t.exitSiteMessage
        },
        navigateToRoute: function (e, t, i) {
            var n, s = [e];
            t && t.length && (s = s.concat(t)), n = l.getRoute.apply(l, s), this.navigate(n, i)
        },
        navigate: function () {
            o(this) && (c || (c = e("lib/backbone"))).Router.prototype.navigate.apply(this, arguments)
        },
        match: function (t) {
            return (c || (c = e("lib/backbone"))).history.loadUrl(t)
        },
        getUrlInfo: function (t) {
            var i, n, s, o = (v || (v = e("lib/url"))).parse(t);
            if (o.path) return i = o.path.substring(1), s = (u || (u = e("underscore"))).find(y, function (e) {
                return e.route.test(i)
            }), s && (n = {
                name: s.name,
                params: this._extractParameters(s.route, i)
            }), n
        },
        apply: function (t, i) {
            var n, o, r = "layouts/" + t;
            this.setupDeferred && this.setupDeferred.reject(), this.setupDeferred = o = $.Deferred(), n = setTimeout(function () {
                this.currentLayout && this.currentLayout.$el.detach()
            }.bind(this), w), (f || (f = e("lib/loader"))).loadLayout(r).always(clearTimeout.bind(window, n)).done(function (e) {
                if ("rejected" !== o.state()) {
                    var n = this.currentLayout instanceof e ? this.currentLayout : new e;
                    n.setArgs(i), this.setupDeferred = n.setup(i).done(s.bind(this, n, t, i))
                }
            }.bind(this))
        },
        notImplemented: function (e) {
            var t = a();
            e && (t = e(t)), window.open(t), window.history.go(-1)
        },
        isLoggedIn: function () {
            return (h || (h = e("lib/connect"))).isLoggedIn()
        },
        getRolloutValue: function (t) {
            return (g || (g = e("lib/rollouts"))).get(t)
        },
        getCurrentUserPermalink: function () {
            return (d || (d = e("config"))).get("me").get("permalink")
        },
        getQueryParams: function () {
            return (v || (v = e("lib/url"))).getQueryParams()
        },
        getLayoutInfo: function () {
            return this._currentLayoutInfo
        },
        getRouteInfo: function (t) {
            return (u || (u = e("underscore"))).find(b, function (e) {
                return e.name === t
            })
        },
        getNavCount: function () {
            return x
        },
        unauthenticated: function () {
            (p || (p = e("event-bus"))).trigger("tracking:unauthenticated-access"), this.navigate("/", {
                replace: !0,
                trigger: !0
            })
        }
    }, {
        getRoute: function (t) {
            var i, n;
            if (i = (u || (u = e("underscore"))).find(b, function (e) {
                return e.name === t
            })) {
                if (n = _[t]) return n.apply(null, [].slice.call(arguments, 1))
            } else;
        }
    })
}),
define("config/route-builders", [], function (e, t, i) {
    function n(t) {
        return t instanceof(u || (u = e("lib/model"))) ? t.toJSON() : t
    }

    function s(e) {
        return e.replace(/^https?:.+?\w\//, "/")
    }

    function o(t) {
        return function () {
            var i = t.apply(this, arguments);
            return (c || (c = e("lib/rollouts"))).get("new_stats") && (i = (d || (d = e("lib/url"))).modify(i, {
                query: {
                    new_stats: 1
                }
            })), i
        }
    }

    function r(e, t) {
        t && t.metric && (e.push(t.metric), t.from && t.to && e.push(t.from, t.to))
    }
    var a, l, u, c, d;
    a = i.exports = {
        listen: function (t, i) {
            t = n(t);
            var o, r = {}, a = (l || (l = e("config"))).get("me");
            return i = i ? "/comment-" + i : "", t._playlist && t._playlist.id && (o = t._playlist.permalink_url.replace(/\/s-[a-zA-Z0-9]{5}$/, ""), r.query = {
                "in": s(o).substr(1) + (t._playlist.secret_token && !a.owns("playlist", t._playlist) ? "/" + t._playlist.secret_token : "")
            }), r.path = t.user ? "/" + t.user.permalink + "/" + t.permalink + i + (t.secret_token && !a.owns("sound", t) ? "/" + t.secret_token : "") : s(t.permalink_url + i), (d || (d = e("lib/url"))).stringify(r)
        },
        listenEditVisuals: function (e) {
            return e = n(e), "/" + [e.user.permalink, e.permalink, "edit", "visuals"].join("/")
        },
        listenNetwork: function (t, i, o) {
            t = n(t);
            var r = {}, a = (l || (l = e("config"))).get("me");
            return "related" === i && (i = "recommended"), r.path = t.user ? "/" + t.user.permalink + "/" + t.permalink + (t.secret_token && !a.owns("sound", t) ? "/" + t.secret_token : "") : s(t.permalink_url), r.path += "/" + i + ("comments" === i && o ? "/" + o : ""), (d || (d = e("lib/url"))).stringify(r)
        },
        groupNetwork: function (e, t) {
            return "/groups/" + n(e).permalink + "/" + t
        },
        soundEdit: function (t) {
            return t = n(t), "/" + (d || (d = e("lib/url"))).stringify({
                path: [t.user.permalink, t.permalink, "edit"]
            })
        },
        playlistEdit: function (t) {
            return t = n(t), "/" + (d || (d = e("lib/url"))).stringify({
                path: [t.user.permalink, "sets", t.permalink, "edit"]
            })
        },
        playlist: function (t) {
            var i = (l || (l = e("config"))).get("me");
            return t = n(t), t.user ? "/" + t.user.permalink + "/sets/" + t.permalink + (t.secret_token && !i.owns("playlist", t) ? "/" + t.secret_token : "") : s(t.permalink_url)
        },
        playlistNetwork: function (t, i) {
            t = n(t);
            var o = {}, r = (l || (l = e("config"))).get("me");
            return o.path = t.user ? "/" + t.user.permalink + "/sets/" + t.permalink + (t.secret_token && !r.owns("playlist", t) ? "/" + t.secret_token : "") : s(t.permalink_url), o.path += "/" + i, (d || (d = e("lib/url"))).stringify(o)
        },
        user: function (e, t) {
            return e = n(e), "/" + e.permalink + (t ? "/" + t : "")
        },
        userNetwork: function (e, t) {
            return e = n(e), "/" + e.permalink + "/" + t
        },
        group: function (e) {
            return e ? "/groups" + (e.permalink ? "/" + e.permalink : "") : "/groups"
        },
        groups: function () {
            return "/groups"
        },
        root: function () {
            return "/"
        },
        onboarding: function (t) {
            return "/" + (d || (d = e("lib/url"))).stringify({
                path: ["welcome", t]
            })
        },
        explore: function (t) {
            return t = (t || "").toLowerCase(), "/" + (d || (d = e("lib/url"))).stringify({
                path: ["explore", t]
            })
        },
        creators: function () {
            return "/creators"
        },
        campaigns: function (t) {
            return "/" + (d || (d = e("lib/url"))).stringify({
                path: ["campaigns", t]
            })
        },
        "join-us": function (t) {
            return "/" + (d || (d = e("lib/url"))).stringify({
                path: ["join-us", t]
            })
        },
        people: function (t) {
            return "/" + (d || (d = e("lib/url"))).stringify({
                path: ["people", t]
            })
        },
        pages: function (e) {
            return "/" + e
        },
        embedPage: function () {
            return "/pages/embed"
        },
        emailUnsubscribedPage: function () {
            return "/pages/unsubscribed"
        },
        pagesPages: function (e) {
            return "/pages/" + e
        },
        pressPages: function (e) {
            return (e || "").replace(/^(\/?press\/|\/?)/, "/press/")
        },
        tags: function (t) {
            return (d || (d = e("lib/url"))).stringify({
                path: "/tags/" + t.toLowerCase()
            })
        },
        search: function (t, i) {
            return "/" + (d || (d = e("lib/url"))).stringify({
                path: ["search", t],
                query: {
                    q: i
                }
            })
        },
        activity: function () {
            return "/notifications"
        },
        stream: function () {
            return "/stream"
        },
        logout: function () {
            return "/logout"
        },
        mobile: function () {
            return "/mobile"
        },
        upload: function () {
            return "/upload-beta"
        },
        messages: function (e) {
            return "/messages" + (e ? "/" + e : "")
        },
        premium: function (t, i, n) {
            var s = ["pro", t];
            return i && s.push("buy", i), "/" + (d || (d = e("lib/url"))).stringify({
                path: s,
                query: {
                    ref: n
                }
            })
        },
        redeem: function (e) {
            return "/pro/redeem/" + e
        },
        purchased: function (t) {
            var i = t.indexOf("gift") > -1 ? "gifts" : "",
                n = t.replace(/creator-(gift|subscription)-/, "");
            return "/pro/purchased/" + (d || (d = e("lib/url"))).stringify({
                path: [i, n]
            })
        },
        v1: function (e, t) {
            return t = t || "", "/" + e + t
        },
        stats: o(function (t) {
            var i = ["you", "stats"];
            return r(i, t), "/" + (d || (d = e("lib/url"))).joinPath(i)
        }),
        "track-stats": o(function (t, i) {
            t = n(t);
            var s = [t.user.permalink, t.permalink, "stats"];
            return r(s, i), "/" + (d || (d = e("lib/url"))).joinPath(s)
        })
    }
}),
define("config/routes", [], function (e, t, i) {
    function n(e) {
        return u || (u = {
            alphanum: "[a-zA-Z0-9_-]+",
            user: "[a-zA-Z0-9_-]{1,255}",
            sound: "[a-zA-Z0-9_-]{1,255}",
            playlist: "[a-zA-Z0-9_-]{1,255}",
            id: "[0-9]+",
            secretToken: "s-[a-zA-Z0-9]{5}",
            group: "[a-zA-Z0-9_-]{1,255}",
            exploreCategory: "[^/]+",
            tag: ".+",
            conversationId: "[0-9]+:(?:[0-9]+|system)",
            giftCode: "\\w+",
            planName: "pro(?:-unlimited)?",
            metric: "\\w+",
            date: "[^/]+"
        }, c = new RegExp(":(" + Object.keys(u).join("|") + ")", "g")), c.lastIndex = 0, new RegExp("^" + e.replace(c, s) + "$")
    }

    function s(e, t) {
        return "(" + u[t] + ")"
    }

    function o(e) {
        return e.forEach(function (e) {
            var t = e.redirect;
            "string" == typeof e.route && (e.route = n(e.route)), t && (e.handler = function () {
                this.navigate("string" == typeof t ? t : t.apply(this, arguments), {
                    replace: !0,
                    trigger: !0
                })
            }), e.requiresLogin && (e.handler = r(e.handler))
        }), e
    }

    function r(e) {
        return function () {
            this.isLoggedIn() ? e.apply(this, arguments) : this.unauthenticated()
        }
    }

    function a(e) {
        return function () {
            this.getRolloutValue("new_stats") && "1" === this.getQueryParams().new_stats ? e.apply(this, arguments) : this.notImplemented(function (e) {
                return e.replace(/([?&])new_stats=1($|&)/, "$1")
            })
        }
    }
    var l, u, c;
    l = i.exports = o([{
        name: "404",
        route: /(.*)/,
        handler: function (e) {
            var t = e.replace(/[,.)]+$/, "");
            e !== t ? this.navigate("/" + t, {
                trigger: !0,
                replace: !0
            }) : this.apply("error", {
                type: "404"
            })
        }
    }, {
        name: "listen",
        route: ":user/:sound(?:/:secretToken|/for/:user|/comment-:id)?",
        handler: function (e, t, i, n, s) {
            this.apply("listen", {
                userPermalink: e,
                soundPermalink: t,
                secretToken: i,
                forUser: n,
                commentId: parseInt(s, 10) || void 0
            })
        }
    }, {
        name: "listenEditVisuals",
        route: ":user/:sound/edit/visuals",
        handler: function (e, t) {
            this.apply("listen-edit-visuals", {
                userPermalink: e,
                soundPermalink: t
            })
        }
    }, {
        name: "listenNetwork",
        route: ":user/:sound(?:/:secretToken)?/(likes|reposts|comments|sets|groups|recommended)(?:/:id)?",
        handler: function (e, t, i, n, s) {
            "recommended" === n && (n = "related"), this.apply("listen-network", {
                userPermalink: e,
                soundPermalink: t,
                secretToken: i,
                subpage: n,
                commentId: parseInt(s, 10) || void 0
            })
        }
    }, {
        name: "listenDeprecated",
        route: ":user/:sound(?:/:secretToken)?/related",
        redirect: function (e, t, i) {
            return "/" + [e, t, i, "recommended"].filter(Boolean).join("/")
        }
    }, {
        name: "soundEdit",
        route: ":user/:sound/edit",
        requiresLogin: !0,
        handler: function (e, t) {
            this.getCurrentUserPermalink() !== e ? this.navigate("/", {
                replace: !0,
                trigger: !0
            }) : this.getRolloutValue("edit_page_on_next") ? this.apply("sound-edit", {
                userPermalink: e,
                soundPermalink: t
            }) : this.notImplemented()
        }
    }, {
        name: "playlistEdit",
        route: ":user/sets/:playlist/edit",
        handler: function () {
            this.notImplemented()
        }
    }, {
        name: "playlist",
        route: ":user/sets/:playlist(?:/(?::secretToken|for/:user))?",
        handler: function (e, t, i, n) {
            this.apply("listen", {
                userPermalink: e,
                playlistPermalink: t,
                secretToken: i,
                forUser: n
            })
        }
    }, {
        name: "playlistNetwork",
        route: ":user/sets/:playlist(?:/:secretToken)?/(likes|reposts)",
        handler: function (e, t, i, n) {
            this.apply("listen-network", {
                userPermalink: e,
                playlistPermalink: t,
                secretToken: i,
                subpage: n
            })
        }
    }, {
        name: "user",
        route: ":user",
        handler: function (e) {
            this.apply("user", {
                userPermalink: e
            })
        }
    }, {
        name: "you",
        route: "you",
        requiresLogin: !0,
        redirect: function () {
            return "/" + this.getCurrentUserPermalink()
        }
    }, {
        name: "userNetwork",
        route: ":user/(likes|followers|following|comments|sets|groups)",
        handler: function (e, t) {
            this.apply("user-network", {
                userPermalink: e,
                subpage: t
            })
        }
    }, {
        name: "userTracks",
        route: ":user/tracks",
        requiresLogin: !0,
        handler: function (e) {
            e !== this.getCurrentUserPermalink() ? this.navigate("/" + e, {
                replace: !0,
                trigger: !0
            }) : this.apply("user-network", {
                userPermalink: e,
                subpage: "tracks"
            })
        }
    }, {
        name: "youNetwork",
        route: "you/(likes|followers|following|comments|sets|groups|tracks)",
        requiresLogin: !0,
        redirect: function (e) {
            return "/" + this.getCurrentUserPermalink() + "/" + e
        }
    }, {
        name: "userDeprecated",
        route: ":user/(sounds|favorites|spotlight|dropbox/profile|follow)",
        redirect: function (e, t) {
            return "favorites" === t ? "/" + e + "/likes" : "/" + e
        }
    }, {
        name: "groupDeprecated",
        route: "groups/:group/tracks",
        redirect: function (e) {
            return "/groups/" + e
        }
    }, {
        name: "groupNetwork",
        route: "groups/:group/(members|moderators|contributors)",
        handler: function (e, t) {
            this.apply("group-network", {
                groupPermalink: e,
                subpage: t
            })
        }
    }, {
        name: "group",
        route: "groups/:group",
        handler: function (e) {
            this.apply("group", {
                groupPermalink: e
            })
        }
    }, {
        name: "groups",
        route: "groups",
        redirect: "/"
    }, {
        name: "root",
        route: "",
        handler: function () {
            this.isLoggedIn() ? this.navigate("/stream", {
                replace: !0,
                trigger: !0
            }) : this.apply("home")
        }
    }, {
        name: "onboarding",
        route: "welcome(?:/(suggestions|social))?",
        requiresLogin: !0,
        handler: function (e) {
            this.apply("onboarding", {
                step: e || ""
            })
        }
    }, {
        name: "explore",
        route: "explore(?:/?|/:exploreCategory)",
        handler: function (e) {
            this.apply("explore", {
                category: e && e.toLowerCase()
            })
        }
    }, {
        name: "exploreDeprecated",
        route: "tracks(?:/:exploreCategory)?",
        redirect: function (e) {
            return "/explore" + (e ? "/" + e : "")
        }
    }, {
        name: "creators",
        route: "creators",
        handler: function () {
            this.apply("creators")
        }
    }, {
        name: "creatorsDeprecated",
        route: "creator",
        redirect: "/creators"
    }, {
        name: "campaigns",
        route: "campaigns/:alphanum",
        handler: function (e) {
            this.apply("campaigns", {
                campaign: e.toLowerCase()
            })
        }
    }, {
        name: "join-us",
        route: "join-us/:alphanum",
        handler: function (e) {
            this.apply("join-us", {
                campaignId: e.toLowerCase()
            })
        }
    }, {
        name: "people",
        route: "people(?:/(genre))?",
        handler: function (e) {
            this.apply("people", {
                tab: e
            })
        }
    }, {
        name: "peopleDeprecated",
        route: "people/finder",
        redirect: "/people"
    }, {
        name: "pages",
        route: "(terms-of-use(?:-pro)?|community-guidelines|imprint)",
        handler: function (e) {
            this.apply("static-page", {
                pageName: e
            })
        }
    }, {
        name: "pagesDeprecated",
        route: "terms-of-use-new",
        redirect: "/terms-of-use"
    }, {
        name: "embedPage",
        route: "pages/embed",
        handler: function () {
            this.apply("widgets")
        }
    }, {
        name: "emailUnsubscribedPage",
        route: "pages/unsubscribed",
        handler: function () {
            this.apply("unsubscribed")
        }
    }, {
        name: "pagesPages",
        route: "pages/(copyright(?:/report)?|privacy|contact|cookies|competition|dmca_policy)/?",
        handler: function (e) {
            this.apply("static-page", {
                pageName: "pages/" + e
            })
        }
    }, {
        name: "pressPages",
        route: "(press(?:/:alphanum)*)",
        handler: function (e) {
            this.apply("static-page", {
                pageName: e
            })
        }
    }, {
        name: "tags",
        route: "tags/:tag",
        handler: function (e) {
            this.apply("tags", {
                tag: e
            })
        }
    }, {
        name: "search",
        route: "search(?:/(sounds|sets|people|groups))?",
        handler: function (e) {
            this.apply("search", {
                category: e
            })
        }
    }, {
        name: "activity",
        route: "notifications",
        requiresLogin: !0,
        handler: function () {
            this.apply("activity")
        }
    }, {
        name: "activityDeprecated",
        route: "stream/activity",
        redirect: "/notifications"
    }, {
        name: "stream",
        route: "stream",
        requiresLogin: !0,
        handler: function () {
            this.apply("stream")
        }
    }, {
        name: "logout",
        route: "logout",
        handler: function () {
            this.apply("logout")
        }
    }, {
        name: "mobile",
        route: "mobile",
        handler: function () {
            this.apply("mobile-apps")
        }
    }, {
        name: "upload",
        route: "upload-beta",
        handler: function () {
            this.apply("upload")
        }
    }, {
        name: "uploadDeprecated",
        route: "next-upload",
        redirect: "/upload-beta"
    }, {
        name: "messages",
        route: "messages(?:/:conversationId)?",
        requiresLogin: !0,
        handler: function (e) {
            this.apply("inbox", {
                conversationId: e
            })
        }
    }, {
        name: "premium",
        route: "(?:premium|pro)(?:/(gifts))?(?:/buy/:planName)?",
        handler: function (e, t) {
            this.apply("premium", {
                secondary: e,
                buyPlan: t
            })
        }
    }, {
        name: "redeem",
        route: "(?:premium|pro)/redeem/:giftCode",
        handler: function (e) {
            this.apply("premium", {
                secondary: "redeem",
                giftCode: e
            })
        }
    }, {
        name: "purchased",
        route: "(?:premium|pro)/purchased(?:/(gifts))?/:planName",
        handler: function (e, t) {
            this.apply("purchased", {
                subpage: e,
                plan: t
            })
        }
    }, {
        name: "stats",
        route: "you/stats(?:/:metric(?:/:date/:date)?)?",
        requiresLogin: !0,
        handler: a(function (e, t, i) {
            this.apply("stats", {
                metric: e,
                from: t,
                to: i
            })
        })
    }, {
        name: "track-stats",
        route: ":user/(?!sets/):sound/stats(?:/:metric(?:/:date/:date)?)?",
        requiresLogin: !0,
        handler: a(function (e, t, i, n, s) {
            this.apply("track-stats", {
                metric: i,
                from: n,
                to: s,
                trackPermalink: t,
                userPermalink: e
            })
        })
    }, {
        name: "streamDeprecated",
        route: "dashboard(?:/.*)?",
        redirect: "/stream"
    }, {
        name: "contactDeprecated",
        route: "pages/who-we-are",
        redirect: "/pages/contact"
    }, {
        name: "v1",
        route: "(" + ["apps", "upload", "share", "settings", "101", "groups/:group/(edit|moderate|info|dropbox)", "pages/copyright/report/form"].join("|") + ")(/.*)?",
        handler: function () {
            this.notImplemented()
        }
    }])
}),
define("lib/support", [], function (e, t, i) {
    function n(e) {
        try {
            if (e.getItem) {
                var t = Date.now();
                return e.setItem(t, t), e.removeItem(t), !0
            }
        } catch (i) {}
        return !1
    }

    function s() {
        return (u || (u = e("lib/helpers/environment-helper"))).getFlashPlugin() && (u || (u = e("lib/helpers/environment-helper"))).getFlashVersion() >= c
    }

    function o() {
        return !(!window.hasOwnProperty("Audio") || !(new window.Audio).canPlayType('audio/mpeg; codecs="mp3"'))
    }
    var r, a, l, u, c = 9;
    r = i.exports = (a || (a = e("underscore"))).reduce({
        sessionStorage: function () {
            try {
                return "undefined" != typeof sessionStorage && n(sessionStorage)
            } catch (e) {
                return !1
            }
        },
        localStorage: function () {
            try {
                return "undefined" != typeof localStorage && n(localStorage)
            } catch (e) {
                return !1
            }
        },
        dragDrop: function () {
            var e = document.createElement("div");
            return "draggable" in e || "ondragstart" in e && "ondrop" in e
        },
        flash: s,
        HTML5Audio: o,
        audio: function () {
            return !(l || (l = e("lib/browser"))).isIE9 && o() || s()
        },
        webSocket: function () {
            return window.WebSocket
        },
        WebWorker: function () {
            return window.Worker
        },
        BlobBuilder: function () {
            return window.BlobBuilder
        },
        URL: function () {
            return window.URL
        },
        touch: function () {
            try {
                return window.hasOwnProperty("ontouchstart")
            } catch (e) {
                return !1
            }
        },
        typedArrays: function () {
            return window.hasOwnProperty("Uint8Array")
        },
        speech: function () {
            return "onwebkitspeechchange" in document.createElement("input")
        },
        pushState: function () {
            return window.history && window.history.pushState
        },
        formData: function () {
            return window.FormData
        },
        corsImg: function () {
            return !1
        },
        geolocation: function () {
            return "geolocation" in navigator
        },
        MutationObserver: function () {
            return window.MutationObserver
        },
        getUserMedia: function () {
            return navigator.getUserMedia
        }
    }, function (e, t, i) {
        return e[i] = !! t(), e
    }, {})
}),
define("lib/helpers/title-helper", [], function (e, t, i) {
    function n() {
        o()
    }

    function s(e) {
        r(e.sound)
    }

    function o() {
        u._setTitle((h ? h + " on " : "") + p)
    }

    function r(e) {
        var t = e.playlist;
        t ? l(t, e) : e.has("title") && e.has("user") ? a(e) : e.fetch().done(a.bind(!1, e))
    }

    function a(e) {
        return u._setTitle([f, e.get("title"), "by", e.get("user").username].join(" "))
    }

    function l(e, t) {
        u._setTitle([f, t.get("title"), "in", e.get("title")].join(" "))
    }
    var u, c, d, h, p = "SoundCloud - Hear the worldâ€™s sounds",
        f = "â–¶",
        g = !1;
    u = i.exports = {
        initialize: function () {
            g || (g = !0, (c || (c = e("event-bus"))).on("audio:play", s).on("audio:pause", n))
        },
        deinitialize: function () {
            g && (g = !1, (c || (c = e("event-bus"))).off("audio:play", s).off("audio:pause", n))
        },
        set: function (t) {
            var i = (d || (d = e("lib/play-manager"))).getCurrentSound(),
                n = !(i && i.isPlaying());
            h = t, n && o()
        },
        update: function () {
            var t = (d || (d = e("lib/play-manager"))).getCurrentSound();
            t && t.isPlaying() && r(t)
        },
        _setTitle: function (e) {
            document.title = e
        }
    }
}),
define("lib/helpers/upsell-helper", [], function (e, t, i) {
    function n(t) {
        var i = t === (o || (o = e("config"))).get("me").id,
            n = (r || (r = e("lib/connect"))).isLoggedIn();
        return i && n
    }
    var s, o, r, a, l, u, c, d, h = new(l || (l = e("lib/persistent-store")))("already-seen"),
        p = "listen-upsell",
        f = "stream-upsell",
        g = "user-upsell",
        m = "signup-teaser-modal",
        v = 4,
        b = 2;
    s = i.exports = {
        getUpsellableTrackCount: function () {
            return v
        },
        couldHaveUserUpsell: function (t) {
            return n(t) && !s.alreadySeenUserUpsell() && !(o || (o = e("config"))).get("me").isPremium()
        },
        isValidSound: function (t) {
            var i, n, s, r, a = (o || (o = e("config"))).get("me"),
                l = "sound" === t.resource_type;
            return l && !t.hasVisuals() && !a.isPremium() && a.get("track_count") >= v && a.owns(t) && (i = new Date(t.get("created_at")), n = Date.now(), s = new Date(n - 36e5), r = new Date(n - 6048e5), s >= i && i >= r) ? !0 : !1
        },
        isValidIndex: function (e, t) {
            return e > -1 && t.length >= v
        },
        isValidUserSounds: function (t) {
            var i = t.length && t.first().get("created_at"),
                n = new Date(i),
                s = (o || (o = e("config"))).get("me");
            return !s.isPremium() && t.length > v && n >= new Date(Date.now() - 6048e5) && n <= new Date(Date.now() - 864e5)
        },
        alreadySeenListenUpsell: function () {
            return 1 === h.get(p)
        },
        alreadySeenUserUpsell: function () {
            return 1 === h.get(f) ? (h.unset(f), this.dismissUserUpsell(), !0) : 1 === h.get(g)
        },
        dismissListenUpsell: function () {
            h.set(p, 1)
        },
        dismissUserUpsell: function () {
            h.set(g, 1)
        },
        startPlayTracking: function () {
            (r || (r = e("lib/connect"))).isLoggedIn() || (a || (a = e("event-bus"))).on("audio:play", this.onAudioPlay, this)
        },
        stopPlayTracking: function () {
            (a || (a = e("event-bus"))).off("audio:play", this.onAudioPlay, this)
        },
        onAudioPlay: function (t) {
            var i = (u || (u = e("lib/play-log"))).numSessionPlays(),
                n = 1 === h.get(m),
                s = t.userInitiated;
            !(r || (r = e("lib/connect"))).isLoggedIn() && !n && i > b && s && this.showSignupTeaser(t.sound.getUrn())
        },
        showSignupTeaser: function (t) {
            var i, n = (c || (c = e("lib/rollouts"))).get("signup_teaser");
            i = new(d || (d = e("views/modals/signup-teaser")))({
                version: n,
                width: 625,
                soundUrn: t
            }), i.open(), h.set(m, 1)
        }
    }
}),
define("lib/url", [], function (e, t, i) {
    var n, s, o, r, a, l, u = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        c = ["---", "scheme", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
    l = (r || (r = e("lib/support"))).pushState ? (s || (s = e("underscore"))).identity : function (e) {
        return e && e.replace(/#/, "")
    }, n = i.exports = {
        parse: function (e, t) {
            e = l(e);
            var i, s, o = u.exec(e),
                r = {};
            for (t || (t = c), i = 1; i < c.length; ++i)
                if (s = c[i], -1 !== t.indexOf(s) && (o[i] || "query" === s)) switch (s) {
                case "port":
                    r[s] = parseInt(o[i], 10);
                    break;
                case "path":
                    r[s] = o[i].split("/").map(decodeURIComponent).join("/");
                    break;
                case "query":
                    r[s] = n.parseQueryString(o[i]);
                    break;
                default:
                    r[s] = o[i]
                }
                return r
        },
        joinPath: function (e) {
            return e.filter(Boolean).map(encodeURIComponent).join("/")
        },
        parseQueryString: function (e) {
            var t = {};
            return e && e.replace(/([^?=&]+)(?:=([^&]*))?/g, function (e, i, n) {
                switch (i = decodeURIComponent(i), n = decodeURIComponent((n || "").replace(/\+/g, " ")), typeof t[i]) {
                case "object":
                    t[i].push(n);
                    break;
                case "undefined":
                    t[i] = n;
                    break;
                default:
                    t[i] = [t[i], n]
                }
            }), t
        },
        param: function (t, i) {
            i = i || {};
            var n = [],
                o = function (e, t) {
                    n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                }, r = function (t, n) {
                    (s || (s = e("underscore"))).isArray(n) ? n.forEach(function (e, n) {
                        r(t + "[" + ("object" == typeof e && i.jquerySerialize ? n : "") + "]", e)
                    }) : (s || (s = e("underscore"))).isObject(n) ? (s || (s = e("underscore"))).each(n, function (e, i) {
                        r(t + "[" + i + "]", e)
                    }) : o(t, n)
                };
            return (s || (s = e("underscore"))).each(t, function (e, t) {
                r(t, e)
            }), n.join("&").replace(/%20/g, "+")
        },
        stringify: function (t, i) {
            var o, r, l = [];
            return i && (r = n.parse(i), t.query && r.query && ((s || (s = e("underscore"))).extend(r.query, t.query), delete t.query), t = (s || (s = e("underscore"))).extend({}, r, t)), t.scheme && l.push(t.scheme + "://"), t.user && (l.push(t.user), t.password && l.push(":" + t.password), l.push("@")), t.host && l.push(t.host), t.port && l.push(":" + t.port), t.path && l.push("string" == typeof t.path ? t.path.split("/").map(encodeURIComponent).join("/") : n.joinPath(t.path)), o = a(t.query), o && l.push("?" + o), t.fragment && l.push("#" + t.fragment), l.join("")
        },
        modify: function (t, i) {
            var o = n.parse(t);
            return (s || (s = e("underscore"))).isFunction(i) ? o = i.call(null, o) : "object" == typeof i && (i.query && ((s || (s = e("underscore"))).extend(o.query, i.query), delete i.query), (s || (s = e("underscore"))).extend(o, i)), n.stringify(o)
        },
        getQueryParam: function (e, t) {
            return n.getQueryParams(t)[e]
        },
        getFragmentParam: function (t) {
            return (r || (r = e("lib/support"))).pushState ? n.parseQueryString(window.location.hash.substring(1))[t] : void 0
        },
        removeFragmentParam: function (e, t) {
            return t = t || window.location.href, t.replace(new RegExp("#(?:(.+)&?)?" + RegExp.escape(e) + "(?:=[^&]*(?:&|$))?"), "#$1").replace(/#$/, "")
        },
        normalize: function (t) {
            var i = (s || (s = e("underscore"))).defaults(n.parse(t), {
                scheme: "http"
            });
            return n.stringify(i)
        },
        getQueryParams: function () {
            var t, i;
            return function (s) {
                var o = s || ((r || (r = e("lib/support"))).pushState ? window.location.search : window.location.hash.replace(/^[^?]*/, ""));
                return o !== t && (t = o, i = n.parseQueryString(o)), i
            }
        }(),
        currentPath: function () {
            return (o || (o = e("lib/backbone"))).history ? "/" + (o || (o = e("lib/backbone"))).history.getFragment(null, null, !0) : ""
        }
    }, a = function (e) {
        var t, i, n, s, o, r = [];
        if (e)
            for (t in e)
                if (e.hasOwnProperty(t) && (s = e[t], null !== s && s !== o))
                    if ("object" == typeof s)
                        for (n = s.length, i = 0; n > i; ++i) r.push(encodeURIComponent(t) + "=" + encodeURIComponent(s[i]).replace(/%2F/g, "/"));
                    else r.push(encodeURIComponent(t) + "=" + encodeURIComponent(s).replace(/%2F/g, "/"));
        return r.join("&")
    }
}),
define("models/user", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d, h, p, f, g, m;
    n = i.exports = (c || (c = e("lib/model"))).extend(u || (u = e("lib/mixins/models/has-visuals")), h || (h = e("lib/mixins/models/shortenable")), (l || (l = e("lib/mixins/has-title"))).withOptions({
        attr: "username"
    }), (a || (a = e("lib/mixins/has-editable-image"))).withOptions({
        read: "avatar_url",
        write: "avatar_data"
    }), {
        resource_type: "user",
        urnPrefix: "soundcloud:users",
        _connections: null,
        setup: function () {
            this.id ? m.call(this, !0) : this.one("change:id", this.setup, this)
        },
        baseUrl: function () {
            var t = this.id;
            return t ? (p || (p = e("lib/url"))).stringify({
                path: ["users", t]
            }) : "you" === this.get("permalink") ? (p || (p = e("lib/url"))).stringify({
                path: "me"
            }) : void 0
        },
        onLikesChanged: function (e) {
            f.call(this, "likes_count", e.state)
        },
        hasLikes: function () {
            return this.get("likes_count") > 0 || this.get("public_favorites_count") > 0
        },
        hasPlaylists: function () {
            return this.get("playlist_count") > 0 || this.get("private_playlists_count") > 0
        },
        hasFollowings: function () {
            return this.get("followings_count") > 0
        },
        onFollow: function (e) {
            f.call(this, "followings_count", e.state)
        },
        onFollowed: function (e) {
            f.call(this, "followers_count", e.state)
        },
        onReposted: function (e) {
            f.call(this, "reposts_count", e.state)
        },
        onAudibleDelete: function (e) {
            var t = e.targetModel;
            "sound" === t.resource_type && this.adjustUploadSeconds(t)
        },
        onPlaylistCreate: function (e) {
            var t = "private" === e.object.get("sharing") ? "private_playlists_count" : "playlist_count";
            this.set(t, (this.get(t) || 0) + 1)
        },
        owns: function (e, t) {
            void 0 === t && (t = e, e = t.resource_type);
            var i, n = this.id;
            if (!n) return !1;
            switch (e) {
            case "comment":
            case "playlist":
            case "sound":
                return n === g(t, "user_id");
            case "group":
                return i = g(t, "creator"), !! i && n === i.id;
            case "user":
                return n === g(t, "id");
            case "sound-upload-edit":
            case "playlist-upload":
                return !0
            }
            return !1
        },
        canDownload: function (e) {
            return "sound" === e.resource_type && e.get("downloadable")
        },
        getPlan: function () {
            var e = this.get("subscriptions");
            return e && e[0] ? e[0].product.id : "free"
        },
        getPlanName: function () {
            var e = this.get("subscriptions");
            return e && e[0] ? e[0].product.name : "Free"
        },
        hasMonthlyPlan: function () {
            var e = this.get("subscriptions");
            return e && e[0] && e[0].recurring
        },
        isPremium: function () {
            return "free" !== this.getPlan()
        },
        hasProPlanLevel: function () {
            return 1 === this.getPerk("planLevel")
        },
        isCreatorPro: function () {
            var e = this.getPlan();
            return "creator-pro" === e || "creator-pro-unlimited" === e
        },
        getPerk: function (t) {
            var i = this.getPlan();
            if (i) return (d || (d = e("config/perks"))).get(i, t)
        },
        getShareURL: function () {
            var e = this.get("permalink_url");
            return e && (/^https/.test(e) ? e : e.replace(/^http/, "https"))
        },
        getPermalink: function () {
            return this.get("permalink_url").replace(/^https?:.+?\w\//, "/")
        },
        hasConnection: function (t) {
            var i = $.Deferred(),
                n = this === (r || (r = e("config"))).get("me") && !! this.id;
            return this._connections || !n ? i.resolve(n && this._connections.indexOf(t) > -1) : $.ajax({
                url: "me/connections",
                dataType: "json"
            }).done(function (e) {
                this._connections = e.map(function (e) {
                    return e.type
                }), i.resolve(this._connections.indexOf(t) > -1)
            }.bind(this)).fail(i.resolve.bind(i, !1)), i
        },
        getNumTracks: function () {
            return (this.get("track_count") || 0) + (this.get("private_tracks_count") || 0)
        },
        hasOwnSounds: function () {
            return !!(this.get("track_count") || this.get("private_tracks_count") || this.get("playlist_count") || this.get("private_playlists_count"))
        },
        hasSounds: function () {
            return !!(this.get("track_count") || this.get("private_tracks_count") || this.get("reposts_count") || this.get("playlist_count") || this.get("private_playlists_count"))
        },
        adjustUploadSeconds: function (e, t) {
            var i, n, s, o = e.get("duration");
            o && (i = Math.round(o / 1e3) * (t ? -1 : 1), n = this.getUploadSecondsLeft() + i, s = this.getUploadSecondsUsed() - i, this.setUploadSeconds(n, s))
        },
        setUploadSeconds: function (t, i) {
            var n = (s || (s = e("underscore"))).clone(this.get("quota"));
            n && (n.upload_seconds_used = i, n.unlimited_upload_quota || (n.upload_seconds_left = t), this.set("quota", n))
        },
        getUploadSecondsLeft: function () {
            var e = this.get("quota");
            return e ? e.unlimited_upload_quota ? 1 / 0 : e.upload_seconds_left : void 0
        },
        getUploadSecondsUsed: function () {
            var e = this.get("quota");
            return e ? e.upload_seconds_used : 0
        },
        hasUnlimitedUpload: function () {
            return 1 / 0 === this.getUploadSecondsLeft()
        },
        getUploadMinutesLeft: function () {
            var e = this.getUploadSecondsLeft();
            return (0 > e ? Math.floor : Math.ceil)(e / 60)
        },
        getUploadMinutesUsed: function () {
            return Math.round(this.getUploadSecondsUsed() / 60)
        },
        isOverQuota: function () {
            return this.getUploadSecondsLeft() < 0
        }
    }, {
        onCleanup: function (e) {
            m.call(e, !1)
        },
        resolve: function (t) {
            return "you" === t ? $.Deferred().resolve((r || (r = e("config"))).get("me")) : (c || (c = e("lib/model")))._resolve(this, t, function (e) {
                return e.get("permalink") === t
            })
        }
    }), g = function (e, t) {
        return e.get ? e.get(t) : e[t]
    }, f = function (e, t) {
        this.attrExists(e) && this.set(e, this.get(e) + (t ? 1 : -1))
    }, m = function (t) {
        var i = t ? "on" : "off";
        (o || (o = e("lib/action-controller")))[i]("follow:origin:user:" + this.id, this.onFollow, this)[i]("follow:target:user:" + this.id, this.onFollowed, this)[i]("like:origin:user:" + this.id, this.onLikesChanged, this)[i]("repost:origin:user:" + this.id, this.onReposted, this)[i]("destroy:origin:user:" + this.id, this.onAudibleDelete, this)[i]("createPlaylist:origin:user:" + this.id, this.onPlaylistCreate, this)
    }
}),
define("lib/tracking", [], function (e, t, i) {
    function n(e, t) {
        return t = t || "subpage", e && e[t] ? e[t] : "main"
    }

    function s(t, i) {
        var s = (A || (A = e("lib/url"))).getQueryParam("in", i),
            o = ["sounds"];
        return o.push(s ? ["sets", "sets/track_page"] : t.playlistPermalink ? ["sets", "sets/" + n(t)] : ["sounds", "sounds/" + n(t)]), o
    }

    function o(t) {
        var i = (k || (k = e("config"))).get("me").attributes;
        return i.permalink === t.userPermalink ? ["you", ["you", "you/" + n(t)]] : ["users", ["users", "users/" + n(t)]]
    }

    function r(e) {
        var t = e.user;
        return e.type = "user", e.userPermalink = t.get("permalink"), e.userId = t.id, e
    }

    function a(e) {
        var t = e.audible,
            i = "sound" === t.resource_type;
        return e.type = t.resource_type, e.userId = t.get("user_id"), i ? e.soundId = t.id : (e.playlistId = t.id, e.playlistPermalink = t.get("permalink")), e
    }

    function l(t) {
        var i = {}, n = {
                type: "x11",
                userId: "x12",
                soundId: "x13",
                playlistId: "x14"
            };
        return (_ || (_ = e("underscore"))).each(n, function (e, n) {
            t.hasOwnProperty(n) && (i[e] = t[n])
        }), i
    }

    function u(e) {
        b.trackClick(["add_to_set", e.state ? "add" : "remove", e.origin])
    }

    function c(e) {
        m(e) && b.trackClick(["add_to_set", "create_new", e.object.id])
    }

    function d(e) {
        b.trackClick(["add_to_group", e.state ? "add" : "remove", e.origin])
    }

    function h(e) {
        m(e) && b.trackClick([e.state ? "like" : "unlike", e.target, e.targetType], e)
    }

    function p(e) {
        e.target && (e.params = {
            followed_user: "soundcloud:user:" + e.target
        }), m(e) && b.trackClick([e.state ? "follow" : "unfollow", e.target], e)
    }

    function f(e) {
        m(e) && b.trackClick(["repost", e.state ? "post" : "unpost", e.target, e.targetType], e)
    }

    function g(e) {
        m(e) && b.trackClick(["join", e.state ? "join_group" : "leave_group", e.target], e)
    }

    function m(t) {
        return "user" === t.originType && t.origin === (k || (k = e("config"))).get("me").id
    }

    function v(t, i) {
        var u, c, d, h, p, f, g, m, v, _, y, C, T, E, D;
        switch (t) {
        case "connect:hasUserData":
            b.setCustomVariables();
            break;
        case "tracking:playStart":
        case "tracking:pause":
        case "tracking:finish":
            b.trackAudioEvent(i);
            break;
        case "tracking:audioPerformance":
            (w || (w = e("lib/analytics"))).trackAudioPerformance(i);
            break;
        case "tracking:impression":
            b.trackImpression(null, i);
            break;
        case "tracking:tag-suggester:impression":
            b.trackImpression(["tagSuggester", "impression"], i);
            break;
        case "tracking:user-upsell:click":
            b.trackClick(["upsell_teaser_user", "click"], i);
            break;
        case "tracking:user-upsell:dismiss":
            b.trackClick(["upsell_teaser_user", "dismiss"], i);
            break;
        case "tracking:user-upsell:impression":
            b.trackImpression(["upsell_teaser_user", "impression"], i);
            break;
        case "tracking:listen-upsell:click":
            b.trackClick(["upsell_teaser_listen", "click"], i);
            break;
        case "tracking:listen-upsell:dismiss":
            b.trackClick(["upsell_teaser_listen", "dismiss"], i);
            break;
        case "tracking:listen-upsell:impression":
            b.trackImpression(["upsell_teaser_listen", "impression"], i);
            break;
        case "tracking:signup-teaser:impression":
            b.trackImpression(["signup-teaser", "impression"], i);
            break;
        case "tracking:signup-teaser:eligible":
            b.trackImpression(["signup-teaser", "eligible"], i);
            break;
        case "tracking:signup-teaser:dismiss":
            b.trackClick(["signup-teaser", "dismiss"], i);
            break;
        case "tracking:search":
            b.trackPageView("search", ["search", "search/" + i.category], {
                mc: i.query,
                np: i.page
            });
            break;
        case "tracking:userLayout":
            i = r(i), _ = o(i), C = l(i), b.trackPageView(_[0], _[1], C);
            break;
        case "tracking:listenLayout":
            i = a(i), y = s(i), C = l(i), b.trackPageView(y[0], y[1], C);
            break;
        case "tracking:shuffle":
            b.trackClick(["shuffle"]);
            break;
        case "new-message:sent":
            b.trackClick(["messages", "new-message-sent"], i);
            break;
        case "messages:write-new":
            b.trackClick(["messages", "write-new-clicked"], i);
            break;
        case "messages:close-overlay":
            b.trackClick(["messages", "overlay-clicked"], i);
            break;
        case "messages:add-track":
            b.trackClick(["messages", "track-added"], i);
            break;
        case "messages:new-message-validation-error":
            b.trackClick(["messages", "new-message-validation-error"], i);
            break;
        case "tracking:stats":
            b.trackStats(i);
            break;
        case "tracking:unauthenticated-access":
            b.trackClick(["unauthenticated-access"]);
            break;
        case "tracking:add_to_set:confirmation":
            b.trackClick(["add_to_set", "confirmation", i ? "ok" : "cancel"]);
            break;
        case "tracking:add_to_set:go_to_playlist":
            b.trackClick(["add_to_set", "go_to_new"]);
            break;
        case "tracking:add_to_set:main":
            b.trackClick(["add_to_set", "main"]);
            break;
        case "tracking:add_to_set:validation":
            b.trackClick(["add_to_set", "validation"]);
            break;
        case "tracking:add_to_set:suggestion":
            b.trackClick(["add_to_set", "suggestion", i ? "add" : "remove"]);
            break;
        case "tracking:add_to_set:sharing":
            b.trackClick(["add_to_set", "sharing", i ? "public" : "private"]);
            break;
        case "tracking:group:moderate":
            b.trackClick(["group", "moderate"]);
            break;
        case "tracking:group:edit":
            b.trackClick(["group", "edit"]);
            break;
        case "layout:change":
            switch ((x || (x = e("vendor/includes/comscore"))).include(), d = i.args, i.layoutName) {
            case "stream":
            case "activity":
                b.trackPageView("stream", ["stream", "stream/" + ("stream" === i.layoutName ? "main" : i.layoutName)]);
                break;
            case "user":
            case "user-network":
                break;
            case "listen":
            case "listen-network":
                break;
            case "tags":
                b.trackPageView("tags", ["tags", "tags/main"]);
                break;
            case "search":
                break;
            case "onboarding":
                b.trackPageView("onboarding", ["onboarding", "onboarding/" + n(d, "step")]);
                break;
            case "premium":
                !d || d.secondary && "gifts" !== d.secondary || (E = (A || (A = e("lib/url"))).getQueryParam("ref"), b.trackPageView("premium", ["premium", (A || (A = e("lib/url"))).stringify({
                    path: ["premium", "main", d.secondary, E]
                })]));
                break;
            case "group":
            case "group-network":
                b.trackPageView("group", ["groups", "groups/" + n(d)], {
                    pageVariable: d.groupPermalink
                });
                break;
            case "explore":
                b.trackPageView("explore", ["explore", "explore/" + n(d, "category")]);
                break;
            case "upload":
                b.trackPageView("upload", ["upload", "upload/main"]);
                break;
            case "people":
                D = n(d, "tab"), b.trackPageView("people_" + D, ["people", "people/" + D]);
                break;
            case "home":
                b.trackPageView("homepage", ["home", "home/main"]);
                break;
            case "inbox":
                b.trackPageView("messages", ["messages", n(d, "conversationId")]);
                break;
            case "stats":
            case "track-stats":
                b.trackPageView("stats", ["default", window.location]);
                break;
            case "error":
                b.trackPageView("error", ["error"]);
                break;
            case "logout":
                b.trackPageView("logout");
                break;
            case "static-page":
                b.trackPageView("static", ["static", n(d, "pageName")]);
                break;
            case "creators":
                b.trackPageView("static", ["static", "creators/main"]);
                break;
            case "mobile-apps":
                b.trackPageView("static", ["static", "mobile/main"]);
                break;
            default:
                b.trackPageView("default", ["default", window.location])
            }
            break;
        case "exception":
            h = i.get("xhr"), g = i.get("streamInfo"), g ? (m = i.get("errorCode"), v = {
                protocol: g.protocol || "undefined-protocol",
                browser: (S || (S = e("lib/helpers/environment-helper"))).getBrowser(),
                flash: (S || (S = e("lib/helpers/environment-helper"))).getFlashPlugin(),
                os: (S || (S = e("lib/helpers/environment-helper"))).getOperatingSystem(),
                bitrate: g.bitrate || "undefined-bitrate",
                format: g.extension || "undefined-extension",
                url: g.url || "undefined-url"
            }, m && (v.errorCode = m), b.trackAudioError(v)) : h || b.trackAppError(i);
            break;
        case "header-more:open":
            b.trackClick(["header", "more"], i);
            break;
        case "header-profile:open":
            b.trackClick(["header", "you_main"], i);
            break;
        case "header-activities:open":
            b.trackClick(["header", "activity", "main"], i);
            break;
        case "header-messages:open":
            b.trackClick(["header", "messages", "main"], i);
            break;
        case "header-search:open":
            b.trackClick(["header", "search", "main"], i);
            break;
        case "header:volume":
            b.trackClick(["header", "volume"], i);
            break;
        case "connect:logout":
            b.trackClick(["header", "you_log_out"], i);
            break;
        case "share:main":
        case "share:link":
        case "share:widget":
        case "share:email":
        case "share:googleplus":
        case "share:wordpress":
        case "share:twitter":
        case "share:thisismyjam":
        case "share:facebook":
        case "share:tumblr":
        case "share:pinterest":
        case "share:weibo":
        case "share:vkontakte":
        case "share:mixi":
        case "share:tuenti":
            u = t.split(":"), b.trackClick([u[0], u[1], i.id, i.type], i);
            break;
        case "upload:share:twitter":
        case "upload:share:facebook_profile":
        case "upload:share:tumblr":
            u = t.split(":"), b.trackClick([u[0], u[1], u[2], i.id, i.type], i);
            break;
        case "commentForm:canceled":
        case "commentForm:focused":
            u = t.split(":")[1].replace("canceled", "cancel").replace("focused", "click"), b.trackClick(["comment", u], i);
            break;
        case "commentForm:posted":
            b.trackClick(["comment", "post"], i);
            break;
        case "delete-audible":
        case "delete-audible:hidden":
            b.trackClick(["delete", "audible", t.split(":")[1]]);
            break;
        case "shortcut:click":
            f = arguments[1], c = f ? f.get("kind") : "search", b.trackClick(["search", "shortcut", arguments[2], c], i);
            break;
        case "premium:pageView":
            p = arguments[1], b.trackPageView("premium", ["premium", p]);
            break;
        case "premium:started":
            p = arguments[1], T = arguments[2] || "", b.trackClick(["premium", "started/" + p, T], i);
            break;
        case "signup:successful":
        case "login:successful":
        case "login:failed":
            b.trackClick(t.split(":"), i);
            break;
        case "onboarding:facebook":
            p = arguments[1], b.trackClick(["onboarding", "facebook_followed", p.total], i), b.trackClick(["onboarding", "facebook_friends_followed", p.friends[0]], i), b.trackClick(["onboarding", "facebook_likes_followed", p.likes[0]], i), b.trackClick(["onboarding", "facebook_friends_showed", p.friends[1]], i), b.trackClick(["onboarding", "facebook_likes_showed", p.likes[1]], i), b.trackClick(["onboarding", "facebook_friends_ratio", p.friends[2]], i), b.trackClick(["onboarding", "facebook_likes_ratio", p.likes[2]], i);
            break;
        case "onboarding:suggested_followed":
        case "onboarding:genres_selected":
            b.trackClick(["onboarding", t.split(":")[1], arguments[1]], i);
            break;
        case "onboarding:suggested_genre_ratio":
            b.trackClick(["onboarding", arguments[1], arguments[2]], i);
            break;
        case "upload_group:single":
        case "upload_group:multiple:grouped":
        case "upload_group:multiple:ungrouped":
        case "upload_funnel:upload_button_header":
        case "upload_funnel:start:filepicker":
        case "upload_funnel:start:dragdrop":
        case "upload_funnel:upload_done":
        case "upload_funnel:transcoding_done":
        case "upload_funnel:complete":
        case "upload_funnel:cancel":
        case "upload_funnel:failed:uploading":
        case "upload_funnel:failed:transcoding":
        case "upload_funnel:save":
            b.trackClick(t.split(":"), i);
            break;
        case "upload:image:click":
        case "upload:image:drag":
        case "upload:image:upload_started":
        case "upload:image:upload_success":
            u = t.split(":"), i && u.push(i), b.trackClick(u);
            break;
        case "image:zoom":
            u = t.split(":"), i && u.push(i), b.trackClick(u);
            break;
        case "purchase:click":
            b.trackClick(["purchase", arguments[2], arguments[3], arguments[4]], i);
            break;
        case "download:click":
            b.trackClick(["download", arguments[2]], i);
            break;
        case "tracking:go_mobile":
            p = arguments[1], b.trackClick(["go_mobile", p.action, p.location, p.abtest_identifier, p.platform], i);
            break;
        case "tracking:visualprofile:deeplink":
            b.trackClick(["deeplink"], i);
            break;
        case "tagSuggester:save":
        case "tagSuggester:cancel":
            b.trackClick(t.split(":"), i);
            break;
        case "userSuggestion:close":
            f = i.model, b.trackClick(["dismiss", f.id], {
                origin: (k || (k = e("config"))).get("me").id,
                originType: "user",
                target: f.id,
                targetType: "user",
                context: arguments[2],
                params: {
                    dismissed_user: "soundcloud:user:" + f.id
                }
            });
            break;
        case "tracking:showOldStats":
            b.trackStatsClick("classic_stats");
            break;
        case "tracking:expandStats":
            b.trackStatsClick("expand_stats_view")
        }
    }
    var b, _, y, w, x, k, S, C, T, E, A, D, I, P, M, N, L, F, O = .15,
        R = 0,
        U = {}, z = {};
    I = function (t) {
        var i = (k || (k = e("config"))).get("me"),
            n = t && t.args;
        return n && i.id && i.get("permalink") === n.userPermalink
    }, P = function () {
        if ("/welcome" === window.location.pathname && (A || (A = e("lib/url"))).getQueryParam("ob_source")) {
            var t = new Date;
            return t.format().replace(/\//g, "")
        }
        return 0
    }, M = function () {
        return (k || (k = e("config"))).get("me").id || null
    }, N = {
        listen: "sounds",
        "listen-network": "sounds",
        activity: "stream",
        stream: "stream",
        user: "users",
        "user-network": "users",
        tags: "tags",
        search: "search",
        you: "you",
        explore: "explore",
        group: "group",
        home: "homepage",
        premium: "premium",
        people: "people",
        creators: "homepage",
        upload: "upload",
        inbox: "messages",
        onboarding: "onboarding"
    }, L = {
        Anonymous: 99,
        free: 0,
        solo: 1,
        pro: 2,
        "pro-plus": 4,
        lite: 8,
        "creator-pro": 16,
        "creator-pro-unlimited": 32
    }, b = i.exports = {
        initialize: function () {
            this.setCustomVariables(), (_ || (_ = e("underscore"))).defer((w || (w = e("lib/analytics"))).initialize.bind(w || (w = e("lib/analytics")))), D(!0)
        },
        destroy: function () {
            D(!1)
        },
        trackPageView: function (t, i, n) {
            var s = (_ || (_ = e("underscore"))).compact(i || []),
                o = M();
            (w || (w = e("lib/analytics"))).trackPageView(t, s, o, n)
        },
        trackAudioEvent: function (t) {
            var i, r, a = t.sound,
                l = M(),
                u = (E || (E = e("lib/play-manager"))).getCurrentMetadata(),
                c = u.layoutInfo,
                d = (k || (k = e("config"))).get("router").getLayoutInfo(),
                h = I(c) ? "you" : c.layoutName,
                p = I(d) ? "you" : d.layoutName,
                f = c.args,
                g = N[h],
                m = t.type.replace("finish", "stop").replace("playStart", "play"),
                v = (T || (T = e("lib/math"))).precise(a.duration() / 1e3, 1),
                b = (T || (T = e("lib/math"))).precise(v / 4, 1),
                _ = a.get("permalink_url"),
                y = "sound::" + _,
                x = "sounds",
                S = "sound::" + window.location.href,
                C = N[p],
                D = "play" === m ? u.sourceInfo : null,
                P = t.userInitiated ? "manual" : "auto",
                L = a.audio && a.audio.streamInfo && a.audio.streamInfo.protocol;
            switch (c.layoutName) {
            case "user":
            case "userNetwork":
                i = o(f)[1][1];
                break;
            case "listen":
            case "listenNetwork":
                i = s(f, c.url)[1][1];
                break;
            case "explore":
                i = c.layoutName + "/" + n(f, "category");
                break;
            default:
                i = c.layoutName + "/" + n(f)
            }
            r = ["sound", i, (A || (A = e("lib/url"))).parse(_).path].join("::"), (w || (w = e("lib/analytics"))).trackAudioEvent({
                level: g,
                action: m,
                steps: b,
                duration: v,
                soundChapter: y,
                soundLevel: x,
                contextPage: S,
                contextLevel: C,
                sound: a,
                user: l,
                ATIchapter: r,
                sourceInfo: D,
                trigger: P,
                protocol: L
            })
        },
        trackClick: function (t, i) {
            var n = (k || (k = e("config"))).get("router").getLayoutInfo(),
                s = M(),
                o = (_ || (_ = e("underscore"))).compact(t),
                r = n && n.layoutName || "user",
                a = I(n) ? "you" : r,
                l = N[a];
            (w || (w = e("lib/analytics"))).trackClick(l, o, s, i)
        },
        trackImpression: function (t, i) {
            var n, s = (k || (k = e("config"))).get("router").getLayoutInfo(),
                o = s && s.layoutName || "user",
                r = I(s) ? "you" : o,
                a = M(),
                l = N[r],
                u = i.urn,
                c = i.originView,
                d = (_ || (_ = e("underscore"))).compact(t);
            i.useAudioFinishHandler ? (z[c] || (z[c] = {}), z[c][u] || (n = function (t) {
                var s = parseInt(i.urn.split(":").pop(), 10),
                    o = t.sound.id;
                s === o && (delete z[c][u], (C || (C = e("event-bus"))).off("audio:finish", n))
            }, z[c][u] = !0, (C || (C = e("event-bus"))).on("audio:finish", n), (w || (w = e("lib/analytics"))).trackImpression(l, d, a, i))) : (w || (w = e("lib/analytics"))).trackImpression(l, d, a, i)
        },
        trackStats: function (t) {
            (w || (w = e("lib/analytics"))).trackStats(M(), t)
        },
        trackStatsClick: function (t) {
            var i = "stats",
                n = M(),
                s = [t],
                o = (k || (k = e("config"))).get("router").getLayoutInfo().layoutName,
                r = {
                    stats: "main",
                    "track-stats": "track"
                }, a = {
                    context: {
                        scope: ["stats", r[o]]
                    }
                };
            (w || (w = e("lib/analytics"))).trackClick(i, s, n, a)
        },
        startTiming: function () {
            return R++, U[R] = Date.now(), R
        },
        endTiming: function (e, t) {
            var i, n;
            i = U[e], i && (n = Date.now() - i, b.trackTiming(t.category, t.variable, n, t.label)), b.clearTiming(e)
        },
        clearTiming: function (e) {
            delete U[e]
        },
        trackTiming: function (t, i, n, s) {
            (w || (w = e("lib/analytics"))).trackTiming(t, i, n, s, 10)
        },
        trackAudioError: function (t) {
            (w || (w = e("lib/analytics"))).trackAudioError(t)
        },
        trackAppError: function (t) {
            var i = t.get("message");
            F(i) && (w || (w = e("lib/analytics"))).trackAppError(t)
        },
        setCustomVariables: function () {
            var t = (k || (k = e("config"))).get("me"),
                i = t.attributes;
            (w || (w = e("lib/analytics"))).setCustomVariables({
                    id: i.id,
                    plan: L[i.id ? t.getPlan() : "Anonymous"],
                    customs: {
                        track_count: i.track_count,
                        likes_count: i.likes_count,
                        comments_count: i.comments_count,
                        followings_count: i.followings_count,
                        followers_count: i.followers_count,
                        reposts_count: i.reposts_count,
                        playlist_count: i.playlist_count,
                        onboarded_on: P()
                    }
                })
        }
    }, D = function () {
        var t;
        return t = (_ || (_ = e("underscore"))).map({
            ".header__logoLink": ["header", "logo"],
            ".header__mainMenu-home": ["header", "home"],
            ".header__mainMenu-stream": ["header", "stream"],
            ".header__mainMenu-explore": ["header", "explore"],
            '.moreMenu__link[href$="/community-guidelines"]': ["header", "community_guidelines"],
            '.moreMenu__link[href$="/terms-of-use"]': ["header", "terms_of_use"],
            '.moreMenu__link[href$="/creators"]': ["header", "creators"],
            '.moreMenu__link[href$="/pages/privacy"]': ["header", "privacy_policy"],
            '.moreMenu__link[href$="/pages/copyright"]': ["header", "copyright_information"],
            '.moreMenu__link[href$="/imprint"]': ["header", "company_information"],
            '.moreMenu__link[href$="/pages/contact"]': ["header", "about_us"],
            '.moreMenu__link[href="http://blog.soundcloud.com"]': ["header", "blog"],
            '.moreMenu__link[href="http://soundcloud.com/jobs"]': ["header", "jobs"],
            '.moreMenu__link[href="http://developers.soundcloud.com"]': ["header", "developers"],
            '.moreMenu__link[href="http://help.soundcloud.com"]': ["header", "help"],
            ".moreMenu__keyboard": ["header", "keyboard_shortcuts"],
            ".moreMenu__classic": ["header", "classic_switch"],
            ".profileMenu__profile": ["header", "you", "profile"],
            ".profileMenu__likes": ["header", "you", "likes"],
            ".profileMenu__following": ["header", "you", "following"],
            ".profileMenu__sets": ["header", "you", "sets"],
            ".profileMenu__stats": ["header", "you", "stats"],
            ".profileMenu__groups": ["header", "you", "groups"],
            ".profileMenu__friends": ["header", "you", "who_to_follow"],
            ".profileMenu__settings": ["header", "you", "settings"],
            ".profileMenu__logout": ["header", "you", "logout"],
            ".header__playbackTitle .playbackTitle": ["header", "controls", "title"],
            ".header__playbackControls .playControl:not(.playing)": ["header", "controls", "pause"],
            ".header__playbackControls .playControl.playing": ["header", "controls", "play"],
            ".header__playbackControls .skipControl__previous": ["header", "controls", "skip_back"],
            ".header__playbackControls .skipControl__next": ["header", "controls", "skip_forward"],
            ".moreMenu__link.outgoing-classic": ["outgoing", "switch_to_classic"],
            ".header__inner a.outgoing-messages": ["outgoing", "messages"],
            ".header__inner a.outgoing-record": ["outgoing", "record"],
            ".chooser__record": ["outgoing", "record"],
            ".profileMenu a.outgoing-settings": ["outgoing", "settings"],
            ".profileMenu a.outgoing-stats": ["outgoing", "you_stats"],
            ".statsModule a.outgoing-stats-module": ["outgoing", "all_stats"],
            ".userInfo a.sc-button-message": ["outgoing", "new_message"],
            ".whoToFollowModule a.refresh-wtf": ["outgoing", "who_to_follow_refresh"],
            ".soundActions__edit": ["edit", "main"],
            ".latestActivities__viewAll": ["header", "activity", "view_all"],
            ".headerMessages__viewAll": ["header", "messages", "view_all"],
            ".search button.search__submit": ["search", "results", "search"],
            ".listenContent__inner .listenContent__parentLink a": ["sets", "trackview", "set_button"],
            ".listenContent__inner a.listenContent__prevLink": ["sets", "trackview", "previous_track"],
            ".listenContent__inner a.listenContent__nextLink": ["sets", "trackview", "next_track"],
            ".explore__bucket .carousel__next": ["explore", "skip_next"],
            ".explore__bucket .carousel__prev": ["explore", "skip_prev"],
            ".signupButton": ["signup", "start"],
            ".loginButton": ["login", "start"],
            ".header__login": ["login", "start"],
            ".header__loginMenu .header__login": ["header", "login"],
            ".header__loginMenu .signupButton": ["header", "signup"]
        }, function (e, t) {
            return ["click", t, function (t) {
                b.trackClick(e, t)
            }]
        }),
        function (i) {
            var n = i ? "on" : "off";
            (y || (y = e("lib/action-controller")))[n]("like", h)[n]("addToPlaylist", u)[n]("createPlaylist", c)[n]("addToGroup", d)[n]("follow", p)[n]("repost", f)[n]("join", g), (C || (C = e("event-bus")))[n]("all", v), t.forEach(function (e) {
                this[n].apply(this, e)
            }, $(document))
        }
    }(), F = function () {
        function e(e) {
            return this.message.indexOf(e) > -1
        }
        var t = ["top.GLOBALS", "originalCreateNotification", "canvas.contentDocument", "MyApp_RemoveAllHighlights", "http://tt.epicplay.com", "Can't find variable: ZiteReader", "jigsaw is not defined", "ComboSearch is not defined", "http://loading.retry.widdit.com/", "atomicFindClose", "fb_xd_fragment", "Script error.", "stopAudioAdsTimer", "ReferenceError: Can't find variable: dzPlayer", "Attempting to use a disconnected port object", "TopLine is not defined", "has no method 'UpdatePanels'", "Error connecting to extension", "PCG_searchParentNodeClass", "ModuleSystem has been deleted", "Verif is not defined", "SCD_main", "executeScript", "dpQuery", "uplListener"];
        return function (i) {
            return Math.random() < O && !t.some(e, {
                message: i
            })
        }
    }()
}),
define("lib/integrations/adswizz", [], function (e, t, i) {
    function n(e) {
        var t = new Image;
        t.src = e
    }
    var s, o, r, a, l = {
            addToSet: "add_to_set_click",
            follow: "follow_click",
            like: "like_click",
            play: "sound_play",
            skip: "sound_skip",
            finish: "sound_finish",
            impression: "impression",
            repost: "repost_click",
            share: "share_click",
            adClick: "ad_click",
            soundClickThrough: "sound_click",
            userClickThrough: "profile_click",
            purchaseClickThrough: "purchase_click"
        };
    s = i.exports = {
        zones: {
            suggestedUsers: "1",
            search: "2",
            audioAds: "18",
            displayAds: "21"
        },
        getAdUrl: function (t, i) {
            return (a || (a = e("lib/url"))).modify((r || (r = e("config"))).get("promotedContentServer"), {
                query: (o || (o = e("underscore"))).extend({
                    access_token: (r || (r = e("config"))).get("promotedContentAccessToken"),
                    zoneid: s.zones[t],
                    user_urn: (r || (r = e("config"))).get("me").getUrn()
                }, i)
            })
        },
        trackEvent: function (e, t) {
            s.getTrackingUrls(e, t).forEach(n)
        },
        getTrackingUrls: function (t, i) {
            var n = i && i.tracking && i.tracking[l[t]] || [];
            return (o || (o = e("underscore"))).isArray(n) ? n : [n]
        }
    }
}),
define("models/audio-ad", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c;
    n = i.exports = (a || (a = e("lib/model"))).extend({
        resource_type: "audio_ad",
        submodelMap: {
            sound: l || (l = e("models/sound")),
            user: c || (c = e("models/user"))
        },
        baseUrl: function () {
            return (u || (u = e("lib/url"))).modify((r || (r = e("config"))).get("promotedContentServer"), {
                query: {
                    access_token: (r || (r = e("config"))).get("promotedContentAccessToken"),
                    sound_urn: "soundcloud:sounds:" + this.resource_id,
                    user_urn: (r || (r = e("config"))).get("me").getUrn(),
                    zoneid: (o || (o = e("lib/integrations/adswizz"))).zones.audioAds
                }
            })
        },
        createSubmodel: function (t, i) {
            var n;
            "sound" === i ? (n = this.get("sound"), this.sound = new(l || (l = e("models/sound")))((s || (s = e("underscore"))).extend(n, {
                resource_id: {
                    ad_target_id: this.resource_id,
                    sound_id: n.id
                }
            }))) : (a || (a = e("lib/model"))).prototype.createSubmodel.apply(this, arguments)
        },
        parse: function (t) {
            var i = (s || (s = e("underscore"))).first(t.promoted),
                n = {};
            return i && (n.sound = i.data, n.user = i.promoted_by_user, n.tracking = i.tracking, n.context = i.context), n
        }
    })
}),
define("lib/circuit-breaker", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = Class.extend({
        enabled: !0,
        _breakCount: 0,
        _failCount: 0,
        _maxBreaks: 0,
        _timeoutId: null,
        defaults: {
            tolerance: 1,
            baseDelay: 1e3,
            maxDelay: 3e4,
            backoffRate: 2,
            giveUp: null,
            enabled: !0
        },
        initialize: function (t) {
            (s || (s = e("underscore"))).bindAll(this, "failed", "succeeded"), this.setup(t)
        },
        setup: function (t) {
            this.options = (s || (s = e("underscore"))).extend({}, this.options || this.defaults, t), t = (s || (s = e("underscore"))).defaults(this.options, this.defaults);
            var i = t.maxDelay / t.baseDelay;
            if (t.backoffRate > 1)
                for (; i > 1;)++this._maxBreaks, i /= t.backoffRate;
            else this._maxBreaks = 1 / 0;
            t.enabled || this.disable()
        },
        dispose: function () {
            this.off(), this.clearTimeout()
        },
        clearTimeout: function () {
            this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null)
        },
        failed: function () {
            ++this._failCount >= this.options.tolerance && this.disable()
        },
        succeeded: function () {
            this._breakCount = this._failCount = 0
        },
        disable: function (e) {
            if (this.enabled) {
                var t = !e || e.autoEnable !== !1;
                this.enabled = !1, ++this._breakCount, t && (!this.options.giveUp || this._breakCount < this.options.giveUp) ? this._timeoutId = setTimeout(this.enable.bind(this), this.currentDelay()) : this.trigger("giveup"), this.trigger("disabled")
            }
        },
        enable: function () {
            this.enabled || (this.enabled = !0, this._failCount = 0, this.trigger("enabled"))
        },
        currentDelay: function () {
            var e = this.options;
            return Math.min(e.baseDelay * Math.pow(e.backoffRate, Math.floor(Math.random() * Math.min(this._maxBreaks, this._breakCount))), e.maxDelay)
        }
    }), (s || (s = e("underscore"))).extend(n.prototype, (o || (o = e("lib/backbone"))).Events)
}),
define("lib/play-log", [], function (e, t, i) {
    function n() {
        var e, t, i, s = Math.floor(y.getListenTime() - w),
            a = h._persistent,
            l = h._session,
            u = y.id,
            c = y.duration();
        s >= Math.min(c, b) && (t = a.get("log") || [], i = l.get("log") || [], r(a, u, c, y.get("user_id")), r(l, u, c, y.get("user_id")), e = [u, s, x.userInitiated ? 1 : 0, Date.now()], t.push(e), i.push(e), o(t, a), o(i, l)), y.off("pause", n).release(), y = w = null
    }

    function s(e) {
        return function (t) {
            return t[0] === e
        }
    }

    function o(e, t) {
        for (var i; e.length > v;) i = e.shift(), e.some(s(i[0])) || t.unset(i[0], k);
        t.set("log", e)
    }

    function r(e, t, i, n) {
        e.has(t) || e.set(t, [i, n], k)
    }

    function a(e, t) {
        for (var i = 0, n = e.length; n > i; ++i)
            if (e[i][S] === t[S]) return i;
        return -1
    }

    function l(e, t) {
        var i, n = a(e, t);
        return n > -1 ? (i = e[n], i[C] += t[C], i[T] = i[T] || t[T]) : e.unshift(t.slice()), e
    }

    function u() {
        h._persistent.reset(), h._session.reset()
    }

    function c(e, t) {
        return e / t >= _
    }

    function d(t) {
        var i = this.get(t[S]);
        return (p || (p = e("underscore"))).object(Object.keys(I).concat(Object.keys(P)), t.concat(i))
    }
    var h, p, f, g, m, v = 250,
        b = 2e3,
        _ = .25,
        y = null,
        w = null,
        x = null,
        k = {
            dontPersist: !0
        }, S = 0,
        C = 1,
        T = 2,
        E = 3,
        A = 0,
        D = 1,
        I = {
            id: S,
            playTime: C,
            userInitiated: T,
            timestamp: E
        }, P = {
            duration: A,
            userId: D
        }, M = {
            field: null,
            from: "global",
            id: null,
            unique: !1,
            playState: null,
            userInitiated: null,
            filter: null,
            newestFirst: !1,
            limit: !1
        };
    (f || (f = e("event-bus"))).on("connect:logout", u), h = i.exports = {
            _persistent: new(g || (g = e("lib/persistent-store")))("play-log"),
            _session: new(m || (m = e("lib/store"))),
            addSound: function (e, t) {
                y && n(), y = e, w = e.getListenTime(), x = t || {}, e.on("pause", n).hold()
            },
            select: function (t) {
                t = (p || (p = e("underscore"))).extend({}, M, t);
                var i = this["session" === t.from ? "_session" : "_persistent"],
                    n = i.get("log") || [];
                return t.id ? n = n.filter(function (e) {
                    return e[S] === t.id
                }) : t.userId && (n = n.filter(function (e) {
                    return i.get(e[S])[D] === t.userId
                })), t.unique && (n = n.reduceRight(l, [])), n = n.filter(function (e) {
                    return null != t.userInitiated && e[T] != t.userInitiated ? !1 : "played" !== t.playState || c(e[C], i.get(e[S])[A]) ? t.filter ? t.filter.apply(null, e) : !0 : !1
                }), t.newestFirst && n.reverse(), t.limit && n.length > t.limit && (n = n.slice(0, t.limit)), n = t.field ? (p || (p = e("underscore"))).pluck(n, I[t.field]) : n.map(d, i)
            },
            count: function (e) {
                return this.select(e).length
            },
            numSessionPlays: function () {
                return this.count({
                    from: "session",
                    unique: !0,
                    playState: "played"
                })
            },
            getPlayedIds: function () {
                return this.select({
                    field: "id",
                    from: "persistent",
                    unique: !0,
                    playState: "played"
                })
            }
    }
}),
define("lib/views/dialog", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (r || (r = e("lib/view"))).extend(o || (o = e("lib/mixins/views/overlay")), {
        css: e("lib/views/dialog.css"),
        template: e("lib/views/dialog.tmpl"),
        className: "dialog sc-border-box g-z-index-overlay",
        defaults: {
            text: null,
            smallText: !1,
            extraClassNames: "rounded",
            margin: 10
        },
        element2selector: {
            content: ".dialog__content",
            arrow: ".dialog__arrow"
        },
        states: {
            smallText: "smallText"
        },
        getOverlayContentEl: function () {
            return this.getElement("content")
        },
        renderDecorate: function () {
            this.toggleState("smallText", this.options.smallText), this.$el.addClass(this.options.extraClassNames)
        },
        positionDecorate: function () {
            var e, t, i, n, s = this.options,
                o = s.anchor;
            this.$el.addClass("dialog__" + o.replace(/ /g, "")), this.options.relativeElement && / center|^(left|right)$/.test(o) && (e = $(this.options.relativeElement), t = this.$el.offset().top, i = e.offset().top, n = i - t + e.height() / 2 - 5.5, this.getElement("arrow").css({
                top: n
            }))
        }
    }, {
        setDialogTypes: function (e) {
            a = e
        },
        create: function (t, i, o, r) {
            var l, u, c = a[t];
            if (c) return l = (s || (s = e("underscore"))).extend({}, r && r.subviewArgs, c.subviewArgs, o), u = new n((s || (s = e("underscore"))).defaults({
                subviewArgs: l,
                relativeElement: i
            }, r, c))
        }
    })
}),
define("config/dialog-types", [], function (e, t, i) {
    var n, s;
    n = i.exports = {
        userBadge: {
            Subview: s || (s = e("views/user/user-rich-badge")),
            relativeElementAnchor: "right center",
            width: "202",
            anchor: "left center",
            offset: "10 -5",
            extraClassNames: "",
            minHeight: 147
        }
    }
}),
define("lib/keyboard-shortcuts", [], function (e, t, i) {
    function n(e, t, i) {
        c.call(e, 1e3 * Math.max(5, d) * ("next" === i ? 1 : -1))
    }
    var s, o, r, a, l, u, c, d = 0;
    s = i.exports = {
        shortcuts: {
            playPause: {
                keyCode: ["32", "13"],
                keyName: ["space"],
                description: "Toggle play & pause",
                className: "kbd-big",
                fn: function () {
                    (l || (l = e("lib/play-manager"))).toggleCurrent({
                        userInitiated: !0
                    })
                }
            },
            search: {
                keyCode: ["83", "191"],
                keyName: ["S"],
                description: "Search",
                fn: function () {
                    (a || (a = e("event-bus"))).trigger("search:focus")
                }
            },
            load: {
                keyCode: ["48", "49", "50", "51", "52", "53", "54", "55", "56", "57"],
                keyName: ["0â€¦9"],
                className: "kbd-big",
                description: "Seek to position",
                fn: function (e, t) {
                    e && !t.isMetaKey() && e.seek(e.duration() / 10 * (t.keyCode - 48))
                }
            },
            seekBackward: {
                keyCode: ["37"],
                keyName: ["â†"],
                description: "Seek backward",
                fn: function (e, t) {
                    e && n(e, t, "prev")
                }
            },
            seekForward: {
                keyCode: ["39"],
                keyName: ["â†’"],
                description: "Seek forward",
                fn: function (t, i) {
                    (l || (l = e("lib/play-manager"))).getCurrentSound(), t && n(t, i, "next")
                }
            },
            loop: {
                keyCode: ["shiftKey+76"],
                keyName: ["L", "â‡§"],
                description: "Repeat playing track",
                fn: function (e) {
                    e && e.toggleLooping()
                }
            },
            prev: {
                keyCode: ["shiftKey+37", "75"],
                keyName: ["â†", "â‡§"],
                description: "Play previous track",
                fn: function () {
                    (l || (l = e("lib/play-manager"))).playPrev({
                        userInitiated: !0
                    })
                }
            },
            next: {
                keyCode: ["shiftKey+39", "74"],
                keyName: ["â†’", "â‡§"],
                description: "Play next track",
                fn: function () {
                    (l || (l = e("lib/play-manager"))).playNext({
                        userInitiated: !0
                    })
                }
            },
            mute: {
                keyCode: ["77"],
                keyName: ["M"],
                description: "Mute volume",
                fn: function () {
                    (a || (a = e("event-bus"))).broadcast("mute:toggle")
                }
            },
            volUp: {
                keyCode: ["shiftKey+38"],
                keyName: ["â†‘", "â‡§"],
                description: "Increase volume",
                fn: function () {
                    (a || (a = e("event-bus"))).trigger("volume:change", .1)
                }
            },
            volDown: {
                keyCode: ["shiftKey+40"],
                keyName: ["â†“", "â‡§"],
                description: "Decrease volume",
                fn: function () {
                    (a || (a = e("event-bus"))).trigger("volume:change", -.1)
                }
            },
            like: {
                keyCode: ["76"],
                keyName: ["L"],
                description: "Like playing track",
                fn: function (t) {
                    t && (r || (r = e("lib/action-controller"))).like(t.id, t.resource_type)
                }
            },
            repost: {
                keyCode: ["82"],
                keyName: ["R"],
                description: "Repost playing track",
                fn: function (t) {
                    t && (r || (r = e("lib/action-controller"))).repost(t.id, t.resource_type)
                }
            },
            dialog: {
                keyCode: ["72"],
                keyName: ["H"],
                description: "Show keyboard shortcuts",
                fn: function () {
                    (a || (a = e("event-bus"))).trigger("keyboard-shortcuts:toggle")
                }
            },
            gotoNowPlaying: {
                keyCode: ["80"],
                keyName: ["P"],
                description: "Current playing track",
                fn: function () {
                    (l || (l = e("lib/play-manager"))).restoreState()
                }
            }
        },
        handleKeyDown: function (t) {
            var i, n, r = (l || (l = e("lib/play-manager"))).getCurrentSound(),
                a = t.keyCode,
                c = (13 === a || 32 === a) && $(t.target).is(":tabbable") && !t.isDefaultPrevented(),
                h = {}, p = [];
            t.isInput() || c || (++d, (u || (u = e("underscore"))).each(o, function (e, t) {
                new RegExp("(^|\\+)" + a + "$").test(t) && (h[t] = e, p.push(t))
            }), (u || (u = e("underscore"))).find((u || (u = e("underscore"))).sortBy(p, "length").reverse(), function (e) {
                var i, s = e.split("+");
                return i = s.every(function (i, n) {
                    if (n === s.length - 1) {
                        var o = String(t.keyCode) === s[n];
                        return o && 1 === s.length && /[A-Za-z0-9%']/.test(String.fromCharCode(e)) ? !t.isMetaKey() : o
                    }
                    return t[i]
                }), i ? (n = h[e], !0) : void 0
            }), n && (i = s.shortcuts[n].fn(r, t), i || t.preventDefault()))
        },
        handleKeyUp: function () {
            d = 0
        }
    }, c = (u || (u = e("underscore"))).throttle(function (e) {
        this.seekRelative(e)
    }, 200), o = {}, (u || (u = e("underscore"))).each(s.shortcuts, function (t, i) {
        (u || (u = e("underscore"))).each(t.keyCode, function (e) {
            o[e] = i
        })
    })
}),
define("lib/views/modal", [], function (e, t, i) {
    function n(t) {
        var i = t ? 0 : (a || (a = e("lib/helpers/scrollbar-helper"))).getScrollbarSize();
        u.css("paddingRight", i).toggleClass("g-overflow-hidden", !t), this.$el.css("paddingRight", i)
    }
    var s, o, r, a, l, u = $(document.body),
        c = $("#app"),
        d = 200,
        h = 300,
        p = d + h;
    s = i.exports = (l || (l = e("lib/view"))).extend(r || (r = e("lib/mixins/views/overlay")), {
        className: "modal g-z-index-modal-background g-opacity-transition",
        css: e("lib/views/modal.css"),
        defaults: {
            width: null,
            height: null,
            type: "default",
            edgeOffset: 30,
            warnBeforeClosing: !1,
            stayOpenOnNavigate: !1,
            confirmCloseMessage: "Are you sure you want to close this?",
            transparentBackground: !1
        },
        element2selector: {
            content: ".modal__content",
            modal: ".modal__modal"
        },
        states: {
            invisible: function (e) {
                this.$el.toggleClass("invisible", e), c.toggleClass("g-filter-grayscale", !e)
            },
            showBackground: "showBackground",
            fullHeight: "fullHeight"
        },
        template: e("lib/views/modal.tmpl"),
        setup: function (e) {
            this.toggleState("invisible", !0).$el.addClass("type-" + e.type)
        },
        getOverlayContentEl: function () {
            return this.getElement("content")
        },
        teardown: function () {
            this.toggleState("invisible", !0).toggleState("showBackground", !1)
        },
        canBeClosed: function () {
            var e = this.options;
            return !e.warnBeforeClosing || e.warnBeforeClosing && window.confirm(e.confirmCloseMessage)
        },
        onDocumentClick: function (e) {
            var t = $(e.target);
            !this.isOpened || !t.closest(".modal__closeButton").length && t.closest(this.getElement("modal")).length || this.close()
        },
        onLayoutChange: function () {
            this.options.stayOpenOnNavigate || this.close()
        },
        onOverlayOpen: function (e) {
            e.isOpened && e !== this && e instanceof s && this.close(!0)
        },
        close: function (t) {
            !this.disposed && this.isOpened && (t || this.canBeClosed()) && (n.call(this, !0), this.toggleState("invisible", !0).toggleState("fullHeight", !1), this.addDeferred((o || (o = e("underscore"))).delay(this.toggleState.bind(this, "showBackground", !1), h)), this.addDeferred((o || (o = e("underscore"))).delay((r || (r = e("lib/mixins/views/overlay"))).properties.defaults.close.bind(this, !0), p)))
        },
        onWindowScroll: $.noop,
        position: function () {
            var t, i, s = this.options,
                r = s.edgeOffset,
                a = window.innerWidth,
                l = a - 2 * r,
                u = window.innerHeight - 2 * r;
            t = Math.min(l, s.width), "full" === s.height ? (i = u, this.toggleState("fullHeight", !0)) : i = "auto", n.call(this, !1), this.getElement("modal").css({
                width: t,
                height: i,
                left: (a - t) / 2
            }), this.addDeferred((o || (o = e("underscore"))).defer(this.toggleState.bind(this, "showBackground", !0))), this.addDeferred((o || (o = e("underscore"))).delay(this.toggleState.bind(this, "invisible", !1), d))
        }
    })
}),
define("lib/payment-controller", [], function (e, t, i) {
    function n(t) {
        var i = this.getPaymentDuration(),
            n = (v || (v = e("underscore"))).extend({}, k || (k = e("lib/global-xhr-handlers")), {
                422: $.noop
            }),
            s = [A],
            o = {
                package_urn: z.getUrn(i),
                additional_data: {
                    result_url: location.protocol + "//" + location.host + "/" + I
                }
            };
        return t = t || {}, B && (o.additional_data.origin_ref = B), t.orderReference && s.push(t.orderReference, "retry"), t.giftCode && (o.payment = {
            method: "gift",
            data: {
                gift_code: t.giftCode
            }
        }), $.ajax({
            url: s.join("/"),
            type: "POST",
            statusCode: n,
            data: o,
            contentType: "application/json",
            dataType: "json"
        })
    }

    function s(t) {
        var i = t.id,
            n = t.state,
            s = t.checkout && t.checkout.form_params;
        i && n === m.orderStates.SUCCESSFUL ? (p(i), f.call(this, n), (x || (x = e("event-bus"))).trigger("premium:started", u(), j), this.successful(t)) : i && s ? (p(i), f.call(this, n), d(l.call(this, s)), (x || (x = e("event-bus"))).trigger("premium:started", u(), j), a.call(this, !0), this.triggerEvent("started")) : o.call(this)
    }

    function o(t) {
        var i = t ? t.responseText : "";
        if (i) try {
            i = JSON.parse(i).error.code
        } catch (n) {
            i = null
        }
        this.cancel(), (x || (x = e("event-bus"))).trigger("premium:pageView", "error"), this.trigger("error", i)
    }

    function r(e) {
        return $.ajax({
            url: [D, e].join("/"),
            type: "GET",
            contentType: "application/json",
            dataType: "json"
        })
    }

    function a(t) {
        var i = [this.isGiftPayment() ? "gifts" : null, t ? z.getLevel() === (C || (C = e("models/product"))).planLevels.UNLIMITED ? "pro-unlimited" : "pro" : null],
            n = {
                trigger: !t
            };
        (_ || (_ = e("config"))).get("router").navigateToRoute("premium", i, n)
    }

    function l(t) {
        return {
            action: t.action,
            params: t.inputs.map(function (t) {
                return (v || (v = e("underscore"))).pairs(t)[0]
            })
        }
    }

    function u() {
        var t = z.getMeRelation();
        return t === (C || (C = e("models/product"))).meRelations.DEFAULT && (t = "new"), [t, m.getProductId(), m.getReferenceParam()].join("/")
    }

    function c() {
        R && (R.close(), R = null)
    }

    function d(e) {
        O = e
    }

    function h(e) {
        U = e
    }

    function p(e) {
        F = F || {}, F.reference = e
    }

    function f(e) {
        F = F || {}, F.state = e
    }

    function g() {
        z && z.release(), R = N = U = z = F = O = B = j = null
    }
    var m, v, b, _, y, w, x, k, S, C, T, E, A = "me/orders",
        D = "me/orders",
        I = "payment_callback.html",
        P = /^https:\/\/www\.(?:sandbox\.)?paypal\.com\/cgi-?bin\/webscr\?cmd=_express-checkout/,
        M = [1024, 768],
        N = null,
        L = null,
        F = null,
        O = null,
        R = null,
        U = null,
        z = null,
        B = null,
        j = null;
    m = i.exports = (v || (v = e("underscore"))).extend({}, (b || (b = e("lib/backbone"))).Events, {
        start: function (t, i) {
            function r() {
                n.call(this, i).done(l.resolve).fail(l.reject)
            }
            var a, l = $.Deferred();
            return U ? l.resolve() : (y || (y = e("lib/connect"))).isLoggedIn() ? (i && i.trackingPosition && (j = i.trackingPosition), h(t), z = new(C || (C = e("models/product")))({
                id: t
            }), this.triggerEvent("starting"), a = new(T || (T = e("collections/products")))(null, {
                category: "creator-" + (this.isGiftPayment() ? "gift" : "subscription")
            }), a.isPopulated() ? r.call(this) : a.fetch().done(function () {
                a.release(), r.call(this)
            }.bind(this)), l.done(s.bind(this)).fail(o.bind(this))) : (y || (y = e("lib/connect"))).login().pipe(function () {
                return m.start(t, i)
            })
        },
        handleCallback: function (t) {
            var i = (E || (E = e("lib/url"))).parse(t.location.href).query,
                n = i.url,
                s = i.reference,
                o = i.state;
            n ? R || this.openExternal(n) : o === this.orderStates.UNSUCCESSFUL ? this.unsuccessful(i.reason) : this.processOrder(s)
        },
        processOrder: function (e) {
            e && p(e), this.triggerEvent("processing"), this.pollForOrderStatus()
        },
        openExternal: function (t) {
            P.test(t) ? (R = (S || (S = e("lib/helpers/popup-helper"))).centered(t, M[0], M[1]), this.on("processing finished", c), function i() {
                R && !R.closed ? setTimeout(i, 1e3) : R && R.closed && "external" === N && (c(), m.cancel())
            }(), this.triggerEvent("external", t)) : this.cancel()
        },
        successful: function (t) {
            var i = t && t.item,
                n = this.isGiftPayment();
            (x || (x = e("event-bus"))).trigger("premium:pageView", "premium/success/" + u()), this.triggerEvent("successful"), i && i.code && (L = i.code), (_ || (_ = e("config"))).get("router").navigateToRoute("purchased", [U], {
                    trigger: !0
                }), this.finish(), n || this.pollForPlanUpdate()
        },
        unsuccessful: function (t) {
            (x || (x = e("event-bus"))).trigger("premium:pageView", "premium/failed/" + u()), a.call(this, !1), this.triggerEvent("unsuccessful", t), this.finish()
        },
        updatedPlan: function () {
            var t = new(T || (T = e("collections/products")));
            t.next_href = null, t.fetch().done(t.release), this.triggerEvent("updatedPlan")
        },
        cancel: function () {
            /^(starting|started|external|processing)$/.test(N) && (a.call(this, !1), this.triggerEvent("canceled"), g())
        },
        finish: function () {
            this.triggerEvent("finished"), g()
        },
        retry: function () {
            var e = this.getOrder().reference;
            n.call(this, {
                orderReference: e
            }).done(s.bind(this)).fail(o.bind(this))
        },
        getProductId: function () {
            return U
        },
        getPaymentParams: function () {
            return O
        },
        getOrder: function () {
            return F
        },
        getReferenceParam: function () {
            return B
        },
        setReferenceParam: function (e) {
            B = e
        },
        isGiftPayment: function () {
            return z.isGift()
        },
        claimGiftCode: function () {
            var e = L;
            return L = null, e
        },
        getPaymentDuration: function () {
            var t = "yearly";
            return ((_ || (_ = e("config"))).get("me").hasMonthlyPlan() || "adyen_monthly" === this.getReferenceParam()) && (t = "monthly"), this.isGiftPayment() && (t = "yearly"), t
        },
        triggerEvent: function (e, t) {
            e.split(" ").forEach(function (e) {
                N = e, this.trigger(e, U, F, t)
            }.bind(this))
        },
        purchasedToProductId: function (e, t) {
            return "creator-" + (t ? "gift-" : "subscription-") + e
        },
        pollForOrderStatus: function () {
            var t = this.getOrder().reference,
                i = new(w || (w = e("lib/circuit-breaker")))({
                    tolerance: 1,
                    giveUp: 18,
                    backoffRate: 1.3
                }),
                n = function () {
                    r(t).done(s.bind(this)).fail(function (e) {
                        404 === e.status ? this.unsuccessful() : i.failed()
                    }.bind(this))
                }.bind(this),
                s = function (e) {
                    switch (f.call(this, e.state), e.state) {
                    case m.orderStates.PENDING:
                        i.failed();
                        break;
                    case m.orderStates.SUCCESSFUL:
                        this.successful(e);
                        break;
                    case m.orderStates.UNSUCCESSFUL:
                        this.retry();
                        break;
                    case m.orderStates.FAILED:
                        this.unsuccessful(e.reason)
                    }
                };
            i.on("enabled", n).on("giveup", this.unsuccessful.bind(this)), n()
        },
        pollForPlanUpdate: function () {
            var t = (_ || (_ = e("config"))).get("me"),
                i = t.getPlan(),
                n = new(w || (w = e("lib/circuit-breaker")))({
                    tolerance: 1,
                    giveUp: 15,
                    backoffRate: 1.5,
                    maxDelay: 15e3,
                    enabled: !1
                }),
                s = function () {
                    t.fetch().always(n.failed.bind(n))
                }, o = function (e) {
                    i !== e.getPlan() && (m.updatedPlan(), n.off("enabled", s), t.off("change:subscriptions", o))
                };
            n.on("enabled", s), t.on("change:subscriptions", o)
        }
    }, {
        orderStates: {
            CREATED: "created",
            FAILED: "failed",
            PENDING: "pending",
            SUCCESSFUL: "successful",
            UNSUCCESSFUL: "unsuccessful"
        },
        paymentFailStates: {
            ABORTED: "aborted",
            INVALID: "invalid",
            UNAUTHORIZED: "unauthorised",
            USER_CANCELLED: "user_cancelled",
            DUPLICATE: "duplicate"
        }
    })
}),
define("lib/audio", [], function (e, t, i) {
    function n(t, i, n) {
        t.trigger(i, (c || (c = e("underscore"))).extend(t.getEvent(i), n))
    }

    function s(t) {
        var i;
        return (c || (c = e("underscore"))).isEmpty(t) ? (this.sound.set("playable", !1), void(v || (v = e("event-bus"))).trigger("error:audio_no_streams")) : (this.streamInfo = this.choosePreferredStream(t), this.streamInfo ? void(this._expirationTimeoutId || (i = this.getExpirationTime(this.streamInfo), this._expirationTimeoutId = setTimeout(this.resetAudioController.bind(this), Math.floor(.9 * (i - Date.now()))))) : (this.sound.set("playable", !1), void(v || (v = e("event-bus"))).trigger("error:audio_support")))
    }

    function o(e) {
        return /^http:\/\/ec-media\./.test(e) ? e = e.replace(/^http:/, "https:") : /^http:\/\/ak-media\.soundcloud\.com/.test(e) && (e = e.replace(/^http:\/\/ak-media\.soundcloud\.com/, "https://akmedia-a.akamaihd.net")), e
    }

    function r() {
        var t;
        t = this.sound.get("secret_token"), this.streamInfo = {
            url: (y || (y = e("lib/url"))).modify(this.sound.get("stream_url"), {
                query: {
                    client_id: (m || (m = e("config"))).get("client_id"),
                    skip_logging: "true"
                }
            }),
            protocol: C,
            mimeType: "audio/mpeg"
        }, t && (this.streamInfo.url = (y || (y = e("lib/url"))).modify(this.streamInfo.url, {
            secret_token: t
        }))
    }

    function a() {
        var t, i = this.controller.getErrorID(),
            n = this.streamInfo,
            s = !0;
        switch (i) {
        case w.FLASH_PROXY_CANT_LOAD_FLASH:
            (v || (v = e("event-bus"))).trigger("error:audio_support"), s = !1;
            break;
        case w.FLASH_PROXY_FLASH_BLOCKED:
            (v || (v = e("event-bus"))).trigger("audio:flash_block", this.controller), s = !1;
            break;
        case w.HTML5_AUDIO_ABORTED:
            t = {
                seek: this.currentTime()
            }, this.resetAudioController(), this.play(t);
            break;
        case w.FLASH_RTMP_CONNECT_FAILED:
        case w.FLASH_RTMP_CANNOT_PLAY_STREAM:
            this.streamSettings.protocols = (c || (c = e("underscore"))).without(this.streamSettings.protocols, T), this.resetAudioController();
            break;
        case w.HTML5_AUDIO_NETWORK:
        case w.FLASH_RTMP_CONNECT_CLOSED:
            this.storeCurrentPosition(), this.sound.pause(), this.resetAudioController(), s = !1
        }
        s && (b || (b = e("models/exception"))).raise({
            streamInfo: n,
            errorCode: i,
            message: i
        })
    }

    function l(t) {
        switch (this.isInitialized() && this._initAudioDefer && this._initAudioDefer.resolve(), this._isPlaying = t === x.PLAYING, t) {
        case x.IDLE:
            this.controller.getErrorID() === w.FLASH_PROXY_FLASH_BLOCKED && (v || (v = e("event-bus"))).trigger("audio:flash_unblock", this.controller);
            break;
        case x.PLAYING:
            break;
        case x.LOADING:
            break;
        case x.ENDED:
            this.audioFinish();
            break;
        case x.ERROR:
            a.call(this)
        }
        this._prevState = t
    }
    var u, c, d, h, p, f, g, m, v, b, _, y, w = (h || (h = e("lib/audiomanager"))).Errors,
        x = (h || (h = e("lib/audiomanager"))).States,
        k = !0,
        S = {
            looping: !1,
            muted: !1,
            volume: 1
        }, C = "http",
        T = "rtmp",
        E = "hls",
        A = {
            bitrate: 1 / 0,
            protocols: (_ || (_ = e("lib/support"))).flash ? [E, T, C] : [E, C],
            extensions: ["mp3"]
        }, D = 864e5,
        I = 12e4,
        P = 6e4,
        M = [];
    u = i.exports = Class.extend([(f || (f = e("backbone"))).Events, {
        controller: null,
        sound: null,
        streamSettings: null,
        streamInfo: null,
        registerPlays: !0,
        _cancelLooping: !0,
        _retryAttempts: 0,
        _initAudioDefer: null,
        _expirationTimeoutId: null,
        _isPlayActionQueued: !1,
        _isPlaying: !1,
        _listenTime: 0,
        _prevTime: 0,
        _storedPosition: null,
        _requiredAttributes: ["duration", "stream_url"],
        initialize: function (t, i) {
            (c || (c = e("underscore"))).bindAll(this, "audioFinish", "createAudioController"), this.sound = t, this.streamSettings = (c || (c = e("underscore"))).extend({}, A, i), (h || (h = e("lib/audiomanager"))).setVolume(S.volume), this.on("all", function (e) {
                t.trigger.apply(t, arguments)
            })
        },
        initAudio: function () {
            var e;
            return this._initAudioDefer ? this._initAudioDefer : (this._initAudioDefer = $.Deferred(), e = [this.fetchRequiredAttributes(), this.fetchStreamInfo()], $.whenAll(e).done(this.createAudioController).fail(this.resetInitAudio.bind(this)), this._initAudioDefer)
        },
        resetInitAudio: function () {
            this._initAudioDefer && (this._initAudioDefer.reject(), this._initAudioDefer = null)
        },
        createAudioController: function () {
            if (this.streamInfo) {
                var t, i = {
                        id: this.sound.resource_id,
                        src: this.streamInfo.url,
                        duration: this.sound.get("duration"),
                        mimeType: this.streamInfo.mimeType,
                        forceSingle: k
                    };
                (_ || (_ = e("lib/support"))).flash && (g || (g = e("lib/browser"))).isSafari && (i.forceFlash = !0), this.controller = t = (h || (h = e("lib/audiomanager"))).createAudioPlayer(i), (p || (p = e("lib/audioperf"))).monitor(t), t.on("stateChange", l, this).on("positionChange", this.trigger.bind(this, "time")), l.call(this, t.getState())
            }
        },
        killAudioController: function () {
            this.controller && ((p || (p = e("lib/audioperf"))).stopMonitoring(this.controller), this.controller.kill(), this.controller = null)
        },
        resetAudioController: function () {
            this.resetInitAudio(), this.killAudioController(), this.streamInfo = null, this._expirationTimeoutId = null, delete this.sound._requests[this.sound.url("streamsUrl")]
        },
        fetchRequiredAttributes: function () {
            var e = $.Deferred();
            return this.sound.attrExists(this._requiredAttributes) ? e.resolve() : this.sound.fetch().done(e.resolve).fail(e.reject), e
        },
        fetchStreamInfo: function () {
            var t = $.Deferred();
            return this.streamInfo ? t.resolve() : (g || (g = e("lib/browser"))).isSafari && (g || (g = e("lib/browser"))).isMobile ? (r.call(this), t.resolve()) : (t.done(function (e) {
                s.call(this, e)
            }.bind(this)), this.sound.fetchStreams().done(t.resolve).fail(function (i) {
                /geo_blocked/.test(i[0].responseText) && (this.sound.set("playable", !1), this.sound.pause(), (v || (v = e("event-bus"))).trigger("error:geo_blocked", this.sound)), t.reject()
            }.bind(this))), t
        },
        audioFinish: function () {
            this._cancelLooping ? (this._isPlayActionQueued = !1, n(this, "pause"), n(this, "finish"), this.registerPlays = !0) : (this.controller.play(), this.sound.toggleLooping(!0, {
                silent: !0
            }))
        },
        choosePreferredStream: function (t) {
            function i(e, t) {
                return Math.abs(t - m) - Math.abs(e - m)
            }
            var n, s, r, a, l, u, d, h, p, f = {}, g = this.streamSettings,
                m = g.bitrate,
                v = g.protocols,
                b = g.extensions;
            for ((c || (c = e("underscore"))).each(t, function (e, t) {
                var i = t.split("_"),
                    n = i[0],
                    s = i[1],
                    o = i[2];
                f[n] = f[n] || {}, f[n][s] = f[n][s] || {}, f[n][s][o] = e
            }, this), l = 0, u = v.length; u > l; ++l)
                for (a = v[l], h = 0, p = b.length; p > h; ++h)
                    if (d = b[h], f[a] && f[a][d]) return n = (c || (c = e("underscore"))).sortBy((c || (c = e("underscore"))).keys(f[a][d]).map(Number), (c || (c = e("underscore"))).identity), s = 1 / 0 === m, r = m === -1 / 0, m = s || r ? n[s ? "pop" : "shift"]() : n.sort(i).pop(), {
                        url: o(f[a][d][m]),
                        bitrate: m,
                        protocol: a,
                        extension: d
                    }
        },
        getExpirationTime: function (t) {
            var i, n = (y || (y = e("lib/url"))).parse(t.url);
            switch (t.protocol) {
            case E:
                i = Date.now() + D;
                break;
            case T:
                i = Date.now() + I;
                break;
            case C:
                i = 1e3 * parseInt(n.query.Expires, 10)
            }
            return i
        },
        registerPlay: function (t) {
            var i = this.sound.getOriginalSound(),
                n = i.id,
                s = i.get("playback_count"); - 1 === M.indexOf(n) && (M.push(n), setTimeout(function () {
                    var e = M.indexOf(n);
                    e > -1 && M.splice(e, 1)
                }, P), (d || (d = e("lib/integrations/adswizz"))).trackEvent("play", t), i.set("playback_count", s + 1), $.ajax({
                    type: "POST",
                    dataType: "json",
                    statusCode: {
                        429: $.noop
                    },
                    url: (y || (y = e("lib/url"))).stringify({
                        path: ["tracks", n, "plays"],
                        query: {
                            secret_token: this.sound.get("secret_token")
                        }
                    })
                }).fail(function () {
                    i.set("playback_count", s)
                }))
        },
        toggle: function (e) {
            this[this.isPaused() ? "play" : "pause"](e)
        },
        play: function (e) {
            e = e || {};
            var t, i = e.context || null,
                s = this.currentTime();
            this.sound.isPlayable() && (this._isPlayActionQueued = !0, this.initAudio().done(function () {
                clearTimeout(this._expirationTimeoutId), this._isPlayActionQueued && (t = null == e.seek ? s : e.seek, this._logAudioEvent("play", t), n(this, "playStart", e), this.controller.play(t), this._storedPosition = null)
            }.bind(this)), this.registerPlays && (this.registerPlay(i), this.registerPlays = !1), n(this, "play", e))
        },
        pause: function (e) {
            var t = this.isPlaying();
            this._isPlayActionQueued = !1, this._isPlaying = !1, this.controller && (this._logAudioEvent("pause", this.currentTime()), this.controller.pause()), t && n(this, "pause", e)
        },
        getEvent: function (e) {
            return {
                sound: this.sound,
                type: e
            }
        },
        getListenTime: function () {
            return this._listenTime + ((this.currentTime() || 0) - this._prevTime)
        },
        dispose: function () {
            this.off(), this.killAudioController(), delete this.controller, delete this.sound
        },
        seek: function (e) {
            if (this.controller) {
                var t, i, s, o = this.currentTime();
                this._logAudioEvent("seek", o, e), this.controller.seek(e), e >= this.sound.duration() ? this.audioFinish() : (i = 20, s = 1e3, (t = function () {
                    this.currentTime() !== o ? n(this, "seeked") : s > i && (setTimeout(t, i), i *= 1.2)
                }.bind(this))())
            }
        },
        seekRelative: function (e) {
            this.controller && this.seek(this.currentTime() + e)
        },
        currentTime: function () {
            return this._storedPosition ? this._storedPosition : this.controller ? this.controller.getCurrentPosition() : 0
        },
        loadProgress: function () {
            var e = 0;
            return this.controller && (e = this.controller.getLoadedPosition() / this.controller.getDuration(), e = e >= .99 ? 1 : e), e
        },
        buffered: function () {
            return this.controller && this.controller.getDuration() || 0
        },
        isPaused: function () {
            return !this.isPlaying()
        },
        isPlaying: function () {
            return this._isPlayActionQueued || this._isPlaying
        },
        isLooping: function () {
            return S.looping && !this._cancelLooping
        },
        isInitialized: function () {
            var e = this.controller.getState();
            return this.controller && e !== x.INITIALIZE && e !== x.ERROR
        },
        toggleLooping: function (t, i) {
            return this.controller && this.isPlaying() ? (S.looping = void 0 === t ? !S.looping : !! t, this._cancelLooping = S.looping ? !1 : !0, (!i || i && !i.silent) && (v || (v = e("event-bus"))).trigger("audio:loop:on"), S.looping) : void 0
        },
        toggleMute: function (t) {
            this.controller && (S.muted = void 0 === t ? !S.muted : !! t, (h || (h = e("lib/audiomanager"))).setVolume(S.muted ? 0 : 1))
        },
        setVolume: function (t) {
            this.controller && (S.volume = void 0 === t ? 1 : t, (h || (h = e("lib/audiomanager"))).setVolume(S.volume))
        },
        storeCurrentPosition: function () {
            this._storedPosition = this.currentTime()
        },
        _logAudioEvent: function (e, t, i) {
            switch (e) {
            case "play":
                this._prevTime = t;
                break;
            case "pause":
                this._listenTime += t - this._prevTime, this._prevTime = t;
                break;
            case "seek":
                this._logAudioEvent("pause", t), this._logAudioEvent("play", i)
            }
        }
    }]), (c || (c = e("underscore"))).extend(u, {
        getSettings: function () {
            return S
        },
        setSettings: function (t) {
            (c || (c = e("underscore"))).extend(S, t)
        }
    })
}),
define("lib/view", [], function (e, t, i) {
    function n(e, t) {
        for (var i = this; i && !t.isPropagationStopped();) i.trigger(e, t), i = i._parentView
    }

    function s(t, i) {
        return (_ || (_ = e("underscore"))).defaults(i, t.prototype.defaults), t === y ? i : s(t.__super__.constructor, i)
    }

    function o(e, t, i) {
        var n = e ? "on" : "off";
        i ? t || (t = i.source) : i = l.call(this, t), u(i).forEach(function (e) {
            t[n]("change:" + e, this._onModelChange, this)
        }, this)
    }

    function r(e, t) {
        var i = e ? "on" : "off";
        t[i]("add", this.onAdd, this)[i]("remove", this.onRemove, this)[i]("reset", this.onCollectionReset, this)[i]("add remove reset", this.onCollectionChange, this)
    }

    function a(e) {
        var t = e.source,
            i = e.options;
        i.isModel ? o.call(this, !1, null, e) : r.call(this, !1, t), t.release()
    }

    function l(t) {
        return (_ || (_ = e("underscore"))).find(this._dataSources, function (e) {
            return e.source === t
        })
    }

    function u(e) {
        var t = e.options.observedAttributes,
            i = c(e);
        return t && !Array.isArray(t) && (t = t[e.source.resource_type]), t ? t.concat(i) : i
    }

    function c(e) {
        var t = e.options.requiredAttributes;
        return t && !Array.isArray(t) && (t = t[e.source.resource_type]), t || []
    }

    function d(e) {
        var t = e.options,
            i = e.source,
            n = t.observedAttributes;
        n && n.length && !i.isPopulated() && !i.hasDataForView(n) && i.fetch()
    }
    var h, p, f, g, m, v, b, _, y;
    y = i.exports = (h || (h = e("lib/backbone"))).View.extend(v || (v = e("lib/mixins/views/stateful")), {
        ModelClass: null,
        requiredAttributes: null,
        observedAttributes: null,
        css: null,
        template: $.noop,
        LoadingView: null,
        loadingViewArgs: null,
        loadingTemplate: function () {
            return ""
        },
        element2selector: null,
        _element2selector_cache: null,
        defaults: null,
        bubbleEvents: null,
        disposed: !1,
        subviews: null,
        _subviews_keys: null,
        _lastEventId: null,
        constructorArguments: null,
        _whenInsertedDefer: null,
        _deferreds: null,
        _dataSources: null,
        initialize: function (t) {
            var i;
            t = this.options = s(this.constructor, t || {}), this.constructorArguments = (_ || (_ = e("underscore"))).clone(t), t.resource_id && this.ModelClass && (this.model = i = this.getModel(t.resource_id, t.resource_type)), this._deferreds = [], this.subviews = [], this._subviews_keys = [], this._dataSources = [], this.resetElementCache(), this._setupBubbleListeners(), this._setup.call(this, t), i && this.model !== i && i.release(), this.model ? this.addDataSource(this.model, {
                observedAttributes: this.observedAttributes,
                requiredAttributes: this.requiredAttributes
            }) : this.collection && this.addDataSource(this.collection)
        },
        _setup: function () {
            this.setup.apply(this, arguments)
        },
        setup: $.noop,
        _dispose: function () {
            if (!this.disposed) {
                for (this._teardown(), this.dispose(), this.disposed = !0; this._deferreds.length;) "number" == typeof this._deferreds[0] ? clearTimeout(this._deferreds.shift()) : this._deferreds[0].reject("viewDisposed");
                for (this.off(); this._dataSources.length;) a.call(this, this._dataSources.shift());
                this.destroyElement(), ["el", "$el", "model", "collection", "constructorArguments"].forEach(function (e) {
                    this[e] && (this[e] = null)
                }, this)
            }
        },
        destroyElement: function () {
            this.$el.remove()
        },
        dispose: $.noop,
        _teardown: function () {
            this.disposeSubviews(), this._whenInsertedDefer && (this._whenInsertedDefer.reject(), this._whenInsertedDefer = null), this.teardown(), this.resetElementCache()
        },
        teardown: $.noop,
        disposeSubviews: function () {
            for (; this.subviews.length;) this.subviews.pop()._dispose();
            this.subviews = [], this._subviews_keys = []
        },
        getModel: function (e, t, i) {
            var n, s, o, r, a;
            return r = {
                id: e,
                resource_type: t
            }, o = this.ModelClass.getClass ? this.ModelClass.getClass(r) : this.ModelClass, n = o.hashFn(r, i), s = o.instances.get(n), s ? s.hold() : (a = {
                id: e
            }, t && (a.resource_type = t), s = new o(a)), s
        },
        _setupBubbleListeners: function () {
            var e, t;
            for (t in this.bubbleEvents) this.bubbleEvents.hasOwnProperty(t) && (e = this.bubbleEvents[t], this.on(t, this[e], this))
        },
        getObservedAttributes: function (e) {
            var t = l.call(this, e);
            return u(t)
        },
        addDeferred: function (e) {
            return "number" == typeof e ? this._deferreds.push(e) : e.reject && "pending" === e.state() && (e.always(function () {
                var t = this._deferreds.indexOf(e);
                t > -1 && this._deferreds.splice(t, 1)
            }.bind(this)), this._deferreds.push(e)), e
        },
        addDataSource: function (t, i) {
            var n = t instanceof(m || (m = e("lib/model")));
            return i = (_ || (_ = e("underscore"))).clone(i) || {}, n ? ((_ || (_ = e("underscore"))).defaults(i, {
                isModel: !0,
                requiredAttributes: null,
                observedAttributes: null
            }), this._dataSources.push({
                source: t,
                options: i
            }), o.call(this, !0, t)) : ((_ || (_ = e("underscore"))).defaults(i, {
                isCollection: !0
            }), this._dataSources.push({
                source: t,
                options: i
            }), r.call(this, !0, t)), t
        },
        removeDataSource: function (e) {
            this._dataSources.some(function (t, i) {
                return t.source === e ? (a.call(this, t), this._dataSources.splice(i, 1), !0) : void 0
            }, this)
        },
        addSubview: function (e, t) {
            return e._parentView = this, this.subviews.push(e), this._subviews_keys.push(t), t && (this.subviews[t] = e), e
        },
        removeSubview: function (e) {
            for (var t = this.subviews.length; t--;)
                if (this.subviews[t] === e) return this._subviews_keys[t] && delete this.subviews[this._subviews_keys[t]], e._parentView = null, this.subviews.splice(t, 1), void this._subviews_keys.splice(t, 1)
        },
        getAncestorSubviews: function () {
            var e = [];
            return this.subviews.forEach(function (t) {
                e.push(t), e = e.concat(t.getAncestorSubviews())
            }), e
        },
        getElement: function (e) {
            var t;
            return this._element2selector_cache[e] === t && (this._element2selector_cache[e] = this.$(this.element2selector[e])), this._element2selector_cache[e]
        },
        resetElementCache: function () {
            this._element2selector_cache = {}
        },
        render: function () {
            var t = this.hasData(),
                i = this.getTemplate(t),
                n = this._getTemplateData(t);
            return i && ((b || (b = e("lib/template"))).render(i.bind(this), n, this.el), (b || (b = e("lib/template"))).subviews(this)), this.css && (f || (f = e("lib/css"))).insert(this.css), t ? (this.renderDecorate(), this._dataSources.forEach(d)) : (!i && this.LoadingView && this.addSubview(new this.LoadingView((_ || (_ = e("underscore"))).result(this, "loadingViewArgs")), "loading").render().$el.appendTo(this.el), this.fetchData().fail(this.removeLoader.bind(this))), this
        },
        hasData: function () {
            return !this._dataSources.some(this.missingRequiredData, this)
        },
        fetchData: function () {
            var e, t, i = this._fetchDeferred;
            return i || (e = this._dataSources.filter(this.missingRequiredData, this), t = e.length, t ? (this._fetchDeferred = i = t > 1 ? $.whenAll(e.map(this.fetchDataFromSource, this)) : this.fetchDataFromSource(e[0]), i.always(function () {
                this._fetchDeferred = null
            }.bind(this))) : i = $.Deferred().resolve()), i
        },
        missingRequiredData: function (e) {
            var t;
            return e.options.isModel && (t = c(e), !t.length) ? !1 : !e.source.hasDataForView(t)
        },
        fetchDataFromSource: function (e) {
            var t = e.source,
                i = this.options.bulkFetch;
            return e.options.isCollection && i ? t.bulkFetch(i) : t.fetch({
                attrs: u(e)
            })
        },
        renderDecorate: $.noop,
        rerender: function () {
            this.disposed || (this._teardown(), this.render())
        },
        getTemplate: function (e) {
            return e || !this.LoadingView && !this.loadingTemplate ? this.template : this.LoadingView ? null : this.loadingTemplate
        },
        _getTemplateData: function (t) {
            var i = {};
            return this.model ? i = this.getModelData() : this.collection && (i = this.getCollectionData()), i._options = (_ || (_ = e("underscore"))).clone(this.options), t && (i = this.getTemplateData(i) || i), i
        },
        getTemplateData: $.noop,
        getCollectionData: function () {
            return this.collection.toJSON()
        },
        getModelData: function () {
            return this.model.toJSON()
        },
        bubble: function (t, i) {
            var s = new(g || (g = e("lib/event-bubble")))(i);
            return n.apply(this, [t, s]), s
        },
        getContextData: function () {
            return this.bubble("contextrequest").data
        },
        removeLoader: function () {
            var e = this.subviews.loading;
            e && (e._dispose(), this.removeSubview(e))
        },
        scrollIntoView: function (t) {
            var i, n, s, o, r, a, l, u, c, d = this.$el.offset(),
                h = $.Deferred();
            return t = (_ || (_ = e("underscore"))).defaults({}, t, {
                position: "auto",
                topOffset: 20
            }), d ? (l = $(".g-main-scroll-area").first(), l.length || (l = $("#content")), o = $(document).scrollTop(), u = l.offset().top, n = o + u, s = o + $(window).height(), r = Math.floor(d.top), a = Math.floor(r + this.$el.height()), i = r > n && s > a, i ? h.resolve() : "top" === t.position || "auto" === t.position && n > r ? (c = r - u - t.topOffset, (p || (p = e("config"))).get("pageVisible") ? $("body,html").animate({
                scrollTop: c
            }, {
                complete: h.resolve
            }, 300) : ($("body,html").prop({
                scrollTop: c
            }), h.resolve())) : (this.el.scrollIntoView(!1), h.resolve()), h) : !1
        },
        isEquivalentTo: function (t, i) {
            var n = i || {};
            return this.constructor === t && (_ || (_ = e("underscore"))).isEqual(s(t, n), this.constructorArguments)
        },
        whenInserted: function (e) {
            var t, i, n = this._whenInsertedDefer;
            return n || (e = e || document.body, i = function (s) {
                0 !== s.closest(e).length ? n.resolve() : t = setTimeout(i, 100)
            }.bind(null, this.$el), this._whenInsertedDefer = n = $.Deferred(), n.fail(function () {
                clearTimeout(t)
            }), i()), n
        },
        _onModelChange: function (e, t, i, n) {
            this._lastEventId !== n && (this._lastEventId = n, this.onModelChange(e, t, i))
        },
        onModelChange: function () {
            this.rerender()
        },
        onCollectionChange: function (e, t) {
            2 === arguments.length && (t = e), this.disposed || this.trigger("update:collection", t.length)
        },
        onCollectionReset: function () {
            this.rerender()
        },
        onAdd: $.noop,
        onRemove: $.noop
    })
}),
define("lib/mixin", [], function (e, t, i) {
    function n(e, t) {
        this.applyTo = function (i) {
            e.applyTo(i, t)
        }
    }
    var s, o, r = ["before", "after", "around", "requires", "override", "defaults", "applyTo"];
    s = i.exports = Class.extend({
        mixins: null,
        properties: null,
        initialize: function (t) {
            var i = (o || (o = e("underscore"))).toArray(arguments),
                n = i.filter(function (e) {
                    return e instanceof s
                }),
                r = n.length;
            t = i[r], this.mixins = n, this.properties = t
        },
        applyTo: function (t) {
            var i = this.properties;
            this.defaults(t, i.defaults), this.extend(t, i), (o || (o = e("underscore"))).invoke(this.mixins, "applyTo", t), this.requires(t, i.requires), this.override(t, i.override), this.before(t, i.before), this.after(t, i.after), this.around(t, i.around), i.applyTo && i.applyTo.apply(this, arguments)
        },
        withOptions: function (e) {
            return new n(this, e)
        },
        before: function (t, i) {
            (o || (o = e("underscore"))).each(i, function (e, i) {
                var n = t[i];
                t[i] = function () {
                    return e.apply(this, arguments), n.apply(this, arguments)
                }
            })
        },
        after: function (t, i) {
            (o || (o = e("underscore"))).each(i, function (e, i) {
                var n = t[i];
                t[i] = function () {
                    var t = n.apply(this, arguments);
                    return e.apply(this, arguments), t
                }
            })
        },
        around: function (t, i) {
            (o || (o = e("underscore"))).each(i, function (e, i) {
                var n = t[i],
                    s = Array.prototype.slice;
                t[i] = function () {
                    var t = s.apply(arguments);
                    return t.unshift(n.bind(this)), e.apply(this, t)
                }
            })
        },
        override: function (t, i) {
            (o || (o = e("underscore"))).extend(t, i)
        },
        defaults: function (t, i) {
            (o || (o = e("underscore"))).each(i, function (e, i) {
                t.hasOwnProperty(i) || (t[i] = e)
            })
        },
        extend: function (t, i) {
            (o || (o = e("underscore"))).each(i, function (e, i) {
                r.indexOf(i) < 0 && (t[i] = e)
            })
        },
        requires: function (e, t) {}
    }), n.prototype = s.prototype
}),
define("lib/mixins/stores/observing", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = new(r || (r = e("lib/mixin")))((s || (s = e("underscore"))).extend({
        around: {
            set: function (e, t, i, n) {
                var s, o, r = n && n.silent;
                return r || (o = this.get(t)), s = e(t, i, n), r || o === i || this.trigger(t, {
                    prev: o,
                    current: i
                }), s
            },
            unset: function (e, t, i) {
                var n, s, o = i && i.silent;
                return o || (s = this.get(t)), n = e(t, i), o || void 0 === s || this.trigger(t, {
                    prev: s,
                    current: void 0
                }), n
            },
            reset: function (t, i) {
                var n, o, r;
                i && i.silent || (r = this.reduce(function (e, t, i) {
                    return t !== o && (e[i] = t), e
                }, {}, this)), n = t(i), r && (s || (s = e("underscore"))).each(r, function (e, t) {
                    this.trigger(t, {
                        prev: e,
                        current: void 0
                    })
                }, this)
            }
        }
    }, (o || (o = e("lib/backbone"))).Events))
}),
define("lib/store", [], function (e, t, i) {
    var n, s, o = {};
    ["each", "forEach", "map", "find", "detect", "filter", "select", "reduce", "reject", "every", "all", "any", "some", "include", "contains"].forEach(function (t) {
        o[t] = function () {
            var i = [this._store];
            return i.push.apply(i, arguments), (s || (s = e("underscore")))[t].apply(s || (s = e("underscore")), i)
        }
    }), n = i.exports = Class.extend([o, {
        initialize: function (e) {
            this._store = {}, this.length = 0, this._final = !1, this.maxLength = e && e.maxLength || !1, this.maxLength && (this._keys = [])
        },
        maxLength: 0,
        get: function (e) {
            return this._store[e]
        },
        set: function (e, t) {
            return this.has(e) ? this.maxLength && this._keys.splice(this._keys.indexOf(e), 1) : (++this.length, this.maxLength && this.length > this.maxLength && this.unset(this._keys[0])), this.maxLength && this._keys.push(e), this._store[e] = t, this
        },
        unset: function (e) {
            var t;
            return this.has(e) && (--this.length, this._final ? this._store[e] = t : (delete this._store[e], this.maxLength && this._keys.splice(this._keys.indexOf(e), 1))), this
        },
        reset: function () {
            return this._store = {}, this.maxLength && (this._keys = []), this._final = !1, this.length = 0, this
        },
        has: function (e) {
            return this._store.hasOwnProperty(e)
        },
        keys: function () {
            return Object.keys(this._store)
        },
        finalize: function () {
            this._final = !0
        }
    }])
}),
define("lib/helpers/popup-helper", [], function (e, t, i) {
    i.exports = {
        centered: function (e, t, i, n) {
            var s = Math.min(t, window.screen.width - 50),
                o = Math.min(i, window.screen.height - 50),
                r = window.screenX + (window.outerWidth - s) / 2,
                a = window.screenY + (window.outerHeight - o) / 2;
            return window.open(e, n || "", ["location=1", "width=" + s, "height=" + o, "top=" + a, "left=" + r, "toolbar=no", "scrollbars=yes"].join(","))
        }
    }
}),
define("lib/model", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d = Array.prototype.slice;
    n = (r || (r = e("lib/backbone"))).Model.extend({
        resource_type: null,
        lastFetchTime: null,
        _submodels: null,
        submodelMap: null,
        initialize: function (t, i) {
            this._submodels = this._submodels || [], this.options = i, (s || (s = e("underscore"))).each(this.submodelMap, function (e, t) {
                this.on("change:" + t, this.createSubmodel.bind(this, e, t))
            }, this), this.setup.apply(this, arguments), (s || (s = e("underscore"))).each(this.submodelMap, function (e, t) {
                this.get(t) && this.createSubmodel(e, t)
            }, this)
        },
        setup: $.noop,
        createSubmodel: function (t, i) {
            var n = this.get(i);
            n = (s || (s = e("underscore"))).isArray(n) ? n : [n], n.forEach(function (e) {
                this.addSubmodel(new t(e))
            }, this)
        },
        addSubmodel: function () {
            d.call(arguments).forEach(function (e) {
                -1 === this._submodels.indexOf(e) ? this._submodels.push(e) : e.release()
            }.bind(this))
        },
        getAttributesToBeSaved: function () {
            var t = (s || (s = e("underscore"))).reduce(this.toJSON(), function (e, t, i) {
                return null !== t && (e[i] = t), e
            }, {}),
                i = {};
            return i[(o || (o = e("lib/api-wrapper"))).toAPIResource(this.resource_type)] = t, i
        },
        save: function (t, i) {
            var n = this.getAttributesToBeSaved(),
                a = (o || (o = e("lib/api-wrapper"))).toAPIResource(this.resource_type),
                l = "json" === (s || (s = e("underscore"))).result(this, "saveFormat"),
                u = l ? JSON.stringify(n) : (c || (c = e("lib/url"))).param(n),
                d = l ? "application/json" : void 0;
            return t && (n[a] = (s || (s = e("underscore"))).pick(n[a], Object.keys(t))), (r || (r = e("lib/backbone"))).Model.prototype.save.call(this, t, (s || (s = e("underscore"))).extend({
                url: (s || (s = e("underscore"))).result(this, "saveUrl"),
                data: u,
                contentType: d
            }, i)).done(function (e) {
                this.set(e), this.updateResourceId()
            }.bind(this))
        },
        saveUrl: function () {
            return (s || (s = e("underscore"))).result(this, "baseUrl")
        },
        saveFormat: "param",
        destroy: function (t) {
            var i = (r || (r = e("lib/backbone"))).Model.prototype.destroy.call(this, (s || (s = e("underscore"))).extend({
                url: this.isNew() ? null : this.destroyUrl()
            }, t));
            return this.constructor.removeInstance(this), i
        },
        destroyUrl: function () {
            return (s || (s = e("underscore"))).result(this, "baseUrl")
        },
        baseUrl: $.noop,
        url: function (t) {
            var i = this.get("secret_token"),
                n = (s || (s = e("underscore"))).result(this, t || "baseUrl");
            return i && !this.isPublic() ? (c || (c = e("lib/url"))).modify(n, {
                query: {
                    secret_token: i
                }
            }) : n
        },
        signedUrl: function (t) {
            var i, n = this.get(t);
            return n ? (i = {
                scheme: "http",
                query: {
                    client_id: (a || (a = e("config"))).get("client_id")
                }
            }, (l || (l = e("lib/connect"))).isLoggedIn() && (i.scheme = "https", i.query.oauth_token = (l || (l = e("lib/connect"))).getAuthToken()), this.get("secret_token") && (i.query.secret_token = this.get("secret_token")), (c || (c = e("lib/url"))).modify(n, i)) : null
        },
        isPublic: function () {
            return "private" !== this.get("sharing")
        },
        toJSON: function () {
            var t = (r || (r = e("lib/backbone"))).Model.prototype.toJSON.apply(this, arguments);
            return t._resource_id = this.resource_id, t._resource_type = this.resource_type, t
        },
        parse: function (t) {
            var i;
            return "string" == typeof this.baseUrl && (i = (c || (c = e("lib/url"))).parse(this.baseUrl).query.secret_token), i || (i = this.extractSecretToken(t)), i && (t.secret_token = i), t
        },
        extractSecretToken: function () {},
        toString: function () {
            return this.resource_type ? this.resource_type + " (" + (this.isNew() ? "new" : this.resource_id) + "): " + (this.attributes.permalink || this.attributes.title || this.attributes.name) : Object.prototype.toString.call(this)
        },
        hasDataForView: function (e) {
            return this.attrExists(e)
        },
        updateResourceId: function () {
            var e = this.constructor.hashFn(this.attributes),
                t = this.resource_id;
            e && (this.resource_id = e, this.constructor.instances.changeKey(t, e))
        },
        attrExists: function (t) {
            var i = Object.prototype.hasOwnProperty;
            return (s || (s = e("underscore"))).isArray(t) ? t.every(i, this.attributes) : i.call(this.attributes, t)
        },
        equivalentTo: function (e) {
            return this === e || this.id && this.id === e.id
        },
        getUrn: function () {
            return this.urnPrefix && this.id ? this.urnPrefix + ":" + this.id : void 0
        },
        isPopulated: function () {
            return !!this.lastFetchTime
        }
    }, {
        _resolve: function (t, i, n) {
            var s, o, r = t.instances.find(n),
                l = $.Deferred();
            return r ? l.resolve(r) : (o = (c || (c = e("lib/url"))).stringify({
                scheme: document.location.protocol.replace(/:/, ""),
                host: (a || (a = e("config"))).get("public_api_host").replace(/^https?:\/\/api\./, ""),
                path: i
            }), s = (c || (c = e("lib/url"))).stringify({
                path: "resolve",
                query: {
                    url: o,
                    "_status_code_map[302]": 200,
                    _status_format: "json"
                }
            }), $.getJSON(s).done(function (e) {
                r = t.getNewInstance({}), r.baseUrl = e.location, r.set("permalink_url", o), r.fetch().done(function () {
                    t.instances.add(r), r.release(), l.resolve(r)
                }).fail(l.reject)
            }).fail(l.reject)), l
        }
    }), i.exports = (u || (u = e("lib/single"))).applyTo(n, {
        hashFn: function (e) {
            return e && (e.id || e.resource_id) || null
        },
        onCleanup: function (t) {
            t._submodels && t._submodels.length && ((s || (s = e("underscore"))).invoke(t._submodels, "release"), t._submodels.length = 0)
        },
        prepareArgs: function (t, i) {
            return i = i || {}, t = t || {}, i.parse && (t = this.parse(t), i = (s || (s = e("underscore"))).clone(i), i.parse = !1), [t, i]
        },
        prepareInstance: function (t, i) {
            return i = i || {}, i.collection && (this.lastFetchTime = Date.now()), (s || (s = e("underscore"))).isEmpty(t) || this.set(t), delete this.attributes.resource_id, this
        },
        getIncrementValue: function (e, t) {
            var i = t && t.collection;
            return i ? i.constructor.instances.countFor(i.resource_id) : 1
        }
    })
}),
define("lib/mixins/read-only", [], function (e, t, i) {
    var n, s, o;
    o = $.noop, s = i.exports = new(n || (n = e("lib/mixin")))({
        isReadOnly: !1,
        makeReadOnly: function () {
            this.isReadOnly = !0, this.set = this.reset = this.unset = o
        }
    })
}),
define("lib/helpers/name-helper", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = {
        get: function (t, i) {
            var n = (s || (s = e("vendor/handlebars-runtime"))).Utils.escapeExpression(t.username || t.title || t.name);
            return i === !0 && (n = (o || (o = e("lib/helpers/lang-helper"))).possessive(n)), n
        }
    }
}),
define("lib/helpers/dom-helper", [], function (e, t, i) {
    var n;
    n = i.exports = {
        insertScript: function (e, t) {
            var i, s, o = document.createElement("script"),
                r = document.getElementsByTagName("head")[0];
            o.async = !0, o.src = e, t = t || {}, i = t.removeAfterLoad ? r.removeChild.bind(r, o) : t.onload, s = t.onerror, (i || s) && n.onScriptLoad(o, i, s), r.appendChild(o)
        },
        onScriptLoad: function (e, t, i) {
            t && (e.addEventListener ? e.addEventListener("load", t, !1) : e.readyState && (e.onreadystatechange = t)), i && (e.onerror = i)
        }
    }
}),
define("lib/mixins/stores/persistent", [], function (e, t, i) {
    function n(t) {
        var i, n, s, r, a, u, c;
        return a = {
            dontPersist: !0
        }, t.key ? (f.lastIndex = 0, i = f.exec(t.key), void(i && (s = i[1], n = i[2], s && n && (r = g[s][n], r && (c = l(r), u = Object.keys(c), (o || (o = e("underscore"))).each(c, function (e, t) {
            r.set(t, e, a)
        }), (o || (o = e("underscore"))).difference(r.keys(), u).forEach(function (e) {
            r.unset(e, a)
        })))))) : void(o || (o = e("underscore"))).each((o || (o = e("underscore"))).values(g.local).concat((o || (o = e("underscore"))).values(g.session)), function (e) {
            e.reset(a)
        })
    }
    var s, o, r, a, l, u, c, d, h = "V2",
        p = "::",
        f = new RegExp("^" + h + p + "(\\S+?)" + p + "(\\S+)"),
        g = {
            local: {},
            session: {}
        };
    s = i.exports = new(r || (r = e("lib/mixin")))({
        storage: null,
        keyName: null,
        type: null,
        namespace: null,
        around: {
            initialize: function (t, i, n) {
                return n = n || "local", g[n][i] ? g[n][i] : (g[n][i] = this, t(), this.type = n, this.namespace = i, this.storage = c(n, i), this.keyName = u(n, i), this._store = l(this), void(this.length = (o || (o = e("underscore"))).keys(this._store).length))
            }
        },
        after: {
            set: function (e, t, i) {
                i && i.dontPersist || d(this)
            },
            unset: function (e, t) {
                t && t.dontPersist || d(this)
            },
            reset: function (e) {
                e && e.dontPersist || d(this)
            }
        },
        dispose: function () {
            this.storage.removeItem(this.keyName), this.reset({
                dontPersist: !0
            }), delete g[this.type][this.namespace]
        },
        write: function () {
            d(this)
        }
    }), u = function (e, t) {
        return [h, e, t].join(p)
    }, d = function (e) {
        var t = e.storage;
        if (t) try {
            return t.setItem(e.keyName, JSON.stringify(e._store)), !0
        } catch (i) {
            return !1
        }
    }, c = function (t) {
        var i;
        return "local" === t && (a || (a = e("lib/support"))).localStorage ? i = window.localStorage : "session" === t && (a || (a = e("lib/support"))).sessionStorage && (i = window.sessionStorage), i
    }, l = function (e) {
        var t = {}, i = e.storage;
        if (i) try {
            t = JSON.parse(i.getItem(e.keyName) || "{}")
        } catch (n) {
            t = {}
        }
        return t
    }, window.addEventListener("storage", n, !1)
}),
define("lib/action-controller", [], function (e, t, i) {
    function n(t) {
        var i, a, u, c = !1,
            d = t.list,
            h = t.state,
            p = t.target,
            f = t.origin,
            g = "user" !== t.originType || f === (l || (l = e("lib/connect"))).currentUserId();
        return a = $.Deferred(), g && !(l || (l = e("lib/connect"))).isLoggedIn() ? (l || (l = e("lib/connect"))).login().done(function () {
            t.origin = (l || (l = e("lib/connect"))).currentUserId(), n(t).done(a.resolve).fail(a.reject)
        }).fail(a.reject) : (d && g ? (i = function () {
            d.get(p) !== h ? (d.toggle(p, h), t.state = h = d.get(p), t.persist && (u = d.setRemote(p, h), u && u.fail(function (i, s) {
                "abort" !== s && o.trigger("error", (r || (r = e("underscore"))).extend({
                    xhr: i
                }, t)), n((r || (r = e("underscore"))).defaults({
                    persist: !1,
                    state: !h
                }, t))
            }))) : c = !0
        }, d.fetch().done(i).done(a.resolve).fail(a.reject)) : a.resolve(), a.done(function () {
            c || s(t)
        })), a
    }

    function s(e) {
        var t = e.action,
            i = e.origin,
            n = e.target;
        o.trigger([t, t + ":origin:" + e.originType + ":" + i, n ? t + ":target:" + e.targetType + ":" + n : ""].join(" "), {
            state: e.state,
            origin: i,
            originType: e.originType,
            object: e.object,
            target: n,
            targetType: e.targetType,
            targetModel: e.targetModel,
            context: e.context
        })
    }
    var o, r, a, l, u, c, d, h, p, f, g, m, v, b = {
            followings: new(c || (c = e("models/followings"))),
            followers: new(u || (u = e("models/followers"))),
            soundLikes: new(m || (m = e("models/sound-likes"))),
            playlistLikes: new(f || (f = e("models/playlist-likes"))),
            soundReposts: new(v || (v = e("models/sound-reposts"))),
            playlistReposts: new(g || (g = e("models/playlist-reposts"))),
            groups: new(d || (d = e("models/groups"))),
            mutings: new(p || (p = e("models/mutings")))
        };
    o = i.exports = (r || (r = e("underscore"))).extend({}, (a || (a = e("lib/backbone"))).Events, {
        notify: function (t, i) {
            i = (r || (r = e("underscore"))).defaults(i || {}, {
                action: t,
                origin: (l || (l = e("lib/connect"))).currentUserId(),
                originType: "user",
                object: null,
                target: null,
                targetType: null,
                targetModel: null,
                state: !0
            }), s(i)
        },
        follow: function (t, i, s) {
            var o, a, u, c = (l || (l = e("lib/connect"))).currentUserId();
            return s = (r || (r = e("underscore"))).defaults(s || {}, {
                action: "follow",
                origin: c,
                originType: "user",
                target: t,
                targetType: "user",
                state: i,
                persist: !0
            }), u = s.origin, u === s.target ? $.Deferred().resolve() : s.target === c ? (a = $.Deferred(), o = b.followers, o.fetch().done(function () {
                o.get(u) !== s.state && (o.toggle(u, s.state), s.state = o.get(u), n(s).done(a.resolve).fail(a.reject))
            }), a) : (s.list = u === c ? b.followings : null, n(s))
        },
        join: function (t, i, s) {
            return s = (r || (r = e("underscore"))).defaults(s || {}, {
                action: "join",
                origin: (l || (l = e("lib/connect"))).currentUserId(),
                originType: "user",
                target: t,
                targetType: "group",
                state: i,
                persist: !0,
                list: b.groups
            }), n(s)
        },
        destroy: function (t, i) {
            return i = (r || (r = e("underscore"))).defaults(i || {}, {
                action: "destroy",
                origin: (l || (l = e("lib/connect"))).currentUserId(),
                originType: "user",
                target: t.id,
                targetType: t.resource_type,
                targetModel: t,
                state: !0
            }), s(i), t.destroy()
        },
        like: function (t, i, s, o) {
            return o = (r || (r = e("underscore"))).defaults(o || {}, {
                action: "like",
                origin: (l || (l = e("lib/connect"))).currentUserId(),
                originType: "user",
                target: t,
                targetType: i,
                state: s,
                persist: !0,
                list: "playlist" === i ? b.playlistLikes : b.soundLikes
            }), n(o)
        },
        addToGroup: function (t, i, s, o) {
            var a = new(h || (h = e("models/groups-for-sound")))({}, {
                soundId: t
            });
            return o = (r || (r = e("underscore"))).defaults(o || {}, {
                action: "addToGroup",
                origin: t,
                originType: "sound",
                target: i,
                targetType: "group",
                state: s,
                persist: !0,
                list: a
            }), a.release(), n(o)
        },
        repost: function (t, i, s, o) {
            return o = (r || (r = e("underscore"))).defaults(o || {}, {
                action: "repost",
                origin: (l || (l = e("lib/connect"))).currentUserId(),
                originType: "user",
                target: t,
                targetType: i,
                state: s,
                persist: !0,
                list: "playlist" === i ? b.playlistReposts : b.soundReposts
            }), n(o)
        },
        mute: function (t, i, s, a) {
            var u;
            return s = i && s, a = (r || (r = e("underscore"))).defaults(a || {}, {
                action: "mute",
                origin: (l || (l = e("lib/connect"))).currentUserId(),
                originType: "user",
                target: t,
                targetType: "user",
                state: i,
                persist: !s,
                list: b.mutings
            }), u = n(a), s && (l || (l = e("lib/connect"))).isLoggedIn() && ($.ajax({
                url: "me/blockings",
                type: "POST",
                data: "user_id=" + t
            }), o.follow((l || (l = e("lib/connect"))).currentUserId(), !1, {
                origin: t
            })), u
        }
    })
}),
define("lib/collection", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c = {};
    n = (s || (s = e("lib/backbone"))).Collection.extend({
        next_href: null,
        lastFetchTime: null,
        model: c,
        defaults: {
            offset: 0,
            limit: 10,
            secret_token: null
        },
        initialize: function (e, t) {
            this.options = u(this.constructor, t || {}), this.setup(this.options)
        },
        setup: $.noop,
        _prepareModel: function (t) {
            var i = t instanceof(s || (s = e("lib/backbone"))).Model;
            return t = (s || (s = e("lib/backbone"))).Collection.prototype._prepareModel.apply(this, arguments), t && t.hold(this._usageCount() - (i ? 0 : 1)), t
        },
        _removeReference: function (t) {
            return t.release(this._usageCount()), (s || (s = e("lib/backbone"))).Collection.prototype._removeReference.apply(this, arguments)
        },
        fetch: function (t) {
            var i = t && t.url || (a || (a = e("underscore"))).result(this, "url");
            return i ? this._requests && this._requests[i] || (s || (s = e("lib/backbone"))).Collection.prototype.fetch.call(this, t) : $.Deferred().done(t && t.success).resolve({})
        },
        bulkFetch: function (e) {
            var t, i, n = arguments[1],
                s = arguments[2];
            if (!n) {
                if (this._requests = this._requests || {}, this._requests.bulk) return this._requests.bulk;
                this._requests.bulk = n = $.Deferred(), n.always(function () {
                    delete this._requests.bulk
                }.bind(this)), s = this.length, t = this.options.limit, this.next_href || (this.options.limit = e - this.length), n.always(function () {
                    this.options.limit = t, l.call(this, {
                        limit: t
                    })
                }.bind(this))
            }
            return this.length < e && this.url() ? (i = this.lastFetchTime ? {
                add: !0
            } : {}, i.silent = !0, l.call(this, {
                limit: e - this.length
            }), this.fetch(i).done(function () {
                this.bulkFetch(e, n, s)
            }.bind(this)).fail(n.reject)) : (s ? this.rest(s).forEach(function (e) {
                this.trigger("add", e, this)
            }, this) : this.trigger("reset", this, {}), n.resolve()), n
        },
        url: function () {
            if (null !== this.next_href) return this.next_href;
            var t = (r || (r = e("lib/url"))).parse((a || (a = e("underscore"))).result(this, "baseUrl"));
            return (a || (a = e("underscore"))).extend(t.query, {
                limit: this.options.limit,
                offset: this.options.offset,
                linked_partitioning: 1
            }), this.options.secret_token && (t.query.secret_token = this.options.secret_token), (r || (r = e("lib/url"))).stringify(t)
        },
        parse: function (e) {
            return e.collection
        },
        empty: function () {
            this.next_href = null, this.lastFetchTime = null, this.options.offset && (this.options.offset = 0), this.reset(null, {
                silent: !0
            })
        },
        hasDataForView: function () {
            return !!this.lastFetchTime
        },
        isPopulated: function () {
            return !!this.lastFetchTime
        },
        isFullyPopulated: function () {
            return this.next_href === !1
        },
        setLimit: function (t) {
            this.options.limit = t, this.next_href && (this.next_href = (r || (r = e("lib/url"))).modify(this.next_href, {
                query: {
                    limit: t
                }
            }))
        },
        indexOfEquivalentModel: function (e, t, i) {
            var n = -1,
                s = this.compareModels.bind(this, e);
            return t = t || this.models, i = i || 0, i && (t = t.slice(i)), t.some(function (e, t) {
                return s(e) ? (n = t + i, !0) : void 0
            }), n
        },
        compareModels: function (e, t) {
            return e === t || e.equivalentTo(t)
        }
    }), n = i.exports = (o || (o = e("lib/single"))).applyTo(n, {
        hashFn: function (e, t) {
            return t && t.resource_id || null
        },
        onHold: function (e, t, i) {
            e.length && e.at(0).hold && e.invoke("hold", i)
        },
        onRelease: function (e, t, i) {
            e.length && e.at(0).release && e.invoke("release", i)
        }
    }), u = function (t, i) {
        return (a || (a = e("underscore"))).defaults(i, t.prototype.defaults), t === n ? i : u(t.__super__.constructor, i)
    }, l = function (t) {
        if (this.next_href) {
            var i = (r || (r = e("lib/url"))).parse(this.next_href);
            (a || (a = e("underscore"))).extend(i.query, t), this.next_href = (r || (r = e("lib/url"))).stringify(i)
        }
    }
}),
define("models/product", [], function (e, t, i) {
    var n, s, o, r, a, l, u;
    n = i.exports = (a || (a = e("lib/model"))).extend({
        url: null,
        resource_type: "product",
        setup: function (t) {
            var i = (s || (s = e("underscore"))).extend({}, (u || (u = e("config/products")))[t.id], t);
            this.set(i)
        },
        isOptin: function () {
            return this.get("opt_in")
        },
        isGift: function () {
            return "gift" === this.get("type")
        },
        getLevel: function () {
            return (l || (l = e("config/perks"))).get(this.get("planId"), "planLevel")
        },
        getUrn: function (e) {
            var t = this.get(e);
            return t ? t.urn : ""
        },
        getMeRelation: function () {
            var t, i, s = (o || (o = e("config"))).get("me"),
                a = n.meRelations.DEFAULT;
            return !(r || (r = e("lib/connect"))).isLoggedIn() || this.isGift() ? a : (t = s.getPerk("planLevel"), i = this.getLevel(), this.isOptin() ? a = n.meRelations.OPTIN : t && t > n.planLevels.FREE && (t === i && s.isCreatorPro() ? a = n.meRelations.RENEW : t > i && s.isCreatorPro() ? a = n.meRelations.DOWNGRADE : i > t && (a = n.meRelations.UPGRADE)), a)
        },
        hasDataForView: function () {
            return !0
        }
    }, {
        meRelations: {
            DEFAULT: "default",
            OPTIN: "optin",
            RENEW: "renew",
            DOWNGRADE: "downgrade",
            UPGRADE: "upgrade"
        },
        planLevels: {
            FREE: 0,
            PRO: 1,
            UNLIMITED: 2
        }
    })
}),
define("config/products", [], function (e, t, i) {
    var n, s, o = {
            free: "Count plays, likes, comments, and downloads.",
            pro: "Get details on who's playing your tracks and where they are.",
            unlimited: "Know from which pages, apps, and social networks your tracks are being played."
        }, r = [{
            name: "Basic stats",
            features: [o.free]
        }, {
            name: "Extensive stats",
            features: [o.free, o.pro]
        }, {
            name: "Comprehensive stats",
            features: [o.free, o.pro, o.unlimited]
        }],
        a = {
            free: {
                title: "Free",
                upload: "Upload <strong>2 hours</strong> total",
                stats: r[(s || (s = e("config/perks"))).get("free", "stats")],
                quietMode: {
                    isEnabled: (s || (s = e("config/perks"))).get("free", "quietMode"),
                    message: "No Quiet Mode"
                },
                spotlight: {
                    isEnabled: (s || (s = e("config/perks"))).get("free", "spotlight"),
                    message: "No Spotlight"
                }
            },
            "creator-pro": {
                title: "Pro",
                upload: "Upload <strong>4 hours</strong> total",
                stats: r[(s || (s = e("config/perks"))).get("creator-pro", "stats")],
                quietMode: {
                    isEnabled: (s || (s = e("config/perks"))).get("creator-pro", "quietMode"),
                    message: "Post in Quiet Mode"
                },
                spotlight: {
                    isEnabled: (s || (s = e("config/perks"))).get("creator-pro", "spotlight"),
                    message: "Spotlight your tracks and playlists on your Profile"
                }
            },
            "creator-pro-unlimited": {
                title: "Pro Unlimited",
                upload: "Upload <strong>unlimited*</strong> tracks",
                stats: r[(s || (s = e("config/perks"))).get("creator-pro-unlimited", "stats")],
                quietMode: {
                    isEnabled: (s || (s = e("config/perks"))).get("creator-pro-unlimited", "quietMode"),
                    message: "Post in Quiet Mode"
                },
                spotlight: {
                    isEnabled: (s || (s = e("config/perks"))).get("creator-pro-unlimited", "spotlight"),
                    message: "Spotlight your tracks and playlists on your profile and your tracks in embedded players."
                }
            }
        };
    n = i.exports = {
        free: {
            id: "free",
            planId: "free",
            title: a.free.title,
            features: a.free
        },
        "creator-subscription-pro": {
            id: "creator-subscription-pro",
            planId: "creator-pro",
            type: "subscription",
            title: a["creator-pro"].title,
            features: a["creator-pro"],
            opt_in: !1,
            monthly: {
                urn: "",
                price: "",
                currency: "EUR"
            },
            yearly: {
                urn: "",
                price: "",
                currency: "EUR"
            }
        },
        "creator-subscription-pro-unlimited": {
            id: "creator-subscription-pro-unlimited",
            planId: "creator-pro-unlimited",
            type: "subscription",
            title: a["creator-pro-unlimited"].title,
            features: a["creator-pro-unlimited"],
            opt_in: !1,
            monthly: {
                urn: "",
                price: "",
                currency: "EUR"
            },
            yearly: {
                urn: "",
                price: "",
                currency: "EUR"
            }
        },
        "creator-gift-pro": {
            id: "creator-gift-pro",
            planId: "creator-pro",
            type: "gift",
            title: a["creator-pro"].title,
            features: a["creator-pro"],
            opt_in: !1,
            yearly: {
                urn: "",
                price: "",
                currency: "EUR"
            }
        },
        "creator-gift-pro-unlimited": {
            id: "creator-gift-pro-unlimited",
            planId: "creator-pro-unlimited",
            type: "gift",
            title: a["creator-pro-unlimited"].title,
            features: a["creator-pro-unlimited"],
            opt_in: !1,
            yearly: {
                urn: "",
                price: "",
                currency: "EUR"
            }
        }
    }
}),
define("models/audible", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = function (t, i) {
        var n = t.resource_type;
        return t = (s || (s = e("underscore"))).omit(t, "resource_type"), "playlist" === n ? new(o || (o = e("models/playlist")))(t, i) : new(r || (r = e("models/sound")))(t, i)
    }, n.getClass = function (t) {
        var i = t.resource_type;
        return "playlist" === i ? o || (o = e("models/playlist")) : r || (r = e("models/sound"))
    }
}),
define("lib/mixins/audio-source", [], function (e, t, i) {
    var n, s;
    n = i.exports = new(s || (s = e("lib/mixin")))({
        requires: ["getSourceInfo"]
    })
}),
define("lib/helpers/environment-helper", [], function (e, t, i) {
    var n;
    n = i.exports = {
        getFlashPlugin: function () {
            var e, t, i, n;
            if ("undefined" != typeof window.ActiveXObject) try {
                n = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"), n && (e = n.GetVariable("$version"))
            } catch (s) {} else navigator.plugins && navigator.plugins.length > 0 && (i = "application/x-shockwave-flash", t = navigator.mimeTypes, t && t[i] && t[i].enabledPlugin && t[i].enabledPlugin.description && (e = t[i].enabledPlugin.description));
            return e
        },
        getFlashVersion: function () {
            var e = this.getFlashPlugin().match(/\d\S+/)[0].replace(/,/g, ".").split(".");
            return [e[0], e[1]].join(".")
        },
        getOperatingSystem: function () {
            var e = navigator.appVersion;
            return -1 !== e.indexOf("Win") ? "Windows" : -1 !== e.indexOf("Mac") ? "MacOS" : -1 !== e.indexOf("X11") ? "UNIX" : -1 !== e.indexOf("Linux") ? "Linux" : "undefined-OS"
        },
        getBrowser: function () {
            var e, t, i = navigator.userAgent,
                n = i.match(/(opera|chrome|safari|firefox|msie|applewebkit)\/?\s*(\.?\d+(\.\d+)*)/i),
                s = i.match(/version\/([\.\d]+)/i);
            return t = null !== s ? s[1] : n ? n[2] : null, e = n ? [n[1], t] : [navigator.appName, navigator.appVersion], e.join()
        }
    }
}),
define("lib/mixins/has-editable-image", [], function (e, t, i) {
    function n(t) {
        var i, n = $.Deferred(),
            s = (p || (p = e("lib/helpers/image-helper"))).setFormat(t[this.imageProperties.read], 20),
            o = this,
            r = new(d || (d = e("lib/circuit-breaker")))({
                tolerance: 1,
                baseDelay: 2e3,
                maxDelay: 8e3,
                backoffRate: 1.5,
                giveup: 6,
                enabled: !1
            }),
            a = new Image;
        return this.set("_uploadingImage", null), (h || (h = e("event-bus"))).trigger("upload:image:upload_success", this._imageSource), a.onload = function () {
            var s = o.imageProperties.read;
            o.get(s) === t[s] && o.change({
                force: [s]
            }), o.set(t), o.unsetImageFile(), (v || (v = e("lib/tracking"))).endTiming(i, {
                category: "upload",
                variable: "image"
            }), n.resolve(t)
        }, a.onerror = function () {
            r.failed()
        }, i = (v || (v = e("lib/tracking"))).startTiming(), r.on("enabled", function () {
            a.src = s + "&" + Date.now()
        }).on("giveup", n.reject), n
    }

    function s(t) {
        (c || (c = e("lib/action-controller"))).trigger("error", {
            action: "upload_image",
            xhr: t
        }), this.unsetImageFile()
    }

    function o(e) {
        var t = new FileReader,
            i = $.Deferred();
        return t.onload = function (e) {
            var t = new Image;
            t.onload = i.resolve.bind(i, t), t.src = e.target.result
        }, t.onerror = t.onabort = i.reject, t.readAsDataURL(e), i
    }

    function r(e, t) {
        var i = $.Deferred();
        return o(e).done(function (e) {
            var n, s = document.createElement("canvas"),
                o = s.getContext("2d"),
                r = a(e.width, e.height);
            n = t / Math.min(e.width, e.height), s.width = s.height = t, o.imageSmoothingEnabled = o.mozImageSmoothingEnabled = o.oImageSmoothingEnabled = o.webkitImageSmoothingEnabled = !0, o.drawImage(e, r.x, r.y, r.w, r.h, 0, 0, t, t), i.resolve(s.toDataURL("image/png"))
        }).fail(i.reject), i
    }

    function a(e, t) {
        var i = e - t;
        return i > 0 ? {
            x: Math.floor(i / 2),
            y: 0,
            w: t,
            h: t
        } : {
            x: 0,
            y: Math.floor(-i / 2),
            w: e,
            h: e
        }
    }
    var l, u, c, d, h, p, f, g, m, v;
    l = i.exports = new(f || (f = e("lib/mixin")))({
        _imageFile: null,
        _imageSource: null,
        _imageDataURI: null,
        applyTo: function (t, i) {
            t.imageProperties = (u || (u = e("underscore"))).pick(i, "read", "write")
        },
        defaults: {
            getImageAltText: function () {
                return this.get("username") ? (g || (g = e("lib/helpers/name-helper"))).get(this.attributes, !0) + " avatar" : (g || (g = e("lib/helpers/name-helper"))).get(this.attributes)
            },
            getImageSaveUrl: function () {
                return this.saveUrl()
            }
        },
        getImageUrl: function (t) {
            return this._imageDataURI || (p || (p = e("lib/helpers/image-helper"))).urlFrom(this.attributes, t)
        },
        hasOwnImage: function () {
            return !!this._imageDataURI || !(p || (p = e("lib/helpers/image-helper"))).isDefaultImage(this.get(this.imageProperties.read))
        },
        getPlaceholderUrl: function (t) {
            return this._imageDataURI ? !1 : (p || (p = e("lib/helpers/image-helper"))).getPlaceholderUrl(this.getImageUrl(), t)
        },
        getImageFileInfo: function () {
            return {
                file: this._imageFile,
                source: this._imageSource
            }
        },
        setImageFile: function (e, t) {
            this._imageSource = t, this._imageFile = e, r(e, 500).done(function (i) {
                this._imageDataURI = i, this.trigger("imageDataChanged", {
                    file: e,
                    source: t
                })
            }.bind(this))
        },
        unsetImageFile: function (e) {
            this._imageFile = this._imageSource = null, this._imageDataURI = null, e && e.silent || this.trigger("imageDataChanged", {
                file: null,
                source: null
            })
        },
        uploadImage: function () {
            var t, i = this._imageFile;
            if ((m || (m = e("lib/support"))).formData && i) return (h || (h = e("event-bus"))).trigger("upload:image:upload_started", this._imageSource), t = new window.FormData, t.append(this.get("kind") + "[" + this.imageProperties.write + "]", i), $.ajax({
                url: this.getImageSaveUrl(),
                type: "PUT",
                data: t,
                processData: !1,
                contentType: !1,
                dataType: "json"
            }).pipe(n.bind(this), s.bind(this))
        }
    })
}),
define("lib/mixins/has-title", [], function (e, t, i) {
    var n, s;
    n = i.exports = new(s || (s = e("lib/mixin")))({
        applyTo: function (e, t) {
            e.getTitleAttribute = function () {
                return t.attr
            }
        }
    })
}),
define("lib/mixins/models/has-visuals", [], function (e, t, i) {
    function n(e) {
        return e && (e.attrs && e.attrs.indexOf("visuals") > -1 || e.url && e.url.indexOf("streams") > -1)
    }

    function s(e) {
        var t = e && e.attrs;
        return !t || t.length > 1 || "visuals" !== t[0]
    }

    function o() {
        var t = (d || (d = e("lib/url"))).stringify({
            path: "/visuals",
            query: {
                urn: this.getUrn()
            }
        }, (u || (u = e("config"))).get("visualsHost"));
        return t
    }
    var r, a, l, u, c, d, h, p, f, g, m = 5e3;
    r = i.exports = new(c || (c = e("lib/mixin")))({
        _lastVisualsFetch: null,
        around: {
            fetch: function (t, i) {
                var r, u, c;
                return f || (f = new(l || (l = e("lib/circuit-breaker")))({
                    giveUp: 1
                })), c = [], s(i) && c.push(t(i)), n(i) && (g || (g = new(h || (h = e("models/visuals-list")))), g.fetch(), this._lastVisualsFetch || null != this.get("visuals") ? u = this._lastVisualsFetch : (this._lastVisualsFetch = u = $.Deferred(), this.mayHaveVisuals() ? f.enabled ? $.ajax({
                    dataType: "json",
                    url: o.call(this),
                    timeout: m
                }).done(function (t) {
                    var i, n = t.visuals || this.get("visuals") || {};
                    t.tracking && (n.tracking = t.tracking), n && "sound" === this.resource_type && (i = new(p || (p = e("collections/sound-visuals")))((a || (a = e("underscore"))).map(n, function (e) {
                        return null != e.entry_time ? (e.id = e.entry_time, e) : void 0
                    }).filter((a || (a = e("underscore"))).identity), {
                        resource_id: this.resource_id
                    }), i.lastFetchTime = Date.now(), i.release()), this.set("visuals", n)
                }.bind(this)).always(function (e, t, i) {
                    "timeout" === i && f.failed(), this.set("visuals", this.get("visuals")), u.resolve()
                }.bind(this)) : (this.set("visuals", this.get("visuals")), u.resolve()) : (u.resolve(), this.set("visuals", {}))), u && c.push(u)), r = $.Deferred(), $.whenAll(c).done(function (e) {
                    r.resolve.apply(null, e)
                }).fail(r.reject), r
            }
        },
        mayHaveVisuals: function () {
            return !g || g.get(this.getUrn()) !== !1
        },
        hasVisuals: function () {
            return !(a || (a = e("underscore"))).isEmpty(this.get("visuals"))
        }
    })
}),
define("config/perks", [], function (e, t, i) {
    var n, s, o;
    s = ["free", "lite", "solo", "pro", "pro-plus", "creator-pro", "creator-pro-unlimited"], o = {
        customBuyTitle: [!1, !0, !0, !0, !0, !0, !0],
        quietMode: [!1, !0, !0, !0, !0, !0, !0],
        planLevel: [0, 1, 2, 2, 2, 1, 2],
        spotlight: [!1, !0, !0, !0, !0, !0, !0],
        stats: [0, 1, 2, 2, 2, 1, 2],
        visuals: [!1, !0, !0, !0, !0, !0, !0],
        widgets: [!1, !0, !0, !0, !0, !0, !0],
        widgetHideRecommendations: [!1, !1, !1, !1, !0, !1, !0],
        adFree: [!1, !0, !0, !0, !0, !0, !0]
    }, n = i.exports = {
        get: function (e, t) {
            return o[t][s.indexOf(e)]
        }
    }
}),
define("lib/mixins/models/shortenable", [], function (e, t, i) {
    function n(e, t) {
        var i = this.getShareURL(t),
            n = u.get(i);
        n ? e.resolve(n) : s(i).always(function (t) {
            "string" != typeof t && (t = null), u.set(i, t), e.resolve(t)
        })
    }

    function s(t) {
        return $.ajax({
            url: (a || (a = e("lib/url"))).modify(d, {
                query: {
                    url: t
                }
            }),
            timeout: c
        })
    }
    var o, r, a, l, u = new(l || (l = e("lib/store")))({
            maxLength: 25
        }),
        c = 15e3,
        d = "e1/shorten";
    o = i.exports = new(r || (r = e("lib/mixin")))({
        shortenUrl: function (e) {
            var t = $.Deferred(),
                i = this.getShareURL(e);
            return i ? n.call(this, t, e) : this.fetch().always(n.bind(this, t, e)), t
        }
    })
}),
define("lib/analytics", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d, h, p, f, g;
    g = {
        "default": 0,
        stream: 1,
        you: 2,
        search: 3,
        tags: 4,
        users: 6,
        sounds: 7,
        homepage: 8,
        onboarding: 9,
        group: 10,
        explore: 11,
        premium: 12,
        messages: 13
    }, (o || (o = e("vendor/js-atinternet-storage/js-atinternet-storage"))).init("v2"), (u || (u = e("vendor/event-logger/event-logger"))).initialize({
        id: (a || (a = e("config"))).get("client_application_id"),
        trackingUrl: (a || (a = e("config"))).get("eventlogger_tracking_url"),
        anonymousUserId: (l || (l = e("lib/connect"))).getAnonymousUserIdentifier()
    }), n = i.exports = {
        trackPageView: function (t, i, n, o) {
            var r = i.join("::"),
                a = "";
            (s || (s = e("underscore"))).each(o, function (e, t) {
                    a += "&" + t + "=" + e
                }), f("xt_med", "F", g[t] || g["default"], r + a), null != window._gaq && window._gaq.push(["_trackPageview", r]), (u || (u = e("vendor/event-logger/event-logger"))).pageview(n, t, i)
        },
        trackAudioEvent: function (t) {
            var i = g[t.level],
                n = t.sound.playlist,
                s = t.sourceInfo || {};
            f("xt_rm", "audio", i, t.ATIchapter, t.action, "", t.steps, t.duration, "", "", "", "int", "clip", ""), (u || (u = e("vendor/event-logger/event-logger"))).audio({
                user: t.user,
                level: t.level,
                action: t.action,
                id: t.sound.id,
                duration: t.duration,
                source: s.type || null,
                sourceVersion: s.version || null,
                trigger: t.trigger,
                protocol: t.protocol,
                setId: n && n.id,
                setPosition: n ? n.getSoundIndex(t.sound) : null
            })
        },
        trackClick: function (t, i, n, s) {
            (o || (o = e("vendor/js-atinternet-storage/js-atinternet-storage"))).push({
                page: i.map(encodeURIComponent).join("::"),
                level: g[t],
                type: "A"
            }), (u || (u = e("vendor/event-logger/event-logger"))).click(n, t, i, s)
        },
        trackImpression: function (t, i, n, r) {
            var a;
            i && i.length && (o || (o = e("vendor/js-atinternet-storage/js-atinternet-storage"))).push({
                page: i.join("::"),
                level: g[t],
                type: "A"
            }), (u || (u = e("vendor/event-logger/event-logger"))).impression(n, t, r), r.impression && (a = (s || (s = e("underscore"))).isArray(r.impression) ? r.impression : [r.impression], a.forEach(function (e) {
                var t = new Image;
                t.src = e
            }))
        },
        trackTiming: function (e, t, i, n, s) {
            null != window._gaq && window._gaq.push(["_trackTiming", e, t, i, n, s])
        },
        trackAudioError: function (t) {
            (r || (r = e("lib/audio-error-tracker"))).log(t)
        },
        trackAudioPerformance: function (t) {
            (u || (u = e("vendor/event-logger/event-logger"))).audioPerformance(t)
        },
        trackAppError: function (e) {
            if (null != window._gaq) {
                var t = e.get("error") || {}, i = e.get("message"),
                    n = t.filename || "",
                    s = t.lineno || "";
                window._gaq.push(["_trackEvent", "Errors", i, n + ":" + s, null, !0])
            }
        },
        trackStats: function (t, i) {
            (u || (u = e("vendor/event-logger/event-logger"))).performRequestWithUser(t, "/stats_view", i)
        },
        _globalVariablesMap: {
            id: "xt_an",
            plan: "xt_ac",
            customs: "xt_multc"
        },
        _definedCustomVariablesMap: {
            track_count: "x1",
            likes_count: "x2",
            comments_count: "x3",
            followings_count: "x4",
            followers_count: "x5",
            experiments: "x7",
            playlist_count: "x8",
            reposts_count: "x9",
            onboarded_on: "x10"
        },
        setCustomVariables: function (t) {
            var i = this._definedCustomVariablesMap;
            (s || (s = e("underscore"))).each(t, function (t, n) {
                var o, r, a, l = this._globalVariablesMap[n];
                $.isPlainObject(t) ? (o = "", r = {}, (s || (s = e("underscore"))).each(t, function (e, t) {
                    o += "&" + i[t] + "=" + e, r[i[t]] = e
                }.bind(this)), window[l] = o) : (a = {}, a[l] = t, window[l] = t)
            }.bind(this))
        },
        initialize: function () {
            (s || (s = e("underscore"))).invoke([c || (c = e("vendor/includes/ati")), d || (d = e("vendor/includes/google-analytics")), p || (p = e("vendor/includes/quantcast")), h || (h = e("vendor/includes/google-tag-manager"))], "include")
        }
    }, f = function () {
        var e = [],
            t = [].slice,
            i = function () {
                var t, i = 30;
                t = setInterval(function () {
                    window.xt_rm && window.xt_med ? (clearInterval(t), e.forEach(function (e) {
                        window[e.shift()].apply(null, e)
                    }), e = null) : --i || (clearInterval(t), e = null)
                }, 500)
            };
        return function (n) {
            var s = t.call(arguments),
                o = window[n];
            o ? o.apply(null, s.slice(1)) : e && (e.push(s), 1 === e.length && (i(), i = null))
        }
    }()
}),
define("lib/math", [], function (e, t, i) {
    i.exports = {
        precise: function (e, t) {
            return t = Math.pow(10, t || 0), Math.round(e * t) / t
        },
        clamp: function (e, t, i) {
            return Math.min(i, Math.max(t, e))
        }
    }
}),
define("models/sound", [], function (e, t, i) {
    function n(t) {
        var i = t ? "on" : "off";
        (a || (a = e("lib/action-controller")))[i]("like:target:sound:" + this.id, this.onLike, this)[i]("repost:target:sound:" + this.id, this.onRepost, this)
    }

    function s() {
        (p || (p = e("event-bus"))).trigger.apply(p || (p = e("event-bus")), ["tracking:playStart"].concat(C.call(arguments)))
    }
    var o, r, a, l, u, c, d, h, p, f, g, m, v, b, _, y, w, x, k, S, C = Array.prototype.slice,
        T = .25;
    o = i.exports = (c || (c = e("models/audible-interface"))).extend(d || (d = e("lib/mixins/models/batching")), m || (m = e("lib/mixins/models/has-visuals")), y || (y = e("lib/mixins/models/shortenable")), b || (b = e("lib/mixins/models/polling-model")), (g || (g = e("lib/mixins/has-title"))).withOptions({
        attr: "title"
    }), (f || (f = e("lib/mixins/has-editable-image"))).withOptions({
        read: "artwork_url",
        write: "artwork_data"
    }), {
        resource_type: "sound",
        urnPrefix: "soundcloud:sounds",
        audio: null,
        submodelMap: {
            user: k || (k = e("models/user")),
            created_with: u || (u = e("models/app"))
        },
        timeOffset: 0,
        playlist: null,
        originalSound: null,
        setup: function (t, i) {
            (c || (c = e("models/audible-interface"))).prototype.setup.apply(this, arguments);
            var o = !(!i || !i.suppressGlobalEvents);
            this.audio = new(_ || (_ = e("lib/audio")))(this), this.on("play", S("play", o), this).on("pause", S("pause", o), this).on("seeked", S("seeked", o), this).on("finish", S("finish", o), this).on("playStart", s), this.id ? n.call(this, !0) : this.one("change:id", n.bind(this, !0))
        },
        baseUrl: function () {
            return (x || (x = e("lib/url"))).stringify({
                path: ["tracks", this.id]
            })
        },
        batchUrl: function (t) {
            return (x || (x = e("lib/url"))).stringify({
                path: ["tracks"],
                query: {
                    ids: t.join(",")
                }
            })
        },
        streamsUrl: function () {
            return (x || (x = e("lib/url"))).stringify({
                path: ["i1", "tracks", this.id, "streams"]
            })
        },
        getImageSaveUrl: function () {
            return (v || (v = e("lib/model"))).prototype.saveUrl.apply(this, arguments)
        },
        fetchStreams: function () {
            return this.fetch({
                url: this.url("streamsUrl"),
                dataType: "json",
                jqAjax: !0,
                saveRequest: !0
            })
        },
        extractSecretToken: function (t) {
            return (x || (x = e("lib/url"))).parse(t.stream_url).query.secret_token
        },
        play: function (t) {
            if (!(w || (w = e("lib/support"))).audio) return void(p || (p = e("event-bus"))).trigger("error:audio_support");
            if (this.playlist) {
                var i = this.playlist.isPaused();
                this.playlist.seek(this.timeOffset + this.currentTime()), i && this.playlist.play(t)
            } else this.audio.play(t)
        },
        pause: function (e) {
            this.playlist ? this.playlist.pause(e) : this.audio.pause(e)
        },
        seek: function (e) {
            var t = this.loadProgress() * this.duration();
            Math.floor(e) !== Math.floor(this.currentTime()) && this.audio.seek(Math.min(e, t))
        },
        getSounds: function () {
            return [this]
        },
        getNumSounds: function () {
            return 1
        },
        getSoundAt: function () {
            return this
        },
        getCurrentSound: function () {
            return this
        },
        getFirstSound: function () {
            return this
        },
        getLastSound: function () {
            return this
        },
        getPrevSound: function () {
            return void 0
        },
        getNextSound: function () {
            return void 0
        },
        getSoundIndexAt: function () {
            return 0
        },
        getSoundIndex: function (e) {
            return e === this ? 0 : -1
        },
        isPlaying: function () {
            return this.audio.isPlaying()
        },
        loadProgress: function () {
            return this.audio.loadProgress()
        },
        currentTime: function () {
            return this.audio.currentTime()
        },
        isLooping: function () {
            return this.audio.isLooping()
        },
        getListenTime: function () {
            return this.audio.getListenTime()
        },
        toggleLooping: function (e, t) {
            return this.audio.toggleLooping(e, t)
        },
        isPlayable: function () {
            return this.get("playable") !== !1
        },
        isProcessing: function () {
            return "finished" !== this.get("state")
        },
        isEditing: function () {
            return !1
        },
        isCommentable: function () {
            return this.get("commentable")
        },
        getRelativeTrackLength: function () {
            return 1
        },
        getOriginalSound: function () {
            return this.originalSound || this
        },
        hasMinPlayTime: function () {
            return this.audio.getListenTime() >= T * this.duration()
        },
        updateCommentCount: function (e) {
            var t = this.get("comment_count");
            this.set({
                comment_count: t + (e ? 1 : -1)
            })
        },
        progress: function () {
            var e, t = this.duration();
            if (this.playlist) {
                if (e = this.playlist.currentTime(), e <= this.timeOffset) return 0;
                if (e >= this.timeOffset + t) return 1
            }
            return this.currentTime() / t
        },
        toJSON: function () {
            var t = (v || (v = e("lib/model"))).prototype.toJSON.apply(this, arguments);
            return t._playlist = {}, this.playlist && (r || (r = e("underscore"))).each(["id", "permalink", "permalink_url", "secret_token", "user_id"], function (e) {
                t._playlist[e] = this.get(e)
            }.bind(this.playlist)), t
        },
        saveUrl: function () {
            return this.isNew() ? (v || (v = e("lib/model"))).prototype.saveUrl.apply(this, arguments) : (x || (x = e("lib/url"))).stringify({
                path: "/tracks/" + this.getUrn()
            }, (h || (h = e("config"))).get("api_v2_host"))
        },
        saveFormat: function () {
            return this.isNew() ? "param" : "json"
        },
        getAttributesToBeSaved: function () {
            var t = {};
            return t[(l || (l = e("lib/api-wrapper"))).toAPIResource(this.resource_type)] = ["api_streamable", "bpm", "commentable", "description", "downloadable", "embeddable", "genre", "isrc", "key_signature", "label_id", "label_name", "license", "original_filename", "permalink", "purchase_title", "purchase_url", "release", "release_day", "release_month", "release_year", "reveal_comments", "reveal_stats", "sharing", "shared_to", "tag_list", "title", "uid", "scheduled_private_date", "scheduled_public_date", "scheduled_timezone", "geo_blockings"].reduce(function (e, t) {
                return null != this[t] && (e[t] = this[t]), e
            }.bind(this.attributes), {}), t
        }
    }, {
        states: {
            READY: "ready",
            PROCESSING: "processing",
            FAILED: "failed",
            FINISHED: "finished"
        },
        hashFn: function (e) {
            var t = e.resource_id;
            if (t) {
                if ("object" == typeof t) {
                    if (t.playlist_id) return [t.playlist_id, t.sound_id].join("_");
                    if (t.ad_target_id) return ["ad", t.ad_target_id, t.sound_id].join("_")
                }
                return t
            }
            return e.id || null
        },
        resolve: function (t, i, n) {
            return (v || (v = e("lib/model")))._resolve(this, [t, i, n], function (e) {
                var n = e.get("user");
                return n && e.get("permalink") === i && n.permalink === t
            })
        },
        onCleanup: function () {
            n.call(this, !1)
        }
    }), S = (r || (r = e("underscore"))).memoize(function (t, i) {
        return function () {
            var n = C.call(arguments);
            i || (p || (p = e("event-bus"))).trigger.apply(p || (p = e("event-bus")), ["audio:" + t].concat(n)), (p || (p = e("event-bus"))).trigger.apply(p || (p = e("event-bus")), ["tracking:" + t].concat(n))
        }
    }, function (e, t) {
        return e + (t ? "" : "-global")
    })
}),
define("lib/mixins/views/overlay", [], function (e, t, i) {
    function n(t) {
        var i = t ? "on" : "off";
        (h || (h = e("event-bus")))[i](f.OPENED, this.onOverlayOpen, this)[i]("layout:beforeChange", this.onLayoutChange, this), $(document)[i]("keydown", this.onDocumentKeydown), document[t ? "addEventListener" : "removeEventListener"]("click", this.onDocumentClick, !0), $(window)[i]("scroll", this.onWindowScroll)[i]("resize", this.onWindowResize)
    }

    function s() {
        var e = this.options;
        e.zIndexLevel ? this.$el.addClass("g-z-index-" + e.zIndexLevel) : $(e.relativeElement).closest(".g-z-index-fixed").length && this.$el.removeClass("g-z-index-content").addClass("g-z-index-fixed")
    }

    function o(e, t) {
        var i = t.element.element,
            n = t.target.element,
            s = e.top,
            o = e.left,
            r = "absolute",
            a = $(window).height(),
            u = i.height(),
            c = 45 + this.options.margin,
            d = a - u - 30;
        l(n) ? (s -= $(window).scrollTop(), r = "fixed", 0 > s && (s = e.top)) : (d += window.scrollY, c += window.scrollY), c > s ? s = c : s > d && (s = d), i.css({
            position: r,
            top: s,
            left: o
        })
    }

    function r(e) {
        if (e)
            for (; e = e.parentNode;)
                if (e instanceof HTMLElement && "fixed" === $(e).css("position")) return !0;
        return !1
    }

    function a() {
        return !0
    }

    function l(e) {
        return e.length ? "fixed" === e.css("position") ? !0 : e.is("html") ? !1 : l(e.parent()) : !1
    }
    var u, c, d, h, p, f = {
            OPENED: "overlay:opened",
            CLOSED: "overlay:closed"
        }, g = 300;
    u = i.exports = new(p || (p = e("lib/mixin")))({
        applyTo: function (t) {
            var i = t.constructor;
            (c || (c = e("underscore"))).extend(i, {
                Events: f
            }), t.defaults = (c || (c = e("underscore"))).defaults(t.defaults || {}, {
                Subview: null,
                subviewArgs: null,
                togglerEl: null,
                relativeElement: null,
                relativeElementAnchor: "center bottom",
                anchor: "center top",
                offset: "0 0",
                collision: "flip",
                width: "auto",
                minHeight: "auto",
                domId: null,
                zIndexLevel: "overlay",
                focusable: !0,
                margin: 0
            }), t.element2selector = (c || (c = e("underscore"))).extend({}, t.element2selector, {
                "last-tabbable": ":tabbable:last",
                "first-tabbable": ":tabbable:first"
            }), t.bubbleEvents = (c || (c = e("underscore"))).extend({}, t.bubbleEvents, {
                "simple-form:reset": "close",
                "simple-form:submit": "close",
                "overlay:close": "close"
            })
        },
        before: {
            setup: function () {
                (c || (c = e("underscore"))).bindAll(this, "onDocumentClick", "onDocumentKeydown", "onWindowScroll", "onWindowResize"), s.call(this), n.call(this, !0), this.$el.css({
                    outline: "none"
                }), this.onPositionComplete = o.bind(this)
            },
            dispose: function () {
                n.call(this, !1), this.close()
            }
        },
        defaults: {
            template: function () {
                return ""
            },
            isOpened: !1,
            open: function () {
                this.disposed || this.isOpened || !this.canBeOpened() || (this.isOpened = !0, this.rerender(), this.$el.appendTo(document.body), this.createContentView(), this.position(), this.options.focusable && this.$el.focus(), this.trigger(f.OPENED), (h || (h = e("event-bus"))).trigger(f.OPENED, this))
            },
            close: function (e) {
                !this.disposed && this.isOpened && (e || this.canBeClosed()) && (this.isOpened = !1, this.$el.detach(), this._teardown(), this.trigger(f.CLOSED))
            },
            canBeClosed: a,
            canBeOpened: a,
            getContentView: function () {
                return this.subviews.contentView
            },
            createContentView: function () {
                if (!this.getContentView() && this.options.Subview) {
                    var t, i = this.options,
                        n = i.Subview,
                        s = (c || (c = e("underscore"))).result(i, "subviewArgs");
                    t = this.addSubview(new n((c || (c = e("underscore"))).extend({
                        resource_id: i.resource_id,
                        resource_type: i.resource_type
                    }, s)), "contentView"), this.$el.attr({
                        tabindex: "-1",
                        id: this.options.domId || (c || (c = e("underscore"))).uniqueId("overlay_")
                    }), this.getOverlayContentEl().append(t.render().el)
                }
            },
            replaceContentView: function (e) {
                var t = this.getContentView();
                return t && (t._dispose(), this.removeSubview(t)), this.options.subviewArgs = e, this.createContentView(), this.getContentView()
            },
            getOverlayContentEl: function () {
                return this.$el
            },
            position: function () {
                var e = this.options;
                this.$el.css({
                    width: e.width,
                    minHeight: e.minHeight,
                    position: r(e.relativeElement) ? "fixed" : "absolute"
                }).position({
                    my: e.anchor,
                    at: e.relativeElementAnchor,
                    of: e.relativeElement,
                    offset: e.offset,
                    collision: e.collision,
                    using: this.onPositionComplete
                }), this.positionDecorate()
            },
            positionDecorate: $.noop,
            onLayoutChange: function () {
                this.close()
            },
            onOverlayOpen: function (e) {
                e.isOpened && e !== this && this.close(!0)
            },
            onDocumentClick: function (e) {
                this.isOpened && !$(e.target).closest(this.options.togglerEl).length && ($(e.target).closest(this.$el).length || this.close())
            },
            onDocumentKeydown: function (t) {
                if (this.isOpened)
                    if (t.which === (d || (d = e("lib/keys"))).ESC) {
                        this.close();
                        var i = this._parentView && this._parentView.$el;
                        i && i.focus()
                    } else if (t.which === (d || (d = e("lib/keys"))).TAB) {
                    if (!t.shiftKey && t.target === this.getElement("last-tabbable")[0]) return this.getElement("first-tabbable").focus(), !1;
                    if (t.shiftKey && t.target === this.getElement("first-tabbable")[0]) return this.getElement("last-tabbable").focus(), !1
                }
            },
            onWindowScroll: (c || (c = e("underscore"))).throttle(function () {
                if (!this.disposed && this.isOpened) {
                    var e = this.$el.css("position"),
                        t = r(this.options.relativeElement);
                    ("fixed" === e && !t || "absolute" === e && t) && this.position()
                }
            }, g),
            onWindowResize: (c || (c = e("underscore"))).throttle(function () {
                !this.disposed && this.isOpened && this.position()
            }, g)
        }
    })
}),
define("lib/helpers/datetime-helper", [], function (e, t, i) {
    var n, s, o, r, a = 1e3,
        l = 6e4,
        u = 36e5,
        c = {
            inWords: !1
        };
    n = i.exports = {
        timecode: function (t, i) {
            var n, r;
            return i = i || {}, i = (s || (s = e("underscore"))).defaults(i, c), isNaN(t) ? t : (n = [], r = {
                h: Math.floor(t / u),
                m: Math.floor(t / l % 60),
                s: Math.floor(t / a % 60)
            }, i.inWords ? (r.h > 0 && n.push(["hour", r.h]), r.m > 0 && n.push(["minute", r.m]), (r.s > 0 || 0 === r.m && 0 === r.h) && n.push(["second", r.s]), n.map(function (t) {
                var i = t[1];
                return i + " " + (o || (o = e("lib/helpers/lang-helper"))).plural(i, t[0])
            }).join(" ")) : (r.h > 0 && n.push(r.h), n.push(r.m < 10 && r.h > 0 ? "0" + r.m : r.m, r.s < 10 ? "0" + r.s : r.s), n.join(".")))
        },
        stringToTime: function (e) {
            var t, i = /^\d+(\.\d+)?$/g,
                n = /^(?:npt:)?(?:(?:(\d+):)?(\d\d?):)?(\d\d?)(\.\d+)?$/,
                s = /^(?:(\d\d?)[hH])?(?:(\d\d?)[mM])?(\d\d?)[sS]$/;
            return i.test(e) ? 1e3 * parseFloat(e) : (t = n.exec(e) || s.exec(e), t ? 1e3 * (3600 * (parseInt(t[1], 10) || 0) + 60 * (parseInt(t[2], 10) || 0) + parseInt(t[3], 10) + (parseFloat(t[4]) || 0)) : 0)
        },
        convert: function (e, t, i) {
            i = i || "s";
            var n = "smh",
                s = n.indexOf(t),
                o = n.indexOf(i);
            return Math.round(Math.pow(60, o - s) * e)
        },
        floorTo30Minutes: function (e) {
            return e = new Date(e), e.setMinutes(e.getMinutes() - e.getMinutes() % 30), e
        },
        parseTime: function (e) {
            var t, i, n, s = e.match(/^\s*(\d{1,2})\s*(?::\s*(\d{1,2}))?\s*(?:(a|p)m?)?\s*$/i);
            if (s && (t = s[1] && parseInt(s[1], 10), i = s[2] && parseInt(s[2], 10), n = s[3] && s[3].toLowerCase(), !(t > 23 || i > 59))) {
                if (n)
                    if ("p" === n) {
                        if (12 > t) t += 12;
                        else if (t > 13) return
                    } else if ("a" === n)
                    if (12 === t) t = 0;
                    else if (t > 12) return;
                return i || (i = 0), [t, i]
            }
        },
        formatTime: function (t) {
            return (r || (r = e("lib/helpers/number-helper"))).zeroPad(t.getHours(), 2) + ":" + (r || (r = e("lib/helpers/number-helper"))).zeroPad(t.getMinutes(), 2)
        },
        getTimezoneOffset: function () {
            var e, t = new Date(2009, 0, 1, 6, 0, 0),
                i = new Date(2009, 6, 1, 6, 0, 0);
            return e = t.getUTCHours() > i.getUTCHours() ? t.getTimezoneOffset() : i.getTimezoneOffset()
        }
    }
}),
define("lib/upload/settings-helper", [], function (e, t, i) {
    var n, s, o = new(s || (s = e("lib/persistent-store")))("upload-settings");
    n = i.exports = {
        getUploadAsPlaylist: function () {
            var e = o.get("asPlaylist");
            return void 0 === e ? !0 : e
        },
        toggleUploadAsPlaylist: function () {
            o.set("asPlaylist", !this.getUploadAsPlaylist())
        }
    }
}),
define("lib/upload/upload-manager", [], function (e, t, i) {
    function n(e, t) {
        var i = 0,
            n = this.length;
        return e && e.length ? (t.toPlaylist ? i = o.call(this, e, t.toPlaylist) : t.asPlaylist ? i = s.call(this, e) : t.asReplacementFor ? (a.call(this, e[0], t.asReplacementFor), i = this.length - n) : i = t.uploadToGroupId ? r.call(this, e, {
            uploadToGroupId: t.uploadToGroupId,
            onCancelUrl: t.onCancelUrl
        }) : r.call(this, e), i) : 0
    }

    function s(t) {
        var i = new(T || (T = e("lib/upload/playlist-upload"))),
            n = i.addFiles(t);
        return i.release(), this.add(i, {
            at: 0
        }), f.call(this, !0, i), n
    }

    function o(t, i) {
        var n = (T || (T = e("lib/upload/playlist-upload"))).hashFn({
            id: i
        }),
            s = (T || (T = e("lib/upload/playlist-upload"))).instances.get(n);
        return s.addFiles(t)
    }

    function r(t, i) {
        var n = 0;
        return t.forEach(function (t) {
            var s = this.length,
                o = new(E || (E = e("lib/upload/sound-upload-edit")))({
                    file: t
                }, i || {});
            o.release(), this.add(o, {
                at: 0
            }), this.length !== s && (f.call(this, !0, o), ++n)
        }, this), n
    }

    function a(t, i) {
        var n = new(E || (E = e("lib/upload/sound-upload-edit")))({
            file: t
        }, {
            resource_id: i
        });
        n.setFile(t), n.release(), this.add(n, {
            at: 0
        }), f.call(this, !0, n)
    }

    function l(e) {
        return (e.size || 0) <= _.MAX_FILE_SIZE && c(e.type) && u(e.name)
    }

    function u(e) {
        var t = /\.(rtf|html?|bmp|png|gif|jpe?g|exe|zip|sit|gz|cdf|ico|docx?|xlsx?|pptx?|txt|avi|mov|midi|swf|pdf)$/i;
        return !t.test(e)
    }

    function c(e) {
        var t = /^(image|message|text|multipart|model)\/|msword|ms-excel|ms-powerpoint|compressed/;
        return !t.test(e)
    }

    function d() {
        if (!N) {
            var t, i = this.numUploading(),
                n = function (t) {
                    t.get("status") === (A || (A = e("lib/upload/statuses"))).QUEUED && M > i && (t.upload(), ++i)
                };
            for (t = this.length - 1; t >= 0 && M > i; --t) this.at(t).getSoundUploads().forEach(n)
        }
    }

    function h(e) {
        !this.numUploading() && e.get("hasBeenSaved") && p()
    }

    function p() {
        D && ((S || (S = e("config"))).get("router").removeNavigationBlock(D), D = null)
    }

    function f(e, t) {
        this.transferStatus[e ? "addTransfer" : "removeTransfer"](t.get("transfer")), this.transcodingStatus[e ? "addTransfer" : "removeTransfer"](t.get("transcoding"))
    }

    function g(e) {
        this.remove(e)
    }

    function m(e) {
        f.call(this, !1, e), this.numUploading() || this.hasUnsaved() || p()
    }

    function v(t) {
        var i = t.get("status"),
            n = t.previous("status");
        i !== (A || (A = e("lib/upload/statuses"))).UPLOADING || 1 !== this.numUploading() || D || (D = (S || (S = e("config"))).get("router").addNavigationBlock(I, b.bind(this))), n === (A || (A = e("lib/upload/statuses"))).UPLOADING && (this.transferStatus.removeTransfer(t.get("transfer")), d.call(this)), n === (A || (A = e("lib/upload/statuses"))).TRANSCODING && this.transcodingStatus.removeTransfer(t.get("transcoding"))
    }

    function b() {
        return this.hasNotMarkedForSave() ? (window.alert(P), !1) : void 0
    }
    var _, y, w, x, k, S, C, T, E, A, D, I = "You still have incomplete uploads. If you leave the page now, these will be canceled.",
        P = "You still have incomplete uploads. Please save or cancel before leaving the page.",
        M = 3,
        N = !1;
    _ = i.exports = (k || (k = e("lib/collection"))).extend({
        next_href: !1,
        model: x || (x = e("lib/upload/audible-upload")),
        transferStatus: null,
        transcodingStatus: null,
        setup: function () {
            this.transferStatus = new(w || (w = e("lib/upload/aggregate-transfer-status"))), this.transcodingStatus = new(w || (w = e("lib/upload/aggregate-transfer-status"))), this.on("change:status", v, this).on("change:hasBeenSaved", h, this).on("remove", m, this).on("upload:cancelUpload", g, this)
        },
        addFiles: function (t, i) {
            var s, o, r, a = (y || (y = e("underscore"))).groupBy(t, function (e) {
                    return l(e) ? "valid" : "invalid"
                });
            if (i = (y || (y = e("underscore"))).defaults(i || {}, {
                source: "",
                asPlaylist: !1,
                toPlaylist: !1
            }), a.invalid && this.trigger("error", {
                name: "invalid",
                count: a.invalid.length
            }), s = n.call(this, a.valid, i), o = "dragdrop" === i.source || i.uploadToGroupId, s) {
                for (r = s; r--;)(C || (C = e("event-bus"))).trigger(["upload_funnel", "start", i.source].filter(Boolean).join(":"));
                o && (S || (S = e("config"))).get("router").navigateToRoute("upload", null, {
                    trigger: !0
                }), i.toPlaylist || (C || (C = e("event-bus"))).trigger(["upload_group", 1 === s ? "single" : "multiple", 1 === s ? !1 : i.asPlaylist ? "grouped" : "ungrouped"].filter(Boolean).join(":")), d.call(this)
            }
            return s
        },
        cancelAll: function () {
            var e, t;
            for (e = this.length; e--;) t = this.at(e), t.cancel()
        },
        numToUpload: function () {
            return this.uploadsByStatus((A || (A = e("lib/upload/statuses"))).QUEUED + (A || (A = e("lib/upload/statuses"))).UPLOADING).length
        },
        numUploading: function () {
            return this.uploadsByStatus((A || (A = e("lib/upload/statuses"))).UPLOADING).length
        },
        numTransoding: function () {
            return this.uploadsByStatus((A || (A = e("lib/upload/statuses"))).TRANSCODING).length
        },
        hasNotMarkedForSave: function () {
            return this.some(function (e) {
                return e.get("hasQueuedSave") === !1 && e.get("hasBeenSaved") === !1
            })
        },
        hasUnsaved: function () {
            return this.some(function (e) {
                return e.get("hasBeenSaved") === !1
            })
        },
        uploadsByStatus: function (e) {
            return this.getSoundUploads().filter(function (t) {
                return t.get("status") & e
            })
        },
        getSoundUploads: function () {
            return (y || (y = e("underscore"))).flatten(this.map(function (e) {
                return e.getSoundUploads()
            }))
        },
        pause: function () {
            N = !0
        },
        resume: function () {
            N = !1, d.call(this)
        },
        hasDataForView: function () {
            return !0
        }
    }, {
        MAX_FILE_SIZE: 5368709120,
        SIMULTANEOUS_UPLOADS: M,
        isAcceptable: l,
        neverRelease: !0,
        hashFn: function () {
            return 1
        }
    })
}),
define("lib/helpers/scrollbar-helper", [], function (e, t, i) {
    var n, s;
    n = i.exports = {
        getScrollbarSize: function () {
            if (void 0 === s) {
                var e, t, i;
                e = $('<div class="g-scrollable-inner" style="width:50px;height:50px;overflow:hidden; position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>'), $("body").append(e), t = $("div", e).innerWidth(), e.css("overflow", "auto"), i = $("div", e).innerWidth(), e.remove(), s = t - i
            }
            return s
        }
    }
}),
define("lib/audiomanager", [], function (e, t, i) {
    function n(e) {
        var t = $(e.getContainerElement()),
            i = e.getState() === s.States.ERROR;
        t.toggleClass("blocked", i)
    }
    var s, o, r, a = 1e3 / 60;
    i.exports = s = new(o || (o = e("vendor/audiomanager/audiomanager")))({
        flashAudioPath: "https://a-v2.sndcdn.com/assets/swf/flashAudio-a94631bc.swf",
        flashObjectID: "flashAudioObject",
        updateInterval: a,
        debug: !1
    }), s.Errors = (o || (o = e("vendor/audiomanager/audiomanager"))).Errors, s.States = (o || (o = e("vendor/audiomanager/audiomanager"))).States, s.UPDATE_INTERVAL = a, (r || (r = e("event-bus"))).one("audio:flash_block audio:flash_unblock", n)
}),
define("lib/audioperf", [], function (e, t, i) {
    function n(t) {
        (d || (d = e("vendor/event-logger/event-logger"))).audioPerformance(t)
    }

    function s() {
        return !1 || Math.random() <= v
    }

    function o(t) {
        return (a || (a = e("underscore"))).find(this._players, function (e) {
            return e._player === t
        })
    }
    var r, a, l, u, c, d, h, p, f = (l || (l = e("lib/audiomanager"))).States,
        g = (u || (u = e("config"))).get("client_application_id"),
        m = (u || (u = e("config"))).get("eventlogger_tracking_url"),
        v = 1;
    (d || (d = e("vendor/event-logger/event-logger"))).initialize({
            id: g,
            anonymousUserId: (c || (c = e("lib/connect"))).getAnonymousUserIdentifier(),
            trackingUrl: m
        }), r = i.exports = {
            _monitors: [],
            monitor: function (e) {
                s() && !o.call(this, e) && this._monitors.push(new p(e))
            },
            stopMonitoring: function (e) {
                var t = o.call(this, e);
                t && (t.dispose(), this._monitors.splice(this._monitors.indexOf(t), 1))
            }
    }, p = Class.extend({
        _bufferingTimeAccumulated: 0,
        _bufferingStartTime: 0,
        _playStartTime: 0,
        _seekStartTime: 0,
        initialize: function (t) {
            this._player = t, this._prevState = t.getState();
            var i = (h || (h = e("lib/url"))).parse(t._descriptor.src);
            this._protocol = i.scheme, this._host = i.host, "https" === this._protocol && (this._protocol = "http"), "http" === this._protocol && ".m3u8" === i.path.slice(-5) && (this._protocol = "hls"), this._player.on("stateChange", this._onStateChange, this)
        },
        dispose: function () {
            this._player.off("stateChange", this._onStateChange, this), this._player = null
        },
        _onStateChange: function (e) {
            if (e !== this._prevState) {
                switch (this._prevState === f.IDLE && this._onPlayInitiated(), e) {
                case f.IDLE:
                    break;
                case f.PLAYING:
                    0 !== this._playStartTime ? this._onPlayStart() : 0 !== this._seekStartTime ? this._onSeekEnd() : this._onBufferingEnd();
                    break;
                case f.LOADING:
                    this._prevState === f.PLAYING && this._onBufferingInitiated();
                    break;
                case f.SEEKING:
                    this._onSeekInitiated();
                    break;
                case f.ENDED:
                case f.PAUSED:
                    this._onPauseOrEnd();
                    break;
                case f.ERROR:
                }
                this._prevState = e
            }
        },
        _onPlayInitiated: function () {
            this._playStartTime = Date.now()
        },
        _onPlayStart: function () {
            n({
                type: "play",
                latency: Date.now() - this._playStartTime,
                protocol: this._protocol,
                host: this._host,
                playertype: this._player.getType()
            }), this._playStartTime = 0
        },
        _onSeekInitiated: function () {
            this._seekStartTime = Date.now()
        },
        _onSeekEnd: function () {
            this._protocol && (n({
                type: "seek",
                latency: Date.now() - this._seekStartTime,
                protocol: this._protocol,
                host: this._host,
                playertype: this._player.getType()
            }), this._seekStartTime = 0)
        },
        _onBufferingInitiated: function () {
            this._bufferingStartTime = Date.now()
        },
        _onBufferingEnd: function () {
            0 !== this._bufferingStartTime && (this._bufferingTimeAccumulated += Date.now() - this._bufferingStartTime, this._bufferingStartTime = 0)
        },
        _onPauseOrEnd: function () {
            0 !== this._bufferingStartTime && (this._bufferingTimeAccumulated += Date.now() - this._bufferingStartTime), 0 !== this._bufferingTimeAccumulated && (n({
                type: "buffer",
                latency: this._bufferingTimeAccumulated,
                protocol: this._protocol,
                host: this._host,
                playertype: this._player.getType()
            }), this._bufferingStartTime = this._bufferingTimeAccumulated = 0)
        }
    })
}),
define("lib/css", [], function (e, t, i) {
    var n, s, o, r, a, l = document.getElementsByTagName("head")[0],
        u = (o || (o = e("lib/browser"))).isIE9;
    u && (r = document.createElement("style"), a = []), n = i.exports = {
        insert: function (t) {
            (s || (s = e("underscore"))).isArray(t) || (t = [t]), t.forEach(function (e) {
                if (u) {
                    if (a.indexOf(e) > -1) return;
                    a.push(e), r.styleSheet ? r.innerText += e.innerHTML : r.appendChild(document.createTextNode(e.innerHTML)), e = r
                }
                e.parentNode || l.appendChild(e)
            })
        }
    }
}),
define("lib/event-bubble", [], function (e, t, i) {
    var n;
    n = i.exports = Class.extend({
        _propagate: !0,
        data: null,
        initialize: function (e) {
            this.data = e || {}
        },
        stopPropagation: function () {
            this._propagate = !1
        },
        isPropagationStopped: function () {
            return !this._propagate
        }
    })
}),
define("lib/mixins/views/stateful", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        states: null,
        _states: null,
        toggleState: function (t, i) {
            var n, o, r;
            return t && t.length ? (this._states = this._states || {}, n = {
                add: [],
                remove: []
            }, t.split(" ").forEach(function (t) {
                this.states && this.states[t] && (this._states[t] = this._states[t] || !1, o = "undefined" != typeof i ? !! i : !this._states[t], r = this.states[t], this._states[t] !== o && (this._states[t] = o, "string" == typeof r ? n[o ? "add" : "remove"].push(r) : (s || (s = e("underscore"))).isFunction(r) ? r.call(this, o) : r && r[o ? "setup" : "teardown"].call(this), this.trigger("state:" + t, o)))
            }, this), n.add.length && this.$el.addClass(n.add.join(" ")), n.remove.length && this.$el.removeClass(n.remove.join(" ")), this) : this
        },
        getState: function (e) {
            return !(!this._states || !this._states[e])
        }
    })
}),
define("lib/template", [], function (e, t, i) {
    var n, s, o, r, a;
    (a || (a = e("underscore"))).each(r || (r = e("lib/template-helpers")), function (t, i) {
        (s || (s = e("vendor/handlebars-runtime"))).registerHelper(i, t)
    }), n = i.exports = {
        render: function (e, t, i) {
            var n = e(t || {});
            i && (i.innerHTML = n)
        },
        subviews: function (t) {
            (o || (o = e("lib/subview-plugin"))).replacePlaceholders(t)
        }
    }
}),
define("lib/single", [], function (e, t, i) {
    function n(e, t) {
        return !t.neverRelease && t.cleanup() || e
    }
    var s, o, r, a, l = $.noop,
        u = 0,
        c = 6e4,
        d = [];
    setInterval(function () {
        do; while (d.reduce(n, !1))
    }, c), i.exports = {
        applyTo: function h(t, i) {
            i = (s || (s = e("underscore"))).extend({
                neverRelease: !1,
                cleanupInstantly: !1,
                hashFn: function () {
                    return null
                },
                prepareArgs: function () {
                    return arguments
                },
                prepareInstance: function () {
                    return this
                },
                getIncrementValue: function () {
                    return 1
                },
                onHold: l,
                onRelease: l,
                onCleanup: null
            }, i, t), delete i.prototype;
            var n, c, p, f, g, m = t.extend || (o || (o = e("lib/backbone"))).Model.extend,
                v = i.neverRelease;
            return n = new(r || (r = e("lib/gc-store")))({
                autoCleanup: i.cleanupInstantly,
                onCleanup: i.onCleanup,
                onIncrement: i.onHold,
                onDecrement: i.onRelease,
                neverRelease: v
            }), d.push(n), v ? p = f = l : (p = function (e) {
                n.increment(this.resource_id, e)
            }, f = function (e) {
                n.decrement(this.resource_id, e)
            }), g = {
                hold: p,
                release: f,
                _usageCount: function () {
                    return n.countFor(this.resource_id)
                },
                constructor: function () {
                    var e = c.prepareArgs.apply(this, arguments),
                        i = c.hashFn.apply(this, e) || "f-" + ++u,
                        s = c.neverRelease ? 1 : c.getIncrementValue.apply(null, e),
                        o = n.get(i);
                    return o ? (this.constructor.neverRelease || o.hold(s), c.prepareInstance.apply(o, e), o) : (o = this, n.set(i, o), o.constructor.neverRelease || o.hold(s - 1), o.resource_id = i, a(t).apply(o, e), void c.prepareInstance.apply(o, e))
                }
            }, c = m.call(t, g, i), (s || (s = e("underscore"))).extend(c, {
                __constructor__: a(t),
                reset: function () {
                    n.reset()
                },
                extend: function (i) {
                    var n, o;
                    return i = i || {}, (s || (s = e("underscore"))).isArray(i) && (i = (s || (s = e("underscore"))).extend.apply(null, [{}].concat(i))), i.hasOwnProperty("constructor") || (i.constructor = a(t)), n = m.apply(c, arguments), n.extend = m, o = h(n, c), o.__super__ && (o.__super__ = o.__super__.constructor.__super__), o
                },
                instances: function () {
                    return n.add = function (e) {
                        var t = c.hashFn(e.attributes);
                        e.resource_id = t, t && this.set(t, e)
                    }, n
                }(),
                getNewInstance: function () {
                    function e() {
                        return a(t).apply(this, n)
                    }
                    var i, n = arguments;
                    return e.prototype = c.prototype, i = new e
                },
                removeInstance: function (e) {
                    n.decrement(e.resource_id, 1 / 0), n.cleanup()
                }
            })
        }
    }, a = function (e) {
        return e.__constructor__ || e
    }
}),
define("lib/helpers/lang-helper", [], function (e, t, i) {
    var n;
    n = i.exports = {
        plural: function (e, t, i) {
            return i = "string" == typeof i ? i : t + "s", 1 === e ? t : i
        },
        possessive: function (e) {
            return e + "â€™s"
        },
        capitalize: function (e) {
            return "string" != typeof e ? "" : e.split(" ").map(function (e) {
                return e.charAt(0).toUpperCase() + e.substr(1)
            }).join(" ")
        }
    }
}),
define("models/followers", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("models/id-list"))).extend({
        baseUrl: function () {
            return "me/followers/"
        },
        setRemote: $.noop
    })
}),
define("models/followings", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("models/id-list"))).extend({
        baseUrl: function () {
            return "me/followings/"
        }
    })
}),
define("models/groups", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (r || (r = e("models/id-list"))).extend({
        baseUrl: "me/groups",
        CREATE: "POST",
        url: function (t, i) {
            var n = (s || (s = e("underscore"))).result(this, "baseUrl");
            return t && "CREATE" === i ? this.saveUrl(t) : t && "DELETE" === i ? this.destroyUrl(t) : null === this.next_href ? (a || (a = e("lib/url"))).modify(n, {
                query: {
                    representation: "mini",
                    linked_partitioning: 1,
                    limit: 5e3
                }
            }) : this.next_href
        },
        parse: function (e) {
            var t = e.collection,
                i = {};
            return this.next_href = e.next_href || !1, t && t.length && t.forEach(function (e) {
                i[e.id] = !0
            }), i
        },
        destroyUrl: function (t) {
            return (a || (a = e("lib/url"))).joinPath(["groups", t, "members", (o || (o = e("lib/connect"))).currentUserId()])
        },
        saveUrl: function (t) {
            return (a || (a = e("lib/url"))).joinPath(["groups", t, "members"])
        }
    })
}),
define("models/groups-for-sound", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("models/id-list"))).extend({
        soundId: null,
        readPathSuffix: "",
        CREATE: "POST",
        setup: function (t, i) {
            (o || (o = e("models/id-list"))).prototype.setup.apply(this, arguments), this.soundId = i.soundId
        },
        parse: function (e) {
            var t = e.collection,
                i = {};
            return this.next_href = e.next_href || !1, t && t.length && t.forEach(function (e) {
                i[e.id] = !0
            }), i
        },
        url: function (t, i) {
            switch (i) {
            case "CREATE":
                return (s || (s = e("lib/url"))).joinPath(["groups", t, "contributions"]);
            case "DELETE":
                return (s || (s = e("lib/url"))).joinPath(["groups", t, "contributions", this.soundId]);
            default:
                return null !== this.next_href ? this.next_href : (s || (s = e("lib/url"))).stringify({
                    path: ["tracks", this.soundId, "groups"],
                    query: {
                        representation: "mini",
                        linked_partitioning: 1,
                        limit: 5e3
                    }
                })
            }
        },
        getRequestData: function (e, t) {
            return "CREATE" === t ? {
                track: {
                    id: this.soundId
                }
            } : null
        },
        getAjaxOptions: function (e, t) {
            return "DELETE" === t ? {
                contentType: "application/json",
                headers: {
                    Accept: "application/json"
                },
                dataType: null
            } : void 0
        }
    }, {
        neverRelease: !1,
        hashFn: function (e, t) {
            return t.soundId
        }
    })
}),
define("models/mutings", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("models/id-list"))).extend({
        baseUrl: "me/mutings/users/"
    })
}),
define("models/playlist-likes", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("models/id-list"))).extend({
        baseUrl: function () {
            return (s || (s = e("lib/api-wrapper"))).EDGE + "me/playlist_likes/"
        }
    })
}),
define("models/playlist-reposts", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("models/id-list"))).extend({
        baseUrl: function () {
            return (s || (s = e("lib/api-wrapper"))).EDGE + "me/playlist_reposts/"
        }
    })
}),
define("models/sound-likes", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("models/id-list"))).extend({
        baseUrl: function () {
            return (s || (s = e("lib/api-wrapper"))).EDGE + "me/track_likes/"
        }
    })
}),
define("models/sound-reposts", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("models/id-list"))).extend({
        baseUrl: function () {
            return (s || (s = e("lib/api-wrapper"))).EDGE + "me/track_reposts/"
        }
    })
}),
define("models/playlist", [], function (e, t, i) {
    function n(e) {
        e.reduce(function (e, t) {
            return t.timeOffset = e, e + t.get("duration")
        }, 0)
    }

    function s(t) {
        var i = t ? "on" : "off";
        (l || (l = e("lib/action-controller")))[i]("like:target:playlist:" + this.id, this.onLike, this)[i]("repost:target:playlist:" + this.id, this.onRepost, this)
    }
    var o, r, a, l, u, c, d, h, p, f, g, m, v, b, _, y, w, x, k, S, C;
    C = (u || (u = e("lib/backbone"))).Collection.extend({
        model: y || (y = e("models/sound")),
        fetch: function () {
            return this.playlist.fetch.apply(this.playlist, arguments)
        },
        initialize: function (e, t) {
            this.playlist = t.playlist
        },
        hasDataForView: function () {
            return !!this.playlist.attributes.tracks
        },
        isFullyPopulated: function () {
            return !0
        },
        _usageCount: function () {
            return 1
        },
        hold: $.noop,
        release: $.noop
    }), o = i.exports = (a || (a = e("models/audible-interface"))).extend(c || (c = e("lib/mixins/editable-object")), _ || (_ = e("lib/mixins/sortable-object")), f || (f = e("lib/mixins/models/has-visuals")), b || (b = e("lib/mixins/models/shortenable")), (p || (p = e("lib/mixins/has-title"))).withOptions({
        attr: "title"
    }), (h || (h = e("lib/mixins/has-editable-image"))).withOptions({
        read: "artwork_url",
        write: "artwork_data"
    }), {
        resource_type: "playlist",
        urnPrefix: "soundcloud:playlists",
        submodelMap: {
            tracks: y || (y = e("models/sound")),
            user: k || (k = e("models/user"))
        },
        soundsCollection: null,
        currentSoundCursor: 0,
        _isPlayActionQueued: !1,
        _internalNavigation: !1,
        _playlistLoopingState: null,
        setup: function () {
            (a || (a = e("models/audible-interface"))).prototype.setup.apply(this, arguments), this.soundsCollection = new C(null, {
                playlist: this
            }), this.id ? s.call(this, !0) : this.one("change:id", s.bind(this, !0))
        },
        baseUrl: function () {
            return (S || (S = e("lib/url"))).stringify({
                path: ["playlists", this.id]
            })
        },
        createSubmodel: function (t, i) {
            "tracks" === i ? this.prepareSounds() : (m || (m = e("lib/model"))).prototype.createSubmodel.apply(this, arguments)
        },
        prepareSounds: function () {
            var t = [];
            (r || (r = e("underscore"))).each(this.get("tracks"), function (i) {
                var n, s, o, a;
                o = this.soundsCollection.any(function (e) {
                    return e.id === i.id
                }), o || (a = new(y || (y = e("models/sound")))(i), this.addSubmodel(a), s = (r || (r = e("underscore"))).extend({}, i, {
                    resource_id: {
                        playlist_id: this.id,
                        sound_id: i.id
                    }
                }), n = new(y || (y = e("models/sound")))(s, {
                    suppressGlobalEvents: !0
                }), n.playlist = this, n.originalSound = a, t.push(n), this.toggleListeners(n, !0))
            }, this), 0 === this.soundsCollection.length ? this.soundsCollection.reset(t) : this.soundsCollection.add(t, {
                silent: !0
            }), n(this.soundsCollection)
        },
        getSoundsCollection: function () {
            return this.soundsCollection
        },
        getRelativeTrackLength: function (t) {
            return (g || (g = e("lib/math"))).precise(this.soundsCollection.at(t).get("duration") / this.get("duration"), 7)
        },
        toggleListeners: function (e, t) {
            var i = e[t ? "on" : "off"].bind(e);
            i("play", this.onSoundPlay, this), i("pause", this.onSoundPause, this), i("finish", this.onSoundFinish, this), i("time", this.onSoundTime, this), i("seeked", this.onSoundSeeked, this)
        },
        onSoundPlay: function (t) {
            t.playlist = this, this.trigger("internal:play", t), this._internalNavigation || (this.trigger("play", t), (d || (d = e("event-bus"))).trigger("audio:play", t), this._internalNavigation = !0)
        },
        onSoundPause: function (t) {
            this._internalNavigation || (t.playlist = this, this.trigger("pause", t), (d || (d = e("event-bus"))).trigger("audio:pause", t), this._internalNavigation = !0)
        },
        onSoundFinish: function (t) {
            t.sound === this.soundsCollection.last() && (t.playlist = this, this.trigger("pause finish", t), (d || (d = e("event-bus"))).trigger("audio:pause audio:finish", t), "playlist" === this._playlistLoopingState && (this.currentSoundCursor = -1, this._next()))
        },
        onSoundTime: function (e) {
            e.playlist = this, this.trigger("time", e)
        },
        onSoundSeeked: function (e) {
            e.playlist = this, this.trigger("seeked", e)
        },
        getSounds: function () {
            return this.soundsCollection.models
        },
        getNumSounds: function () {
            return this.soundsCollection.length
        },
        getSoundAt: function (e) {
            return this.soundsCollection.at(0 === e ? 0 : this.getSoundIndexAt(e))
        },
        getSoundIndex: function (e) {
            return this.soundsCollection.indexOf(e)
        },
        getSoundIndexAt: function (e) {
            var t, i = this.getSounds();
            for (t = i.length; t--;)
                if (e >= i[t].timeOffset) return t
        },
        findSound: function (e) {
            return this.findSoundById(e.id)
        },
        findSoundById: function (e) {
            return this.soundsCollection.get(e)
        },
        getPrevSound: function () {
            return this.soundsCollection.at(this.currentSoundCursor - 1)
        },
        getCurrentSound: function () {
            return this.soundsCollection.at(this.currentSoundCursor)
        },
        getNextSound: function () {
            return this.soundsCollection.at(this.currentSoundCursor + 1)
        },
        getFirstSound: function () {
            return this.soundsCollection.at(0)
        },
        getLastSound: function () {
            return this.soundsCollection.at(this.soundsCollection.length - 1)
        },
        containsSound: function (e) {
            return !!this.findSoundById(e)
        },
        play: function (t) {
            return (w || (w = e("lib/support"))).audio ? void(this.isEditing() || (this.soundsCollection.length ? (this._internalNavigation = !1, this.getCurrentSound().audio.play(t)) : this.lastFetchTime || (this._isPlayActionQueued = !0, this.fetch().done(function () {
                this._isPlayActionQueued && (this._isPlayActionQueued = !1, this.play(t))
            }.bind(this))))) : void(d || (d = e("event-bus"))).trigger("error:audio_support")
        },
        pause: function (e) {
            this._isPlayActionQueued = !1, this.soundsCollection && this.soundsCollection.length && (this._internalNavigation = !1, this.getCurrentSound().audio.pause(e))
        },
        seek: function (t) {
            if (this.soundsCollection.length) {
                var i = this.getCurrentSound(),
                    n = i.isPlaying(),
                    s = this.getSoundIndexAt(t),
                    o = this.soundsCollection.at(s);
                o.seek(t - o.timeOffset), i !== o && (this._internalNavigation = !0, i.audio.pause(), this.currentSoundCursor = s, (d || (d = e("event-bus"))).trigger("playlist:next", o.audio), n && (this._internalNavigation = !0, (v || (v = e("lib/play-manager"))).play(o, {
                    keepSource: !0,
                    userInitiated: !0
                }), (x || (x = e("lib/helpers/title-helper"))).update())), this.trigger("seeked")
            }
        },
        currentTime: function () {
            var e = this.getCurrentSound();
            return e ? e.audio.currentTime() + e.timeOffset : 0
        },
        isPlaying: function () {
            var e = this.getCurrentSound();
            return e && e.isPlaying() || this.soundsCollection.some(function (e) {
                return e.isPlaying()
            })
        },
        isPlayable: function () {
            return this.soundsCollection.every(function (e) {
                return e.isPlayable()
            })
        },
        isProcessing: function () {
            return this.soundsCollection.length ? this.soundsCollection.any(function (e) {
                return e.isProcessing()
            }) : !1
        },
        isLooping: function () {
            return this._playlistLoopingState
        },
        loadProgress: function () {
            var e = this.getCurrentSound();
            return e ? (e.timeOffset + e.loadProgress() * e.duration()) / this.duration() : 0
        },
        toggleLooping: function () {
            switch (this._playlistLoopingState) {
            case null:
                this._playlistLoopingState = "sound", this.getCurrentSound().toggleLooping(!0, {
                    silent: !0
                }), (d || (d = e("event-bus"))).trigger("audio:loop:on");
                break;
            case "sound":
                this._playlistLoopingState = "playlist", this.getCurrentSound().toggleLooping(!1, {
                    silent: !0
                }), (d || (d = e("event-bus"))).trigger("audio:loop:on");
                break;
            default:
                this._playlistLoopingState = null, (d || (d = e("event-bus"))).trigger("audio:loop:off")
            }
        },
        _next: function () {
            this._internalNavigation = !0, ++this.currentSoundCursor;
            var t = this.getCurrentSound();
            t.seek(0), t.audio.play({
                userInitiated: !1
            }), (x || (x = e("lib/helpers/title-helper"))).update()
        },
        parse: function (t) {
            return t = (m || (m = e("lib/model"))).prototype.parse.apply(this, arguments), t.secret_token && t.tracks && t.tracks.forEach(function (e) {
                "public" !== e.sharing && (e.secret_token = t.secret_token)
            }), t
        },
        removeSound: function (e) {
            if (e = this.findSound(e)) {
                var t = this.getSoundIndex(e),
                    i = this.get("tracks").slice();
                return this.currentSoundCursor > t && --this.currentSoundCursor, e.isPlaying() && e.pause(), this.toggleListeners(e, !1), i.splice(t, 1), this.soundsCollection.remove(e), this.set("duration", this.get("duration") - e.get("duration")), this.set("tracks", i), n(this.soundsCollection), e.playlist = null, e.release(), !0
            }
            return !1
        },
        addSound: function (t, i) {
            var s, o, a;
            return this.findSound(t) ? !1 : (i = "number" != typeof i || -1 === i ? this.getNumSounds() : (g || (g = e("lib/math"))).clamp(i, 0, this.getNumSounds()), s = (r || (r = e("underscore"))).extend({}, t.attributes, {
                resource_id: {
                    playlist_id: this.id,
                    sound_id: t.id
                }
            }), o = new(y || (y = e("models/sound")))(s, {
                suppressGlobalEvents: !0
            }), o.playlist = this, o.originalSound = t, this.addSubmodel(t), this.toggleListeners(o, !0), a = this.get("tracks"), a || (a = [], this.set("tracks", a, {
                silent: !0
            })), a.splice(i, 0, o.toJSON()), this.soundsCollection.add(o, {
                at: i
            }), i === this.getNumSounds() - 1 ? o.timeOffset = this.get("duration") : n(this.soundsCollection), this.set("duration", this.get("duration") + o.get("duration"), {
                silent: !0
            }), this.change({
                force: ["tracks"]
            }), !0)
        },
        getCurrentOrder: function () {
            return this.soundsCollection.pluck("id")
        },
        reorder: function (e) {
            var t = this.soundsCollection,
                i = t.comparator;
            t.comparator = function (t) {
                return e.indexOf(t.id)
            }, t.sort({
                silent: !0
            }), t.comparator = i, this.set("tracks", this.soundsCollection.toJSON())
        },
        saveAttributes: function (t) {
            var i = {
                playlist: t
            };
            return (u || (u = e("lib/backbone"))).Model.prototype.save.call(this, {}, {
                url: this.saveUrl(),
                data: $.param(i)
            })
        },
        saveOrder: function (t) {
            var i = [],
                n = {
                    playlist: {
                        tracks: i
                    }
                };
            return this.soundsCollection.each(function (e) {
                i.push({
                    id: e.id
                })
            }), (u || (u = e("lib/backbone"))).Model.prototype.save.call(this, {}, (r || (r = e("underscore"))).extend({
                url: this.saveUrl(),
                data: JSON.stringify(n),
                contentType: "application/json"
            }, t))
        },
        resetOrder: function () {
            return this.fetch().done(function () {
                this.soundsCollection.each(function (e) {
                    e.playlist = null, e.release()
                }), this.soundsCollection.reset([], {
                    silent: !0
                }), this.prepareSounds()
            }.bind(this))
        }
    }, {
        onCleanup: function (t) {
            t.soundsCollection.each(function (e) {
                e.playlist = null, e.release()
            }), t.soundsCollection.off(), delete t.soundsCollection, s.call(this, !1), (a || (a = e("models/audible-interface"))).onCleanup(t)
        },
        resolve: function (t, i, n) {
            return (m || (m = e("lib/model")))._resolve(this, [t, "sets", i, n], function (e) {
                var n = e.get("user");
                return n && e.get("permalink") === i && n.permalink === t
            })
        }
    })
}),
define("lib/helpers/urn-helper", [], function (e, t, i) {
    var n, s = {
            playlists: "playlist",
            sounds: "track",
            tracks: "track",
            users: "user"
        }, o = {
            playlists: "playlist",
            sounds: "sound",
            tracks: "sound",
            users: "user"
        }, r = {
            playlist: "playlists",
            sound: "tracks",
            user: "users"
        };
    n = i.exports = {
        getAsAttributes: function (e) {
            var t = e.split(":"),
                i = t[2],
                n = o[t[1]];
            return /\D/.test(i) || (i = parseInt(i, 10)), "user" === n && "system" === i && (i = 193), {
                id: i,
                kind: s[t[1]],
                resource_type: n
            }
        },
        generate: function (e, t) {
            var i = r[e];
            return i ? "soundcloud:" + i + ":" + t : null
        }
    }
}),
define("models/visuals-list", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (r || (r = e("lib/model"))).extend({
        _hasFetched: !1,
        url: function () {
            return (a || (a = e("lib/url"))).modify((o || (o = e("config"))).get("visualsHost"), {
                path: "/visual_owners"
            })
        },
        parse: function (e) {
            return this._hasFetched = !0, e.visual_owners.reduce(function (e, t) {
                return e[t] = !0, e
            }, {})
        },
        fetch: function (t) {
            return (r || (r = e("lib/model"))).prototype.fetch.call(this, (s || (s = e("underscore"))).defaults({
                saveRequest: !0
            }, t))
        },
        get: function (t) {
            return this._hasFetched ? (r || (r = e("lib/model"))).prototype.get.call(this, t) || !1 : void 0
        },
        reset: function () {
            this._hasFetched = null, delete this._requests, Object.keys(this.attributes).forEach(function (e) {
                this.unset(e)
            }, this)
        }
    }, {
        hashFn: function () {
            return 1
        },
        neverRelease: !0
    })
}),
define("collections/sound-visuals", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d, h = 200,
        p = 1e3;
    n = i.exports = (o || (o = e("lib/collection"))).extend({
        model: l || (l = e("models/sound-visual")),
        _isLooping: !1,
        _loopInterval: null,
        _approvalDeferred: null,
        _isPending: !1,
        setup: function () {
            this.debouncedSort = (s || (s = e("underscore"))).debounce(this.sort.bind(this, {
                silent: !0
            }), h), this.on("change:entry_time", this.debouncedSort, this).on("submission:success", this.onSubmissionSuccess, this)
        },
        baseUrl: function () {
            return (c || (c = e("lib/url"))).stringify({
                path: "/visuals",
                query: {
                    urn: "soundcloud:sounds:" + this.resource_id
                }
            }, (r || (r = e("config"))).get("visualsHost"))
        },
        isLooping: function () {
            return this._isLooping
        },
        getLoopInterval: function () {
            return this._loopInterval
        },
        parse: function (t) {
            var i = t && t.visuals;
            return i ? (i = (s || (s = e("underscore"))).map(i, function (t) {
                return t.id = (d || (d = e("lib/helpers/urn-helper"))).getAsAttributes(t.urn).id, t.filename = t.visual_url.split("/").pop(), t
            }), t.is_looping && t.loop_interval && (this._isLooping = !0, this._loopInterval = Math.max(p, t.loop_interval)), i) : this.toJSON()
        },
        isApproved: function () {
            return !(!this.at(0) || !this.at(0).get("urn"))
        },
        isPending: function () {
            return this._isPending
        },
        onSubmissionSuccess: function () {
            this._isPending = !0, this.trigger("change:approval")
        },
        submitForApproval: function (t) {
            if (!(u || (u = e("lib/support"))).formData) return void this.trigger("submission:error");
            var i = new window.FormData,
                n = {
                    visuals: [],
                    user_urn: (r || (r = e("config"))).get("me").getUrn(),
                    urn: t
                };
            return this.forEach(function (t, o) {
                var r;
                t && t.has("file") && (r = t.toJSON(), (s || (s = e("underscore"))).omit(r, "visual_url", "urn", "_resource_id", "_resource_type"), r.entry_time = Math.floor(r.entry_time), n.visuals.push(r), i.append("visuals[upload-" + o + "]", t.get("file"), t.get("filename")))
            }), i.append("visuals_data", JSON.stringify(n)), $.ajax({
                url: (r || (r = e("config"))).get("visualsQueueHost"),
                type: "POST",
                data: i,
                processData: !1,
                contentType: !1,
                dataType: "json",
                beforeSend: function (t) {
                    t.setRequestHeader("Authorization", "OAuth " + (a || (a = e("lib/connect"))).getAuthToken())
                }
            }).done(this.trigger.bind(this, "submission:success")).fail(this.trigger.bind(this, "submission:error"))
        },
        fetchApprovalStatus: function () {
            var t, i = this._approvalDeferred,
                n = "soundcloud:sounds:" + this.options.resource_id,
                s = (r || (r = e("config"))).get("me").getUrn();
            return t = function (e) {
                e && e.urn && (this._isPending = !0), i.resolve()
            }.bind(this), i && "rejected" !== i.state() ? i : (i = this._approvalDeferred = $.Deferred(), $.ajax((r || (r = e("config"))).get("visualsQueueHost") + "/" + n, {
                data: {
                    user_urn: s
                },
                beforeSend: function (t) {
                    t.setRequestHeader("Authorization", "OAuth " + (a || (a = e("lib/connect"))).getAuthToken())
                }
            }).done(t).fail(i.reject), i)
        },
        comparator: function (e) {
            return e.get("entry_time")
        }
    })
}),
define("lib/audio-error-tracker", [], function (e, t, i) {
    var n, s, o = "https://eventlogger.soundcloud.com/audio-error";
    n = i.exports = {
        log: function (t) {
            var i = (s || (s = e("lib/url"))).stringify({
                query: t
            }),
                n = new Image;
            n.src = o + i
        }
    }
}),
define("models/app", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (s || (s = e("lib/model"))).extend({
        resource_type: "app",
        baseUrl: function () {
            return (o || (o = e("lib/url"))).stringify({
                path: ["apps", this.id]
            })
        }
    })
}),
define("models/audible-interface", [], function (e, t, i) {
    function n(e, t) {
        this.attrExists(e) && this.set(e, this.get(e) + (t ? 1 : -1))
    }
    var s, o, r, a, l, u;
    s = i.exports = (a || (a = e("lib/model"))).extend(o || (o = e("lib/mixins/audio-source")), {
        setup: function () {
            this.on("destroy", this.pause, this)
        },
        getSourceInfo: function () {
            return {
                type: "single",
                resourceId: this.resource_id,
                resourceType: this.resource_type
            }
        },
        initAudio: function () {
            var e = this.getCurrentSound();
            e && e.audio.initAudio()
        },
        isNowPlaying: function () {
            return (l || (l = e("lib/play-manager"))).getCurrentSound() === this
        },
        onLike: function (e) {
            n.call(this, "likes_count", e.state)
        },
        onRepost: function (e) {
            n.call(this, "reposts_count", e.state)
        },
        getShareURL: function (t) {
            var i, n, s, o = !(!t || !t.permalinkUrl),
                r = o ? t.permalinkUrl : this.get("permalink_url");
            return s = this.playlist && this.playlist.id, i = {
                query: {
                    "in": s ? (u || (u = e("lib/url"))).parse(this.playlist.getShareURL()).relative.substr(1) : null
                }
            }, o || (i.scheme = "https"), t && t.time && (i.fragment = "t=" + t.time), n = this.isPrivate() && !/\/s-[a-zA-Z0-9]{5}$/.test(r), (u || (u = e("lib/url"))).stringify(i, r + (n ? "/" + this.get("secret_token") : ""))
        },
        getPermalink: function () {
            return this.get("permalink_url").replace(/^https?:.+?\w\//, "/")
        },
        isPrivate: function () {
            return "private" === this.get("sharing")
        },
        isPublic: function () {
            return !this.isPrivate()
        },
        isHidden: function () {
            return !!this.get("disabled_reason")
        },
        destroyUrl: function () {
            return this.isHidden() ? "app/v2/me/hidden_tracks/" + this.id : (a || (a = e("lib/model"))).prototype.destroyUrl.apply(this, arguments)
        },
        toggle: function (e) {
            this[this.isPlaying() ? "pause" : "play"](e)
        },
        isPaused: function () {
            return !this.isPlaying()
        },
        seekRelative: function (e) {
            this.seek(this.currentTime() + e)
        },
        duration: function () {
            return this.get("duration")
        },
        progress: function () {
            return this.currentTime() / this.duration()
        },
        timecode: function () {
            return (r || (r = e("lib/helpers/datetime-helper"))).timecode(this.currentTime())
        },
        toggleMute: function (e) {
            var t = this.getCurrentSound();
            t && t.audio.toggleMute(e)
        },
        setVolume: function (e) {
            var t = this.getCurrentSound();
            t && t.audio.setVolume(e)
        }
    })
}),
define("lib/mixins/models/batching", [], function (e, t, i) {
    function n(e) {
        return !this.id || e.jqAjax || e.saveRequest || e.batch === !1 || "private" === this.get("sharing")
    }
    var s, o, r, a = 50,
        l = 50;
    s = i.exports = new(r || (r = e("lib/mixin")))({
        requires: ["batchUrl"],
        applyTo: function (t, i) {
            var s, r = {}, u = null,
                c = 0,
                d = i && i.flushInterval || a,
                h = i && i.maxQueueSize || l;
            this.around(t, {
                fetch: function (t, i) {
                    var a;
                    return i || (i = {}), n.call(this, i) ? t(i) : (i.url = (o || (o = e("underscore"))).result(this, "url"), this._requests || (this._requests = {}), a = this._requests[i.url], a || (a = this._requests[i.url] = $.Deferred(), r[this.id] = {
                        model: this,
                        deferred: a,
                        options: i
                    }, ++c, u || (s = function () {
                        var t = (o || (o = e("underscore"))).reduce(r, function (e, t, i) {
                            return "pending" === t.deferred.state() && (e[i] = t), e
                        }, {}),
                            i = Object.keys(t);
                        clearTimeout(u), s = null, u = null, r = {}, c = 0, i.length && (i.sort(), $.ajax({
                            url: this.batchUrl(i),
                            dataType: "json"
                        }).done(function (i) {
                            i.forEach(function (e) {
                                var i, n = e.id,
                                    s = t[n];
                                return s ? (i = s.model, i.lastFetchTime = Date.now(), i.set(i.parse(e), s.options), s.deferred.resolve(), n) : void 0
                            }), (o || (o = e("underscore"))).each(t, function (e) {
                                e.deferred.reject()
                            })
                        }))
                    }.bind(this), u = setTimeout(s, d)), c === h && s()), a)
                }
            })
        }
    })
}),
define("lib/mixins/models/polling-model", [], function (e, t, i) {
    var n, s, o, r, a = 2e3,
        l = 3e4,
        u = 100;
    n = i.exports = new(r || (r = e("lib/mixin")))({
        applyTo: function (e) {
            var t = e.constructor;
            this.before(t, {
                onCleanup: function (e) {
                    e.pollOff()
                }
            })
        },
        after: {
            initialize: function () {
                this._polling = {
                    circuit: null,
                    callbacks: {}
                }
            }
        },
        pollOn: function (t, i, n) {
            var s = this._polling,
                r = s.circuit;
            r || (r = s.circuit = new(o || (o = e("lib/circuit-breaker")))({
                tolerance: 1,
                baseDelay: a,
                maxDelay: l,
                backoffRate: 1.5,
                giveup: u,
                enabled: !1
            }), r.on("enabled", function () {
                this.fetch({
                    attrs: Object.keys(s.callbacks),
                    batch: !1
                }), r.failed()
            }, this).on("giveup", function () {
                this.pollOff()
            }, this)), s.callbacks[t] = s.callbacks[t] || [], s.callbacks[t].length || r.succeeded(), this._polling.callbacks[t].push({
                callback: i,
                context: n
            }), this.on("change:" + t, i, n)
        },
        pollOff: function (t, i, n) {
            var o, r = this._polling,
                a = {};
            3 === arguments.length && r.callbacks[t] ? (o = [], a[t] = [], r.callbacks[t].forEach(function (e) {
                e.callback === i && e.context === n ? a[t].push(e) : o.push(e)
            }), r.callbacks[t] = o, r.callbacks[t].length || delete r.callbacks[t]) : t ? (a = {
                attr: r.callbacks[t] || []
            }, delete r.callbacks[t]) : (a = r.callbacks, r.callbacks = {}), (s || (s = e("underscore"))).each(a, function (e, t) {
                e.forEach(function (e) {
                    this.off("change:" + t, e.callback, e.context)
                }, this)
            }, this), !Object.keys(r.callbacks).length && r.circuit && (r.circuit.dispose(), r.circuit = null)
        }
    })
}),
define("lib/keys", [], function (e, t, i) {
    i.exports = {
        ALT: 18,
        BACKSPACE: 8,
        CTRL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESC: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        META: 97,
        PGDOWN: 34,
        PGUP: 33,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        COMMA: 188
    }
}),
define("lib/helpers/number-helper", [], function (e, t, i) {
    var n, s = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
    n = i.exports = {
        format: function (e) {
            return "number" != typeof e && (e = parseInt(e, 10)), e !== e ? "" : e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        inWords: function (e) {
            return s[e] || e
        },
        zeroPad: function (e, t) {
            if (null == e) return e;
            e += "";
            var i = t - e.length;
            return i > 0 && (e = new Array(i + 1).join("0") + e), e
        },
        toOrdinal: function (e) {
            if (null == e) return e;
            var t = ["th", "st", "nd", "rd"],
                i = e % 100;
            return e + (t[(i - 20) % 10] || t[i] || t[0])
        }
    }
}),
define("lib/upload/aggregate-transfer-status", [], function (e, t, i) {
    function n(e, t) {
        var i = e ? "on" : "off";
        t[i]("data", s, this)
    }

    function s() {
        (l || (l = e("underscore"))).extend(this, this._statuses.reduce(r, {
            latest: 0,
            totalSize: 0
        })), this._statuses.length && this.latest === this.totalSize && o.call(this), this._cache = null, this.trigger("data")
    }

    function o() {
        this._statuses.forEach(n.bind(this, !1)), this._statuses.length = 0, s.call(this)
    }

    function r(e, t) {
        return e.latest += t.latest, e.totalSize += t.totalSize, e
    }
    var a, l, u;
    a = i.exports = (u || (u = e("lib/upload/transfer-status"))).extend({
        _statuses: null,
        _currentSpeed: 0,
        totalSize: 0,
        initialize: function () {
            this._statuses = [], this._cache = null
        },
        add: $.noop,
        addTransfer: function (e) {
            this._statuses.push(e), n.call(this, !0, e), s.call(this)
        },
        removeTransfer: function (e) {
            var t = this._statuses.indexOf(e);
            t > -1 && (this._statuses.splice(t, 1), n.call(this, !1, e), s.call(this))
        },
        getCurrentSpeed: function () {
            return null == this._cache && (this._cache = this._statuses.reduce(function (e, t) {
                return t.getCurrentSpeed() + e
            }, 0)), this._cache
        }
    })
}),
define("lib/upload/audible-upload", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = function (t, i) {
        var n, r = i.resource_type;
        return n = "playlist-upload" === r ? new(s || (s = e("lib/upload/playlist-upload")))(t, i) : new(o || (o = e("lib/upload/sound-upload-edit")))(t, i)
    }, n.getClass = function (t) {
        var i = t.resource_type;
        return "playlist-upload" === i ? s || (s = e("lib/upload/playlist-upload")) : o || (o = e("lib/upload/sound-upload-edit"))
    }
}),
define("lib/upload/playlist-upload", [], function (e, t, i) {
    function n(e) {
        this[e]("change:status", a, this)[e]("imageDataChanged", s, this), this._soundUploads[e]("change:status", l, this)[e]("remove", r, this)
    }

    function s(e) {
        this._soundUploads.invoke("setImageFile", e.file, e.source)
    }

    function o(e, t) {
        e.forEach(function (e) {
            this.get("transfer")[t ? "addTransfer" : "removeTransfer"](e.get("transfer")), this.get("transcoding")[t ? "addTransfer" : "removeTransfer"](e.get("transcoding"))
        }, this)
    }

    function r(e, t) {
        o.call(this, [e], !1), t.length || this.cancel()
    }

    function a() {
        var t, i = this.get("status");
        i !== (w || (w = e("lib/upload/statuses"))).FAILED || this.failedSaving ? this.setActionState("save", "enabled") : this.setActionState("save", "disabled"), i === (w || (w = e("lib/upload/statuses"))).TRANSCODING && this.get("hasQueuedSave") && (t = this._soundUploads.map(function (e) {
            return e.saveEdits()
        }), $.whenAll(t).always(this.saveEdits.bind(this)))
    }

    function l() {
        var t, i = this._soundUploads,
            n = !1,
            s = !1,
            o = !0,
            r = !0;
        this.failedSaving || (i.some(function (t) {
            switch (t.get("status")) {
            case (w || (w = e("lib/upload/statuses"))).UPLOADING:
                return s = !0, !0;
            case (w || (w = e("lib/upload/statuses"))).QUEUED:
                n = !0, r = !1, o = !1;
                break;
            case (w || (w = e("lib/upload/statuses"))).TRANSCODING:
                r = !1, o = !1;
                break;
            case (w || (w = e("lib/upload/statuses"))).COMPLETE:
                o = !1
            }
        }), t = s ? (w || (w = e("lib/upload/statuses"))).UPLOADING : n ? (w || (w = e("lib/upload/statuses"))).QUEUED : o ? (w || (w = e("lib/upload/statuses"))).FAILED : r ? (w || (w = e("lib/upload/statuses"))).COMPLETE : (w || (w = e("lib/upload/statuses"))).TRANSCODING, t === (w || (w = e("lib/upload/statuses"))).FAILED ? this.setToFailed() : this.set("status", t))
    }

    function u(t) {
        t.forEach(function (t) {
            t.set((h || (h = e("underscore"))).pick(this.attributes, k))
        }, this)
    }

    function c(t) {
        t.changedAttributes() && this._soundUploads.each(function (i) {
            i.set((h || (h = e("underscore"))).pick(t.changedAttributes(), k))
        })
    }
    var d, h, p, f, g, m, v, b, _, y, w, x, k = ["description", "tags", "editing", "artwork_url", "buyLink", "buyTitle", "sharing", "streamable", "embeddableByAll", "domainLocking", "downloadable", "license", "creativeCommonsLicense", "attribution", "nonCommercial", "nonDerivative", "shareAlike", "commentable", "publicComments", "stats", "geoblocking", "geoblockings"];
    x = (g || (g = e("lib/collection"))).extend({
        model: _ || (_ = e("lib/upload/sound-upload-edit")),
        url: null,
        isFullyPopulated: function () {
            return !0
        },
        hasDataForView: function () {
            return !0
        }
    }), d = i.exports = (m || (m = e("lib/form"))).extend(y || (y = e("lib/mixins/forms/upload-edit-item")), b || (b = e("lib/mixins/sortable-object")), {
        _soundUploads: null,
        _playlist: null,
        failedSaving: !1,
        resource_type: "playlist-upload",
        actions: {
            save: function () {
                var e = $.Deferred(),
                    t = $.Deferred(),
                    i = function (e) {
                        var n;
                        return e.length ? (n = e.pop(), n.set("editing", !1), n.saveEdits().always(i.bind(this, e))) : t.resolve(), t
                    };
                return this.validate().done(function (t) {
                    t ? (this.set("editing", !1), i(this.getSoundUploads().slice()).done(function () {
                        this.saveEdits().done(e.resolve).fail(e.reject)
                    }.bind(this)).fail(function () {
                        this.set("hasQueuedSave", !0), e.reject()
                    }.bind(this))) : e.reject()
                }.bind(this)).fail(e.reject), e
            }
        },
        getAttributesToBeSaved: function () {
            return {}
        },
        setup: function () {
            this._soundUploads = new x, n.call(this, "on"), this.set("transfer", new(f || (f = e("lib/upload/aggregate-transfer-status")))), this.set("transcoding", new(f || (f = e("lib/upload/aggregate-transfer-status")))), this.on("change", c, this)
        },
        validate: function () {
            var t = $.Deferred(),
                i = (m || (m = e("lib/form"))).prototype.validate.apply(this, arguments),
                n = this._soundUploads.map(function (e) {
                    return e.validate()
                });
            return n.push(i), $.when.apply($, n).done(function () {
                var i = Array.prototype.slice.call(arguments);
                t.resolve(i.every((h || (h = e("underscore"))).identity))
            }), t
        },
        addFiles: function (t) {
            var i = t.map(function (t) {
                var i = new(_ || (_ = e("lib/upload/sound-upload-edit")))({
                    file: t
                });
                return i.release(), i
            });
            return this._soundUploads.add(i), u.call(this, i), o.call(this, i, !0), this._soundUploads.length
        },
        onAudibleSaved: function () {
            var e = this.getAudible();
            return this._soundUploads.each(function (t) {
                var i, n = t.getAudible();
                e.addSound(n), i = e.findSoundById(n.id), t.updateSound(i)
            }), e.saveOrder().done(function () {
                this.failedSaving = !1, this.set("hasBeenSaved", !0)
            }.bind(this)).fail(this.onSaveFailed.bind(this))
        },
        onSaveFailed: function (e) {
            this.failedSaving = !0, this.setToFailed("save", e), this.set("editing", !0)
        },
        cancel: function () {
            var t;
            for (t = this._soundUploads.length; t--;) this._soundUploads.at(t).cancel();
            this.destroy(), this._playlist && (p || (p = e("lib/action-controller"))).destroy(this._playlist)
        },
        resetOrder: $.noop,
        saveOrder: $.noop,
        getCurrentOrder: function () {
            return (h || (h = e("underscore"))).pluck(this.getSoundUploads(), "resource_id")
        },
        reorder: function (e) {
            var t = this._soundUploads,
                i = t.comparator;
            t.comparator = function (t) {
                return e.indexOf(t.resource_id)
            }, t.sort({
                silent: !0
            }), t.comparator = i
        },
        getAudible: function () {
            return this._playlist
        },
        createAudible: function () {
            return this._playlist = new(v || (v = e("models/playlist"))), this._playlist
        },
        getSoundUploadsCollection: function () {
            return this._soundUploads
        },
        getSoundUploads: function () {
            return this._soundUploads.models
        }
    }, {
        onCleanup: function () {
            this._playlist && this._playlist.release(), o.call(this, this.getSoundUploads(), !1), n.call(this, "off"), this._soundUploads.release()
        }
    })
}),
define("lib/upload/sound-upload-edit", [], function (e, t, i) {
    function n() {
        function t() {
            var t = this.result,
                i = t.byteLength,
                n = {};
            "TAG" === (g || (g = e("lib/helpers/blob-helper"))).getStringFromBuffer(t, i - 128, 3) && (p || (p = e("underscore"))).extend(n, {
                title: (g || (g = e("lib/helpers/blob-helper"))).getStringFromBuffer(t, i - 125, 30).trim()
            }, (w || (w = e("lib/upload/genre-helper"))).convertFromID3((g || (g = e("lib/helpers/blob-helper"))).getByteFromBuffer(t, i - 1))), n.title || (n.title = a(o.name)), s.set(n)
        }
        if (!this._detailsDeferred) {
            var i, n = this._detailsDeferred = $.Deferred(),
                s = this,
                o = s.get("file");
            o.slice ? (i = new FileReader, i.onload = t, i.onloadend = n.resolve, i.readAsArrayBuffer(o.slice(-128))) : (s.set("title", a(o.name)), n.resolve())
        }
        return this._detailsDeferred
    }

    function s() {
        this._uploadRequest && this._uploadRequest.reject(), this._transcodingStatus && this._transcodingStatus.reject()
    }

    function o() {
        var t, i = $.Deferred();
        return r().done(function (n) {
            if ("pending" === i.state()) {
                var s = new window.FormData,
                    o = (N || (N = e("lib/url"))).stringify({
                        scheme: "https",
                        host: n.bucket + ".s3.amazonaws.com"
                    });
                (p || (p = e("underscore"))).each((p || (p = e("underscore"))).extend(n, {
                        file: this.get("file")
                    }), function (e, t) {
                        s.append(t, e)
                    }), t = $.ajax({
                        url: o,
                        type: "POST",
                        data: s,
                        processData: !1,
                        contentType: !1,
                        dataType: "xml",
                        timeout: 0,
                        progress: function (e) {
                            i.notify(e.loaded / (e.total || 1), e)
                        }
                    }), t.done(function () {
                        i.resolve(n.key)
                    }).fail(i.reject)
            }
        }.bind(this)).fail(i.reject), i.fail(function () {
            t && t.abort()
        })
    }

    function r() {
        return $.ajax({
            url: "upload/policy",
            dataType: "json",
            cache: !1
        })
    }

    function a(t) {
        var i, n;
        return t = t.replace(/\.[a-z0-9]{2,}$/, ""), n = t.replace(/_/g, " ").replace(/(\S)-(\S)/g, "$1 - $2").replace(/^\d+\s*-?\s*/g, "").replace(/- \d+ -/, " - "), i = n.split(" - "), 2 === i.length && (n = i[1]), n = (x || (x = e("lib/helpers/lang-helper"))).capitalize(n).trim(), n || t.trim()
    }

    function l(t) {
        var i, n = (A || (A = e("collections/user-stream"))).instances.get((v || (v = e("lib/connect"))).currentUserId());
        n && (i = (D || (D = e("models/user-stream-item"))).convert(t), n.add(i, {
            at: 0
        }), i.release())
    }

    function u() {
        (m || (m = e("config"))).get("router").navigateToRoute("listen", [this.getAudible()], {
            trigger: !0
        })
    }

    function c(t) {
        (m || (m = e("config"))).get("router").navigate(t, {
            trigger: !0
        })
    }

    function d() {
        var e = this.getAttributesFromModel();
        this.set(e), this.markFieldsClean()
    }
    var h, p, f, g, m, v, b, _, y, w, x, k, S, C, T, E, A, D, I, P, M, N, L;
    h = i.exports = (y || (y = e("lib/form"))).extend(P || (P = e("lib/mixins/forms/upload-edit-item")), L || (L = e("lib/mixins/forms/scheduled-form-fields")), {
        fields: {
            file: {
                defaultValue: null
            },
            permalink: {
                defaultValue: ""
            }
        },
        constraints: {
            permalink: [
                [k || (k = e("lib/constraints/permalink")), {
                    getSound: function () {
                        return this.getAudible()
                    }
                }]
            ]
        },
        _sound: null,
        resource_type: "sound-upload-edit",
        _uploadRequest: null,
        _transcodingStatus: null,
        _detailsDeferred: null,
        groupId: null,
        onCancelUrl: null,
        actions: {
            save: function () {
                var e = $.Deferred();
                return this.validate().done(function (t) {
                    t ? (this.set("editing", !1), this.saveEdits().done(e.resolve).fail(e.reject)) : e.reject()
                }.bind(this)), e
            },
            cancelUpload: function () {
                this._replacingAudio ? (b || (b = e("lib/helpers/dialog-helper"))).confirm("Are you sure you want to cancel the replacement?").done(this.cancelUpload.bind(this)) : this.performAction("cancel")
            },
            cancel: function () {
                return this.isEdit && !this.isDirty() ? void this.cancel() : void(b || (b = e("lib/helpers/dialog-helper"))).confirm("Are you sure you want to cancel the " + (this.isEdit ? "edits" : "upload") + "?").done(this.cancel.bind(this))
            }
        },
        setup: function (t, i) {
            var n = t.file;
            this.setupTransfers(), n && this.setFile(n), this.groupId = i.uploadToGroupId, this.onCancelUrl = i.onCancelUrl, i.resource_id ? (this.isEdit = !0, this._sound = new(S || (S = e("models/sound")))({
                id: i.resource_id
            }), this._sound.isPopulated() || this._sound.fetch().done(d.bind(this)), this.setButtonConfig("cancelUpload", {
                label: "Cancel replacement"
            }), this.set({
                status: (M || (M = e("lib/upload/statuses"))).COMPLETE,
                hasBeenSaved: !0,
                advancedMode: !0
            }), this.addSubmodel(this._sound), d.call(this)) : (this.setButtonConfig("cancelUpload", {
                label: "Cancel upload"
            }), this.toggleValidation(!1, {
                fields: ["permalink"]
            }))
        },
        setFile: function (t) {
            var i = this.options.resource_id;
            this._replacingAudio = !! i, this.set("file", t), this.setTransferSize(t.size), this.get("title") || i || n.call(this), this.set({
                status: (M || (M = e("lib/upload/statuses"))).QUEUED,
                hasBeenSaved: !1
            })
        },
        setupTransfers: function () {
            this.set("transfer", new(E || (E = e("lib/upload/transfer-status")))({
                sampleSize: 50
            })), this.set("transcoding", new(E || (E = e("lib/upload/transfer-status")))({
                sampleSize: 10,
                totalSize: 100
            }))
        },
        setTransferSize: function (e) {
            this.get("transfer").setTotal(e)
        },
        createAudible: function () {
            return this._sound = new(S || (S = e("models/sound")))({
                uid: this._s3key,
                original_filename: this.get("file").name
            }), this._sound
        },
        onAudibleSaved: function () {
            var t = this.getAudible();
            return this.isEdit ? u.call(this) : l(t), this.groupId && (f || (f = e("lib/action-controller"))).addToGroup(this.getAudible().id, this.groupId, !0), (_ || (_ = e("event-bus"))).trigger("upload_funnel:save"), this.set("hasBeenSaved", !0), $.Deferred().resolve()
        },
        onSaveFailed: function (t) {
            this.setToFailed("save", t), this.get("transcoding").setTotal(100).add(0), this._uploadRequest && this._uploadRequest.reject(), this._transcodingStatus && this._transcodingStatus.reject(), this.set("editing", !0), (m || (m = e("config"))).get("me").fetch()
        },
        getAttributesToBeSaved: function () {
            var t = (p || (p = e("underscore"))).pick(this.attributes, "permalink", "downloadable", "commentable");
            return t.api_streamable = this.get("streamable"), t.reveal_comments = this.get("publicComments"), t
        },
        getAttributesFromModel: function () {
            var t = this.getAudible(),
                i = (p || (p = e("underscore"))).pick(t.attributes, "title", "permalink", "description", "sharing", "downloadable", "streamable", "commentable", "artwork_url");
            return i.buyLink = t.get("purchase_url"), i.buyTitle = t.get("purchase_title") || this.getFieldMetadata("buyTitle").defaultValue, i.embeddableByAll = "all" === t.get("embeddable_by"), i.tags = (C || (C = e("lib/helpers/tag-helper"))).extract(t.attributes), (p || (p = e("underscore"))).extend(i, this.parseLicense(t.get("license"))), i.geoblockings = t.get("geo_blockings"), i
        },
        cancelUpload: function () {
            s.call(this), this.trigger("upload:cancelUpload", this), this.get("transfer").add(0), this.get("transcoding").add(0), this.set({
                status: (M || (M = e("lib/upload/statuses"))).COMPLETE,
                hasBeenSaved: !0
            }), this._sound && this._sound.set("state", (S || (S = e("models/sound"))).states.FINISHED), (_ || (_ = e("event-bus"))).trigger("upload_funnel:cancel"), this.markFieldsClean()
        },
        cancel: function () {
            this._replacingAudio ? this.cancelUpload() : s.call(this), this.isEdit ? (d.call(this), u.call(this)) : (this.destroy(), this._sound && (f || (f = e("lib/action-controller"))).destroy(this._sound), (_ || (_ = e("event-bus"))).trigger("upload_funnel:cancel"), this.onCancelUrl && c.call(this, this.onCancelUrl), this.groupId && this.get("hasBeenSaved") && this.getAudible() && (f || (f = e("lib/action-controller"))).addToGroup(this.getAudible().id, this.groupId, !1))
        },
        upload: function () {
            var t = $.Deferred();
            this.set("status", (M || (M = e("lib/upload/statuses"))).UPLOADING), (I || (I = e("lib/support"))).formData && (this._replacingAudio ? t.resolve() : n.call(this).done(t.resolve).fail(t.reject), t.done(function () {
                var e;
                e = this._uploadRequest = o.call(this), e.always(function () {
                    this._request = null
                }.bind(this)).done(this.onUploadComplete.bind(this)).fail(this.onUploadFailed.bind(this)).progress(this.onUploadProgress.bind(this))
            }.bind(this)))
        },
        getAudible: function () {
            return this._sound
        },
        updateSound: function (e) {
            this._sound && (this._sound.release(), this._sound = e)
        },
        getSoundUploads: function () {
            return [this]
        },
        startTranscoding: function (t) {
            function i() {
                $.getJSON("transcodings/" + t).done(function (t) {
                    switch (t.status) {
                    case (T || (T = e("lib/upload/transcoding-statuses"))).QUEUED:
                    case (T || (T = e("lib/upload/transcoding-statuses"))).PREPARING:
                        r = Math.min(1e4, 1.5 * r), n = setTimeout(i, r);
                        break;
                    case (T || (T = e("lib/upload/transcoding-statuses"))).TRANSCODING:
                        r = t.percentage === s ? Math.min(3e4, 1.5 * r) : 1e3, s = t.percentage, o.notify(s), n = setTimeout(i, r);
                        break;
                    case (T || (T = e("lib/upload/transcoding-statuses"))).FINISHED:
                        o.resolve();
                        break;
                    case (T || (T = e("lib/upload/transcoding-statuses"))).NOT_FOUND:
                    case (T || (T = e("lib/upload/transcoding-statuses"))).FAILURE:
                        o.reject()
                    }
                })
            }
            var n, s, o = $.Deferred(),
                r = 1e3;
            return $.ajax({
                url: "transcodings",
                type: "POST",
                data: {
                    uid: t
                },
                contentType: "application/json"
            }).done(function () {
                n = setTimeout(i, r)
            }).fail(o.reject), o.fail(function () {
                clearTimeout(n)
            }), o
        },
        onUploadComplete: function (t) {
            var i = this.get("transfer");
            this._s3key = t, this.set("status", (M || (M = e("lib/upload/statuses"))).TRANSCODING), i.add(i.getTotalSize()), this.get("hasQueuedSave") && this.saveEdits(), (_ || (_ = e("event-bus"))).trigger("upload_funnel:upload_done"), this.get("transcoding").setTotal(0), this._transcodingStatus = this.startTranscoding(t).done(this.onTranscodingComplete.bind(this)).fail(this.onTranscodingFailed.bind(this)).progress(this.onTranscodingProgress.bind(this))
        },
        onUploadFailed: function () {
            this.setToFailed("upload"), (_ || (_ = e("event-bus"))).trigger("upload_funnel:failed:uploading")
        },
        onUploadProgress: function (e, t) {
            this.get("transfer").setTotal(t.total).add(t.loaded)
        },
        onTranscodingProgress: function (e) {
            this.get("transcoding").setTotal(100).add(e)
        },
        onTranscodingComplete: function () {
            this._sound && this._sound.set("state", (S || (S = e("models/sound"))).states.FINISHED), this.get("transcoding").setTotal(100).add(100), this.set("status", (M || (M = e("lib/upload/statuses"))).COMPLETE), (_ || (_ = e("event-bus"))).trigger("upload_funnel:complete")
        },
        onTranscodingFailed: function () {
            this._sound && this._sound.set("state", (S || (S = e("models/sound"))).states.FAILED), this.setToFailed("transcode"), this.get("transcoding").setTotal(100), (_ || (_ = e("event-bus"))).trigger("upload_funnel:failed:transcoding")
        }
    }, {
        hashFn: function (e, t) {
            return e.resource_id || t && t.resource_id || e.id || null
        },
        onCleanup: function () {
            this._sound && this._sound.release()
        }
    })
}),
define("lib/upload/statuses", [], function (e, t, i) {
    i.exports = {
        QUEUED: 1,
        UPLOADING: 2,
        FAILED: 4,
        UPLOADED: 8,
        TRANSCODING: 16,
        COMPLETE: 32
    }
}),
define("lib/helpers/price-helper", [], function (e, t, i) {
    var n, s = {
            EUR: "â‚¬",
            USD: "$"
        };
    n = i.exports = {
        codeToSymbol: function (e) {
            var t = s[e];
            return t || e
        },
        format: function (e, t) {
            return n.codeToSymbol(t) + e
        }
    }
}),
define("lib/subview-plugin", [], function (e, t) {
    function i(t, i) {
        var n, s, o, r = t.getAttribute("data-id"),
            l = a[r];
        l.__path ? (s = e(l.__path), delete l.__path) : (s = l.__class, delete l.__class), delete a[r], l.key && (o = l.key, delete l.key), n = i.addSubview(new s(l), o), n.render(), t.parentNode.replaceChild(n.el, t)
    }

    function n(t, i) {
        var n, s;
        return "string" == typeof t ? (i.hash.__path = t, s = e(t)) : (i.hash.__class = t, s = t), i.hash.args && ((o || (o = e("underscore"))).isFunction(i.hash.args) && (i.hash.args = i.hash.args(this)), i.hash = (o || (o = e("underscore"))).extend({}, i.hash.args, i.hash)), delete i.hash.args, i.fn && (i.hash.blockContent = new((r || (r = e("vendor/handlebars-runtime"))).SafeString)(i.fn(this))), i.hash.className && (i.hash.className = [s.prototype.className, i.hash.className].filter(Boolean).join(" ")), n = l++, a[n] = i.hash, '<view data-id="' + n + '"></view>'
    }

    function s(e) {
        e.$("view").each(function () {
            i(this, e)
        })
    }
    var o, r, a = {}, l = 0;
    t.handlebarHelper = n, t.replacePlaceholders = s
}),
define("lib/template-helpers", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d, h, p, f, g, m, v;
    n = i.exports = {
        $a11y: function (t) {
            return new((r || (r = e("vendor/handlebars-runtime"))).SafeString)((o || (o = e("lib/helpers/a11y-helper"))).getAccessibleMarkup(t.hash))
        },
        $count: function (t, i) {
            return (a || (a = e("lib/helpers/count-helper"))).render(t, i.hash)
        },
        $date: function (e, t) {
            return new Date(e).format(t.hash.format)
        },
        $debug: function () {
            return ""
        },
        $image: function (t, i) {
            return new((r || (r = e("vendor/handlebars-runtime"))).SafeString)((u || (u = e("lib/helpers/image-helper"))).markup(t, i.hash))
        },
        $privateLabel: function (t) {
            var i, n;
            return i = (s || (s = e("underscore"))).defaults(t.hash, {
                href: null,
                className: null
            }), n = '<<%-tag%> class="<%-className%>"' + (i.href ? ' href="<%-href%>" target="blank"' : "") + "><%-label%></<%-tag%>>", new((r || (r = e("vendor/handlebars-runtime"))).SafeString)((s || (s = e("underscore"))).template(n, {
                tag: i.href ? "a" : "span",
                className: ("sc-label sc-label-small sc-label-private " + i.className).trim(),
                label: "Private",
                href: i.href
            }))
        },
        $icon: function (t) {
            return new((r || (r = e("vendor/handlebars-runtime"))).SafeString)((c || (c = e("lib/helpers/icon-helper"))).render(t.hash))
        },
        $number: function (t) {
            return (f || (f = e("lib/helpers/number-helper"))).format(t)
        },
        $ordinal: function (t) {
            return (f || (f = e("lib/helpers/number-helper"))).toOrdinal(t)
        },
        $join: function (t, i) {
            var n;
            return n = t.map(function (e) {
                return i.fn(e).trim()
            }), new((r || (r = e("vendor/handlebars-runtime"))).SafeString)((d || (d = e("lib/helpers/join-helper"))).render(n, i.hash))
        },
        $name: (p || (p = e("lib/helpers/name-helper"))).get,
        $plural: (h || (h = e("lib/helpers/lang-helper"))).plural,
        $relativeUrl: function (e) {
            return e.replace(/^https?:.+?\w\//, "/")
        },
        $route: function () {
            var t = (s || (s = e("underscore"))).toArray(arguments).slice(0, -1);
            return (g || (g = e("router"))).getRoute.apply(g || (g = e("router")), t)
        },
        $timecode: function (t, i) {
            return (l || (l = e("lib/helpers/datetime-helper"))).timecode(t, i.hash)
        },
        $usertext: function (t, i) {
            return new((r || (r = e("vendor/handlebars-runtime"))).SafeString)((v || (v = e("vendor/usertext/usertext")))(t, i.hash))
        },
        $usertextOneline: function () {
            var t = (v || (v = e("vendor/usertext/usertext"))).withDefaults({
                paragraphs: !1,
                whitelist: [],
                externalLinks: !1
            });
            return function (i, n) {
                return new((r || (r = e("vendor/handlebars-runtime"))).SafeString)(t(i, n.hash))
            }
        }(),
        $view: function () {
            return new((r || (r = e("vendor/handlebars-runtime"))).SafeString)((m || (m = e("lib/subview-plugin"))).handlebarHelper.apply(this, arguments))
        }
    }
}),
define("collections/announcements", [], function (e, t, i) {
    function n(e) {
        return this.message.indexOf(e) > -1
    }
    var s, o, r, a, l, u, c = new(u || (u = e("lib/persistent-store")))("already-seen"),
        d = {
            "cookies-notification": {
                message: 'SoundCloud uses cookies. By browsing the site, you\'re agreeing to our <a href="/pages/cookies" class="sc-link-dark">cookie policy</a>.'
            },
            "email-confirmation-announcement": {
                message: 'Please confirm your email address to make the most of your SoundCloud experience. Check your <a href="/settings/email" class="sc-link-dark">settings</a> to resend the confirmation email.',
                shouldAddAnnouncement: function () {
                    return (a || (a = e("lib/connect"))).isLoggedIn() && !(r || (r = e("config"))).get("me").get("primary_email_confirmed")
                }
            }
        }, h = ["old search system", "We will no longer be showing Favorites", "making some changes to the Classic Dashboard"];
    s = i.exports = (l || (l = e("lib/polling-collection"))).extend({
        model: o || (o = e("models/announcement")),
        baseUrl: "announcements",
        setup: function () {
            Object.keys(d).filter(function (e) {
                var t = d[e].shouldAddAnnouncement;
                return 1 !== c.get(e) && (!t || t())
            }).forEach(function (e) {
                this.add({
                    message: d[e].message,
                    localKey: e
                }), c.set(e, 1), this.lastFetchTime = Date.now()
            }, this)
        },
        parse: function (e) {
            return e.filter(function (e) {
                return !h.some(n, e)
            })
        }
    }, {
        neverRelease: !0,
        hashFn: function () {
            return 1
        }
    })
}),
define("lib/views/list", [], function (e, t, i) {
    function n() {
        var t = (o || (o = e("underscore"))).pluck(this.subviews, "model");
        return this.collection.find(function (e) {
            return -1 === t.indexOf(e)
        })
    }
    var s, o, r, a;
    s = i.exports = (r || (r = e("lib/view"))).extend({
        emptyTemplate: null,
        defaults: {
            bulkFetch: 0,
            maxDisplay: 3,
            inverted: !1
        },
        Subview: null,
        subviewArgs: {},
        listTagName: "ul",
        listClassName: "sc-list-nostyle sc-clearfix",
        itemTagName: "li",
        itemClassName: "",
        animations: {},
        template: function () {
            return ""
        },
        _listElement: null,
        fetchData: function () {
            return this.options.bulkFetch ? this.collection.bulkFetch(this.options.bulkFetch) : this.collection.fetch()
        },
        renderDecorate: function () {
            this.createListElement() && this.addInitialItems()
        },
        createListElement: function () {
            var e, t = this.getListContainer();
            return t.length && !this._listElement && (e = document.createElement(this.listTagName), this.listClassName && (e.className = this.listClassName), t.append(e), this._listElement = $(e)), this._listElement
        },
        addInitialItems: function () {
            var e, t = this.getModelsToRender(),
                i = Math.min(this.options.maxDisplay || 1 / 0, t.length);
            for (e = 0; i > e; ++e) this.createAndInsertListItemView(t[e], -1)
        },
        _teardown: function () {
            this._listElement && (this._listElement.remove(), this._listElement = null), (r || (r = e("lib/view"))).prototype._teardown.call(this)
        },
        getModelsToRender: function () {
            return this.collection.models
        },
        createAndInsertListItemView: function (t, i) {
            var n, s = this.options.maxDisplay;
            n = this.addListItemSubview(t), n.render(), this.addListItemToDOM(n, (o || (o = e("underscore"))).isNumber(i) ? i : -1), s && this.getListItemViews().length > s && (n = this.getListItemView(this.collection.at(s)), n && (this.removeListItemFromDOM(n, {
                animations: !1
            }), this.removeSubview(n)))
        },
        getTemplate: function (t) {
            return this.emptyTemplate && t && !this.collection.length && this.collection.isFullyPopulated() ? this.emptyTemplate : (r || (r = e("lib/view"))).prototype.getTemplate.apply(this, arguments)
        },
        getListContainer: function () {
            return this.$el
        },
        getListElement: function () {
            return this._listElement || $()
        },
        getListItemView: function (t) {
            return (o || (o = e("underscore"))).find(this.subviews, function (e) {
                return e.model === t
            })
        },
        getListItemWrappers: function () {
            return this.getListElement().children()
        },
        getListItemViews: function () {
            var e = this.Subview;
            return this.subviews.filter(function (t) {
                return t instanceof e
            })
        },
        getListItemViewByScrollOffset: function (t) {
            var i, n;
            return (o || (o = e("underscore"))).find(this.subviews, function (e) {
                return e.$el.is(":visible") ? (i = e.$el.outerHeight(), n = e.$el.position().top + t - i / 2, t >= n && n + i > t) : !1
            })
        },
        getSubviewArgs: function (t) {
            return (o || (o = e("underscore"))).defaults({
                resource_id: t.resource_id,
                resource_type: t.resource_type
            }, this.subviewArgs)
        },
        getListItemAttributesData: function (e) {
            return e.model ? e.model.toJSON() : {}
        },
        getListItemAttributes: function () {
            return {}
        },
        getListItemAttributesString: function (t) {
            var i = this.getListItemAttributes(t);
            return new((a || (a = e("vendor/handlebars-runtime"))).SafeString)((o || (o = e("underscore"))).toAttributesString(i))
        },
        onAdd: function (e, t, i) {
            if (!this.disposed) {
                if (!this.getListElement().length && 1 === t.length && e === t.at(0)) return void this.rerender();
                var n = i && "number" == typeof i.index ? i.index : -1,
                    s = this.options.maxDisplay,
                    o = !s || n >= 0 && s > n || 0 > n && this.collection.length <= s;
                o && this.createAndInsertListItemView(e, n)
            }
        },
        onRemove: function (e) {
            var t = this.getListItemView(e);
            t && (this.removeListItemFromDOM(t), this.removeSubview(t))
        },
        addListItemSubview: function (e) {
            var t = this.getSubviewArgs(e);
            return this.addSubview(new this.Subview(t))
        },
        getListItemViewByEvent: function (t) {
            var i, n = $(t.target).closest(this.getListItemSelector());
            return n.length && (i = (o || (o = e("underscore"))).find(this.subviews, function (e) {
                return e.el === n.children()[0]
            })), i
        },
        getListItemSelector: function () {
            return "." + this.itemClassName.trim().split(/\s+/).join(".")
        },
        createSubviewWrapper: function (e) {
            var t, i = this.getListItemAttributesString(this.getListItemAttributesData(e));
            return i = i.toString().length ? " " + i : "", t = $("<" + this.itemTagName + ' class="' + this.itemClassName + '"' + i + ">")
        },
        getSubviewWrapper: function (e) {
            return e.$el.parent()
        },
        getSubviewInWrapper: function (t) {
            return (o || (o = e("underscore"))).find(this.subviews, function (e) {
                return e.$el.parent().is(t)
            })
        },
        addListItemToDOM: function (e, t) {
            var i, n, s = this.getListElement(),
                o = this.getSubviewWrapper(e),
                r = this.options.inverted;
            o.length || (o = this.createSubviewWrapper(e), o.append(e.el)), -1 === t || t >= this.collection.length - 1 || void 0 === t ? s[r ? "prepend" : "append"](o) : 0 === t ? s[r ? "append" : "prepend"](o) : (n = this.getListItemView(this.collection.at(t - 1)), n && (i = this.getSubviewWrapper(n), o[r ? "insertBefore" : "insertAfter"](i)))
        },
        removeListItemFromDOM: function (e, t) {
            var i, s = this.getSubviewWrapper(e),
                o = this.options.maxDisplay,
                r = !t || t.animations !== !1;
            i = function () {
                var t, i, r, a = -1;
                s.detach(), e._dispose(), r = !this._disposed && o && o <= this.collection.length && this.getListItemWrappers().length < o, r && (i = n.call(this), t = this.addListItemSubview(i), t.render(), this.addListItemToDOM(t, a))
            }.bind(this), r && this.animations.remove ? this.addDeferred(setTimeout(s.fadeOut.bind(s, "slow", i), this.animations.remove.delay)) : i()
        },
        detachSubviewFromDOM: function (e) {
            this.getSubviewWrapper(e).detach()
        },
        appendDOMElement: function (e) {
            var t = this.getListContainer();
            t && t[this.options.inverted ? "prepend" : "append"](e)
        },
        getCollectionData: function () {
            return []
        }
    })
}),
define("lib/mixins/views/on-context-request", [], function (e, t, i) {
    var n, s, o, r = ["tracking"];
    n = i.exports = new(o || (o = e("lib/mixin")))({
        applyTo: function (t, i) {
            t.contextName = i, t.bubbleEvents = (s || (s = e("underscore"))).extend(t.bubbleEvents || {}, {
                contextrequest: "onContextRequest"
            })
        },
        onContextRequest: function (e) {
            var t, i, n = this.model;
            n && (t = "promoted" === n.get("source") || "promoted" === n.get("campaign"), i = t && n.get("promoted_by"), e.data.campaign = t ? "promoted" : e.data.campaign, e.data.promoted_by = i || e.data.promoted_by, r.forEach(function (t) {
                e.data[t] = n.get(t) || e.data[t]
            })), e.data.scope || (e.data.scope = []), e.data.scope.unshift(this.contextName)
        }
    })
}),
define("config/notification-types", [], function (e, t, i) {
    var n = e("lib/backbone").Model;
    i.exports = {
        stream: new n({
            channel: "/me/activities/tracks",
            baseUrl: "e1/me/stream",
            itemName: "sound",
            minPollInterval: 12e4,
            maxPollInterval: 192e4
        }),
        activities: new n({
            channel: "/me/activities/all/own",
            baseUrl: "e1/me/activities",
            itemName: "activity",
            itemNamePlural: "activities",
            minPollInterval: 12e4,
            maxPollInterval: 192e4
        }),
        unreadConversations: new(n.extend({
            defaults: {
                baseUrl: "me/conversations/unread?force=1",
                itemName: "conversation",
                itemNamePlural: "conversations",
                minPollInterval: 0,
                maxPollInterval: 0
            },
            initialize: function () {
                this.setDefaultPolling()
            },
            enableRealTimePolling: function () {
                this.set("minPollInterval", 4e4), this.set("maxPollInterval", 18e4), this.trigger("pollIntervalChange")
            },
            setDefaultPolling: function () {
                this.set("minPollInterval", 3e5), this.set("maxPollInterval", 192e4), this.trigger("pollIntervalChange")
            }
        })),
        conversations: new n({
            baseUrl: "me/conversations",
            itemName: "conversation",
            itemNamePlural: "conversations",
            minPollInterval: 1e3,
            maxPollInterval: 3e4
        })
    }
}),
define("collections/activities-own", [], function (e, t, i) {
    function n(t) {
        t = t || 1, $.ajax({
            url: (r || (r = e("config"))).get("api_v2_host") + "activities/activities?limit=" + t,
            processData: !1
        })
    }
    var s, o, r, a;
    s = i.exports = (a || (a = e("lib/notifying-collection"))).extend(o || (o = e("lib/mixins/collections/activities-collection")), {
        notificationType: "activities",
        initialize: function () {
            var t = (a || (a = e("lib/notifying-collection"))).prototype.initialize.apply(this, arguments),
                i = this.queue.fetch;
            return this.queue.fetch = function () {
                var e = i.apply(this, arguments);
                return n(1), e
            }, t
        },
        fetch: function () {
            var t = (a || (a = e("lib/notifying-collection"))).prototype.fetch.apply(this, arguments),
                i = this.url(),
                s = /[&?]limit=(\d+)/.exec(i);
            return n(s && s[1]), t
        }
    }, {
        hashFn: function () {
            return 1
        }
    })
}),
define("lib/gc-store", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (s || (s = e("lib/store"))).extend(), (o || (o = e("lib/mixins/stores/usage-counting"))).applyTo(n.prototype)
}),
define("models/id-list", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d;
    n = i.exports = (a || (a = e("lib/model"))).extend({
        CREATE: "PUT",
        READ: "GET",
        DELETE: "DELETE",
        _currentRequests: null,
        next_href: null,
        _fetchDefer: null,
        readPathSuffix: "ids",
        setup: function () {
            this._currentRequests = new(l || (l = e("lib/store")))
        },
        url: function (t) {
            var i = (u || (u = e("lib/url"))).parse((c || (c = e("underscore"))).result(this, "baseUrl"));
            if (i.path = i.path.replace(/\/?$/, "/"), t) i.path += t;
            else {
                if (null !== this.next_href) return this.next_href;
                i.path += this.readPathSuffix, i.query.linked_partitioning = 1, i.query.limit = 5e3
            }
            return (u || (u = e("lib/url"))).stringify(i)
        },
        get: function () {
            return (a || (a = e("lib/model"))).prototype.get.apply(this, arguments) || !1
        },
        fetch: function () {
            return this._fetchDefer || (this._fetchDefer = $.Deferred(), (s || (s = e("lib/connect"))).isLoggedIn() ? d.call(this) : (o || (o = e("event-bus"))).one("connect:hasUserData", d.bind(this))), this._fetchDefer
        },
        parse: function (t) {
            return this.next_href = t.next_href || !1, (c || (c = e("underscore"))).reduce(t.collection, function (e, t) {
                return e[t] = !0, e
            }, {})
        },
        toggle: function (e, t) {
            var i = this.get(e),
                n = "boolean" == typeof t ? t : !i;
            n !== i && (n ? this.set(e, !0) : this.unset(e))
        },
        setRemote: function (t, i) {
            var n, s, o, a = this._currentRequests.get(t);
            return a ? void 0 : (s = i ? "CREATE" : "DELETE", n = this.url(t, s), a = $.ajax((c || (c = e("underscore"))).extend({
                url: n,
                type: this[s],
                data: this.getRequestData(t, s),
                dataType: "json"
            }, this.getAjaxOptions(t, s))), this._currentRequests.set(t, a), o = this, a.always(function () {
                this._currentRequests.unset(t)
            }.bind(this)).done(function () {
                var e = o.get(t);
                (this.type === o.DELETE && e || this.type === o.CREATE && !e) && o.setRemote(t, e)
            }).fail((r || (r = e("models/exception"))).ajaxNonFatal("Could not toggle value")), a)
        },
        getAjaxOptions: $.noop,
        hasDataForView: function () {
            return !!this.lastFetchTime
        },
        getRequestData: function () {
            return null
        }
    }, {
        neverRelease: !0,
        hashFn: function () {
            return 1
        }
    }), d = function () {
        var t = this.url();
        t && (s || (s = e("lib/connect"))).isLoggedIn() ? (a || (a = e("lib/model"))).prototype.fetch.apply(this, arguments).done(d.bind(this)).fail(this._fetchDefer.reject) : this._fetchDefer.resolve()
    }
}),
define("lib/mixins/editable-object", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = new(s || (s = e("lib/mixin")))({
        _editState: (o || (o = e("lib/mixins/editable-object-states"))).NONE,
        override: {
            isEditing: function () {
                return this._editState === (o || (o = e("lib/mixins/editable-object-states"))).EDITING
            },
            isSaving: function () {
                return this._editState === (o || (o = e("lib/mixins/editable-object-states"))).SAVING
            },
            isCanceling: function () {
                return this._editState === (o || (o = e("lib/mixins/editable-object-states"))).CANCELING
            },
            getEditState: function () {
                return this._editState
            }
        },
        setEditState: function (e) {
            var t = this._editState;
            return t !== e && (this._editState = e, this.trigger("change:editState", this, e, t)), this
        }
    })
}),
define("lib/mixins/sortable-object", [], function (e, t, i) {
    function n(t, i, n) {
        var s, o = (a || (a = e("config"))).get("router");
        i !== (u || (u = e("lib/mixins/editable-object-states"))).EDITING || this._navBlockId ? n === (u || (u = e("lib/mixins/editable-object-states"))).EDITING && this._navBlockId && (o.removeNavigationBlock(this._navBlockId), this._navBlockId = null) : this._navBlockId = o.addNavigationBlock("These changes haven't been saved yet.", function (t) {
            return s = t && window.confirm("Are you sure you want to leave without saving changes?"), s && this.setEditState((u || (u = e("lib/mixins/editable-object-states"))).NONE), s
        }.bind(this))
    }
    var s, o, r, a, l, u;
    s = i.exports = new(l || (l = e("lib/mixin")))({
        _resetOrder: null,
        _originalOrder: null,
        _navBlockId: null,
        requires: ["getCurrentOrder", "reorder", "resetOrder", "saveOrder"],
        around: {
            saveOrder: function (t, i) {
                var n = $.Deferred().always(this.setEditState.bind(this, (u || (u = e("lib/mixins/editable-object-states"))).NONE));
                return this.setEditState((u || (u = e("lib/mixins/editable-object-states"))).SAVING), $.when(t(i)).done(n.resolve).fail(n.reject), this._originalOrder = null, n
            },
            resetOrder: function (t, i) {
                var n = $.Deferred().always(this.setEditState.bind(this, (u || (u = e("lib/mixins/editable-object-states"))).NONE));
                return this.setEditState((u || (u = e("lib/mixins/editable-object-states"))).CANCELING), (o || (o = e("underscore"))).isEqual(this.getOriginalOrder(), this.getCurrentOrder()) ? n.resolve() : (this instanceof(r || (r = e("lib/collection"))) && (this.next_href = null), $.when(t(i)).done(n.resolve).fail(n.reject)), n
            }
        },
        after: {
            setup: function () {
                this.on("change:editState", n, this)
            }
        },
        saveResetOrder: function () {
            this._resetOrder = this.getCurrentOrder(), this._originalOrder = this._originalOrder || this._resetOrder
        },
        getResetOrder: function () {
            return this._resetOrder || []
        },
        getOriginalOrder: function () {
            return this._originalOrder
        }
    })
}),
define("models/sound-visual", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/model"))).extend({
        resource_type: "soundVisual",
        hasDataForView: function () {
            return !0
        },
        baseUrl: $.noop
    })
}),
define("lib/upload/transfer-status", [], function (e, t, i) {
    var n, s;
    n = i.exports = Class.extend([(s || (s = e("lib/backbone"))).Events, {
        initialize: function (e) {
            e || (e = {}), this.recent = [], this.sampleSize = Math.max(e.sampleSize || 5, 2), this.latest = 0, this.totalSize = e.totalSize || 0, this._cache = null
        },
        isIndeterminate: function () {
            return !this.totalSize
        },
        add: function (e, t) {
            return this.recent.length === this.sampleSize && this.recent.pop(), this.latest = e, this.recent.unshift([e, null == t ? Date.now() : t]), this._cache = null, this.recent.length > 1 && this.trigger("data"), this
        },
        setTotal: function (e) {
            if (this.totalSize !== e) {
                var t = !this.totalSize || !e;
                this.totalSize = e, this._cache = null, t && this.trigger("change:indeterminate", this.isIndeterminate())
            }
            return this
        },
        getCurrentSpeed: function () {
            if (null == this._cache)
                if (this.recent.length > 1) {
                    var e = this.recent[this.recent.length - 1],
                        t = this.recent[0];
                    this._cache = (t[0] - e[0]) / (t[1] - e[1] || 1)
                } else this._cache = 0;
            return this._cache
        },
        getValue: function () {
            return this.latest
        },
        getProgress: function () {
            return this.totalSize ? this.latest / this.totalSize : 0
        },
        getTotalSize: function () {
            return this.totalSize
        },
        getTimeLeft: function () {
            var e = this.totalSize - this.latest,
                t = this.getCurrentSpeed();
            return e > 0 ? Math.round(e / t) : 0
        }
    }])
}),
define("lib/form", [], function (e, t, i) {
    function n(e) {
        return e && e.hold && e.release
    }

    function s() {
        var t, i = !0;
        return t = (u || (u = e("underscore"))).every(this.fields, function (e) {
            return i = i && (e.validity === p || !e.validationEnabled), e.validity !== h
        }), t ? i ? p : f : h
    }

    function o(e) {
        this.fields[e].validity = h, this.getConstraintsFor(e).forEach(function (e) {
            e.reset(this), e.getOwnerField && (this.fields[e.getOwnerField()].validity = h)
        }, this)
    }

    function r() {
        var e = this.changedAttributes();
        e && Object.keys(e).forEach(a, this)
    }

    function a(e) {
        this.fields[e].isDirty = !0
    }
    var l, u, c, d, h = (c || (c = e("lib/constraints/constraint-states"))).UNKNOWN,
        p = (c || (c = e("lib/constraints/constraint-states"))).VALID,
        f = (c || (c = e("lib/constraints/constraint-states"))).INVALID;
    l = i.exports = (d || (d = e("lib/model"))).extend({
        actions: null,
        buttons: null,
        constraints: null,
        fields: null,
        initialize: function () {
            return this._submodels = this._submodels || [], this.setupFields(), this.setupValidation(), this.setupActions(), this.setupButtons(), this.on("change", r, this), (d || (d = e("lib/model"))).prototype.initialize.apply(this, arguments)
        },
        setupFields: function () {
            function t(t, n, s) {
                return t[s] = (u || (u = e("underscore"))).defaults((u || (u = e("underscore"))).reduce(n, i, {}, this), {
                    isDirty: !1
                }), t
            }

            function i(e, t, i) {
                return "function" == typeof t && (t = t.call(this)), n(t) && this._submodels.push(t), e[i] = t, e
            }

            function s(e, t, i) {
                return e[i] = t.defaultValue, e
            }
            return function () {
                this.fields = (u || (u = e("underscore"))).reduce(this.fields, t, {}, this), this.set((u || (u = e("underscore"))).extend((u || (u = e("underscore"))).reduce(this.fields, s, {}, this), this.attributes), {
                    silent: !0
                }), this.resetChanges()
            }
        }(),
        setupValidation: function () {
            function t(e) {
                var t, i;
                return Array.isArray(e) ? (t = e[0], i = e[1]) : t = e, new t(i, this)
            }

            function i(i) {
                return (u || (u = e("underscore"))).reduce(i, function (e, i, n) {
                    return e[n] = i.map(t, this), e
                }, {}, this)
            }
            return function () {
                var t = [],
                    n = this.constraints = i.call(this, this.constraints);
                n.FORM = n.FORM || [], (u || (u = e("underscore"))).each(this.fields, function (e, i) {
                    this.hasConstraintsFor(i) ? (e.validity = h, t.push(i)) : e.validity = p, e.message = "", e.isValid = !0, e.validationEnabled = !0
                }, this), t.length && this.on("change", function () {
                    (u || (u = e("underscore"))).intersection(t, Object.keys(this._changed)).forEach(o, this)
                }, this)
            }
        }(),
        setupActions: function () {
            this.actions = (u || (u = e("underscore"))).reduce(this.actions, function (t, i, n) {
                return "default" === n ? t["default"] = i : t[n] = (u || (u = e("underscore"))).isFunction(i) ? {
                    fn: i,
                    state: "enabled"
                } : (u || (u = e("underscore"))).extend({
                    state: "enabled"
                }, i), t
            }, {})
        },
        setupButtons: function () {
            (u || (u = e("underscore"))).each(this.buttons, function (e, t) {
                var i = this.getActionMetadataForButton(t);
                this.setButtonConfig(t, {
                    state: i && i.state || "enabled"
                })
            }, this)
        },
        performAction: function (e) {
            var t, i = this.actions[e];
            if ("default" === e) {
                if (!i) return;
                "string" == typeof i && (e = i, i = this.actions[e])
            }
            if ("enabled" === i.state) return t = i.fn.apply(this, Array.prototype.slice.call(arguments, 1)), t && "function" == typeof t.state && "pending" === t.state() && (this.setActionState(e, "pending"), t.always(this.setActionState.bind(this, e, "enabled"))), t
        },
        setActionState: function (t, i) {
            var n = this.actions[t];
            n.state !== i && (this.trigger("change:action:" + t, i, n.state), n.state = i, this.buttons && (u || (u = e("underscore"))).each(this.buttons, function (e, n) {
                e.action === t && this.setButtonConfig(n, {
                    state: i
                })
            }, this))
        },
        setButtonConfig: function (t, i) {
            var n, s = this.buttons[t],
                o = {};
            (u || (u = e("underscore"))).each(i, function (e, t) {
                    s[t] !== e && (n = !0, o[t] = s[t] = e)
                }), n && this.trigger("change:button:" + t, o)
        },
        getFieldMetadata: function (e) {
            return this.fields[e]
        },
        getActionMetadataForButton: function (t) {
            var i = this.buttons[t];
            return (u || (u = e("underscore"))).find(this.actions, function (e, t) {
                return t === i.action
            })
        },
        toggleValidation: function (e, t) {
            var i;
            t = t || {}, i = !t.fields || !t.fields.length, Object.keys(this.fields).forEach(function (n) {
                (i || t.fields.indexOf(n) > -1) && (this.fields[n].validationEnabled = e)
            }, this)
        },
        validate: function (t) {
            var i, n, o = $.Deferred();
            switch (t && t.fields || o.done(function (e) {
                this.trigger("validation", e)
            }.bind(this)), s.call(this)) {
            case f:
                o.resolve(!1);
                break;
            case p:
                o.resolve(!0);
                break;
            case h:
                t = t || {}, n = !t.fields || !t.fields.length, i = Object.keys(this.fields).filter(function (e) {
                    var i = this.fields[e];
                    return (n || t.fields.indexOf(e) > -1) && i.validity === h && i.validationEnabled
                }, this).map(function (t) {
                    var i = this.getConstraintsFor(t),
                        n = this.get(t),
                        s = (u || (u = e("underscore"))).invoke(i, "validate", this, n);
                    return $.whenAll(s).always(function () {
                        (u || (u = e("underscore"))).chain(arguments).map(function (e, n) {
                            return i[n].getOwnerField ? i[n].getOwnerField() : t
                        }).uniq().each(function (e) {
                            this.updateFieldValidation(e)
                        }, this)
                    }.bind(this))
                }, this), $.when.apply($, i).always(function () {
                    o.resolve(this.isValid())
                }.bind(this))
            }
            return o
        },
        _validate: function () {
            return !0
        },
        isValid: function () {
            return (u || (u = e("underscore"))).every(this.fields, function (e) {
                return e.validity === p || !e.validationEnabled
            })
        },
        getInvalidFields: function () {
            return (u || (u = e("underscore"))).compact((u || (u = e("underscore"))).map(this.fields, function (e, t) {
                return e.validity === f && e.validationEnabled ? t : void 0
            }))
        },
        updateFieldValidation: function (e) {
            var t, i, n = p,
                s = this.fields[e];
            this.getConstraintsFor(e).some(function (e) {
                switch (e.state) {
                case f:
                    return t = e.getLastError(), n = e.state, !0;
                case h:
                    return n = e.state, !0
                }
                return !1
            }, this), i = n === p, s.validity = n, (s.isValid !== i || s.message !== t) && (s.message = t, s.isValid = i, this.trigger("validation:" + e, s))
        },
        getConstraintsFor: function (e) {
            var t = this.constraints[e] || [];
            return t.push.apply(t, this.constraints.FORM.filter(function (t) {
                return t.affectsField(e)
            })), t
        },
        hasConstraintsFor: function (e) {
            var t = this.constraints[e];
            return !(!t || !t.length) || this.constraints.FORM.some(function (t) {
                return t.affectsField(e)
            })
        },
        isDirty: function () {
            var t = arguments[0] ? (u || (u = e("underscore"))).flatten(arguments) : Object.keys(this.fields);
            return t.some(function (e) {
                return this[e] && this[e].isDirty
            }, this.fields)
        },
        hasDefaultValue: function () {
            var t = arguments[0] ? (u || (u = e("underscore"))).flatten(arguments) : Object.keys(this.fields);
            return !t.some(function (e) {
                var t = this.fields[e];
                return t && t.defaultValue !== this.get(e)
            }, this)
        },
        markFieldsClean: function () {
            var t = arguments[0] ? (u || (u = e("underscore"))).flatten(arguments) : Object.keys(this.fields);
            t.forEach(function (e) {
                this[e] && (this[e].isDirty = !1)
            }, this.fields)
        }
    }, {
        hashFn: function (e, t) {
            return e && e.id || t && t.resource_id
        }
    })
}),
define("lib/mixins/forms/upload-edit-item", [], function (e, t, i) {
    function n() {
        this.get("networks").forEach(function (t) {
            var i = new(a || (a = e("models/connection")))({
                id: t
            }),
                n = this._sound;
            (u || (u = e("event-bus"))).trigger("upload:share:" + i.get("type"), {
                    type: n.resource_type,
                    id: n.id
                })
        }, this)
    }

    function s() {
        var t = Object.keys(S).map(function (e) {
            return this.get(e) && S[e]
        }, this).filter((r || (r = e("underscore"))).identity).join("-");
        this.set("creativeCommonsLicense", "cc-" + t)
    }
    var o, r, a, l, u, c, d, h, p, f, g, m, v, b, _, y, w, x, k = "all-rights-reserved",
        S = {
            attribution: "by",
            nonCommercial: "nc",
            nonDerivative: "nd",
            shareAlike: "sa"
        };
    _ = {
        status: {
            defaultValue: (m || (m = e("lib/upload/statuses"))).QUEUED
        },
        hasBeenSaved: {
            defaultValue: !1
        },
        hasQueuedSave: {
            defaultValue: !1
        },
        transfer: {
            defaultValue: null
        },
        transcoding: {
            defaultValue: null
        },
        networks: {
            defaultValue: function () {
                return []
            }
        },
        errorMessage: {
            defaultValue: ""
        },
        title: {
            defaultValue: ""
        },
        description: {
            defaultValue: ""
        },
        tags: {
            defaultValue: function () {
                return []
            }
        },
        editing: {
            defaultValue: !0
        },
        advancedMode: {
            defaultValue: !1
        },
        artwork_url: {
            defaultValue: null
        },
        sharing: {
            defaultValue: "public",
            datasource: [{
                label: "private",
                value: "private"
            }, {
                label: "public",
                value: "public"
            }]
        },
        streamable: {
            defaultValue: !0
        },
        embeddableByAll: {
            defaultValue: !0
        },
        domainLocking: {
            defaultValue: !1
        },
        downloadable: {
            defaultValue: !1
        },
        buyLink: {
            defaultValue: ""
        },
        buyTitle: {
            defaultValue: "Buy"
        },
        license: {
            defaultValue: k,
            datasource: [{
                label: "All Rights Reserved",
                value: k
            }, {
                label: "Creative Commons",
                value: "commons"
            }]
        },
        creativeCommonsLicense: {
            defaultValue: "cc-by"
        },
        attribution: {
            defaultValue: !0,
            readOnly: !0
        },
        nonCommercial: {
            defaultValue: !0
        },
        nonDerivative: {
            defaultValue: !1
        },
        shareAlike: {
            defaultValue: !0
        },
        commentable: {
            defaultValue: !0
        },
        publicComments: {
            defaultValue: !0
        },
        stats: {
            defaultValue: !0
        },
        geoblocking: {
            defaultValue: !1
        },
        geoblockings: {
            defaultValue: null
        }
    }, y = {
        save: {
            label: "Save",
            action: "save"
        },
        cancel: {
            label: "Cancel",
            action: "cancel"
        },
        cancelUpload: {
            label: "Cancel upload",
            action: "cancelUpload"
        }
    }, w = {
        title: [
            [p || (p = e("lib/constraints/not-empty")), {
                message: "Title is required"
            }],
            [f || (f = e("lib/constraints/max-length")), {
                maxLength: 100,
                message: "Title must not exceed {maxLength} characters"
            }]
        ],
        buyLink: [
            [b || (b = e("lib/constraints/url")), {
                strict: !1
            }]
        ],
        buyTitle: [
            [f || (f = e("lib/constraints/max-length")), {
                maxLength: 22
            }]
        ],
        tags: [
            [p || (p = e("lib/constraints/not-empty")), {
                message: "At least one tag is required"
            }],
            [f || (f = e("lib/constraints/max-length")), {
                maxLength: 30,
                message: "No more than {maxLength} tags allowed"
            }]
        ]
    }, x = {
        "default": "save",
        cancel: function () {
            (l || (l = e("lib/helpers/dialog-helper"))).confirm("Are you sure you want to cancel the upload?").done(this.cancel.bind(this))
        },
        cancelUpload: function () {
            this.performAction("cancel")
        }
    }, o = i.exports = new(h || (h = e("lib/mixin")))((d || (d = e("lib/mixins/has-title"))).withOptions({
        attr: "title"
    }), (c || (c = e("lib/mixins/has-editable-image"))).withOptions({
        read: "artwork_url"
    }), {
        applyTo: function (t) {
            t.fields = (r || (r = e("underscore"))).defaults(t.fields || {}, _), t.buttons = $.extend(!0, {}, y, t.buttons || {}), t.constraints = (r || (r = e("underscore"))).defaults(t.constraints || {}, w), t.actions = (r || (r = e("underscore"))).defaults(t.actions || {}, x)
        },
        _saving: !1,
        _replacingAudio: !1,
        isEdit: !1,
        requires: ["cancel", "getAudible", "createAudible", "getAttributesToBeSaved"],
        before: {
            setup: function () {
                this.on("change:nonDerivative", function (e, t) {
                    t && this.set("shareAlike", !1)
                }, this), this.on("change:shareAlike", function (e, t) {
                    t && this.set("nonDerivative", !1)
                }, this), this.on("change:commentable", function (e, t) {
                    t || this.set("publicComments", !1)
                }), this.on("change:publicComments", function (e, t) {
                    t && this.set("commentable", !0)
                }), this.on("change:license change:attribution change:nonCommercial change:nonDerivative change:shareAlike", s, this)
            }
        },
        around: {
            getAttributesToBeSaved: function (t) {
                var i = this.get("buyTitle"),
                    n = this.get("buyLink"),
                    s = this.get("tags").slice(),
                    o = (r || (r = e("underscore"))).pick(this.attributes, "title", "description", "sharing");
                return this.get("networks") && "public" === this.get("sharing") && (o.shared_to = {
                    connections: this.get("networks").map(function (e) {
                        return {
                            id: e
                        }
                    })
                }), o.embeddable = this.get("embeddableByAll"), o.purchase_url = n ? (v || (v = e("lib/url"))).normalize(n) : null, o.purchase_title = i === this.getFieldMetadata("buyTitle").defaultValue ? null : i, o.reveal_stats = this.get("stats"), o.genre = s.shift(), o.tag_list = (g || (g = e("lib/helpers/tag-helper"))).serialize(s), o.license = this.getLicense(), this.get("geoblocking") && (o.geo_blockings = this.get("geoblockings")), (r || (r = e("underscore"))).extend(o, t())
            }
        },
        saveEdits: function () {
            var t, i, s = [],
                o = !1,
                r = this.get("status");
            return this.get("editing") || this._saving ? $.Deferred().reject() : r < (m || (m = e("lib/upload/statuses"))).TRANSCODING && r !== (m || (m = e("lib/upload/statuses"))).FAILED ? (this.set("hasQueuedSave", !0), $.Deferred().reject()) : (this._saving = !0, t = this.getAudible(), (!t || this._replacingAudio) && (t ? (t.off("destroy", this.destroy, this), t.release()) : o = !0, t = this.createAudible(), t.on("destroy", this.destroy, this)), i = this.getAttributesToBeSaved(), t.set(i), s.push(t.save().done(function () {
                var e = this.getImageFileInfo();
                e.file && (t.setImageFile(e.file, e.source), s.push(t.uploadImage().done(function (e) {
                    this.unsetImageFile({
                        silent: !0
                    }), this.set("artwork_url", e.artwork_url)
                }.bind(this)))), o && n.call(this), s.push(this.onAudibleSaved()), this.markFieldsClean(Object.keys(i))
            }.bind(this)).fail(this.onSaveFailed.bind(this))), $.when.apply($, s).done(this.trigger.bind(this, "saved")).always(function () {
                this._saving = !1, this._replacingAudio = !1
            }.bind(this)))
        },
        setToFailed: function (t, i) {
            t = t || "unknown", i = i || "";
            var n = "playlist-upload" === this.resource_type ? "playlist" : "track",
                s = {
                    upload: ["Error uploading"],
                    save: ["Error saving", "Please try again"],
                    transcode: ["Error processing"],
                    unknown: ["Error with"]
                }[t];
            if (s[0] += " " + n, "string" != typeof i) {
                i = i.responseText;
                try {
                    i = JSON.parse(i).errors[0].error_message
                } catch (o) {
                    i = ""
                }
            }
            i && s.push(i), i = s.join(". ") + ".", this.set({
                status: (m || (m = e("lib/upload/statuses"))).FAILED,
                errorMessage: i
            })
        },
        getLicense: function () {
            var e = this.get("license");
            return e === k ? e : this.get("creativeCommonsLicense")
        },
        parseLicense: function (t) {
            var i = {};
            return t === k ? i.license = k : (i.license = "commons", (r || (r = e("underscore"))).each(S, function (e, n) {
                i[n] = t.indexOf(e) > -1
            })), i
        }
    })
}),
define("lib/helpers/blob-helper", [], function (e, t, i) {
    var n;
    n = i.exports = {
        getStringFromBuffer: function (e, t, i) {
            var n, s, o = new Uint8Array(e, t, i),
                r = new Array(i);
            for (s = 0; i > s; ++s) {
                if (n = o[s], 0 === n) {
                    r.length = s;
                    break
                }
                r[s] = String.fromCharCode(n > 127 ? 65533 : n)
            }
            return r.join("")
        },
        getByteFromBuffer: function (e, t) {
            return t >= 0 && t < e.byteLength ? new Uint8Array(e, t, 1)[0] : void 0
        }
    }
}),
define("lib/helpers/dialog-helper", [], function (e, t, i) {
    var n;
    n = i.exports = {
        confirm: function (e) {
            var t = window.confirm(e),
                i = $.Deferred();
            return i[t ? "resolve" : "reject"]()
        }
    }
}),
define("lib/upload/genre-helper", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = {
        getStandardGenres: function () {
            return s
        },
        convertFromID3: function (e) {
            var t = o[e],
                i = {};
            return "string" == typeof t ? i.tags = [t] : t && 2 === t.length && (i.tags = [t[1], t[0]]), i
        }
    }, s = ["Abstract", "Acid Jazz", "Acoustic Rock", "Acoustic", "African", "Alternative", "Ambient", "Americana", "Arabic", "Arts & Entertainment", "Avantgarde", "Bachata", "Ballads", "Bhangra", "Blues Rock", "Blues", "Books", "Bossa Nova", "Breakbeats", "Business & Technology", "Chanson", "Chillout", "Chiptunes", "Choir", "Classic Rock", "Classical Guitar", "Classical", "Comedy", "Contemporary", "Country", "Cumbia", "Dance", "Dancehall", "Death Metal", "Dirty South", "Disco", "Documentary", "Dream Pop", "Drum & Bass", "Dub", "Dubstep", "Easy Listening", "Electro House", "Electronic Pop", "Electronic Rock", "Electronic", "Folk Rock", "Folk", "Funk", "Glitch", "Gospel", "Grime", "Grindcore", "Grunge", "Hard Rock", "Hardcore", "Heavy Metal", "Hip-Hop", "House", "Indie Pop", "Indie", "Industrial Metal", "Instrumental Rock", "Instrumental", "J-Pop", "Jazz Funk", "Jazz Fusion", "Jazz", "K-Pop", "Latin Jazz", "Latin", "Learning", "Mambo", "Metalcore", "Middle Eastern", "Minimal", "Modern Jazz", "Moombahton", "New Wave", "News", "Nu Jazz", "Opera", "Orchestral", "Other", "Piano", "Pop", "Post Hardcore", "Post Rock", "Progressive House", "Progressive Metal", "Progressive Rock", "Punk", "R&B", "Rap", "Reggae", "Reggaeton", "Riddim", "Rock 'n' Roll", "Rock", "Salsa", "Samba", "Shoegaze", "Singer-Songwriter", "Smooth Jazz", "Soul", "Sports", "Story", "Synth Pop", "Tech House", "Techno", "Thrash Metal", "Trance", "Trap", "Trip-hop", "Turntablism", "Underground", "80s"], o = ["Blues", "Classic Rock", "Country", "Dance", "Disco", "Funk", "Grunge", "Hip-Hop", "Jazz", "Metal", ["New Age", "Ambient"], null, null, "Pop", "R&B", "Rap", "Reggae", "Rock", "Techno", "Industrial", "Alternative", "Ska", "Death Metal", "Pranks", "Soundtrack", "Euro-Techno", "Ambient", "Trip-Hop", "Vocal", "Jazz+Funk", "Fusion", "Trance", "Classical", "Instrumental", "Acid", "House", "Game", "Sound Clip", "Gospel", "Noise", "AlternRock", "Bass", "Soul", "Punk", "Space", "Meditative", "Instrumental Pop", "Instrumental Rock", "Ethnic", "Gothic", "Darkwave", "Techno-Industrial", "Electronic", "Pop-Folk", "Eurodance", "Dream", "Southern Rock", "Comedy", "Cult", "Gangsta", "Top 40", "Christian Rap", "Pop/Funk", "Jungle", "Native American", "Cabaret", "New Wave", "Psychadelic", "Rave", "Showtunes", "Trailer", "Lo-Fi", "Tribal", "Acid Punk", "Acid Jazz", "Polka", "Retro", "Musical", "Rock & Roll", "Hard Rock", "Folk", "Folk-Rock", "National Folk", "Swing", "Fast Fusion", "Bebob", "Latin", "Revival", "Celtic", "Bluegrass", "Avantgarde", "Gothic Rock", "Progressive Rock", "Psychedelic Rock", "Symphonic Rock", "Slow Rock", "Big Band", "Chorus", "Easy Listening", "Acoustic", "Humour", "Speech", "Chanson", "Opera", "Chamber Music", "Sonata", "Symphony", "Booty Bass", "Primus", "Porn Groove", "Satire", "Slow Jam", "Club", "Tango", "Samba", "Folklore", "Ballad", "Power Ballad", "Rhythmic Soul", "Freestyle", "Duet", "Punk Rock", "Drum Solo", "Acapella", "Euro-House", "Dance Hall", "Goa", "Drum & Bass", "Club - House", "Hardcore", "Terror", "Indie", "BritPop", "Punk", "Polsk Punk", "Beat", "Christian Gangsta Rap", "Heavy Metal", "Black Metal", "Crossover", "Contemporary Christian", "Christian Rock", "Merengue", "Salsa", "Thrash Metal", "Anime", "JPop", "Synthpop"]
}),
define("lib/constraints/permalink", [], function (e, t, i) {
    var n, s, o, r, a = [{
            rule: /^(?![_-])/,
            errorMessage: "Permalinks must not start with an underscore or hyphen"
        }, {
            rule: /^(?!.*[-_]$)/,
            errorMessage: "Permalinks must not end with an underscore or hyphen"
        }, {
            rule: /^(?!.*[\-_]{2,})/,
            errorMessage: "Permalinks must not have two consecutive underscores or hyphens"
        }, {
            rule: /^[a-z0-9_-]*$/,
            errorMessage: "Permalinks must only contain numbers, letters, underscores and hyphens"
        }, {
            rule: /[a-z]/,
            errorMessage: "Permalink must contain at least one letter"
        }, {
            rule: new RegExp("^(?!(" + ["assets", "comments", "download", "dropbox", "favorites", "follow", "likes", "music", "new", "sets", "spotlight", "stats", "stream", "followers", "followings", "groups"].join("|") + ")$)"),
            errorMessage: "This permalink is reserved. Please choose another one"
        }, {
            rule: /^.{1,255}$/,
            errorMessage: "Permalink must not exceed 255 characters"
        }];
    n = i.exports = (o || (o = e("lib/constraints/field-constraint"))).extend({
        check: function (t, i) {
            var n = (s || (s = e("underscore"))).find(a, function (e) {
                return !e.rule.test(t)
            });
            n ? (this.message = n.errorMessage, i(!1)) : this._resolvePermalink(t).done(function () {
                this.message = "This permalink is already in use. Please try another.", i(!1)
            }.bind(this)).fail(function () {
                i(!0)
            })
        },
        _resolvePermalink: function (t) {
            var i = this.getSound.call(this._form);
            return t === i.get("permalink") ? $.Deferred().reject() : (r || (r = e("models/sound"))).resolve(i.get("user").permalink, t)
        }
    })
}),
define("lib/helpers/tag-helper", [], function (e, t, i) {
    function n(e) {
        return !r.test(e)
    }

    function s() {
        return !0
    }
    var o, r = /(\w+)\:(\w+)=(.+)/;
    o = i.exports = {
        extract: function (e, t) {
            var i = e.tag_list || "",
                n = e.genre || "",
                s = [];
            return n && s.push(n), s.push.apply(s, o.parse(i, t)), s
        },
        parse: function (e, t) {
            var i, o, r, a = [],
                l = [],
                u = !1,
                c = !0;
            for (t || (t = {}), i = 0, o = e.length; o > i; ++i) r = e.charAt(i), '"' === r ? u = !u : " " === r || "," === r ? u ? l.push(r) : c || (c = !0, a.push(l.join("")), l.length = 0) : (c = !1, l.push(r));
            return c || a.push(l.join("")), a.filter(t.includeMachineTags ? s : n).map(function (e) {
                return e.replace(/"/g, "").replace(/\s\s+/, " ").trim()
            }).filter(Boolean)
        },
        serialize: function (e) {
            var t = /\s/;
            return e.map(function (e) {
                return t.test(e) ? '"' + e + '"' : e
            }).join(" ")
        },
        cleanUserText: function (e) {
            return e.replace(/^['"]+|['"]+$|[\\.]/g, "").replace(/\s\s+/g, " ").trim()
        }
    }
}),
define("lib/upload/transcoding-statuses", [], function (e, t, i) {
    i.exports = {
        FAILURE: "failure",
        FINISHED: "finished",
        NOT_FOUND: "not_found",
        PREPARING: "preparing",
        TRANSCODING: "transcoding",
        QUEUED: "queued"
    }
}),
define("collections/user-stream", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d, h, p;
    n = i.exports = (c || (c = e("collections/user-items"))).extend(l || (l = e("lib/mixins/collections/pooling")), {
        model: d || (d = e("models/user-stream-item")),
        defaults: {
            type: "sounds"
        },
        setup: function () {
            this.isMe = (a || (a = e("lib/connect"))).currentUserId() === this.options.userId, h.call(this, !0)
        },
        fetch: function () {
            var t = (c || (c = e("collections/user-items"))).prototype.fetch.apply(this, arguments),
                i = this.url(),
                n = /[&?]limit=(\d+)/.exec(i),
                s = n && n[1] || 1;
            return $.ajax({
                url: (r || (r = e("config"))).get("api_v2_host") + "activities/profile/soundcloud:users:" + this.options.userId + "?limit=" + s,
                processData: !1
            }), t
        },
        baseUrl: function () {
            var t, i = this.options;
            return t = this.isMe ? ["me"] : ["users", i.userId], t.push(i.type), (o || (o = e("lib/api-wrapper"))).EDGE + (u || (u = e("lib/url"))).stringify({
                path: t
            })
        },
        parse: function (t) {
            var i = t.collection,
                n = (a || (a = e("lib/connect"))).currentUserId();
            return !i || this.isMe ? i : i.filter(function (e) {
                return !e.playlist || e.playlist.track_count || e.playlist.user_id === n
            })
        },
        audibleAt: function (e) {
            return this.at(e).getAudible()
        },
        unshuffle: function (e) {
            return -Date.parse(e.get("created_at"))
        }
    }, {
        onCleanup: function (e) {
            h.call(e, !1)
        }
    }), h = function (t) {
        var i = t ? "on" : "off";
        (s || (s = e("lib/action-controller")))[i]("repost:origin:user:" + this.options.userId, p, this)
    }, p = function (e) {
        var t, i = "sound" === e.targetType ? "track" : "playlist",
            n = i + "_repost";
        e.state ? this.add({
            type: n,
            created_at: (new Date).toISOString(),
            track: "track" === i ? {
                id: e.target
            } : null,
            playlist: "playlist" === i ? {
                id: e.target
            } : null
        }, {
            at: 0
        }) : (t = this.find(function (t) {
            return t.get("type") === n && t.get(i).id === e.target
        }), t && this.remove(t))
    }
}),
define("models/user-stream-item", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (s || (s = e("lib/model"))).extend({
        resource_type: "user_stream_item",
        submodelMap: {
            track: null,
            playlist: null
        },
        baseUrl: null,
        audible: null,
        createSubmodel: function (t, i) {
            var n, s = "track" === i ? o || (o = e("models/sound")) : r || (r = e("models/playlist")),
                a = this.get(i);
            a && (n = new s(a), this.addSubmodel(n), n.on("destroy", this.onSubmodelDestroy, this), this.audible = n)
        },
        onSubmodelDestroy: function () {
            this.destroy()
        },
        equivalentTo: function (e) {
            if (this === e) return !0;
            var t = this.get("track") || this.get("playlist"),
                i = e.get("track") || e.get("playlist") || e.attributes;
            return t.kind === i.kind && t.id === i.id
        },
        getAudible: function () {
            return this.audible
        },
        isSpotlight: function () {
            return this.get("type").indexOf("_spotlight") > -1
        },
        isRepost: function () {
            return this.get("type").indexOf("_repost") > -1
        },
        isRegular: function () {
            var e = this.get("type");
            return -1 === e.indexOf("_repost") && -1 === e.indexOf("_spotlight")
        },
        toggleSpotlight: function (e) {
            this.isRepost() || (void 0 === e && (e = !this.isSpotlight()), this.set("type", this.get("type").replace(e ? /$/ : /_spotlight$/, e ? "_spotlight" : "")))
        },
        getModelData: function () {
            return this.get("track") || this.get("playlist")
        }
    }, {
        onCleanup: function (t) {
            t._submodels.forEach(function (e) {
                e.off("destroy", t.onSubmodelDestroy, t)
            }), (s || (s = e("lib/model"))).onCleanup(t)
        },
        convert: function (t) {
            var i = t instanceof(o || (o = e("models/sound"))),
                s = t.toJSON();
            return new n({
                type: s.kind,
                created_at: s.created_at,
                track: i ? s : null,
                playlist: i ? null : s
            })
        }
    })
}),
define("lib/mixins/forms/scheduled-form-fields", [], function (e, t, i) {
    var n, s, o, r, a, l;
    l = (o || (o = e("lib/constraints/field-constraint"))).extend({
        message: "Please choose a time in the future.",
        check: function (e, t) {
            t(e > new Date)
        }
    }), a = (r || (r = e("lib/constraints/form-constraint"))).extend({
        message: '"Make private" should happen after "make public".',
        check: function (e, t, i) {
            e[1] && i(e[0] < e[1])
        }
    }), n = i.exports = new(s || (s = e("lib/mixin")))({
        schedulingFields: {
            scheduledTimezone: {
                defaultValue: null
            },
            scheduledPublic: {
                defaultValue: !1
            },
            scheduledPublicLocalDate: {
                defaultValue: null
            },
            scheduledPublicDate: {
                defaultValue: null
            },
            scheduledPrivate: {
                defaultValue: !1
            },
            scheduledPrivateLocalDate: {
                defaultValue: null
            },
            scheduledPrivateDate: {
                defaultValue: null
            }
        },
        applyTo: function (e) {
            $.extend(!0, e, {
                fields: this.properties.schedulingFields,
                constraints: {
                    scheduledPublicDate: [l],
                    scheduledPrivateDate: [l],
                    FORM: [
                        [a, {
                            fields: ["scheduledPublicDate", "scheduledPrivateDate"]
                        }]
                    ]
                }
            })
        },
        around: {
            getAttributesToBeSaved: function (e) {
                var t = e.apply(this, arguments);
                return this.get("scheduledPublic") && (t.scheduled_public_date = +this.get("scheduledPublicDate"), t.scheduled_timezone = this.get("scheduledTimezone")), this.get("scheduledPrivate") && (t.scheduled_private_date = +this.get("scheduledPrivateDate"), t.scheduled_timezone = this.get("scheduledTimezone")), t
            }
        }
    })
}),
define("lib/helpers/a11y-helper", [], function (e, t, i) {
    var n, s;
    n = i.exports = {
        getAccessibleMarkup: function (t) {
            return '<span class="sc-visuallyhidden">' + (s || (s = e("vendor/handlebars-runtime"))).Utils.escapeExpression(t.screenreader) + "</span>" + (t.visible ? '<span aria-hidden="true">' + (s || (s = e("vendor/handlebars-runtime"))).Utils.escapeExpression(t.visible) + "</span>" : "")
        }
    }
}),
define("lib/helpers/count-helper", [], function (e, t, i) {
    var n, s, o, r, a = ["K", "M"];
    r = {
        max: null,
        suffix: "+",
        useSIUnits: !1
    }, n = i.exports = {
        render: function (t, i) {
            var n = 0,
                l = "";
            if (i = i || {}, (s || (s = e("underscore"))).defaults(i, r), i.max && t > i.max) t = i.max, l = i.suffix;
            else if (i.useSIUnits) {
                for (; t >= 1e3 && n < a.length;) t /= 1e3, l = a[n++];
                t = Math.round(t)
            }
            return (o || (o = e("lib/helpers/number-helper"))).format(t) + l
        }
    }
}),
define("lib/helpers/icon-helper", [], function (e, t, i) {
    var n, s, o, r;
    r = {
        prefix: "sc-icon",
        size: "small",
        title: !1,
        variation: null
    }, n = i.exports = {
        render: function (t) {
            var i, n;
            return t = t || {}, t = (s || (s = e("underscore"))).defaults(t, r), i = [t.prefix, [t.prefix, t.type].join("-") + (t.variation ? "-" + t.variation : ""), [t.prefix, t.size].join("-"), t.title ? "sc-ir" : "", t["class"] || ""].filter(Boolean).join(" "), n = t.title ? (o || (o = e("vendor/handlebars-runtime"))).Utils.escapeExpression(t.title) : "", '<span class="' + i + '">' + n + "</span>"
        }
    }
}),
define("lib/helpers/join-helper", [], function (e, t, i) {
    var n, s, o;
    o = {
        "with": ", ",
        last: null
    }, n = i.exports = {
        render: function (t, i) {
            var n, r, a = (s || (s = e("underscore"))).extend({}, o, i),
                l = a["with"];
            return a.last ? (n = "", r = t.length, t.forEach(function (e, i) {
                i === r - 2 ? l = a.last : i === r - 1 && (l = ""), n += t[i] + l
            }), n) : t.join(l)
        }
    }
}),
define("lib/notifying-collection", [], function (e, t, i) {
    function n(e) {
        e.length && (this.add(e, {
            at: 0
        }), this.trigger("new-data", e))
    }

    function s(e, t) {
        this.trigger("change:queue-size", this, t)
    }
    var o, r, a, l;
    o = i.exports = (r || (r = e("lib/collection"))).extend({
        notificationType: null,
        queue: null,
        initialize: function () {
            var t, i = this.notificationType;
            (r || (r = e("lib/collection"))).prototype.initialize.apply(this, arguments), t = (a || (a = e("config/notification-types")))[i], this.baseUrl = t.get("baseUrl"), this.queue = new(l || (l = e("lib/notifications-queue")))({
                type: i
            }), this.queue.on("data", n, this).on("change:size", s, this)
        },
        fetchNewItems: function () {
            this.queue.fetchQueuedItems()
        },
        markAsRead: function (e) {
            var t = this.at(0);
            !e && t && (e = t.getUuid ? t.getUuid() : t.get("uuid")), e && this.queue.markAsRead(e)
        }
    }, {
        onCleanup: function (e) {
            e.queue.off("data", n, e).off("change:size", s, e).release()
        }
    })
}),
define("lib/views/overlay-button", [], function (e, t, i) {
    function n(t) {
        return t ? (o || (o = e("underscore"))).isFunction(t.extend) ? t : t.call(this) : void 0
    }
    var s, o, r, a, l, u, c, d = {
            dialog: r || (r = e("lib/views/dialog")),
            dropdown: a || (a = e("lib/views/dropdown-menu"))
        };
    s = i.exports = (c || (c = e("lib/view"))).extend({
        defaults: {
            el: null,
            overlayType: null,
            overlayOptions: {},
            ContentViewClass: null,
            contentViewArgs: null
        },
        events: {
            click: "onButtonClick"
        },
        contentView: null,
        domId: null,
        setup: function () {
            (o || (o = e("underscore"))).bindAll(this, "toggleOverlay", "onButtonClick"), this.domId = (o || (o = e("underscore"))).uniqueId("dropdown-button-"), this.$el.attr({
                "aria-haspopup": "true",
                "aria-owns": this.domId
            })
        },
        onOverlayToggle: function (e) {
            this.toggleState("active", e), this.$el.css({
                display: e ? "inline-block" : ""
            })
        },
        onButtonClick: function (e) {
            e.preventDefault(), this.toggleOverlay()
        },
        toggleOverlay: function () {
            var e = this.getOverlay();
            e.isOpened ? e.close() : e.open()
        },
        _createOverlay: function () {
            var t, i, s, r = this.options,
                a = d[r.overlayType];
            return i = n.call(this, r.ContentViewClass), s = (o || (o = e("underscore"))).extend({
                resource_id: r.resource_id,
                resource_type: r.resource_type
            }, r.contentViewArgs), t = new a((o || (o = e("underscore"))).extend({
                togglerEl: this.el,
                relativeElement: this.el,
                Subview: i,
                subviewArgs: s,
                domId: this.domId,
                text: r.text
            }, r.overlayOptions))
        },
        getOverlay: function () {
            var t = this.subviews.overlay,
                i = (a || (a = e("lib/views/dropdown-menu"))).Events;
            return t && t.disposed && (this.removeSubview(t), t = null), t || (t = this._createOverlay(), t.on(i.OPENED + " " + i.CLOSED, function () {
                var t = this.getOverlay().isOpened;
                this.onOverlayToggle(t), (l || (l = e("event-bus"))).trigger((u || (u = e("lib/views/overlay-button-events"))).TOGGLE, this.$el, t)
            }, this), this.addSubview(t, "overlay")), this.subviews.overlay
        },
        isOverlayOpened: function () {
            return this.getOverlay().isOpened
        }
    }, {
        Events: u || (u = e("lib/views/overlay-button-events"))
    })
}),
define("lib/views/notifications-list", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (o || (o = e("lib/views/list"))).extend(r || (r = e("lib/mixins/views/throbbing")), {
        tagName: "div",
        className: "notifications",
        itemClassName: "notifications__item sc-border-light-top",
        template: e("lib/views/notifications-list.tmpl"),
        css: e("lib/views/notifications-list.css"),
        NotifyingCollection: null,
        defaults: {
            dark: !1,
            showViewAll: !0,
            markNotificationsRead: !0
        },
        element2selector: {
            list: ".notifications__list"
        },
        setup: function () {
            this.options.dark && (this.$el.addClass("g-dark"), this.listClassName += " g-dark-list"), this.collection = new this.NotifyingCollection, this.collection.setLimit(this.options.maxDisplay), this.collection.on("change:queue-size", this.onQueueSizeChange, this)
        },
        dispose: function () {
            this.collection.off("change:queue-size", this.onQueueSizeChange, this)
        },
        getListContainer: function () {
            return this.getElement("list")
        },
        renderDecorate: function () {
            (o || (o = e("lib/views/list"))).prototype.renderDecorate.call(this), this.options.markNotificationsRead && this.collection.markAsRead()
        },
        onQueueSizeChange: function (e, t) {
            t && e.fetchNewItems()
        },
        getViewAllLinkData: function () {
            return {
                text: "",
                href: "",
                className: ""
            }
        },
        getEmptyListMessage: function () {
            return ""
        },
        getTemplateData: function (t) {
            return t = (o || (o = e("lib/views/list"))).prototype.getTemplateData.call(this, t) || t, (s || (s = e("underscore"))).extend(t, {
                isEmpty: !this.collection.length,
                empty_message: this.getEmptyListMessage(),
                view_all: this.getViewAllLinkData(),
                show_view_all: this.options.showViewAll
            })
        }
    })
}),
define("models/activity", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c;
    n = i.exports = (c || (c = e("lib/model"))).extend({
        submodelMap: {
            track: r || (r = e("models/sound")),
            user: l || (l = e("models/user")),
            playlist: a || (a = e("models/playlist")),
            comment: o || (o = e("models/comment"))
        },
        baseUrl: function () {
            var t = this.get("uuid"),
                i = {
                    path: ["me/activities/tracks"]
                };
            return i.query = {
                cursor: t,
                limit: 1
            }, (u || (u = e("lib/url"))).stringify(i)
        },
        parse: function (e) {
            return e.collection ? e.collection[0] : e
        },
        createSubmodel: function () {
            var t, i = (s || (s = e("underscore"))).last(this._submodels);
            (c || (c = e("lib/model"))).prototype.createSubmodel.apply(this, arguments), t = (s || (s = e("underscore"))).last(this._submodels), t !== i && t.on("destroy", this.onSubmodelDestroy, this)
        },
        onSubmodelDestroy: function () {
            this.destroy()
        },
        getSound: function () {
            var t, i;
            switch (this.get("type")) {
            case "track":
            case "track-like":
            case "track-repost":
            case "track-sharing":
                t = this.get("track").id, i = r || (r = e("models/sound"));
                break;
            case "comment":
                t = this.get("comment").track.id, i = r || (r = e("models/sound"));
                break;
            case "playlist":
            case "playlist-like":
            case "playlist-repost":
            case "playlist-sharing":
                t = this.get("playlist").id, i = a || (a = e("models/playlist"))
            }
            return t ? i.instances.get(t) : null
        },
        equivalentTo: function (e) {
            return this.get("uuid") === e.get("uuid")
        },
        getUuid: function () {
            return this.get("uuid") || this.id
        }
    }, {
        convert: function (t) {
            var i, n, o;
            return n = t.get ? t.get.bind(t) : function (e) {
                return t[e]
            }, n("type") && n("created_at") && (n("track") || n("playlist")) && (i = {
                uuid: (s || (s = e("underscore"))).uniqueId(),
                type: n("type").replace(/_/g, "-"),
                created_at: n("created_at"),
                tags: "affiliated"
            }, o = n("track"), o ? i.track = o : i.playlist = n("playlist")), i
        },
        hashFn: function () {
            return null
        },
        onCleanup: function (t) {
            t._submodels.forEach(function (e) {
                e.off("destroy", t.onSubmodelDestroy, t)
            }), (c || (c = e("lib/model"))).onCleanup(t)
        }
    })
}),
define("collections/unread-conversations", [], function (e, t, i) {
    function n(t) {
        t.length > 0 && (f || (f = e("event-bus"))).trigger("new-unread-messages", t)
    }

    function s(t) {
        var i;
        t.forEach(function (t) {
            i = (d || (d = e("models/conversation"))).instances.get(t), i && i.setRead(!0)
        }, this)
    }

    function o() {
        var t = (g || (g = e("config/notification-types")))[this.notificationType];
        return {
            backoffRate: 1.1,
            baseDelay: t.get("minPollInterval"),
            maxDelay: t.get("maxPollInterval")
        }
    }

    function r(t) {
        var i = t ? "on" : "off";
        (g || (g = e("config/notification-types")))[this.notificationType][i]("pollIntervalChange", a, this), (f || (f = e("event-bus")))[i]("conversation:read", u, this)
    }

    function a() {
        this._breaker && this.restart()
    }

    function l() {
        this.trigger("anyUnreadMessages", this.hasAnyUnreadMessages())
    }

    function u(e) {
        this.remove(e), l.call(this)
    }
    var c, d, h, p, f, g, m;
    c = i.exports = (h || (h = e("lib/collection"))).extend({
        model: d || (d = e("models/conversation")),
        notificationType: "unreadConversations",
        defaults: {
            limit: 20
        },
        setup: function () {
            r.call(this, !0)
        },
        baseUrl: function () {
            return (g || (g = e("config/notification-types")))[this.notificationType].get("baseUrl")
        },
        startPolling: function () {
            if (!this._isPolling) {
                var t, i;
                t = this._breaker = new(p || (p = e("lib/circuit-breaker")))(o.call(this)), this._isPolling = !0, i = function () {
                    this._isPolling && (clearTimeout(this._pollingId), this.fetch().done(function () {
                        t.succeeded(), this._pollingId = setTimeout(i, t.currentDelay())
                    }.bind(this)).fail(function (e) {
                        e.status >= 400 && e.status < 500 ? t.disable({
                            autoEnable: !1
                        }) : t.failed()
                    }))
                }.bind(this), this._breaker.on("enabled", i), i()
            }
        },
        stopPolling: function () {
            this._isPolling && (clearTimeout(this._pollingId), this._pollingId = null, this._isPolling = !1, this._breaker.dispose(), this._breaker = null)
        },
        restart: function () {
            this.stopPolling(), this.startPolling()
        },
        parse: function () {
            return this.next_href = null, (h || (h = e("lib/collection"))).prototype.parse.apply(this, arguments)
        },
        reset: function (t) {
            var i = this.pluck("id"),
                o = (m || (m = e("underscore"))).pluck(t, "id"),
                r = (m || (m = e("underscore"))).difference(o, i),
                a = (m || (m = e("underscore"))).difference(i, o);
            (h || (h = e("lib/collection"))).prototype.reset.apply(this, arguments), n(r), s.call(this, a), l.call(this)
        },
        hasAnyUnreadMessages: function () {
            return this.length > 0
        }
    }, {
        hashFn: function () {
            return 1
        },
        onCleanup: function (e) {
            e.stopPolling(), r.call(e, !1)
        },
        neverRelease: !0
    })
}),
define("models/announcement", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (o || (o = e("lib/model"))).extend({
        resource_type: "announcement",
        baseUrl: function () {
            return (r || (r = e("lib/url"))).stringify({
                path: ["announcements", this.id]
            })
        },
        fetch: function () {},
        dismiss: function () {
            this.destroy()
        },
        isNew: function () {
            return !(s || (s = e("lib/connect"))).isLoggedIn()
        }
    })
}),
define("lib/polling-collection", [], function (e, t, i) {
    var n, s, o, r, a = 9e5;
    n = i.exports = (r || (r = e("lib/collection"))).extend({
        defaults: {
            pollingInterval: a
        },
        url: function () {
            return (s || (s = e("underscore"))).result(this, "baseUrl")
        },
        parse: function (e) {
            return e
        },
        fetch: function (t) {
            var i = t && t.url || (s || (s = e("underscore"))).result(this, "url");
            return i ? (o || (o = e("lib/backbone"))).Collection.prototype.fetch.call(this, t) : $.Deferred().done(t && t.success).resolve([])
        },
        bulkFetch: function () {
            return this.fetch()
        },
        setLimit: $.noop,
        isFullyPopulated: function () {
            return !1
        },
        startPolling: function () {
            this.isPolling() || this._pollingId || (this._pollingId = setInterval(this.fetch.bind(this), this.options.pollingInterval))
        },
        stopPolling: function () {
            clearInterval(this._pollingId), this._pollingId = null
        },
        isPolling: function () {
            return !!this._pollingId
        }
    })
}),
define("lib/mixins/collections/activities-collection", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        override: {
            model: s || (s = e("models/activity"))
        },
        audibleAt: function (e) {
            var t = this.at(e);
            return t && t.getSound()
        }
    })
}),
define("lib/mixins/stores/usage-counting", [], function (e, t, i) {
    var n, s;
    n = i.exports = new(s || (s = e("lib/mixin")))({
        onCleanup: null,
        onIncrement: null,
        onDecrement: null,
        after: {
            initialize: function (e) {
                this._counts = {}, this._needsGC = !1, e = e || {}, this._autoCleanup = !! e.autoCleanup, this.onCleanup = e.onCleanup, this.onIncrement = e.onIncrement, this.onDecrement = e.onDecrement
            },
            reset: function () {
                this._counts = {}, this._needsGC = !1
            },
            set: function (e, t) {
                this._counts[e] || (this._counts[e] = 1, this.onIncrement && this.onIncrement(t, e, 1))
            },
            unset: function (e) {
                delete this._counts[e]
            }
        },
        before: {
            reset: function () {
                this.onCleanup && this.forEach(this.onCleanup)
            }
        },
        countFor: function (e) {
            return this._counts[e] || 0
        },
        increment: function (e, t) {
            return this.has(e) && (t = "number" == typeof t ? t : 1, t > 0 ? (this._counts[e] = (this._counts[e] || 0) + t, this.onIncrement && this.onIncrement(this.get(e), e, t)) : 0 > t && this.decrement(e, -t)), this
        },
        decrement: function (e, t) {
            return this.has(e) && (t = "number" == typeof t ? t : 1, t > 0 ? (this._counts[e] = (this._counts[e] || 1) - t, this.onDecrement && this.onDecrement(this.get(e), e, t), this._counts[e] <= 0 && (this._needsGC = !0, this._autoCleanup && this.cleanup())) : 0 > t && this.increment(e, -t)), this
        },
        cleanup: function () {
            var e, t, i = this.onCleanup,
                n = !1;
            if (this._needsGC) {
                for (e in this._counts) this._counts.hasOwnProperty(e) && this._counts[e] <= 0 && (i && (t = this.get(e), i.call(t, t, e)), n = !0, this.unset(e));
                this._needsGC = !1
            }
            return n
        },
        changeKey: function (e, t) {
            if (e !== t) {
                var i = this.get(e),
                    n = this.countFor(e);
                this.unset(e), this.set(t, i), this.increment(t, n - 1)
            }
        }
    })
}),
define("lib/mixins/editable-object-states", [], function (e, t, i) {
    i.exports = {
        CANCELING: "canceling",
        EDITING: "editing",
        NONE: "none",
        SAVING: "saving"
    }
}),
define("lib/views/image", [], function (e, t, i) {
    function n(e) {
        switch (e) {
        case "sound":
        case "sound-upload-edit":
        case "playlist":
        case "playlist-upload":
            return "";
        default:
            return "image__hasPlaceholder-" + e
        }
    }

    function s(t) {
        return (l || (l = e("underscore"))).find(t.dataTransfer.files, function (e) {
            return v.test(e.type)
        })
    }

    function o(t) {
        return t.dataTransfer.items ? (l || (l = e("underscore"))).any(t.dataTransfer.items, function (e) {
            return "file" === e.kind && v.test(e.type)
        }) : !0
    }

    function r() {
        (l || (l = e("underscore"))).bindAll(this, "onDragOver", "onDrop", "onDragEnter"), this.$el.on("dragover", this.onDragOver).on("drop", this.onDrop).on("dragenter", this.onDragEnter).on("dragleave", this.toggleState.bind(this, "dragover", !1))
    }
    var a, l, u, c, d, h, p, f, g, m, v = /^image\//,
        b = 500;
    a = i.exports = (m || (m = e("lib/view"))).extend(g || (g = e("lib/mixins/views/multi-resource-type")), {
        template: e("lib/views/image.tmpl"),
        css: e("lib/views/image.css"),
        className: "image",
        defaults: {
            alt: "",
            editable: !1,
            multi: !0,
            size: 50,
            stretch: !1,
            uploadImageAutomatically: !0,
            zoomable: !1
        },
        events: {
            click: "onClick"
        },
        element2selector: {
            image: ".image__full",
            button: ".image__button",
            multiContainer: ".image__multiContainer"
        },
        states: {
            dragover: "dragover",
            readOnly: "readOnly",
            interactive: "interactive",
            customImage: "customImage"
        },
        requiredAttributes: null,
        _whenLoadedDefer: null,
        _displaySize: null,
        _modal: null,
        _multiImages: null,
        setup: function (t) {
            this.requiredAttributes = [this.model.imageProperties.read], this._setupDragEvents = (l || (l = e("underscore"))).once(r), this.model.on("imageDataChanged", this.rerender, this), t.multi && "playlist" === this.model.resource_type && this.requiredAttributes.push("tracks"), this._whenLoadedDefer = this.addDeferred($.Deferred()).done((h || (h = e("lib/helpers/image-helper"))).flagCachedImage), this._displaySize = t.stretch ? "100%" : t.size, this.el.style.width = this.el.style.height = this.getDisplaySizeForCSS()
        },
        dispose: function () {
            this.model.off("imageDataChanged", this.rerender, this)
        },
        renderDecorate: function () {
            var t, i, s, o, r, c, d = this.getMultiImageResources(),
                p = this.model,
                f = this.options,
                g = !f.editable || !(u || (u = e("config"))).get("me").owns(p);
            this.toggleState("readOnly", g).toggleState("customImage", p.hasOwnImage()).toggleState("interactive", f.zoomable || !g), g || this._setupDragEvents(), d ? (t = this.getElement("multiContainer"), d.forEach(function (i) {
                var n = this.addSubview(new a((l || (l = e("underscore"))).defaults({
                    editable: !1,
                    zoomable: !1,
                    size: f.size / 2,
                    stretch: !0
                }, i)));
                $("<div>", {
                    "class": "image__multiWrap"
                }).append(n.render().el).appendTo(t)
            }, this)) : (i = this.getElement("image"), r = p.getPlaceholderUrl(f.size), c = r !== !1, i.one("load", this._whenLoadedDefer.resolve.bind(null, i.attr("src"))), c && (s = String(this._displaySize), this.$el.addClass("image__hasPlaceholder " + n(p.resource_type) + (/%/.test(s) ? "" : " image__hasPlaceholder-" + s)), o = this.$(".image__placeholder").one("load", (h || (h = e("lib/helpers/image-helper"))).flagCachedImage.bind(h || (h = e("lib/helpers/image-helper")), r)), i[0].style.opacity = 0, i.addClass("g-opacity-transition").on("load", function () {
                this.style.opacity = 1, setTimeout(o.remove.bind(o), 500)
            })))
        },
        getMultiImageResources: function () {
            if (null === this._multiImages) {
                var t, i, n = this.options,
                    s = this.model;
                this._multiImages = !1, n.multi && "playlist" === s.resource_type && !s.hasOwnImage() && s.getNumSounds() >= 4 && (i = [], t = [], s.getSoundsCollection().any(function (n) {
                    var s = n.getImageUrl();
                    if (!((h || (h = e("lib/helpers/image-helper"))).isDefaultImage(s) || t.indexOf(s) > -1)) return t.push(s), i.push({
                        resource_type: n.resource_type,
                        resource_id: n.id
                    }), 4 === i.length ? (this._multiImages = i, !0) : void 0
                }, this))
            }
            return this._multiImages
        },
        getModelData: function () {
            return {}
        },
        getTemplateData: function (t) {
            var i, n = this.model;
            return i = this.getMultiImageResources() ? {
                multiImages: !0,
                fullSize: this.getDisplaySizeForCSS()
            } : {
                placeholderUrl: n.getPlaceholderUrl(this.options.size),
                src: n.getImageUrl(this.options.size),
                size: this._displaySize,
                alt: this.options.alt || n.getImageAltText()
            }, (l || (l = e("underscore"))).extend(t, i)
        },
        getDisplaySizeForCSS: function () {
            return String(this._displaySize).replace(/(\d+)(%?)/, function (e, t, i) {
                return t + (i || "px")
            })
        },
        whenLoaded: function () {
            return this._whenLoadedDefer
        },
        onClick: function (t) {
            var i, n = this.options,
                s = b + 30,
                o = this.getState("readOnly") ? n.zoomable ? "zoom" : !1 : "edit",
                r = "edit" === o && !(u || (u = e("config"))).get("me").get("primary_email_confirmed");
            r ? (t.preventDefault(), (c || (c = e("event-bus"))).trigger("upload:image:unconfirmed")) : o && (t.preventDefault(), this._modal || (i = "zoom" === o ? d || (d = e("views/modals/image-content")) : p || (p = e("views/modals/image-select-content")), this._modal = new(f || (f = e("lib/views/modal")))({
                width: s,
                type: "image",
                Subview: i,
                subviewArgs: {
                    imageSize: b,
                    resource_id: n.resource_id,
                    resource_type: n.resource_type
                }
            }), this._modal.on((f || (f = e("lib/views/modal"))).Events.CLOSED, this.onModalClosed, this)), this._modal.open(), "zoom" === o ? (c || (c = e("event-bus"))).trigger("image:zoom", this.options.resource_type) : (c || (c = e("event-bus"))).trigger("upload:image:click"))
        },
        onModalClosed: function () {
            this.disposed || this.getState("readOnly") || !this.options.uploadImageAutomatically || this.model.uploadImage()
        },
        onDragEnter: function (e) {
            o(e) && this.toggleState("dragover", !0)
        },
        onDragOver: function () {
            return !1
        },
        onDrop: function (t) {
            if (this.toggleState("dragover", !1), !(u || (u = e("config"))).get("me").get("primary_email_confirmed")) return (c || (c = e("event-bus"))).trigger("upload:image:unconfirmed"), !1;
            var i = s(t);
            return i && (this.model.setImageFile(i, "file"), this.options.uploadImageAutomatically && this.model.uploadImage()), (c || (c = e("event-bus"))).trigger("upload:image:drag", "file"), !1
        }
    })
}),
define("collections/user-page-sounds", [], function (e, t, i) {
    var n, s, o, r, a, l, u;
    n = i.exports = (o || (o = e("lib/multi-collection"))).extend(s || (s = e("lib/mixins/audio-source")), {
        model: l || (l = e("models/user-stream-item")),
        getSourceInfo: function () {
            return {
                type: "user-profile",
                resourceId: this.options.resource_id || this.options.userId,
                resourceType: "user"
            }
        },
        setupSources: function () {
            var t, i, n;
            return i = [new(u || (u = e("collections/user-stream")))(null, {
                userId: this.options.resource_id || this.options.userId
            })], t = (a || (a = e("models/user"))).instances.get(this.options.userId), n = t && t.getPerk("spotlight"), (n || void 0 === n) && i.unshift(new(r || (r = e("collections/spotlight")))(null, {
                userId: this.options.resource_id || this.options.userId
            })), i
        },
        audibleAt: function (e) {
            var t = this.at(e);
            return t && t.getAudible()
        }
    }, {
        hashFn: function (e, t) {
            return (t.userId || t.resource_id) + "_stream"
        }
    })
}),
define("lib/constraints/constraint-states", [], function (e, t, i) {
    i.exports = {
        UNKNOWN: 0,
        PENDING: 1,
        INVALID: 2,
        VALID: 3
    }
}),
define("models/connection", [], function (e, t, i) {
    function n(t) {
        return (l || (l = e("lib/helpers/popup-helper"))).centered(t, 450, 500, "createNewConnection")
    }
    var s, o, r, a, l, u, c, d;
    d = {
        facebook_profile: "connection-facebook.html",
        twitter: "connection-facebook.html",
        facebook_page: "connection-facebook.html",
        tumblr: "connection-facebook.html"
    }, s = i.exports = (a || (a = e("lib/model"))).extend({
        baseUrl: function () {
            return "me/connections/" + this.id
        }
    }, {
        create: function (t) {
            var i, s, r = d[t];
            if (c) {
                if (i = c.popup, c.type === t) return i && !i.closed && i.focus && i.focus(), c.deferred;
                c.deferred.reject()
            }
            return c || (c = {
                deferred: $.Deferred().always(function () {
                    var e = c.popup;
                    e && !e.closed && e.close(), clearInterval(c.intervalId), c = null
                }),
                popup: null,
                intervalId: null
            }), s = c.deferred, r = location.protocol + "//" + location.host + "/" + r, (o || (o = e("lib/connect"))).login().fail(s.reject).done(function () {
                $.ajax({
                    type: "POST",
                    url: "me/connections",
                    data: {
                        service: t,
                        redirect_uri: r
                    },
                    dataType: "json",
                    contentType: "application/json"
                }).fail(s.reject).done(function (e) {
                    var t = c.popup = n(e.authorize_url);
                    c.intervalId = setInterval(function () {
                        (!t || t.closed) && s.reject()
                    }, 2e3)
                })
            }), s
        },
        callback: function (t) {
            var i, n = (u || (u = e("lib/url"))).parseQueryString(t.location.search);
            "1" === n.success ? (i = new s({
                id: parseInt(n.id, 10)
            }), i.fetch().fail(c.deferred.reject).done(function () {
                (r || (r = e("event-bus"))).trigger("connect:newConnection", i), c.deferred.resolve(i)
            })) : ((r || (r = e("event-bus"))).trigger("connect:connectionError", n.errorMessage), c.deferred.reject())
        }
    })
}),
define("lib/constraints/not-empty", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/constraints/field-constraint"))).extend({
        nullable: !1,
        message: "This field must not be empty",
        check: function (e, t) {
            t(e.length > 0)
        }
    })
}),
define("lib/constraints/max-length", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/constraints/field-constraint"))).extend({
        maxLength: 100,
        message: "{maxLength} characters max",
        check: function (e, t) {
            t(e.length <= this.maxLength)
        }
    })
}),
define("lib/constraints/url", [], function (e, t, i) {
    var n, s, o = /^((?:(?:https?:\/\/)?(?:[a-z0-9\-]+\.)+[a-z]{2,4})(?:\/\S*)?[^\s`!()\[\]{};:'".,<>Â«Â»â€œâ€â€˜â€™])$/i,
        r = /^((?:(?:https?:\/\/)(?:[a-z0-9\-]+\.)+[a-z]{2,4})(?:\/\S*)?[^\s`!()\[\]{};:'".,<>Â«Â»â€œâ€â€˜â€™])$/i;
    n = i.exports = (s || (s = e("lib/constraints/field-constraint"))).extend({
        message: "This URL is invalid.",
        strict: !1,
        check: function (e, t) {
            t(!e || (this.strict ? r : o).test(e))
        }
    })
}),
define("lib/constraints/field-constraint", [], function (e, t, i) {
    var n, s;
    n = i.exports = Class.extend({
        nullable: !0,
        validate: function (e, t) {
            var i = $.Deferred();
            return null == t ? this.result(i, this.nullable) : this.check(t, this.result.bind(this, i)), i
        }
    }), (s || (s = e("lib/constraints/constraint"))).applyTo(n.prototype)
}),
define("lib/mixins/collections/pooling", [], function (e, t, i) {
    function n(t) {
        this._poolUrl && this.options.minPoolSize && this._pool.length < this.options.minPoolSize && this.fetch((o || (o = e("underscore"))).defaults({
            onlyToPool: !0,
            url: void 0,
            restoreUrl: this.next_href,
            fromPool: !1
        }, t))
    }
    var s, o, r, a, l = {
            smallFirstFetch: !0,
            blockSize: 50,
            minPoolSize: 12
        };
    s = i.exports = new(r || (r = e("lib/mixin")))({
        _pool: null,
        _poolUrl: null,
        _poolingEnabled: !0,
        _shuffle: !1,
        requires: ["unshuffle"],
        applyTo: function (t) {
            var i = t.constructor;
            this.after(i, {
                onHold: function (t, i, n) {
                    t._pool && (o || (o = e("underscore"))).invoke(t._pool, "hold", n)
                },
                onRelease: function (t, i, n) {
                    (o || (o = e("underscore"))).invoke(t._pool, "release", n)
                }
            })
        },
        togglePooling: function (e) {
            return this._poolingEnabled = "boolean" == typeof e ? e : !this._poolingEnabled, this
        },
        toggleShuffle: function () {
            if (this._poolingEnabled) {
                var t, i, n, s = this.models.concat(this._pool),
                    r = !this._shuffle;
                return r ? s = (o || (o = e("underscore"))).shuffle(s) : (s = (o || (o = e("underscore"))).sortBy(s, this.unshuffle), this._shuffle = r), n = this.models, this.models = s, t = (o || (o = e("underscore"))).find(s, function (e, t) {
                    var n = (this.soundAt || this.at).call(this, t);
                    return n && n.isPlaying && n.isPlaying() ? (i = t, !0) : void 0
                }.bind(this)), this.models = n, t && i && (s.splice(i, 1), s.unshift(t)), this.reset(s.splice(0, this.options.limit), {
                    fromPool: !0
                }), this.add(s), r && (this._shuffle = r), this.next_href = null, this.trigger("shuffled", this, r), this
            }
        },
        isShuffled: function () {
            return this._shuffle
        },
        override: {
            bulkFetch: function () {
                throw "bulkFetch does not work with pooled collections"
            }
        },
        around: {
            initialize: function (t, i, n) {
                return this._pool = [], n = (o || (o = e("underscore"))).defaults(n || {}, l), t(i, n)
            },
            reset: function (e, t, i) {
                if (!this._poolingEnabled) return e(t, i);
                var n, s;
                for (t || (t = []), i || (i = {}), n = 0, s = this.models.length; s > n; n++) this._removeReference(this.models[n]);
                for (n = 0, s = this._pool.length; s > n; n++) this._removeReference(this._pool[n]);
                return this._reset(), this._pool.length = 0, this.add(t, {
                    silent: !0,
                    parse: i.parse,
                    fromPool: void 0 === i.fromPool ? !0 : i.fromPool
                }), i.silent || this.trigger("reset", this, i), this
            },
            fetch: function (t, i) {
                if (!this._poolingEnabled) return t(i);
                var s, r, l, u, c, d, h = this.options.limit,
                    p = this.options.smallFirstFetch && !this._shuffle && 0 === this.length;
                if (i || (i = {}), d = i.url || (o || (o = e("underscore"))).result(this, "url"), d && !i.onlyToPool) {
                    if (c = (a || (a = e("lib/url"))).parse(d, "query").query, h = parseInt(c.limit, 10), l = parseInt(c.offset, 10) || 0, this._pool.length >= h || this._poolUrl === !1) return s = $.Deferred().resolve(), this[i.add ? "add" : "reset"](this._pool.splice(0, h), (o || (o = e("underscore"))).defaults({
                        fromPool: !0
                    }, i)), this.lastFetchTime = Date.now(), this.next_href = this._poolUrl === !1 && 0 === this._pool.length ? !1 : (a || (a = e("lib/url"))).modify(d, {
                        query: {
                            offset: l + h
                        }
                    }), n.call(this, i), s;
                    this._poolUrl || (this._poolUrl = p ? d : (a || (a = e("lib/url"))).modify(d, {
                        query: {
                            limit: this.options.blockSize
                        }
                    }))
                }
                return this._poolUrl ? (i.url = this._poolUrl, r = !(this._requests && this._requests[i.url]), s = t((o || (o = e("underscore"))).defaults({
                    add: !0
                }, i)), r ? (s.addAfterFetch = !1, u = this.next_href || d, s.done(function (t) {
                    var r, c;
                    this._poolUrl = t.next_href || !1, p && this._poolUrl && (this._poolUrl = (a || (a = e("lib/url"))).modify(this._poolUrl, {
                        query: {
                            limit: this.options.blockSize
                        }
                    }), n.call(this, (o || (o = e("underscore"))).defaults({
                        add: !0
                    }, i))), this.next_href = i.restoreUrl || (this._poolUrl !== !1 || this._pool.length ? (a || (a = e("lib/url"))).modify(u, {
                        query: {
                            offset: l + h
                        }
                    }) : !1), (!i.onlyToPool || s.addAfterFetch) && (r = 0 === this.models.length, c = this._pool.splice(0, h), (o || (o = e("underscore"))).invoke(c, "release", this._usageCount()), this.add(c, (o || (o = e("underscore"))).defaults({
                        fromPool: !0,
                        silent: r
                    }, i)), this._poolUrl !== !1 || this._pool.length || (this.next_href = !1), r && !i.silent && this.trigger("reset", this, i))
                }.bind(this))) : p || (s.addAfterFetch = !0)) : s = $.Deferred().resolve({}), s
            },
            add: function (t, i, n) {
                if (n || (n = {}), !this._poolingEnabled || n.fromPool || "number" == typeof n.at && n.at <= this.models.length) return t(i, n);
                (o || (o = e("underscore"))).isArray(i) || (i = [i]);
                var s = this.models,
                    r = this._byCid,
                    a = this._byId;
                return this.models = this._pool, this._byCid = {}, this._byId = {}, t(i, (o || (o = e("underscore"))).defaults({
                    silent: !0
                }, n)), (o || (o = e("underscore"))).chain(this._pool).last(i.length).invoke("off"), this._shuffle && (this._pool = (o || (o = e("underscore"))).shuffle(this._pool)), this.models = s, this._byCid = r, this._byId = a, this.length = this.models.length, this
            }
        }
    })
}),
define("collections/user-items", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (r || (r = e("lib/collection"))).extend(o || (o = e("lib/mixins/audio-source")), {
        defaults: {
            type: null,
            userId: null
        },
        isEdgeBaseUrl: !1,
        baseUrlQueryParams: {},
        setup: function (e) {
            e.resource_id && !e.userId && (e.userId = e.resource_id)
        },
        getSourceInfo: function () {
            return {
                type: "user-" + this.options.type,
                resourceId: this.options.userId,
                resourceType: "user"
            }
        },
        baseUrl: function () {
            return (this.isEdgeBaseUrl ? (s || (s = e("lib/api-wrapper"))).EDGE : "") + (a || (a = e("lib/url"))).stringify({
                path: this.getUrlPath(),
                query: this.baseUrlQueryParams
            })
        },
        getUrlPath: function () {
            return ["users", this.options.userId, this.options.type]
        }
    }, {
        hashFn: function (e, t) {
            return t && (t.userId || t.resource_id) || null
        }
    })
}),
define("lib/constraints/form-constraint", [], function (e, t, i) {
    function n(e) {
        return null == e
    }
    var s, o;
    s = i.exports = Class.extend({
        fields: null,
        nullable: !0,
        validate: function (e) {
            var t = $.Deferred(),
                i = this.fields.map(e.get.bind(e));
            return i.some(n) ? this.result(t, this.nullable) : this.check(i, this.fields, this.result.bind(this, t)), t
        },
        affectsField: function (e) {
            return this.fields.indexOf(e) > -1
        },
        getOwnerField: function () {
            return this.fields[0]
        }
    }), (o || (o = e("lib/constraints/constraint"))).applyTo(s.prototype)
}),
define("lib/notifications-queue", [], function (e, t, i) {
    function n(t) {
        var i, n, s;
        return t && t.collection && t.collection.length && (i = t.collection[0], n = i.last_message ? i.last_message.conversation_id + "_" + i.last_message.sent_at : i.uuid || i.id, s = (d || (d = e("underscore"))).isNumber(n) ? n > (void 0 === this.lastRead ? -1 : this.lastRead) : n !== this.lastRead), s
    }

    function s(t) {
        var i = (g || (g = e("config/notification-types")))[t];
        return !!((p || (p = e("config"))).get("notifications") && i && i.channel)
    }

    function o(e) {
        var t = e ? "on" : "off";
        this[t]("change:size", l)
    }

    function r(t) {
        var i = t ? "on" : "off";
        (g || (g = e("config/notification-types")))[this.get("type")][i]("pollIntervalChange", a, this)
    }

    function a() {
        var e = this._breaker;
        e && this.restart()
    }

    function l(e, t) {
        t && e.stopPolling()
    }

    function u() {
        var t = (g || (g = e("config/notification-types")))[this.get("type")];
        return {
            backoffRate: 1.1,
            baseDelay: t.get("minPollInterval"),
            maxDelay: t.get("maxPollInterval")
        }
    }
    var c, d, h, p, f, g, m, v, b = new(m || (m = e("lib/persistent-store")))("notify");
    c = i.exports = (f || (f = e("lib/model"))).extend({
        channel: null,
        _queue: null,
        _waitingQueue: null,
        _unseenQueue: null,
        _breaker: null,
        lastRead: null,
        _request: null,
        defaults: {
            size: null,
            type: null
        },
        initialize: function (t) {
            this._queue = [], this._waitingQueue = [], this._unseenQueue = [];
            var i = t.type,
                n = (g || (g = e("config/notification-types")))[i];
            this.baseUrl = n.get("baseUrl"), this.channel = n.get("channel"), this.lastRead = b.get(i), (d || (d = e("underscore"))).bindAll(this, "onNotification"), s(i) ? (p || (p = e("config"))).get("notifications").subscribe(n.channel, this.onNotification) : this.startPolling(), r.call(this, !0)
        },
        startPolling: function () {
            if (!this._isPolling) {
                var t, i;
                t = this._breaker = new(h || (h = e("lib/circuit-breaker")))(u.call(this)), this._isPolling = !0, i = function () {
                    this._isPolling && (clearTimeout(this._pollingId), this.fetch({
                        force: !0
                    }).done(function (e) {
                        n.call(this, e) ? (t.succeeded(), this._pollingId = setTimeout(i, t.currentDelay())) : t.failed()
                    }.bind(this)).fail(function (e) {
                        e.status >= 400 && e.status < 500 ? t.disable({
                            autoEnable: !1
                        }) : t.failed()
                    }))
                }.bind(this), this._breaker.on("enabled", i), o.call(this, !0), i()
            }
        },
        stopPolling: function () {
            this._isPolling && (o.call(this, !1), clearTimeout(this._pollingId), this._pollingId = null, this._isPolling = !1, this._breaker.dispose(), this._breaker = null)
        },
        restart: function () {
            this.stopPolling(), this.startPolling()
        },
        onNotification: function (e) {
            this._request ? this._waitingQueue.push(e) : this._queue.push(e), this._unseenQueue.push(e), this.set("size", this._unseenQueue.length)
        },
        hasUnfetchedItems: function () {
            return this._queue.length > 0
        },
        fetchQueuedItems: function () {
            if (!this._request) {
                if (!this.hasUnfetchedItems()) return this.set("size", 0), $.Deferred().resolve();
                var t, i = this._queue,
                    n = i.length,
                    s = i[0].uuid,
                    o = i[n - 1].uuid;
                t = (v || (v = e("lib/url"))).modify((d || (d = e("underscore"))).result(this, "baseUrl"), {
                    query: {
                        "uuid[to]": s,
                        cursor: o,
                        limit: n,
                        offset: null
                    }
                }), this._request = $.Deferred(), $.ajax({
                    url: t,
                    dataType: "json",
                    type: "GET"
                }).done(function (e) {
                    this.onFetchQueuedItemsDone(e), this._request.resolve(), this._request = null
                }.bind(this)).fail(function () {
                    this.onFetchFail(), this._request.reject(), this._request = null
                }.bind(this))
            }
            return this._request
        },
        markAsRead: function (e) {
            var t, i = this.get("type"),
                n = 0;
            this.lastRead !== e && (this.lastRead = e, b.set(i, e), t = this._unseenQueue.some(function (t) {
                return ++n, t.uuid === e ? !0 : void 0
            }), t ? this._unseenQueue.splice(0, n) : this._unseenQueue.length = 0, this.set("size", this._unseenQueue.length)), s(i) || this.startPolling()
        },
        fetch: function (t) {
            var i, s = !(!t || !t.force);
            return null === this.get("size") || s ? (i = (v || (v = e("lib/url"))).modify((d || (d = e("underscore"))).result(this, "baseUrl"), {
                query: {
                    limit: 1,
                    linked_partitioning: 1
                }
            }), $.ajax({
                url: i,
                dataType: "json"
            }).done(function (e) {
                var t, i = n.call(this, e);
                this.lastFetchTime = Date.now(), i && (null === this.get("size") || s) && (t = i ? !0 : 0, this.set("size", t))
            }.bind(this))) : $.Deferred().resolve()
        },
        hasDataForView: function () {
            return null !== this.get("size")
        },
        onFetchFail: function () {
            this._waitingQueue.length && Array.prototype.push.apply(this._queue, this._waitingQueue.splice(0, this._waitingQueue.length))
        },
        onFetchQueuedItemsDone: function (e) {
            this._queue.length = 0, this._waitingQueue.length && (this._queue.push.apply(this._queue, this._waitingQueue), this._waitingQueue.length = 0);
            var t = e.collection;
            t && t.length ? this.trigger("data", t) : this.set("size", 0)
        }
    }, {
        hashFn: function (e) {
            return e.type
        },
        onCleanup: function (t) {
            s(t.get("type")) && (p || (p = e("config"))).get("notifications").unsubscribe(t.channel, t.onNotification), t.stopPolling(), r.call(t, !1)
        },
        cleanupInstantly: !0
    })
}),
define("lib/views/dropdown-menu", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("lib/view"))).extend(s || (s = e("lib/mixins/views/overlay")), {
        className: "dropdownMenu",
        events: {
            click: "onClick"
        },
        defaults: {
            collision: "fit none",
            margin: 0
        },
        onClick: function (e) {
            $(e.target).closest('a[href^="/"]').length || e.stopPropagation()
        }
    })
}),
define("lib/views/overlay-button-events", [], function (e, t, i) {
    i.exports = {
        TOGGLE: "dropdownButton:toggle"
    }
}),
define("lib/mixins/views/throbbing", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        override: {
            LoadingView: s || (s = e("lib/views/loading"))
        }
    })
}),
define("models/comment", [], function (e, t, i) {
    var n, s, o, r, a, l, u = 1 / 0;
    n = i.exports = (o || (o = e("lib/model"))).extend(s || (s = e("lib/mixins/editable-object")), {
        resource_type: "comment",
        urnPrefix: "soundcloud:comments",
        parse: function (e) {
            return null === e.timestamp && (e.timestamp = u), e
        },
        submodelMap: {
            track: r || (r = e("models/sound")),
            user: l || (l = e("models/user"))
        },
        baseUrl: function () {
            return ["comments", this.id].join("/")
        },
        saveUrl: function () {
            var t = this.getSound(),
                i = ["tracks", t.id, "comments"].join("/"),
                n = t.get("secret_token");
            return n && t.isPrivate() ? (a || (a = e("lib/url"))).modify(i, {
                query: {
                    secret_token: n
                }
            }) : i
        },
        destroyUrl: function () {
            return ["tracks", this.getSoundId(), "comments", this.id].join("/")
        },
        getAttributesToBeSaved: function () {
            return {
                "comment[body]": this.get("body"),
                "comment[timestamp]": this.get("timestamp")
            }
        },
        setReplyTo: function (e) {
            this.set("replyTo", e.id), this.trigger("change:recipient", e.get("user").permalink)
        },
        getSound: function () {
            var t = this.getSoundId(),
                i = (r || (r = e("models/sound"))).hashFn({
                    id: t,
                    resource_type: "sound"
                });
            return (r || (r = e("models/sound"))).instances.get(i)
        },
        getSoundId: function () {
            return this.get("track_id") || (this.get("track") || {}).id
        },
        reportAsSpam: function () {
            $.post("i1/comments/" + this.id + "/spam", function () {
                this.trigger("destroy", this, this.collection)
            }.bind(this))
        }
    }, {
        EMPTY_TIMESTAMP: u
    })
}),
define("lib/mixins/views/opens-dialog", [], function (e, t, i) {
    function n(e, t) {
        t = t || {}, e.on("mouseenter", t, s.bind(this)).on("mouseleave", o.bind(this))
    }

    function s(e) {
        f(e) || (clearTimeout(C), clearTimeout(S), w ? d.call(this, e) : k = setTimeout(r.bind(this, e), T))
    }

    function o(e) {
        clearTimeout(k), S = setTimeout(a.bind(this, e), E)
    }

    function r(e) {
        this.disposed || (clearTimeout(C), d.call(this, e))
    }

    function a(e) {
        !this.disposed && w && w.options.relativeElement === e.target && p()
    }

    function l() {
        clearTimeout(S), clearTimeout(C)
    }

    function u() {
        C = setTimeout(p, E)
    }

    function c() {
        this.removeSubview(w), w._dispose(), w = null, clearTimeout(C)
    }

    function d(t) {
        w && w.options.relativeElement !== t.target && w.close(), w || (x && (m || (m = e("underscore"))).isFunction(x.reject) && x.reject(), x = h.call(this, t), $.when(x).done(function (i) {
            x = null, w = (b || (b = e("lib/views/dialog"))).create(this.options.dialogType, t.target, i, (m || (m = e("underscore"))).result(this, "dialogArgs")), w.on((b || (b = e("lib/views/dialog"))).Events.CLOSED, c, this).$el.on("mouseenter", l).on("mouseleave", u), this.addSubview(w), w.open()
        }.bind(this)))
    }

    function h(t) {
        var i = t.data,
            n = !(m || (m = e("underscore"))).isFunction(i) && (m || (m = e("underscore"))).isEmpty(i) ? this.dialogSubviewArgs : i;
        return (m || (m = e("underscore"))).isFunction(n) && (n = n.call(this, t.target)), n
    }

    function p() {
        w && w.close()
    }

    function f(t) {
        return (v || (v = e("lib/browser"))).isOpera ? !1 : !! (void 0 === t.buttons ? t.which : t.buttons)
    }
    var g, m, v, b, _, y, w, x, k, S, C, T = 150,
        E = 400;
    y = {
        dialogEnabled: !0,
        dialogType: null,
        dialogSelector: null
    }, g = i.exports = new(_ || (_ = e("lib/mixin")))({
        applyTo: function (t) {
            t.defaults = (m || (m = e("underscore"))).defaults(t.defaults, y)
        },
        defaults: {
            dialogSubviewArgs: null,
            dialogArgs: null
        },
        after: {
            renderDecorate: function () {
                var t = this.options;
                if (t.dialogEnabled !== !1) return t.dialogSelector ? void((m || (m = e("underscore"))).isString(t.dialogSelector) ? n.call(this, this.$(t.dialogSelector)) : (m || (m = e("underscore"))).isObject(t.dialogSelector) && (m || (m = e("underscore"))).each(t.dialogSelector, function (e, t) {
                    n.call(this, this.$(t), e)
                }, this)) : void n.call(this, this.$el)
            }
        },
        before: {
            disposeSubviews: function () {
                w && w._parentView === this && w.close()
            }
        }
    })
}),
define("collections/timed-comments-old", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (r || (r = e("collections/comments"))).extend({
        defaults: {
            limit: (a || (a = e("config"))).get("maxComments")
        },
        initialize: function () {
            (r || (r = e("collections/comments"))).prototype.initialize.apply(this, arguments), this.threads = [], this.on("remove", this._removeComment, this)
        },
        threads: null,
        _addComment: function (t) {
            var i, n, o, r, a = t.get("timestamp");
            o = this.getTimestampIndex(a), n = this.threads[o], t.created_timestamp = Date.parse(t.get("created_at")), n && n[0] === a ? (r = (s || (s = e("underscore"))).sortedIndex(n[1], t, function (e) {
                return e.created_timestamp
            }), n[1].splice(r, 0, t)) : (i = [a, [t]], this.threads.splice(o, 0, i))
        },
        _removeComment: function (e) {
            var t, i = this.getThreadAtTimestamp(e.get("timestamp"));
            i && (t = i[1].indexOf(e), t > -1 && i[1].splice(t, 1))
        },
        _prepareModel: function () {
            var t = (r || (r = e("collections/comments"))).prototype._prepareModel.apply(this, arguments);
            return t.created_timestamp = Date.parse(t.created_at), t.get("timestamp") > this.soundDuration && t.set({
                timestamp: (o || (o = e("models/comment"))).EMPTY_TIMESTAMP
            }, {
                silent: !0
            }), this._addComment(t), t
        },
        comparator: function (t, i) {
            var n = t.attributes.timestamp === (o || (o = e("models/comment"))).EMPTY_TIMESTAMP ? 1 / 0 : t.attributes.timestamp,
                s = i.attributes.timestamp === (o || (o = e("models/comment"))).EMPTY_TIMESTAMP ? 1 / 0 : i.attributes.timestamp;
            return n - s || t.created_timestamp - i.created_timestamp
        },
        getThreadComments: function (t) {
            var i, n, r = arguments[1],
                a = (s || (s = e("underscore"))).isNumber(r) ? r : 0,
                l = (s || (s = e("underscore"))).isBoolean(r) ? r : !1;
            return i = 0 === a ? this.getThreadAtTimestamp(t) : (s || (s = e("underscore"))).find(this.threads, function (i) {
                return Math.abs(t - i[0]) <= a && i[0] !== (o || (o = e("models/comment"))).EMPTY_TIMESTAMP
            }), n = i ? i[1] : [], n.filter(l ? function (e) {
                return e.id
            } : (s || (s = e("underscore"))).identity)
        },
        getTimestamps: function () {
            return (s || (s = e("underscore"))).pluck(this.threads, 0)
        },
        getTimestampIndex: function (t) {
            return (s || (s = e("underscore"))).sortedIndex(this.threads, [t], function (t) {
                return t[0] === (o || (o = e("models/comment"))).EMPTY_TIMESTAMP ? 1 / 0 : t[0]
            })
        },
        getThreadAtTimestamp: function (e) {
            var t = this.getTimestampIndex(e),
                i = this.threads[t];
            return i && i[0] === e ? i : null
        }
    })
}),
define("lib/timed-comments-states", [], function (e, t, i) {
    i.exports = {
        INITIAL: "timed-comment-sm:initial",
        CURRENT_COMMENT: "timed-comment-sm:current-comment",
        CURRENT_TIMESTAMP: "timed-comment-sm:current-timestamp",
        ACTIVE_TIMESTAMP: "timed-comment-sm:active-timestamp"
    }
}),
define("models/conversation", [], function (e, t, i) {
    function n(e, t) {
        t && t.sent_at && (this._lastMessageSentAt = new Date(t.sent_at), this.set("has_attachment", s.call(this)))
    }

    function s() {
        var t = this.get("last_message");
        return t ? !! t.content.match((d || (d = e("lib/helpers/sc-links-helper"))).scLinksRegexGlobal) : !1
    }
    var o, r, a, l, u, c, d, h, p, f = 193;
    o = i.exports = (h || (h = e("lib/model"))).extend({
        resource_type: "conversation",
        _lastMessageSentAt: null,
        submodelMap: {
            users: p || (p = e("models/user"))
        },
        baseUrl: function () {
            return "me/conversations/" + this.id
        },
        setup: function () {
            this.on("change:last_message", n, this)
        },
        parse: function (t) {
            var i = (l || (l = e("underscore"))).find(t.users, function (e) {
                return "system" === e.id
            });
            return i && (i.id = f), (h || (h = e("lib/model"))).prototype.parse.apply(this, arguments)
        },
        getRecipient: function () {
            var t = (u || (u = e("config"))).get("me").id;
            return (l || (l = e("underscore"))).find(this.get("users"), function (e) {
                return t !== e.id
            })
        },
        fetch: function () {
            return (h || (h = e("lib/model"))).prototype.fetch.apply(this, arguments).fail(function () {
                this.trigger("error")
            }.bind(this))
        },
        isFromSoundCloud: function () {
            return this.getRecipient().id === f
        },
        setRead: function (e) {
            this.set("read", e)
        },
        markAsRead: function () {
            var t = this.toggleReadState(!0);
            return (a || (a = e("event-bus"))).trigger("conversation:read", this.id), t
        },
        toggleReadState: function (e) {
            var t, i = null != e ? e : !this.get("read");
            return this.set("read", i), this._saveDeferred || (this._saveDeferred = t = $.Deferred().always(function () {
                this._saveDeferred = null
            }.bind(this)).done(function () {
                this.get("read") !== i && this.toggleReadState(this.get("read"))
            }.bind(this)), this.save({
                read: i
            }).done(function () {
                setTimeout(t.resolve, 1e3)
            }).fail(function () {
                setTimeout(t.reject, 1e3)
            })), this._saveDeferred
        },
        getUuid: function () {
            var t = this.get("last_message");
            return (c || (c = e("models/conversation-message"))).hashFn(t)
        },
        infoForBadge: function () {
            var e = this.get("last_message");
            return {
                from: this.getRecipient(),
                isFromSoundCloud: this.isFromSoundCloud(),
                content: e.content,
                sentAt: e.sent_at,
                id: this.id
            }
        },
        lastMessageSentAt: function () {
            return this._lastMessageSentAt || n.call(this, null, this.get("last_message")), this._lastMessageSentAt
        },
        destroyAndReport: function (t) {
            t ? $.ajax({
                url: this.baseUrl() + "/spam",
                type: "PUT",
                success: function () {
                    this.trigger("destroy", this)
                }.bind(this)
            }) : (r || (r = e("lib/action-controller"))).destroy(this)
        }
    }, {
        onCleanup: function (e) {
            e.off("change:last_message", n, e)
        }
    })
}),
define("lib/mixins/views/new-item", [], function (e, t, i) {
    function n() {
        var e = this.model.get("size");
        this.toggleState("newItems", e && "number" == typeof e), this.toggleState("someItems", !! e)
    }
    var s, o, r;
    s = i.exports = new(o || (o = e("lib/mixin")))({
        defaults: {
            states: {
                newItems: "newItems__new",
                someItems: "newItems__some"
            },
            observedAttributes: ["size"]
        },
        override: {
            defaults: {
                type: null
            }
        },
        before: {
            setup: function (t) {
                this.model = new(r || (r = e("lib/notifications-queue")))({
                    type: t.type
                }), n.call(this)
            },
            renderDecorate: function () {
                n.call(this)
            }
        }
    })
}),
define("lib/clicklog", [], function (e, t, i) {
    var n, s, o;
    s = "https://cipater.soundcloud.com", o = {
        search: "v2.search.click.2",
        search_rate: "v2.search.rate.1",
        shortcuts: "v2.shortcut.click.1"
    }, n = i.exports = {
        track: function (e, t) {
            var i = {};
            i[o[e]] = t, $.ajax({
                url: s,
                type: "POST",
                beforeSend: $.noop,
                data: JSON.stringify(i)
            })
        }
    }
}),
define("lib/mixins/views/combo-box", [], function (e, t, i) {
    function n(t) {
        var i = t ? "on" : "off";
        t && (this._inputHandlers = {
            mousedown: l.bind(this),
            blur: c.bind(this),
            focus: u.bind(this),
            keyup: d.bind(this),
            keydown: h.bind(this)
        }, (w || (w = e("lib/browser"))).isIE9 || (this._inputHandlers.input = b.bind(this))), this.$el[i](this._inputHandlers, this.inputSelector)
    }

    function s() {
        var e = this.getMenu();
        return e ? e.getContentView() : void 0
    }

    function o() {
        return (y || (y = e("underscore"))).extend({
            query: this.getInput().val(),
            defaultSelectedItemIndex: this.defaultSelectedItemIndex
        }, (y || (y = e("underscore"))).result(this, "menuContentViewArgs"))
    }

    function r(e) {
        e.on("itemClick", function () {
            this.onItemSelected.apply(this, arguments), this.closeMenu()
        }.bind(this)).on("itemOver", a.bind(this))
    }

    function a(e) {
        this.selectedItemIndex = e, this.onItemHighlighted.apply(this, arguments)
    }

    function l(e) {
        this.isAutoFocusInput && this.inputHasQuery() && this.openMenu(), e.stopPropagation()
    }

    function u() {
        this.isAutoFocusInput || !this.inputHasQuery() && !this.showAllItems || this.openMenu()
    }

    function c() {
        this.closeMenu()
    }

    function d() {
        (w || (w = e("lib/browser"))).isIE9 && this.updateQuery()
    }

    function h(t) {
        var i;
        switch (t.keyCode) {
        case (k || (k = e("lib/keys"))).ENTER:
            i = g;
            break;
        case (k || (k = e("lib/keys"))).ESC:
            i = v;
            break;
        case (k || (k = e("lib/keys"))).DOWN:
            i = p;
            break;
        case (k || (k = e("lib/keys"))).UP:
            i = f;
            break;
        case (k || (k = e("lib/keys"))).TAB:
            i = m
        }
        return i ? i.call(this, t) : void 0
    }

    function p(e) {
        e.preventDefault();
        var t = s.call(this);
        t && (this.selectedItemIndex = t.highlightItem(this.selectedItemIndex + 1))
    }

    function f(e) {
        e.preventDefault();
        var t = s.call(this);
        t && (this.selectedItemIndex = t.highlightItem(this.selectedItemIndex === this.defaultSelectedItemIndex ? this.defaultSelectedItemIndex : this.selectedItemIndex - 1))
    }

    function g(e) {
        this.isMenuOpened() && this.getMenuItemCount() && this.selectActiveItem() && (e.preventDefault(), e.stopPropagation())
    }

    function m(e) {
        this.selectOnTab && this.isMenuOpened() && this.getMenuItemCount() && (e.preventDefault(), this.selectActiveItem())
    }

    function v(e) {
        e.preventDefault();
        var t = this.getInput();
        t.val().length ? this.emptyInput() : t.blur()
    }

    function b() {
        this.updateQuery()
    }
    var _, y, w, x, k, S;
    _ = i.exports = new(S || (S = e("lib/mixin")))({
        applyTo: function (t) {
            this.before(t, {
                setup: function () {
                    this.selectedItemIndex = this.defaultSelectedItemIndex, this.activate(), this.showSuggestionsMenu = this.showSuggestionsMenu.bind(this)
                },
                renderDecorate: function () {
                    this.isAutoFocusInput = !! this.getInput().attr("autofocus"), this.oldInputText = this.getInput().val()
                }
            }), this.after(t, {
                dispose: function () {
                    this.deactivate()
                }
            }), t.element2selector = (y || (y = e("underscore"))).extend({}, t.element2selector, {
                input: t.inputSelector
            })
        },
        isAutoFocusInput: !1,
        selectedItemIndex: 0,
        oldInputText: null,
        defaults: {
            inputSelector: "",
            zIndexLevel: "content",
            menuOffset: "0 0",
            showAllItems: !1,
            selectOnTab: !1,
            typingDelay: 250,
            defaultSelectedItemIndex: 0,
            MenuContentView: null,
            menuContentViewArgs: null,
            getMenuWidth: function () {
                return this.getRelativeElement().outerWidth()
            },
            getRelativeElement: function () {
                return this.getInput()
            },
            getInput: function () {
                return this.getElement("input")
            },
            onItemSelected: $.noop,
            onItemHighlighted: $.noop
        },
        activate: function () {
            n.call(this, !0)
        },
        deactivate: function () {
            n.call(this, !1)
        },
        focusInput: function () {
            this.getInput().focus()
        },
        emptyInput: function () {
            var e = this.getInput();
            return e.val(""), this.updateQuery(), e
        },
        inputHasQuery: function () {
            return !!this.getInput().val().trim()
        },
        isInputDisplayed: function () {
            return this.getInput().is(":visible")
        },
        selectActiveItem: function () {
            var e = s.call(this);
            return !(!e || !e.selectItem(this.selectedItemIndex))
        },
        updateQuery: function () {
            var e = this.getInput().val();
            e !== this.oldInputText && (this.oldInputText = e, this.selectedItemIndex = this.defaultSelectedItemIndex, e || this.showAllItems || this.closeMenu(), clearTimeout(this.suggestTimeout), this.suggestTimeout = this.addDeferred(setTimeout(this.showSuggestionsMenu, this.typingDelay)))
        },
        showSuggestionsMenu: function () {
            (this.inputHasQuery() || this.showAllItems) && (this.openMenu(), this.updateMenuContent())
        },
        getMenuItemCount: function () {
            var e = s.call(this);
            return e ? e.getItemCount() : 0
        },
        isMenuOpened: function () {
            var e = this.getMenu();
            return e && e.isOpened
        },
        getMenu: function () {
            return this.subviews.comboBoxMenu
        },
        createMenu: function () {
            var t = this.getMenu();
            return t && t.disposed && (this.removeSubview(t), t = null), t || (t = this.addSubview(new(x || (x = e("lib/views/dropdown-menu")))({
                Subview: this.MenuContentView,
                subviewArgs: o.call(this),
                togglerEl: this.getRelativeElement()[0],
                relativeElement: this.getRelativeElement()[0],
                relativeElementAnchor: "left bottom",
                anchor: "left top",
                focusable: !1,
                offset: this.menuOffset,
                width: this.getMenuWidth(),
                zIndexLevel: this.zIndexLevel
            }), "comboBoxMenu")), t
        },
        openMenu: function () {
            !this.isInputDisplayed() || this.disposed || this.isMenuOpened() || (this.getInput().attr("aria-expanded", "true"), this.createMenu().open(), this.updateMenuContent())
        },
        updateMenuContent: function () {
            var e = this.createMenu().replaceContentView(o.call(this));
            r.call(this, e)
        },
        closeMenu: function () {
            if (!this.disposed && this.isMenuOpened()) {
                var e = this.getMenu();
                this.selectedItemIndex = this.defaultSelectedItemIndex, e && (e.close(), this.getInput().attr("aria-expanded", "false"))
            }
        }
    })
}),
define("lib/views/quick-search", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (r || (r = e("lib/view"))).extend(o || (o = e("lib/mixins/views/simple-form")), {
        template: e("lib/views/quick-search.tmpl"),
        css: e("lib/views/quick-search.css"),
        className: "quicksearch sc-border-box",
        defaults: {
            type: null,
            showPlaceholder: !0,
            size: "medium"
        },
        events: {
            "focus      .quicksearch__input": "onInputFocus",
            "blur       .quicksearch__input": "onInputBlur",
            "click      .quicksearch__submit": "onSubmitClick",
            "touchstart .quicksearch__submit": "onSubmitClick"
        },
        element2selector: {
            input: ".quicksearch__input"
        },
        states: {
            expanded: function (e) {
                this.$el.toggleClass("expanded", e), e ? this.onExpand() : this.onCollapse()
            }
        },
        onExpand: $.noop,
        onCollapse: $.noop,
        renderDecorate: function () {
            this.$el.addClass(this.options.size)
        },
        setPlaceholder: function (e) {
            this.getElement("input").attr("placeholder", e)
        },
        onSubmitClick: function (e) {
            var t = this.getElement("input");
            this.getState("expanded") || t.val().trim() || (t.focus(), e.preventDefault(), e.stopPropagation())
        },
        onInputFocus: function () {
            this.toggleState("expanded", !0)
        },
        onInputBlur: function () {
            this.toggleState("expanded", !1)
        },
        onSubmit: function () {
            var t = this.getElement("input").val().trim();
            t.length && (s || (s = e("config"))).get("router").navigateToRoute("search", [this.options.type, t], {
                trigger: !0
            })
        },
        getTemplateData: function () {
            var e = this.options.type ? " for " + this.options.type : "",
                t = {};
            return t.label = "Search" + e, this.options.showPlaceholder && (t.placeholder = t.label), t
        }
    })
}),
define("collections/shortcuts", [], function (e, t, i) {
    var n, s, o, r, a, l;
    l = {
        query: null,
        kind: "all"
    }, n = i.exports = (o || (o = e("lib/collection"))).extend({
        regex: null,
        model: a || (a = e("models/shortcut")),
        defaults: {
            limit: 1500
        },
        baseUrl: function () {
            return "i1/me/shortcuts"
        },
        filterBy: function (t) {
            return (s || (s = e("underscore"))).defaults(t, l), this.regex = t.query ? new RegExp("(^|[\\s.\\(\\)\\[\\]_-])(" + t.query.replace(/([.?*+\^$\[\]\\(){}\-])/g, "\\$1") + ")", "i") : null, this.filter(function (i) {
                var n = this.regex ? this.regex.test((r || (r = e("vendor/replace-diacritics/replace-diacritics")))(i.getTitle())) : !0,
                    s = "all" === t.kind || t.kind === i.get("kind");
                return s && n
            }.bind(this))
        },
        getRegex: function () {
            return this.regex
        },
        parse: function (e) {
            return e
        }
    }, {
        hashFn: function () {
            return 1
        }
    })
}),
define("lib/window-events", [], function (e, t, i) {
    function n(t, i) {
        var n = i + "d",
            a = "resize" === t ? s(n) : o.trigger.bind(o, t + ":" + n);
        return (r || (r = e("underscore")))[i](a, l)
    }

    function s(e) {
        var t = window.innerWidth,
            i = window.innerHeight,
            n = o.trigger.bind(o, "resize:x:" + e),
            s = o.trigger.bind(o, "resize:y:" + e),
            r = o.trigger.bind(o, "resize:" + e);
        return function (e) {
            var o = window.innerWidth,
                a = window.innerHeight;
            o !== t && n(e), a !== i && s(e), r(e), i = a, t = o
        }
    }
    var o, r, a, l = 200;
    o = i.exports = (r || (r = e("underscore"))).extend({}, (a || (a = e("lib/backbone"))).Events), $(window).on("resize", n("resize", "debounce")).on("resize", n("resize", "throttle")).on("scroll", n("scroll", "debounce")).on("scroll", n("scroll", "throttle"))
}),
define("lib/mixins/views/button", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        applyTo: function (t) {
            t.defaults = (s || (s = e("underscore"))).extend({
                size: "small",
                text_only: !1,
                icon_only: !1,
                responsive: !0,
                title: null
            }, t.defaults), t.states = (s || (s = e("underscore"))).extend({
                active: "sc-button-active",
                selected: "sc-button-selected",
                pending: "sc-pending"
            }, t.states), t.className = ["sc-button", t.className, this.className].join(" ").trim(), t.events = (s || (s = e("underscore"))).extend({}, t.events, {
                "click.button": "onClick"
            })
        },
        defaults: {
            tagName: "button",
            onClick: $.noop,
            template: function () {
                return ""
            },
            loadingTemplate: null
        },
        before: {
            setup: function (e) {
                e.text_only && (this.el.className = "sc-button");
                var t = e.responsive && !this.options.text_only;
                this.$el.attr("title", e.title).attr("tabIndex", 0).addClass("sc-button-" + e.size).toggleClass("sc-button-responsive", t).toggleClass("sc-button-icon", e.icon_only)
            }
        }
    })
}),
define("models/explore-category", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/model"))).extend({
        resource_type: "explore-category",
        url: null,
        hasDataForView: function () {
            return !0
        }
    }, {
        hashFn: function (e) {
            return e.resource_id || e.permalink || "default"
        }
    })
}),
define("models/group", [], function (e, t, i) {
    function n(t) {
        var i = t ? "on" : "off";
        (r || (r = e("lib/action-controller")))[i]("join:target:group:" + this.id, this.onJoin, this)
    }

    function s(e, t) {
        this.attrExists(e) && this.set(e, this.get(e) + (t ? 1 : -1))
    }
    var o, r, a, l, u, c, d;
    o = i.exports = (c || (c = e("lib/model"))).extend(d || (d = e("lib/mixins/models/shortenable")), (u || (u = e("lib/mixins/has-title"))).withOptions({
        attr: "name"
    }), (l || (l = e("lib/mixins/has-editable-image"))).withOptions({
        read: "artwork_url",
        write: "artwork_data"
    }), {
        resource_type: "group",
        urnPrefix: "soundcloud:groups",
        baseUrl: function () {
            return ["groups", this.id].join("/")
        },
        setup: function () {
            this.id ? n.call(this, !0) : this.one("change:id", n.bind(this, !0))
        },
        getShareURL: function () {
            var e = this.get("permalink_url");
            return e && (/^https/.test(e) ? e : e.replace(/^http/, "https"))
        },
        onJoin: function (e) {
            s.call(this, "members_count", e.state)
        },
        isMyGroup: function () {
            return (a || (a = e("config"))).get("me").owns(this)
        }
    }, {
        resolve: function (t) {
            return (c || (c = e("lib/model")))._resolve(this, ["groups", t], function (e) {
                return e && e.get("permalink") === t
            })
        },
        onCleanup: function () {
            n.call(this, !1)
        }
    })
}),
define("models/display-ad", [], function (e, t, i) {
    var n, s, o, r, a, l;
    n = i.exports = (a || (a = e("lib/model"))).extend({
        resource_type: "display_ad",
        baseUrl: function () {
            return (l || (l = e("lib/url"))).modify((r || (r = e("config"))).get("promotedContentServer"), {
                query: (s || (s = e("underscore"))).extend({
                    access_token: (r || (r = e("config"))).get("promotedContentAccessToken"),
                    sound_urn: "soundcloud:sounds:" + this.resource_id,
                    user_urn: (r || (r = e("config"))).get("me").getUrn(),
                    zoneid: (o || (o = e("lib/integrations/adswizz"))).zones.displayAds,
                    context: this.options.context
                }, {})
            })
        },
        parse: function (t) {
            return (s || (s = e("underscore"))).first(t.promoted) || {}
        }
    })
}),
define("lib/mixins/views/multi-resource-type", [], function (e, t, i) {
    var n, s, o, r, a, l;
    n = i.exports = new(a || (a = e("lib/mixin")))({
        defaults: {
            isAudible: !1,
            isUser: !1,
            isGroup: !1,
            isAudibleUpload: !1
        },
        before: {
            initialize: function () {
                switch (this.options.resource_type) {
                case "user":
                    this.ModelClass = l || (l = e("models/user")), this.isUser = !0;
                    break;
                case "sound":
                case "playlist":
                    this.ModelClass = (s || (s = e("models/audible"))).getClass(this.options), this.isAudible = !0;
                    break;
                case "group":
                    this.ModelClass = r || (r = e("models/group")), this.isGroup = !0;
                    break;
                case "sound-upload-edit":
                case "playlist-upload":
                    this.ModelClass = (o || (o = e("lib/upload/audible-upload"))).getClass(this.options), this.isAudibleUpload = !0
                }
            }
        }
    })
}),
define("lib/mixins/views/fbml-view", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        defaults: {
            hasData: function () {
                return (s || (s = e("lib/integrations/facebook"))).initialized
            },
            fetchData: function () {
                return (s || (s = e("lib/integrations/facebook"))).init().done(this.rerender.bind(this))
            }
        },
        around: {
            getTemplateData: function (t, i) {
                return i || (i = {}), i.FB = {
                    app_id: (s || (s = e("lib/integrations/facebook"))).appId
                }, t(i)
            }
        },
        after: {
            renderDecorate: function () {
                (s || (s = e("lib/integrations/facebook"))).parseXFBML(this.el)
            }
        }
    })
}),
define("lib/multi-collection", [], function (e, t, i) {
    function n() {
        var t = this._ignoredCollections;
        return (y || (y = e("underscore"))).find(this.sources, function (e, i) {
            return t.indexOf(i) < 0 && !e.isFullyPopulated()
        })
    }

    function s(e, t) {
        var i = e ? "on" : "off";
        t[i]("all", u, this)[i]("add", a, this)[i]("reset", r, this)[i]("remove", l, this)
    }

    function o() {
        this._map = {
            dupes: [],
            blacklist: []
        }, this.filters.reduce(function (e, t, i) {
            return e[i] = [], e
        }, this._map)
    }

    function r(t) {
        var i = this.length,
            n = !(i || !t.length && (y || (y = e("underscore"))).last(this.sources) !== t);
        t.models.forEach(function (e, i) {
            a.call(this, e, t, {
                index: i,
                silent: n
            })
        }.bind(this)), (n || this.length > i) && (this.lastFetchTime = Date.now()), n && this.trigger("reset", this, {})
    }

    function a(e, t, i) {
        i = i || {};
        var n = i.index;
        this.sources.some(function (e) {
            return e === t ? !0 : void(n += e.length)
        }), this.lastFetchTime = Date.now(), f.call(this, e, n, i)
    }

    function l(e, t, i) {
        var n = i.index;
        this.sources.some(function (e) {
            return e === t ? !0 : void(n += e.length)
        }), g.call(this, e, n)
    }

    function u(e) {
        switch (e) {
        case "add":
        case "remove":
        case "reset":
        case "destroy":
            return;
        default:
            this.trigger.apply(this, arguments)
        }
    }

    function c(e, t) {
        var i = this.length,
            n = i + this._ignore.length,
            s = n,
            o = i + e,
            r = {
                silent: t
            }, a = !this.lastFetchTime;
        return this.sources.every(function (t) {
            var i, l, u, c;
            do {
                for (i = t.models.slice(n, n + e), u = i.length, u && (this.lastFetchTime = t.lastFetchTime || Date.now(), a && (a = !1, this.trigger("reset", this, {}))), c = this.length; l = i.shift();) n++, f.call(this, l, s++, r);
                e -= this.length - c
            } while (this.length < o && u);
            return n -= t.length, this.length < o && t.isFullyPopulated()
        }, this), this.length > i
    }

    function d(e) {
        var t, i, n = e;
        for (t = 0, i = this._ignore.length; i > t && this._ignore[t] <= n; ++t)++n;
        return n
    }

    function h(e) {
        var t, i, n, s = d.call(this, e);
        if (e > -1)
            for (t = 0, i = this.sources.length; i > t; ++t) {
                if (n = this.sources[t], !(s >= n.length)) return {
                    source: n,
                    index: s,
                    model: n.at(s)
                };
                s -= n.length
            }
    }

    function p(e) {
        var t = this.sources.indexOf(e);
        t > -1 && t < this.sources.length - 1 && this._ignoredCollections.push(t)
    }

    function f(e, t, i) {
        var n, s, o = this._map;
        s = t === this._sourceModels.length ? function (e, t) {
            e.push(t)
        } : function (e, i) {
            e.splice(t, 0, i)
        }, e instanceof this.model || (e = this.extractModel(e)), n = this.indexOfEquivalentModel(e, this._sourceModels), s(this._sourceModels, e), s(o.blacklist, n > -1 ? o.blacklist[n] : !0), -1 === n ? s(o.dupes, !0) : t > n ? s(o.dupes, !1) : (o.dupes[n] = !1, s(o.dupes, !0)), this.filters.forEach(function (t, i) {
            s(o[i], !! t(e))
        }), v.call(this), b.call(this, i)
    }

    function g(t, i) {
        var n, s, o, r, a = this._map,
            l = a.dupes;
        if (r = i === this._sourceModels.length - 1 ? function (e) {
            e.pop()
        } : function (e) {
            e.splice(i, 1)
        }, l[i])
            for (s = i + 1, o = (y || (y = e("underscore"))).last(this._ignore); o >= s; ++s) l[s] === !1 && (n = this._sourceModels[s], this.compareModels(t, n) && (l[s] = !0));
        r(this._sourceModels), r(l), r(a.blacklist), this.filters.forEach(function (e, t) {
            r(a[t])
        }), v.call(this), b.call(this)
    }

    function m(e, t) {
        var i, n = this._map;
        for (i = this._sourceModels.length; i-- && (!this.compareModels(e, this._sourceModels[i]) || (n.blacklist[i] = t, !n.dupes[i])););
        v.call(this), b.call(this)
    }

    function v() {
        var t = this._map;
        this._ignore = this._sourceModels.reduce(function (i, n, s) {
            return (y || (y = e("underscore"))).every((y || (y = e("underscore"))).pluck(t, s)) || i.push(s), i
        }, [])
    }

    function b(t) {
        function i(e, t) {
            return -1 === u.indexOf(t)
        }
        var n, s, o, r, a, l, u = this._ignore;
        for (n = this._sourceModels.filter(i), l = (w || (w = e("lib/hirsch")))(this.models, n, this.compareModels), s = 0, o = l.length; o > s; s += 2) r = l[s + 1], l[s] ? (a = n[r], this.add(a, (y || (y = e("underscore"))).defaults({
            at: r
        }, t))) : this.remove(this.at(r), {
            _propagateToSource: !1
        })
    }
    var _, y, w, x;
    _ = i.exports = (x || (x = e("lib/collection"))).extend({
        sources: null,
        _sourceModels: null,
        filters: null,
        _map: null,
        _ignore: null,
        _fetchDeferred: null,
        _ignoredCollections: null,
        setup: function () {
            this.sources = this.setupSources(), this.sources.forEach(s.bind(this, !0)), this._sourceModels = [], this.filters || (this.filters = []), o.call(this), this._ignore = [], this._ignoredCollections = [], c.call(this, this.options.limit, !0)
        },
        setupSources: function () {},
        fetch: function (t) {
            var i, s, o, r, a;
            return t || (t = {}), s = this.options.limit, r = this.length, o = this._fetchDeferred, o && !t.internalFetch ? this._fetchDeferred : (o || (o = this._fetchDeferred = $.Deferred().always(function () {
                this._fetchDeferred = null
            }.bind(this)), o.originalLimit = s), c.call(this, s, t.silent) || (i = n.call(this)), i ? (t.add = !! this.length, a = this, i.fetch(t).fail(function () {
                a.sources.indexOf(i) === a.sources.length - 1 ? o.reject() : p.call(a, i)
            }).always(function () {
                if ("rejected" !== o.state()) {
                    var n, l = s - (a.length - r);
                    0 >= l ? (a.options.limit = o.originalLimit, i.setLimit(o.originalLimit), o.resolve()) : (a.options.limit = l, n = (y || (y = e("underscore"))).clone(t), n.internalFetch = !0, delete n.url, a.fetch(n))
                }
            }), o) : o.resolve({}))
        },
        extractModel: null,
        blacklist: function (e) {
            m.call(this, e, !1)
        },
        unblacklist: function (e) {
            m.call(this, e, !0)
        },
        remove: function (t, i) {
            var n = !i || void 0 === i._propagateToSource || i._propagateToSource;
            return n ? (Array.isArray(t) || (t = [t]), t.forEach(function (e) {
                var t = h.call(this, this.indexOf(e));
                t && t.source.remove(t.model)
            }, this)) : (x || (x = e("lib/collection"))).prototype.remove.call(this, t, (y || (y = e("underscore"))).defaults({
                _propagateToSource: !1
            }, i)), this
        },
        isFullyPopulated: function () {
            return !n.call(this)
        }
    }, {
        onCleanup: function (e) {
            for (var t; t = e.sources.pop();) t.release(), s.call(e, !1, t);
            this._sourceModels = this._map = null
        }
    })
}),
define("collections/spotlight", [], function (e, t, i) {
    var n, s, o, r, a, l, u = 5;
    n = i.exports = (a || (a = e("collections/user-items"))).extend(o || (o = e("lib/mixins/editable-object")), r || (r = e("lib/mixins/sortable-object")), {
        isEdgeBaseUrl: !0,
        defaults: {
            type: "spotlight"
        },
        model: l || (l = e("models/user-stream-item")),
        add: function () {
            return (a || (a = e("collections/user-items"))).prototype.add.apply(this, arguments), this.length > u && this.remove(this.models.slice(u)), this
        },
        parse: function (e) {
            return e.collection.slice(0, u).map(function (e) {
                var t = "playlist" === e.kind;
                return {
                    type: t ? "playlist_spotlight" : "track_spotlight",
                    created_at: e.created_at,
                    track: t ? null : e,
                    playlist: t ? e : null
                }
            })
        },
        getMaxItemCount: function () {
            return u
        },
        getCurrentOrder: function () {
            return this.map(function (e) {
                return (e.get("playlist") || e.get("track")).id
            })
        },
        reorder: function (e) {
            var t = this.comparator;
            this.comparator = function (t) {
                return e.indexOf(t.audible.id)
            }, this.sort({
                silent: !0
            }), this.comparator = t
        },
        resetOrder: function () {
            return this.fetch()
        },
        saveOrder: function () {
            return this.save()
        },
        save: function () {
            var t = this.map(function (e) {
                var t = e.audible;
                return {
                    id: t.id,
                    kind: t.get("kind")
                }
            });
            return $.ajax((s || (s = e("underscore"))).result(this, "baseUrl"), {
                type: "PUT",
                data: JSON.stringify({
                    spotlight: t
                }),
                dataType: "json",
                contentType: "application/json"
            })
        }
    })
}),
define("lib/constraints/constraint", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        message: "",
        state: (r || (r = e("lib/constraints/constraint-states"))).UNKNOWN,
        _lastError: null,
        _lastResult: null,
        _form: null,
        initialize: function (t, i) {
            (s || (s = e("underscore"))).extend(this, t), this._form = i
        },
        reset: function () {
            this.state = (r || (r = e("lib/constraints/constraint-states"))).UNKNOWN, this._lastResult && "pending" === this._lastResult.state() && this._lastResult.reject(), this._lastResult = null
        },
        result: function (t, i) {
            return this.state = i ? (r || (r = e("lib/constraints/constraint-states"))).VALID : (r || (r = e("lib/constraints/constraint-states"))).INVALID, this._lastError = i ? null : this.getMessage(), t.resolve({
                success: i,
                message: this._lastError
            })
        },
        getLastError: function () {
            return this._lastError
        },
        around: {
            validate: function (t) {
                return this.state === (r || (r = e("lib/constraints/constraint-states"))).UNKNOWN && (this._lastResult = t.apply(this, Array.prototype.slice.call(arguments, 1))), this._lastResult
            }
        },
        defaults: {
            check: $.noop,
            getMessage: function () {
                return this.message ? this.message.replace(/\{([^}]+)\}/g, function (e, t) {
                    return this[t] || e
                }.bind(this)) : ""
            }
        }
    })
}),
define("lib/views/loading", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/view"))).extend({
        css: e("lib/views/loading.css"),
        className: "loading",
        defaults: {
            size: "regular",
            dark: !1
        },
        setup: function () {
            this.$el.addClass(this.options.size), this.options.dark && this.$el.addClass("dark")
        },
        template: function () {
            return ""
        }
    })
}),
define("lib/mixins/views/comment-form", [], function (e, t, i) {
    function n(e) {
        this.setRecipient(e), this.focus()
    }
    var s, o, r, a, l, u, c, d, h, p = /^\s*@([\w\-]+)[^\w\-]/;
    h = {
        REPLY: "Write a reply ...",
        COMMENT: "Write a comment ..."
    }, s = i.exports = new(d || (d = e("lib/mixin")))({
        requires: ["postComment"],
        override: {
            template: e("views/comments/comment-form.tmpl"),
            css: e("views/comments/comment-form.css"),
            className: "commentForm sc-media commentForm__transition"
        },
        applyTo: function (t) {
            t.events = (o || (o = e("underscore"))).extend(t.events || {}, {
                keydown: "onKeydown",
                "keyup    .commentForm__input": "onInputKeyup",
                "focus    .commentForm__input": "onInputFocus",
                "blur     .commentForm__input": "onInputBlur",
                "click    .commentForm__recipient": "onRecipientClick"
            }), t.element2selector = (o || (o = e("underscore"))).extend(t.element2selector || {}, {
                input: ".commentForm__input",
                recipient: ".commentForm__recipient"
            }), t.states = (o || (o = e("underscore"))).extend(t.states || {}, {
                active: "active",
                recipientActive: "recipientActive"
            }), t.defaults = (o || (o = e("underscore"))).extend(t.defaults || {}, {
                size: "large"
            })
        },
        after: {
            setup: function () {
                this.$el.addClass(this.options.size), (l || (l = e("event-bus"))).on("connect:hasUserData", this.onUserData, this), this.model.on("change:recipient", n, this)
            },
            dispose: function () {
                (l || (l = e("event-bus"))).off("connect:hasUserData", this.onUserData, this), this.model.off("change:recipient", n, this)
            },
            onInputFocus: function () {
                (l || (l = e("event-bus"))).trigger((u || (u = e("views/comments/comment-form-events"))).FOCUSED, this), this.toggleState("active", !0)
            },
            onInputBlur: function () {
                this.toggleState("active", !1)
            }
        },
        before: {
            cancelInput: function () {
                this.trigger((u || (u = e("views/comments/comment-form-events"))).CANCELED, this, this.options.timestamp), (l || (l = e("event-bus"))).trigger((u || (u = e("views/comments/comment-form-events"))).CANCELED, this)
            }
        },
        around: {
            getTemplateData: function (t, i) {
                var n = (o || (o = e("underscore"))).extend({
                    is_visible: !0,
                    is_large: !0,
                    me: (r || (r = e("config"))).get("me").toJSON(),
                    input_title: this.getPlaceholderText()
                }, i);
                return t(n) || n
            }
        },
        defaults: {
            onInputBlur: $.noop,
            onInputFocus: $.noop,
            cancelInput: $.noop
        },
        setRecipient: function (e) {
            var t = this.getElement("recipient"),
                i = this.getElement("input"),
                n = !(!e || !e.length),
                s = n ? h.REPLY : h.COMMENT;
            e = n ? "@" + e : "", i.attr({
                placeholder: s,
                title: s
            }), t.text(e).toggle(n), i.css({
                paddingLeft: n ? t.outerWidth() : ""
            })
        },
        getRecipient: function () {
            return this.getElement("recipient").text().trim()
        },
        extractRecipient: function (e) {
            var t = p.exec(e);
            return t && t[1]
        },
        removeRecipientText: function (e) {
            return e.replace(p, "")
        },
        getCombinedBody: function () {
            var e = this.getRecipient();
            return (e ? e + ": " : "") + this.getCommentBody()
        },
        getPlaceholderText: function () {
            return h.COMMENT
        },
        isEmpty: function () {
            return this.disposed || !this.getCommentBody().length
        },
        getCommentBody: function () {
            return (this.getElement("input").val() || "").trim()
        },
        clear: function () {
            this.getElement("input").val("")
        },
        focus: function () {
            this.getElement("input").focus()
        },
        onSubmit: function () {
            this.isEmpty() || (this._isPostingComment = !0, (a || (a = e("lib/connect"))).login().done(this.postComment.bind(this, this.options.timestamp)))
        },
        onUserData: function () {
            this._isPostingComment || this.rerender()
        },
        onRecipientClick: function (e) {
            e.preventDefault()
        },
        onInputKeyup: function () {
            if ("" === this.getRecipient()) {
                var e = this.getElement("input"),
                    t = this.extractRecipient(e.val());
                t && (this.setRecipient(t), e.val(this.removeRecipientText(e.val())).focus())
            }
        },
        onKeydown: function (t) {
            switch (t.keyCode) {
            case (c || (c = e("lib/keys"))).BACKSPACE:
                this.onBackspace(t);
                break;
            case (c || (c = e("lib/keys"))).ENTER:
                this.onSubmit(), t.stopPropagation();
                break;
            case (c || (c = e("lib/keys"))).ESC:
                this.getElement("input").trigger("blur", !0), this.cancelInput()
            }
        },
        onBackspace: function (e) {
            var t = this.getElement("input")[0];
            0 === t.selectionStart && 0 === t.selectionEnd && e.target === t && "" !== this.getRecipient() && (this.getState("recipientActive") && this.setRecipient(), this.toggleState("recipientActive"), e.preventDefault(), e.stopPropagation())
        }
    })
}),
define("lib/mixins/views/timed-comments", [], function (e, t, i) {
    var n, s, o, r, a, l, u = $.noop;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        stateMachine: null,
        _stateHandlers: null,
        before: {
            setup: function () {
                this._stateHandlers = {}, this.sound = this.addDataSource(new(r || (r = e("models/sound")))({
                    id: this.options.sound_id,
                    resource_id: this.options.resource_id
                }), {
                    requiredAttributes: ["duration"]
                })
            }
        },
        after: {
            setup: function () {
                var t = this.sound.get("secret_token");
                this.stateMachine = new(a || (a = e("lib/timed-comments-state-machine")))(this.options.sound_id, this.options.resource_id, t), this.onState((l || (l = e("lib/timed-comments-states"))).INITIAL, this.onInitialState).onState((l || (l = e("lib/timed-comments-states"))).CURRENT_COMMENT, this.onCurrentCommentChange).onState((l || (l = e("lib/timed-comments-states"))).ACTIVE_TIMESTAMP, this.onActiveTimestamp).onState((l || (l = e("lib/timed-comments-states"))).CURRENT_TIMESTAMP, this.onCurrentTimestamp)
            },
            dispose: function () {
                this.sound = null;
                var t = this.stateMachine,
                    i = this;
                (s || (s = e("underscore"))).each(this._stateHandlers, function (e, n) {
                        e.forEach(function (e) {
                            t.off(n, e, i)
                        })
                    }), this._stateHandlers = null, t && t.release()
            }
        },
        getCurrentComment: function () {
            return this.stateMachine.currentComment
        },
        getCurrentCommentTimestamp: function () {
            var e = this.getCurrentComment();
            return e && e.get("timestamp")
        },
        cachedDimensions: function () {
            return this._cachedDimensions || (this._cachedDimensions = this.$el.offset(), this._cachedDimensions.width = this.$el.width(), this._cachedDimensions.height = this.$el.height()), this._cachedDimensions
        },
        resetCachedDimensions: function () {
            this._cachedDimensions = null
        },
        getTimestampByMouseEvent: function (e) {
            return Math.floor((e.clientX - this.cachedDimensions().left) / this.cachedDimensions().width * this.sound.duration())
        },
        getCurrentState: function () {
            return this.stateMachine.currentState
        },
        goToState: function () {
            var e = this.stateMachine;
            e.goToState.apply(e, arguments)
        },
        interacting: function (e) {
            this.stateMachine.interactingWithComments = e
        },
        onState: function (e, t) {
            return this._stateHandlers[e] = this._stateHandlers[e] || [], this.stateMachine.on(e, t, this), this._stateHandlers[e].push(t), this
        },
        isActiveTimestampState: function () {
            return !!this.stateMachine.activeTimestamp && this.getCurrentState() === (l || (l = e("lib/timed-comments-states"))).ACTIVE_TIMESTAMP
        },
        defaults: {
            onInitialState: u,
            onActiveTimestamp: u,
            onCurrentTimestamp: u,
            onCurrentCommentChange: u
        }
    })
}),
define("collections/comments", [], function (e, t, i) {
    function n(t) {
        (r || (r = e("lib/action-controller")))[t]("comment:target:sound:" + this.options.sound_id, s, this)
    }

    function s(e) {
        e.state && -1 === this.indexOf(e.object) && this.onCommentCreated(e.object)
    }
    var o, r, a, l, u;
    o = i.exports = (a || (a = e("lib/collection"))).extend({
        model: l || (l = e("models/comment")),
        defaults: {
            sound_id: null,
            secret_token: null
        },
        soundDuration: null,
        setup: function () {
            var t = new(u || (u = e("models/sound")))({
                id: this.options.sound_id
            });
            0 === t.get("comment_count") && (this.lastFetchTime = Date.now()), this.options.secret_token = t.get("secret_token"), this.soundDuration = t.duration(), t.release(), n.call(this, "on")
        },
        dispose: function () {
            n.call(this, "off")
        },
        baseUrl: function () {
            return ["tracks", this.options.sound_id, "comments"].join("/")
        },
        parse: function (e) {
            var t = /^http:/;
            return e.collection.map(function (e) {
                return e.timestamp = this.normalizeTimestamp(e.timestamp), t.test(e.user.avatar_url) && (e.user.avatar_url = e.user.avatar_url.replace(t, "https:")), e
            }, this)
        },
        normalizeTimestamp: function (t) {
            return (t > this.soundDuration || 0 > t) && (t = (l || (l = e("models/comment"))).EMPTY_TIMESTAMP), t
        },
        onCommentCreated: function (e) {
            this.add(e, {
                at: 0
            })
        }
    }, {
        hashFn: function (e, t) {
            return t && t.sound_id || null
        }
    })
}),
define("models/conversation-message", [], function (e, t, i) {
    function n() {
        this._messageSentAt = new Date(this.get("sent_at"))
    }

    function s() {
        var t = this.getPossibleAudibleLinks();
        t && (u || (u = e("lib/helpers/sc-links-helper"))).getAudibleModels(t).done(function (e) {
            e.forEach(function (e) {
                e && o.call(this, e.audible, e.link)
            }, this), this.trigger("audibleFinishedResolving")
        }.bind(this))
    }

    function o(t, i) {
        var n = (d || (d = e("lib/url"))).parse(t.getShareURL()).path,
            s = {
                link: null,
                model: t
            }; - 1 !== i.indexOf(n) && (s.link = i, this.addSubmodel(s.model), r.call(this, s))
    }

    function r(e) {
        var t = this.get("audibleInformation");
        t.push(e), this.set("audibleInformation", t), this.trigger("audibleInformationUpdated", {
            audibleInformation: e,
            timestamp: this.sentAt()
        })
    }
    var a, l, u, c, d;
    a = i.exports = (l || (l = e("lib/model"))).extend({
        resource_type: "conversation_message",
        _messageSentAt: null,
        getSenderId: function () {
            var t = this.get("sender_urn");
            return t ? (c || (c = e("lib/helpers/urn-helper"))).getAsAttributes(t).id : null
        },
        setup: function () {
            this.set("audibleInformation", []), n.call(this)
        },
        sentAt: function () {
            return this._messageSentAt
        },
        fetchAudibles: function () {
            s.call(this)
        },
        getAudible: function () {
            var e = this.get("audibleInformation");
            return e && e[0] && e[0].model
        },
        hasDataForView: function () {
            return !0
        },
        getPossibleAudibleLinks: function () {
            var t = this.get("content") ? this.get("content") : "";
            return t.match((u || (u = e("lib/helpers/sc-links-helper"))).scLinksRegexGlobal)
        },
        isFromMissingUser: function () {
            return "missing_user" === this.get("sender_type")
        }
    }, {
        hashFn: function (e) {
            return e.id || [e.conversation_id, e.sent_at].join("_")
        }
    })
}),
define("lib/helpers/sc-links-helper", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d, h, p = /soundcloud\.com\/[a-zA-Z0-9_\/?=#&%-]+/g,
        f = /\b(?:(?:https?:\/\/)?(?:www\.|m\.)?soundcloud\.(?:com|dev))\/?/i,
        g = /^(?:(?:ht|f)tps?:\/\/|mailto:)/i,
        m = "accounts activate activity admin android announcements api apps artworks assets comments community-guidelines connect customize creativecommons creator creators dashboard dropbox emails errors events explore facebook faqs favorites feedbacks feeds for forums genres gifts google_plus groups guestlist help hot invite imprint iphone ipad ipod jobs join-us latest login logout mac me messages mobile music newsletters notifications oauth oauth2 orders oembed pages partners people player playlists posts press pro press_release search session sets settings signup sitemap sound sounds stats stream subscription terms-of-use tour tracks turn_off_notifications tags upload users videos waveform welcome widgets widget.xml widget widget.json you campaigns contacts discover fans faq join-us logged_exceptions manifest.webapp robots topics",
        v = [],
        b = [];
    h = (c || (c = e("vendor/usertext/usertext"))).withDefaults({
        paragraphs: !1,
        whitelist: [],
        externalLinks: !1
    }), (l || (l = e("config/routes"))).forEach(function (e) {
        b.unshift(e)
    }), n = i.exports = {
        getReservedKeywords: function () {
            return v.length || (v = m.split(" ")), v
        },
        updateSCLinks: function (t, i) {
            return i && i.usertext && (t = (c || (c = e("vendor/usertext/usertext")))(t, i)), i && i.usertextOneline && (t = h(t, i)), t = $("<div>").html(t), t.find("a").each(function (t, i) {
                var o, a, l, u, c, h = i.getAttribute("href"),
                    p = $(i);
                if (!g.test(h) && (c = (d || (d = e("lib/url"))).parse(h), c.path && (l = (s || (s = e("underscore"))).find(b, function (e) {
                    return e.route.test(i.pathname.slice(1))
                }))))
                    if ("listen" === l.name) o = c.path.split("/").slice(1), p.text((r || (r = e("lib/helpers/lang-helper"))).capitalize(o[0]) + " â€“ " + (r || (r = e("lib/helpers/lang-helper"))).capitalize(o[1]));
                    else if ("user" === l.name) {
                    if (a = c.path.split("/")[1], n.getReservedKeywords().indexOf(a) > -1) return;
                    if (p.addClass("g-link-user"), u = i.previousSibling, u && 3 === u.nodeType && /@$/.test(u.textContent)) return;
                    i.parentNode.insertBefore(document.createTextNode("@"), i), p.text(a)
                }
            }), t.html()
        },
        scLinksRegexGlobal: p,
        soundcloudUrlRegex: f,
        getAudibleModels: function (t) {
            var i, n = this.filterAudibleLinks(t),
                o = $.Deferred();
            return i = n.map(function (t) {
                return "listen" === t.info.name ? (u || (u = e("models/sound"))).resolve.apply(u || (u = e("models/sound")), t.info.params) : (a || (a = e("models/playlist"))).resolve.apply(a || (a = e("models/playlist")), t.info.params)
            }), $.whenAll(i).always(function () {
                var t = (s || (s = e("underscore"))).map(arguments, function (t, i) {
                    var s = t[0];
                    return s instanceof(a || (a = e("models/playlist"))) || s instanceof(u || (u = e("models/sound"))) ? {
                        audible: s,
                        link: n[i].link
                    } : null
                });
                o.resolve(t)
            }), o
        },
        filterAudibleLinks: function (t) {
            var i = (o || (o = e("config"))).get("router"),
                n = ["listen", "playlist"];
            return (s || (s = e("underscore"))).reduce(t, function (e, t) {
                var s = i.getUrlInfo(t);
                return s && n.indexOf(s.name) > -1 && e.push({
                    info: s,
                    link: t
                }), e
            }, [])
        }
    }
}),
define("lib/mixins/views/simple-form", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        defaults: {
            tagName: "form",
            formSelector: null,
            formId: null,
            submit: function (e) {
                e.preventDefault(), this.onSubmit(this.getFormElement()[0].elements), this.bubble("simple-form:submit")
            },
            reset: function (e) {
                e.preventDefault(), this.onReset(), this.bubble("simple-form:reset")
            },
            getFormElement: function () {
                return this.formSelector ? this.$(this.formSelector) : this.$el
            },
            onSubmit: $.noop,
            onReset: $.noop
        },
        applyTo: function (t) {
            var i = {}, n = this.formSelector;
            i[["reset.simple-form", n].join(" ").trim()] = "reset", i[["submit.simple-form", n].join(" ").trim()] = "submit", t.events = (s || (s = e("underscore"))).defaults(i, t.events)
        },
        before: {
            setup: function () {
                this.formId = (s || (s = e("underscore"))).uniqueId("form-")
            }
        },
        around: {
            getTemplateData: function (e, t) {
                return t = e(t) || t, t.form_id = this.formId, t
            }
        }
    })
}),
define("lib/mixins/views/combo-box-content", [], function (e, t, i) {
    function n(e) {
        var t = e ? "on" : "off";
        e && (this._handlers = {
            mousedown: s.bind(this),
            mouseover: o.bind(this)
        }), this.$el[t](this._handlers, this.itemSelector)
    }

    function s(e) {
        e.preventDefault();
        var t = this.getElement("items").index($(e.currentTarget));
        this.selectItem(t)
    }

    function o(e) {
        var t = this.getElement("items").index($(e.currentTarget));
        t = this.highlightItem(t), this.trigger("itemOver", t)
    }

    function r() {
        this.$el.addClass("stretch"), (l || (l = e("underscore"))).delay(function () {
            this.$el.removeClass("stretch")
        }.bind(this), 200)
    }
    var a, l, u, c, d = "combox-box-content";
    a = i.exports = new(u || (u = e("lib/mixin")))({
        defaults: {
            itemSelector: "",
            highlightClassName: "selected",
            onItemHighlighted: $.noop,
            onItemSelected: $.noop,
            maxItemDisplay: 10
        },
        highlightItem: function (e) {
            var t = this.getElement("items"),
                i = e >= t.length;
            return e = Math.min(e, t.length - 1), this.highlightedItem && this.highlightedItem.removeClass(this.highlightClassName), 0 > e ? e : (this.highlightedItem = t.eq(e).addClass(this.highlightClassName), this.onItemHighlighted(e, this.highlightedItem), i && r.call(this), e)
        },
        selectItem: function (e) {
            var t, i, n;
            return 0 > e ? !1 : (i = this.getElement("items"), e = Math.min(e, i.length - 1), n = i.eq(e), n.length ? (t = this.onItemSelected(e, n), this.trigger("itemClick", t), !0) : !1)
        },
        getItemCount: function () {
            return this.getElement("items").length
        },
        applyTo: function (t) {
            this.before(t, {
                setup: function () {
                    n.call(this, !0), this.$el.addClass(d)
                },
                dispose: function () {
                    n.call(this, !1)
                }
            }), t.element2selector = (l || (l = e("underscore"))).extend({}, t.element2selector, {
                items: t.itemSelector
            }), t.css ? (Array.isArray(t.css) || (t.css = [t.css]), t.css.push(c || (c = e("lib/mixins/views/combo-box-content.css")))) : t.css = c || (c = e("lib/mixins/views/combo-box-content.css")), t.attributes = (l || (l = e("underscore"))).extend({}, t.attributes, {
                role: "listbox"
            }), t.defaults = (l || (l = e("underscore"))).extend({}, t.defaults, {
                maxDisplay: t.maxItemDisplay
            })
        }
    })
}),
define("models/shortcut", [], function (e, t, i) {
    var n, s, o;
    o = {
        like: "title",
        following: "username",
        group: "name"
    }, n = i.exports = (s || (s = e("lib/model"))).extend({
        resource_type: "shortcut",
        url: null,
        getTitle: function () {
            var e = o[this.get("kind")];
            return this.get(e)
        },
        getArtworkUrl: function () {
            var e = this.get("following" === this.get("kind") ? "avatar_url" : "artwork_url");
            return e || "https://a-v2.sndcdn.com/assets/images/default/cloudx40-1ec56ce9.png"
        },
        getPermalink: function () {
            return this.get("permalink_url").replace(/^https?:.+?\w\//, "/")
        }
    }, {
        hashFn: function (e) {
            return e.kind ? [e.kind, e.id].join("_") : e.id
        }
    })
}),
define("lib/hirsch", [], function (e, t, i) {
    function n(e, t, i) {
        var n, s = [],
            o = [
                [],
                []
            ],
            h = [
                [],
                []
            ],
            p = [];
        return i || (i = a), r(0, e.length, 0, t.length, e, t, s, o, h, i), n = 0, s.forEach(function (e) {
            switch (e) {
            case u:
            case c:
                p.push(!1, n);
                break;
            case l:
                ++n
            }
        }), n = 0, s.forEach(function (e) {
            switch (e) {
            case d:
            case c:
                p.push(!0, n);
            case l:
                ++n
            }
        }), p
    }

    function s(e, t, i, n, s, o, r, a) {
        var l, u, c;
        for (s[e % 2][i] = 0, u = i + 1; n >= u; u++) s[e % 2][u] = s[e % 2][u - 1] + 1;
        for (l = e + 1; t >= l; l++)
            for (s[l % 2][i] = s[(l - 1) % 2][i] + 1, u = i + 1; n >= u; u++) c = s[(l - 1) % 2][u - 1], a(o[l - 1], r[u - 1]) || c++, s[l % 2][u] = Math.min(c, Math.min(s[(l - 1) % 2][u] + 1, s[l % 2][u - 1] + 1))
    }

    function o(e, t, i, n, s, o, r, a) {
        var l, u, c;
        for (s[t % 2][n] = 0, u = n - 1; u >= i; u--) s[t % 2][u] = s[t % 2][u + 1] + 1;
        for (l = t - 1; l >= e; l--)
            for (s[l % 2][n] = s[(l + 1) % 2][n] + 1, u = n - 1; u >= i; u--) c = s[(l + 1) % 2][u + 1], a(o[l], r[u]) || c++, s[l % 2][u] = Math.min(c, Math.min(s[(l + 1) % 2][u] + 1, s[l % 2][u + 1] + 1))
    }

    function r(e, t, i, n, a, h, p, f, g, m) {
        var v, b, _, y, w, x, k;
        if (e >= t)
            for (v = i; n > v; v++) p.push(d);
        else if (i >= n)
            for (v = e; t > v; v++) p.push(u);
        else if (t - 1 === e) {
            for (b = a[e], _ = i, v = i + 1; n > v; v++) m(h[v], b) && (_ = v);
            for (v = i; n > v; v++) p.push(v === _ ? m(h[v], b) ? l : c : d)
        } else {
            for (y = Math.floor((e + t) / 2), s(e, y, i, n, f, a, h, m), o(y, t, i, n, g, a, h, m), w = i, x = 1 / 0, v = i; n >= v; v++) k = f[y % 2][v] + g[y % 2][v], x > k && (x = k, w = v);
            r(e, y, i, w, a, h, p, f, g, m), r(y, t, w, n, a, h, p, f, g, m)
        }
    }

    function a(e, t) {
        return e === t
    }
    var l = 0,
        u = 1,
        c = 2,
        d = 3;
    i.exports = n
}),
define("lib/helpers/premium-helper", [], function (e, t, i) {
    function n(t) {
        return (o || (o = e("underscore"))).first(t.subscriptions)
    }
    var s, o, r, a, l;
    s = i.exports = {
        productIds: {
            PRO: "creator-subscription-pro",
            UNLIMITED: "creator-subscription-pro-unlimited"
        },
        getIcon: function (t, i) {
            var s = n(t),
                a = s && s.product.name;
            return (o || (o = e("underscore"))).isEmpty(s) ? "" : (i = (o || (o = e("underscore"))).defaults({
                prefix: "sc-status-icon",
                title: a || "",
                type: "creator"
            }, i), (r || (r = e("lib/helpers/icon-helper"))).render(i))
        },
        getIconLink: function (t, i) {
            var s, o, r, a = this.getIcon(t, i);
            return a ? (r = (l || (l = e("router"))).getRoute("premium", null, null, i && i.referral), s = n(t), o = s && s.product.name, '<a href="' + r + '" title="' + o + ' user">' + a + "</a>") : a
        },
        getNextLevelProductId: function (e) {
            var t = e.getPlan();
            return "free" === t || "lite" === t ? this.productIds.PRO : this.productIds.UNLIMITED
        },
        getQuotaInfo: function (t, i) {
            var n, s, o = t.getUploadSecondsLeft(),
                r = t.getUploadSecondsUsed(),
                l = t.getUploadMinutesLeft(),
                u = t.getUploadMinutesUsed(),
                c = t.hasProPlanLevel() ? "Pro plan" : "free",
                d = t.isOverQuota();
            return t.hasUnlimitedUpload() ? !1 : (n = Math.round((o + r) / 60), s = n / 60, i ? {
                minutesLeft: l,
                minutesUsed: u,
                limitInMinutes: n,
                limitInHours: s,
                isOverQuota: d
            } : 0 > o ? "You're over your " + c + " " + s + " hour limit by <strong>" + -l + "</strong> " + (a || (a = e("lib/helpers/lang-helper"))).plural(l, "minute") + "." : "You have " + l + " " + (a || (a = e("lib/helpers/lang-helper"))).plural(l, "minute") + " left.")
        }
    }
}),
define("lib/mixins/views/audible-control", [], function (e, t, i) {
    function n(t, i) {
        var n, s = (o || (o = e("underscore"))).extend(i, {
                audible: t
            });
        return n = this.bubble ? this.bubble("requestPlayContext", s) : {
            data: s
        }
    }
    var s, o, r, a;
    s = i.exports = new(a || (a = e("lib/mixin")))({
        toggleAudible: function (e, t) {
            this[e.isPlaying() ? "pauseAudible" : "playAudible"](e, t)
        },
        playAudible: function (t, i) {
            (r || (r = e("lib/play-manager"))).saveLayout(), (r || (r = e("lib/play-manager"))).play(t, this.getPlayContext(t, i))
        },
        pauseAudible: function (t, i) {
            (r || (r = e("lib/play-manager"))).pause(t, this.getPlayContext(t, i))
        },
        getPlayContext: function (e, t) {
            var i = n.call(this, e, t);
            return i.data
        },
        toggleSource: function (t, i) {
            var n = (r || (r = e("lib/play-manager"))).getCurrentSound();
            (r || (r = e("lib/play-manager"))).source === t && (r || (r = e("lib/play-manager"))).sourceCursor > -1 && n && n.isPlaying() ? (r || (r = e("lib/play-manager"))).pauseCurrent(i) : ((r || (r = e("lib/play-manager"))).saveLayout(), (r || (r = e("lib/play-manager"))).playSource(t, i))
        }
    })
}),
define("lib/views/user-text", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (r || (r = e("lib/view"))).extend(s || (s = e("lib/mixins/views/opens-user-mention-dialog")), {
        defaults: {
            dialogSelector: ".g-link-user"
        },
        template: function (t) {
            return (o || (o = e("lib/helpers/sc-links-helper"))).updateSCLinks(t._options.content, t._options)
        }
    })
}),
define("lib/timed-comments-state-machine", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c = 300,
        d = 3e3,
        h = 1e3,
        n = function () {
            this.setup.apply(this, arguments)
        };
    n.extend = (o || (o = e("lib/backbone"))).Model.extend, (s || (s = e("underscore"))).extend(n.prototype, (o || (o = e("lib/backbone"))).Events, {
        constructor: n,
        currentComment: null,
        activeTimestamp: null,
        currentTimestamp: null,
        commentQuotaTimeout: null,
        commentQuotaExceeded: !0,
        commentIntervalTimeout: null,
        commentIntervalExceeded: !0,
        currentState: (u || (u = e("lib/timed-comments-states"))).INITIAL,
        interactingWithComments: !1,
        setup: function (t, i, n) {
            this.collection = new(r || (r = e("collections/comment-heads")))(null, {
                sound_id: t,
                secret_token: n
            }), this.on((u || (u = e("lib/timed-comments-states"))).INITIAL, this.onInitialState, this).on((u || (u = e("lib/timed-comments-states"))).CURRENT_COMMENT, this.onCurrentComment, this).on((u || (u = e("lib/timed-comments-states"))).CURRENT_TIMESTAMP, this.onCurrentTimestamp, this).on((u || (u = e("lib/timed-comments-states"))).ACTIVE_TIMESTAMP, this.onActiveTimestamp, this), this.sound = new(l || (l = e("models/sound")))({
                id: t,
                resource_id: i
            }), this.sound.on("time", this.onAudioTime, this)
        },
        dispose: function () {
            this.off(), this.sound.off("time", this.onAudioTime, this), this.sound.release(), this.collection.release()
        },
        onInitialState: function () {
            this.activeTimestamp = null, this.currentComment = null, this.currentTimestamp = null
        },
        onCurrentComment: function (e, t) {
            this.activeTimestamp = null, this.currentComment = t, this.currentTimestamp = null
        },
        onCurrentTimestamp: function (e) {
            this.activeTimestamp = null, this.currentComment = null, this.currentTimestamp = e
        },
        onActiveTimestamp: function (e) {
            this.activeTimestamp = e, this.currentComment = null, this.currentTimestamp = null
        },
        goToState: function (e) {
            var t = this.canGoToState.apply(this, arguments);
            return t && (this.currentState = e, this.trigger.apply(this, arguments)), t
        },
        canGoToState: function (t) {
            var i = this.activeTimestamp && this.currentState === (u || (u = e("lib/timed-comments-states"))).ACTIVE_TIMESTAMP;
            switch (t) {
            case (u || (u = e("lib/timed-comments-states"))).CURRENT_TIMESTAMP:
                return !i;
            case (u || (u = e("lib/timed-comments-states"))).CURRENT_COMMENT:
                return this.commentIntervalExceeded && arguments[1] !== this.currentComment && !i;
            case (u || (u = e("lib/timed-comments-states"))).INITIAL:
                return !0;
            case (u || (u = e("lib/timed-comments-states"))).ACTIVE_TIMESTAMP:
                return arguments[1] !== this.activeTimestamp;
            default:
                return !1
            }
        },
        onAudioTime: (s || (s = e("underscore"))).throttle(function (t) {
            if (!this.disposed) {
                var i;
                !this.interactingWithComments && this.sound.isPlaying() && (i = this.collection.getCommentAtTimestamp(t, c), i ? this.goToState((u || (u = e("lib/timed-comments-states"))).CURRENT_COMMENT, t, i) && (clearTimeout(this.commentIntervalTimeout), this.commentIntervalExceeded = !1, setTimeout(function () {
                    this.commentIntervalExceeded = !0
                }.bind(this), h), clearTimeout(this.commentQuotaTimeout), this.commentQuotaExceeded = !1, this.commentQuotaTimeout = setTimeout(function () {
                    this.commentQuotaExceeded = !0, this.onAudioTime()
                }.bind(this), d)) : this.commentQuotaExceeded && this.goToState((u || (u = e("lib/timed-comments-states"))).CURRENT_TIMESTAMP, t))
            }
        }, c)
    }), i.exports = (a || (a = e("lib/single"))).applyTo(n, {
        onCleanup: function (e) {
            e.dispose()
        },
        cleanupInstantly: !0,
        hashFn: function (e) {
            return e
        }
    })
}),
define("collections/instagram-user-images", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (o || (o = e("lib/collection"))).extend({
        model: a || (a = e("models/instagram-image")),
        _fetchRequest: null,
        fetch: function (t) {
            return t = t || {}, this._fetchRequest ? this._fetchRequest : (this._fetchRequest = (r || (r = e("lib/integrations/instagram"))).getUserMedia(this.next_href).done(function (e) {
                var i = e.pagination,
                    n = this.parse(e);
                this.lastFetchTime = Date.now(), this.next_href = i && i.next_url || !1, this[t.add ? "add" : "reset"](n)
            }.bind(this)).always(function () {
                this._fetchRequest = null
            }.bind(this)), this._fetchRequest)
        },
        parse: function (t) {
            return t.data.filter(function (t) {
                var i = "image" === t.type;
                return i && (s || (s = e("underscore"))).each(t.images, function (e) {
                    e.url = e.url.replace(/^https?/, "https")
                }, this), i
            })
        }
    }, {
        hashFn: function () {
            return 1
        }
    })
}),
define("lib/views/lazy-loading-list", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c = 250,
        d = 16e3,
        h = c;
    n = i.exports = (l || (l = e("lib/views/list"))).extend(u || (u = e("lib/mixins/views/throbbing")), {
        listClassName: "lazyLoadingList__list sc-list-nostyle sc-clearfix",
        defaults: {
            preloadAt: 200,
            maxDisplay: 0,
            fullPageList: !0,
            showEndView: !1
        },
        ThrobberView: a || (a = e("lib/views/loading")),
        EndOfListView: o || (o = e("lib/views/end-of-list")),
        _setup: function () {
            this.setup.apply(this, arguments), (s || (s = e("underscore"))).bindAll(this, "afterFetch"), this._lastScrollPosition = 0, this.checkScrollPosition = (s || (s = e("underscore"))).debounce(this.checkScrollPosition.bind(this), 400), this.$el.addClass("lazyLoadingList"), this.collection.on("error", this.onCollectionError, this)
        },
        _dispose: function () {
            this.disposed || (this.collection.off("error", this.onCollectionError, this), (l || (l = e("lib/views/list"))).prototype._dispose.apply(this, arguments))
        },
        renderDecorate: function () {
            (l || (l = e("lib/views/list"))).prototype.renderDecorate.call(this), this.hasEnough() ? this.appendEndOfListView() : (this.addThrobber(), this.toggleScrollListener(!0), this.checkScrollPosition())
        },
        teardown: function () {
            this.toggleScrollListener(!1)
        },
        onCollectionError: function () {
            this.removeLoader(), this.removeThrobber(), this.appendError()
        },
        onCollectionReset: function () {
            this.hasEnough() && this.removeThrobber(), this.rerender()
        },
        appendEndOfListView: function () {
            var e, t = this.subviews.endOfList;
            !t && this.collection.length && this.options.showEndView && (e = this.addSubview(new this.EndOfListView, "endOfList").render(), this.appendDOMElement(e.el))
        },
        appendError: function () {
            if (!this.disposed) {
                var t = this.addSubview(new(r || (r = e("views/error/inline-error")))({
                    button_label: "Retry",
                    tagName: "div"
                }));
                t.on("button_click", function () {
                    t._dispose(), this.removeSubview(t), this.fetchNextPage({
                        delay: h
                    }), h = Math.min(4 * h, d)
                }.bind(this)), t.render(), this.appendDOMElement(t.el)
            }
        },
        addThrobber: function () {
            var e = this.subviews.throbber;
            return this.subviews.throbber || (e = this.addSubview(new this.ThrobberView, "throbber"), e.render()), this.appendDOMElement(e.el), e
        },
        removeThrobber: function () {
            if (!this.disposed) {
                var e = this.subviews.throbber;
                e && (e._dispose(), this.removeSubview(e))
            }
        },
        toggleScrollListener: function (e) {
            var t = e ? "on" : "off",
                i = this.getScrollableContainer();
            i && i[t]("scroll", this.checkScrollPosition)
        },
        getScrollableContainer: function () {
            return this.options.fullPageList ? $(document) : this.$el
        },
        scrollContainerToPositionOrBottom: function (e) {
            var t = this.getScrollableContainer();
            t.scrollTop(e || t.height())
        },
        checkScrollPosition: function () {
            if (!this.disposed) {
                var e, t, i, n = !1,
                    s = this.getListElement(),
                    o = this.getScrollableContainer(),
                    r = this.options.preloadAt || 0,
                    a = $(document).scrollTop(),
                    l = this.options.fullPageList,
                    u = o.scrollTop() + (l ? window.innerHeight : 0);
                l && this.options.inverted && this._lastScrollPosition ? n = r >= a : l && u > this._lastScrollPosition ? (e = s.children().last(), t = e.length ? e.offset() : {
                    top: 0
                }, i = t && t.top || 0, n = u + r > i) : l || (n = s.height() - o.height() - u < r), n && this.fetchNextPage(), this._lastScrollPosition = u
            }
        },
        hasEnough: function () {
            var e = this.options.maxDisplay,
                t = this.collection;
            return t.isFullyPopulated() || e > 0 && t.length >= e
        },
        fetchNextPage: function (t) {
            if (this.hasEnough()) return void this.removeThrobber();
            this.toggleScrollListener(!1), this.addThrobber();
            var i = function () {
                this.collection.fetch({
                    add: this.collection.length > 0
                }).done(this.afterFetch)
            }.bind(this);
            t && t.delay ? this.addDeferred((s || (s = e("underscore"))).delay(i, t.delay)) : i()
        },
        afterFetch: function () {
            this.disposed || (h = c, this.hasEnough() ? (this.removeThrobber(), this.appendEndOfListView()) : (this.toggleScrollListener(!0), this.checkScrollPosition(), this.addThrobber()))
        }
    })
}),
define("lib/mixins/views/scrollable-list", [], function (e, t, i) {
    function n(e) {
        return !!e.checkScrollPosition
    }

    function s() {
        (a || (a = e("lib/support"))).MutationObserver && this.onDOMChanges()
    }
    var o, r, a, l, u, c;
    o = i.exports = new(r || (r = e("lib/mixin")))({
        applyTo: function (t) {
            (l || (l = e("lib/mixins/views/scrollable-view"))).applyTo(t), n(t) && (this.around(t, c), this.override(t, u))
        },
        defaults: {
            getScrollableWrapper: function () {
                var e = this.createListElement();
                return e && e.parent()
            }
        },
        around: {
            createListElement: function (e) {
                if (this._listElement) return this._listElement;
                var t = e();
                return t && t.wrap("<div></div>"), t
            }
        },
        after: {
            renderDecorate: function () {
                var e = this.getScrollableWrapper();
                e && this.setupScrollable(this.getListContainer(), e, {
                    hScroll: !1
                })
            },
            onAdd: function () {
                s.call(this)
            },
            onRemove: function () {
                s.call(this)
            }
        }
    }), u = {
        addThrobber: function () {
            var e = this.subviews.throbber;
            return e || (e = this.addSubview(new this.ThrobberView, "throbber").render()), this.appendDOMElement(e.el), e
        },
        removeThrobber: function () {
            var e = this.subviews.throbber;
            e && (e._dispose(), this.removeSubview(e))
        },
        appendDOMElement: function (e) {
            var t = this.getScrollableWrapper() || this.$el;
            t[this.options.inverted ? "prepend" : "append"](e)
        }
    }, c = {
        getScrollableContainer: function (e) {
            return this.options.fullPageList ? e() : this._listElement && this._listElement.parent()
        }
    }
}),
define("lib/mixins/views/has-queue-source", [], function (e, t, i) {
    function n(t) {
        var i = t.data,
            n = i.audible,
            s = this.getQueueSource();
        return s && (a || (a = e("lib/play-manager"))).indexOfSoundInSource(n.getCurrentSound(), s) > -1
    }

    function s() {
        for (var e, t = this; t;) {
            if (e = t.options.playQueuePriority, null != e) return e;
            t = t._parentView
        }
        return 0
    }
    var o, r, a, l, u;
    o = i.exports = new(l || (l = e("lib/mixin")))({
        defaults: {
            getQueueSource: function () {
                return this.collection || this.model
            },
            getRestoreUrl: function () {
                return (u || (u = e("lib/url"))).currentPath()
            }
        },
        applyTo: function (t) {
            t.bubbleEvents = (r || (r = e("underscore"))).extend(t.bubbleEvents || {}, {
                requestPlayContext: "onRequestPlayContext"
            })
        },
        onRequestPlayContext: function (t) {
            n.call(this, t) && (t.stopPropagation(), (r || (r = e("underscore"))).extend(t.data, {
                source: this.getQueueSource(),
                restoreUrl: this.getRestoreUrl()
            }))
        },
        after: {
            renderDecorate: function () {
                var t, i = this.getQueueSource();
                i && (t = s.call(this), (a || (a = e("lib/play-manager"))).setInitialSource(i, t, this.getRestoreUrl()))
            },
            teardown: function () {
                var t = this.getQueueSource();
                t && (a || (a = e("lib/play-manager"))).unsetInitialSource(t)
            }
        }
    })
}),
define("lib/mixins/views/opens-user-mention-dialog", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = new(o || (o = e("lib/mixin")))(s || (s = e("lib/mixins/views/opens-dialog")), {
        applyTo: function (e) {
            e.defaults.dialogType = "userBadge"
        },
        defaults: {
            dialogSubviewArgs: function (t) {
                var i = $.Deferred(),
                    n = $(t).text();
                return (r || (r = e("models/user"))).resolve(n).done(function (e) {
                    i.resolve({
                        resource_id: e.id
                    })
                }), i
            }
        }
    })
}),
define("collections/comment-heads", [], function (e, t, i) {
    var n, s, o, r, a, l;
    n = i.exports = (r || (r = e("collections/comments"))).extend({
        baseUrl: function () {
            return (l || (l = e("lib/url"))).stringify({
                path: ["app", "v2", "tracks", this.options.sound_id, "comments"],
                query: {
                    filter_replies: 1,
                    embed_avatars: (a || (a = e("lib/rollouts"))).get("embed_avatars") ? 1 : 0
                }
            })
        },
        getCommentAtTimestamp: function (t, i) {
            return i = (s || (s = e("underscore"))).isNumber(i) ? i : 0, this.find(function (n) {
                var s = n.get("timestamp");
                return 0 === i ? s === t : Math.abs(t - s) <= i && s !== (o || (o = e("models/comment"))).EMPTY_TIMESTAMP
            }) || null
        },
        onCommentCreated: function (e) {
            e.get("replyTo") || this.add(e, {
                at: 0
            })
        }
    }, {
        hashFn: function (e, t) {
            return t && t.sound_id || null
        }
    })
}),
define("collections/suggestions", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (s || (s = e("lib/collection"))).extend({
        model: o || (o = e("models/suggestion")),
        defaults: {
            limit: 10,
            category: null,
            query: null
        },
        baseUrl: function () {
            return (r || (r = e("lib/url"))).stringify({
                path: ["search", "suggest", this.options.category],
                query: {
                    q: this.options.query,
                    highlight_mode: "offsets"
                }
            })
        },
        parse: function (e) {
            return e.suggestions.map(function (e) {
                return e.resource_type = "user" === e.kind.toLowerCase() ? "user" : "sound", e
            })
        }
    }, {
        hashFn: function (e, t) {
            return [t.query, t.category || "all"].join("_")
        }
    })
}),
define("lib/integrations/instagram", [], function (e, t, i) {
    function n(t, i, n) {
        var s = this.getAuthToken(),
            r = /^https?/.test(t),
            a = r ? t : [d, t].join("/");
        return n = n || "GET", r || (i = (o || (o = e("underscore"))).extend(i || {}, {
            access_token: s
        }), a = (u || (u = e("lib/url"))).modify(a, {
            query: i
        })), $.ajax({
            url: a,
            method: n,
            dataType: "jsonp",
            cache: !0
        })
    }
    var s, o, r, a, l, u, c = new(a || (a = e("lib/persistent-store")))("auth"),
        d = "https://api.instagram.com",
        h = "https://instagram.com/oauth/authorize",
        p = "instagram_connect_callback.html",
        f = "instagram_oauth_token",
        g = 150,
        m = 50;
    s = i.exports = {
        getUserMedia: function (e) {
            var t = $.Deferred();
            return this.isConnected() ? n.call(this, e || "v1/users/self/media/recent", {
                count: m
            }).done(t.resolve) : this.connect().fail(t.reject).done(function () {
                this.getUserMedia(e).done(t.resolve).fail(t.reject)
            }.bind(this)), t
        },
        getUser: function () {
            var e = $.Deferred();
            return n.call(this, "v1/users/self").done(function (t) {
                var i = t.meta,
                    n = t.data;
                n ? e.resolve(n) : i && ("OAuthAccessTokenException" === i.error_type ? (c.unset(f), this.connect(e)) : 200 !== i.code && e.reject())
            }.bind(this)), e
        },
        setAuthToken: function (e) {
            c.set(f, e)
        },
        getAuthToken: function () {
            return c.get(f)
        },
        isConnected: function () {
            return !!this.getAuthToken()
        },
        connect: function (t) {
            var i, n = (u || (u = e("lib/url"))).stringify({
                    query: {
                        client_id: (r || (r = e("config"))).get("instagram_client_id"),
                        response_type: "token",
                        redirect_uri: location.protocol + "//" + location.host + "/" + p
                    }
                }, h);
            return t = t || $.Deferred(), s.isConnected() ? s.getUser() : (i = (l || (l = e("lib/helpers/popup-helper"))).centered(n, 640, 500), function o() {
                !i || i.closed ? s.isConnected() ? s.getUser().done(t.resolve).fail(t.reject) : t.reject() : i.closed || setTimeout(o, g)
            }(), t)
        },
        getApiUrl: function () {
            return d
        },
        handleCallback: function (e) {
            var t = e.location.hash,
                i = t && t.split("=")[1];
            i && this.setAuthToken(i)
        }
    }
}),
define("models/instagram-image", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("lib/model"))).extend({
        resource_type: "instagram_image",
        baseUrl: function () {
            return [(s || (s = e("lib/integrations/instagram"))).getApiUrl(), "media", this.id].join("/")
        }
    })
}),
define("lib/views/end-of-list", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/view"))).extend({
        css: e("lib/views/end-of-list.css"),
        className: "paging-eof sc-border-light-top",
        setup: function () {
            this.el.title = "This is the endâ€¦ my only friend, the end."
        },
        template: function () {
            return ""
        }
    })
}),
define("lib/mixins/views/scrollable-view", [], function (e, t, i) {
    function n(t, i) {
        var n, s, r = t[0];
        this.isDOMMonitoringStarted || ((d || (d = e("lib/support"))).MutationObserver ? (s = o(), n = new s(i), n.observe(r, {
            childList: !0,
            subtree: !0
        }), this._observer = n) : (r.addEventListener("DOMNodeRemoved", i), r.addEventListener("DOMNodeInserted", i)), this.isDOMMonitoringStarted = !0)
    }

    function s(t, i) {
        if (t) {
            var n = t[0];
            this.isDOMMonitoringStarted && ((d || (d = e("lib/support"))).MutationObserver ? this._observer && this._observer.disconnect() : (n.removeEventListener("DOMNodeRemoved", i), n.removeEventListener("DOMNodeInserted", i)), this.isDOMMonitoringStarted = !1)
        }
    }

    function o() {
        return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    }
    var r, a, l, u, c, d, h, p, f, g, m = $.noop,
        v = $(document);
    r = i.exports = new(u || (u = e("lib/mixin")))({
        after: {
            teardown: function () {
                this.disposeScrollable()
            }
        },
        scrollpane: null,
        verticalScrollbar: null,
        horizontalScrollbar: null,
        setupScrollable: function (t, i, s) {
            this.whenInserted().done(function () {
                if (this.scrollpane) this.scrollpane.update();
                else {
                    var o = t.attr("style") || "";
                    t.attr("style", o + " overflow: hidden !important;"), this.scrollableContainer = t, this.scrollableContentElement = i, this.scrollpane = new p(t, i, s), this.onDOMChanges = (a || (a = e("underscore"))).debounce(this.onDOMChanges.bind(this), 250), (s.monitorChanges || (d || (d = e("lib/support"))).MutationObserver) && n.call(this, i, this.onDOMChanges)
                }
                this.updateScrollable(!0)
            }.bind(this))
        },
        onDOMChanges: function () {
            this.updateScrollable(!0)
        },
        disposeScrollable: function () {
            this.scrollpane && (this.scrollpane.innerEl.attr("style", ""), delete this.scrollpane), s.call(this, this.scrollableContentElement, this.onDOMChanges), this.destroyVerticalScrollbar(), this.destroyHorizontalScrollbar()
        },
        updateScrollable: function (e) {
            var t, i, n;
            (n = this.scrollpane) && (n.update(), t = n.needHScroll(), !this.horizontalScrollbar && t ? this.horizontalScrollbar = new g(n) : this.horizontalScrollbar && !t && this.destroyHorizontalScrollbar(), this.horizontalScrollbar && (this.horizontalScrollbar.update(), e || this.horizontalScrollbar.show()), i = n.needVScroll(), !this.verticalScrollbar && i ? this.verticalScrollbar = new f(n) : this.verticalScrollbar && !i && this.destroyVerticalScrollbar(), this.verticalScrollbar && (this.verticalScrollbar.update(), e || this.verticalScrollbar.show()))
        },
        destroyVerticalScrollbar: function () {
            this.verticalScrollbar && (this.verticalScrollbar.destroy(), this.verticalScrollbar = null)
        },
        destroyHorizontalScrollbar: function () {
            this.horizontalScrollbar && (this.horizontalScrollbar.destroy(), this.horizontalScrollbar = null)
        }
    }), p = function (t, i, n) {
        this.el = t, this.innerEl = i, this.options = (a || (a = e("underscore"))).defaults(n, this.options), t.addClass("g-scrollable"), n.hScroll && !n.vScroll ? t.addClass("g-scrollable-h") : !n.hScroll && n.vScroll && t.addClass("g-scrollable-v"), i.addClass("g-scrollable-inner"), this.update()
    }, p.prototype = {
        constructor: p,
        el: null,
        innerEl: null,
        options: {
            hScroll: !0,
            vScroll: !0,
            padding: 2,
            monitorChanges: !1
        },
        update: function () {
            var t, i, n, s, o = this.el,
                r = this.innerEl;
            n = r.scrollTop(), r.css({
                height: "auto"
            }), t = Math.min(o.height(), r.height()), r.css(this.options.hScroll ? {
                height: t + (c || (c = e("lib/helpers/scrollbar-helper"))).getScrollbarSize()
            } : {
                "overflow-x": "hidden",
                height: t
            }), r.scrollTop(n), s = r.scrollLeft(), r.css({
                width: "auto"
            }), i = Math.min(o.width(), r.width()), r.css(this.options.vScroll ? {
                width: i + (c || (c = e("lib/helpers/scrollbar-helper"))).getScrollbarSize() + 1
            } : {
                "overflow-y": "hidden",
                width: i
            }), r.scrollLeft(s)
        },
        needVScroll: function () {
            return this.el && this.innerEl && this.options.vScroll ? this.innerEl[0].scrollHeight > this.el.outerHeight() : !1
        },
        needHScroll: function () {
            return this.el && this.innerEl && this.options.hScroll ? this.innerEl[0].scrollWidth > this.el.outerWidth() : !1
        }
    }, h = function (t) {
        this.el = this.buildEl(), this.scrollpane = t, this.scrollpane.el.append(this.el), (a || (a = e("underscore"))).bindAll(this, "onMouseEnter", "onMouseLeave", "onMouseWheel", "onMouseDown", "onScroll"), this.el.on("mousedown", this.onMouseDown).on("mouseenter", this.onMouseEnter), t.innerEl.on("scroll", this.onScroll).on("mouseenter", this.onMouseEnter).on("mouseleave", this.onMouseLeave).on("mousewheel", this.onMouseWheel)
    }, h.prototype = {
        constructor: h,
        el: null,
        scrollpane: null,
        isDragging: !1,
        isHovered: !1,
        isVisible: !1,
        onScroll: function () {
            this.isVisible || (this.show(), this.isHovered || this.isDragging || (this.hiding = setTimeout(this.hide.bind(this), 1500))), this.update()
        },
        show: function () {
            this.isVisible || (this.isVisible = !0, this.update(), this.el.addClass("g-scrollbar-visible"), this.hiding && (clearTimeout(this.hiding), this.hiding = null))
        },
        hide: function () {
            this.isVisible && (this.isVisible = !1, this.el.removeClass("g-scrollbar-visible"))
        },
        destroy: function () {
            this.el.remove()
        },
        onMouseEnter: function () {
            this.isHovered = !0, this.show()
        },
        onMouseLeave: function () {
            this.isHovered = !1, this.isDragging || this.hide()
        },
        onMouseDown: function (e) {
            e.preventDefault(), this.isDragging = !0, this.startPageY = e.pageY - parseInt(this.el.css("top"), 10), this.startPageX = e.pageX - parseInt(this.el.css("left"), 10), document.onselectstart = function () {
                return !1
            };
            var t = this.onMouseMove.bind(this);
            v.on("mousemove", t).on("mouseup", function () {
                this.isDragging = !1, document.onselectstart = null, v.off("mousemove", t), this.isHovered || this.hide()
            }.bind(this))
        },
        update: m,
        buildEl: m,
        onMouseMove: m,
        onMouseWheel: m
    }, g = Class.extend([h.prototype, {
        initialize: function () {
            h.apply(this, arguments)
        },
        minWidth: 30,
        update: function () {
            var e = this.scrollpane.innerEl.get(0),
                t = this.scrollpane.el.width(),
                i = t - 2 * this.scrollpane.options.padding,
                n = i * t / e.scrollWidth,
                s = Math.max(this.minWidth, n),
                o = Math.max(0, s - n);
            this.el.css("height", s).css("top", (s - o) * e.scrollLeft / e.scrollWidth)
        },
        buildEl: function () {
            return $('<div class="g-scrollbar g-scrollbar-horizontal">')
        },
        onMouseMove: function (t) {
            var i, n = t.pageX - this.startPageX,
                s = this.scrollpane.innerEl.get(0),
                o = this.el.width(),
                r = this.scrollpane.el.width() - 2 * this.scrollpane.options.padding;
            i = (l || (l = e("lib/math"))).clamp(n, 0, r - o), s.scrollLeft = (s.scrollWidth - this.scrollpane.el.width()) * i / (r - o)
        },
        onMouseWheel: function (e, t, i) {
            var n = this.scrollpane.innerEl.get(0);
            return 0 > i && 0 === n.scrollLeft || i > 0 && n.scrollLeft + this.scrollpane.el.width() === this.innerEl.scrollWidth ? (e.preventDefault(), !1) : void 0
        }
    }]), f = Class.extend([h.prototype, {
        initialize: function () {
            h.apply(this, arguments)
        },
        minHeight: 30,
        update: function () {
            var e = this.scrollpane.innerEl.get(0),
                t = this.scrollpane.el.height(),
                i = t - 2 * this.scrollpane.options.padding,
                n = i * t / e.scrollHeight,
                s = Math.max(this.minHeight, n),
                o = Math.max(0, s - n);
            this.el.css("height", s).css("top", (i - o) * e.scrollTop / e.scrollHeight)
        },
        buildEl: function () {
            return $('<div class="g-scrollbar g-scrollbar-vertical">')
        },
        onMouseMove: function (t) {
            var i, n = t.pageY - this.startPageY,
                s = this.scrollpane.innerEl.get(0),
                o = this.el.height(),
                r = this.scrollpane.el.height(),
                a = r - 2 * this.scrollpane.options.padding;
            i = (l || (l = e("lib/math"))).clamp(n, 0, a - o), s.scrollTop = (s.scrollHeight - r) * i / (a - o)
        },
        onMouseWheel: function (e, t, i, n) {
            var s = this.scrollpane.innerEl.get(0);
            return n > 0 && 0 === s.scrollTop || 0 > n && s.scrollTop + this.scrollpane.el.height() === s.scrollHeight ? (e.preventDefault(), !1) : void 0
        }
    }])
}),
define("lib/views/checkbox", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/view"))).extend({
        template: e("lib/views/checkbox.tmpl"),
        className: "checkbox sc-checkbox",
        tagName: "label",
        defaults: {
            label: "",
            name: "",
            checked: !1
        },
        element2selector: {
            input: ".sc-checkbox-input"
        },
        events: {
            "change .sc-checkbox-input": "onInputChange"
        },
        getChecked: function () {
            return this.getElement("input").prop("checked")
        },
        setChecked: function (e) {
            this.getElement("input").prop("checked", !! e)
        },
        onInputChange: function (e) {
            var t = ["checkbox", "change"],
                i = this.options.name,
                n = {
                    name: i,
                    checked: e.target.checked
                };
            this.bubble(t.join(":"), n), i && (t.push(i), this.bubble(t.join(":"), n))
        }
    })
}),
define("lib/helpers/search-helper", [], function (e, t, i) {
    var n, s, o, r, a, l;
    a = {
        type: {
            "": "",
            sounds: "sound",
            people: "person",
            groups: "group",
            sets: "set"
        }
    }, l = {
        singular: {
            "": "everything",
            sound: "track",
            person: "person",
            group: "group",
            set: "playlist"
        },
        plural: {
            "": "everything",
            sound: "tracks",
            person: "people",
            group: "groups",
            set: "playlists"
        },
        category: {
            "": "",
            sound: "sounds",
            person: "people",
            group: "groups",
            set: "sets"
        }
    }, r = ["q", "q[fulltext]", "filter.duration", "filter.created_at", "filter.license", "filter.genre", "filter.genre_or_tag", "filter.place"], n = i.exports = {
        highlightText: function (t, i, n) {
            var o, r = (s || (s = e("underscore"))).extend({
                    pre: "<b>",
                    post: "</b>"
                }, n),
                a = t.split("");
            if (!i) return t;
            for (o = i.length; o--;) a.splice(i[o].post, 0, r.post), a.splice(i[o].pre, 0, r.pre);
            return a.join("")
        },
        getParams: function () {
            var t = (o || (o = e("lib/url"))).parse(window.location.href);
            return this.getValidParams(t.query)
        },
        getValidParams: function (t) {
            return (s || (s = e("underscore"))).pick(t, r)
        },
        modifyParamsWith: function (t, i) {
            var n = {}, r = this.getParams();
            return void 0 === i && r.hasOwnProperty(t) ? delete r[t] : (n[t] = i, (s || (s = e("underscore"))).extend(r, n)), (o || (o = e("lib/url"))).stringify({
                query: r
            })
        },
        getFilters: function (t) {
            var i = {}, n = /^filter\./;
            return t = t || this.getParams(), (s || (s = e("underscore"))).each(t, function (e, t) {
                n.test(t) && (i[t] = e)
            }), (s || (s = e("underscore"))).isEmpty(i) ? void 0 : i
        },
        fuzzy: function (e, t, i) {
            var n, s = e.replace(/\W+/gi, "").split(""),
                o = new RegExp("\\b(" + s.join(").*?(") + ")", "i");
            return e ? (n = t.map(function (t) {
                var n, s, r = i ? t.get ? t.get(i) : t[i] : t,
                    a = o.exec(r),
                    l = r.toLowerCase(),
                    u = [];
                if (a) {
                    for (n = a.index, s = 1; s < a.length; ++s) n = l.indexOf(a[s].toLowerCase(), n) + 1, u.push({
                        pre: n - 1,
                        post: n
                    });
                    for (s = u.length; --s;) u[s - 1].post === u[s].pre && (u[s - 1].post = u[s].post, u.splice(s, 1));
                    return {
                        item: t,
                        highlights: u,
                        score: e.length / a[0].length / r.length - u.length
                    }
                }
            }).filter(Boolean), n.sort(function (e, t) {
                return t.score - e.score
            }), n) : t.map(function (e) {
                return {
                    item: e,
                    highlights: [],
                    score: 1
                }
            })
        },
        convert: function (e, t, i) {
            var n = "category" === e ? a.type[i] : i;
            return "type" === t ? n : l[t][n]
        }
    }
}),
define("models/suggestion", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = function (t, i) {
        var n, r = t.resource_type;
        return delete t.resource_type, n = "user" === r ? new(o || (o = e("models/user")))(t, i) : new(s || (s = e("models/sound")))(t, i)
    }, n.getClass = function (t) {
        var i = t.resource_type;
        return "user" === i ? o || (o = e("models/user")) : s || (s = e("models/sound"))
    }
}),
define("lib/scene/scene", [], function (e, t, i) {
    function n() {
        s.call(this)
    }

    function s() {
        this._raf || (this._raf = window.requestAnimationFrame(this.update))
    }
    var o, r;
    o = i.exports = Class.extend([(r || (r = e("lib/backbone"))).Events, {
        _layers: null,
        _raf: null,
        initialize: function () {
            this._layers = [], this.update = this.update.bind(this)
        },
        dispose: function () {
            window.cancelAnimationFrame(this._raf);
            for (var e; e = this._layers.pop();) e.off("dirty", n, this)
        },
        getLayers: function () {
            return this._layers
        },
        addLayer: function (e) {
            this._layers.push(e), e.on("dirty", n, this), e.isDirty && s.call(this)
        },
        update: function () {
            this._raf = null;
            var e, t;
            for (e = 0; t = this._layers[e]; ++e) t.isDirty && t.update()
        }
    }])
}),
define("lib/scene/scene-layer", [], function (e, t, i) {
    function n() {
        this.setDirty(!0)
    }
    var s, o, r;
    s = i.exports = (r || (r = e("lib/views/canvas-view"))).extend({
        className: "g-box-full sceneLayer",
        render: function () {
            return this
        },
        addNode: function (t) {
            var i = t[0],
                s = (o || (o = e("underscore"))).extend({
                    el: this.el,
                    scale: this.scale
                }, t[1]);
            this.addSubview(new i(s)).on("dirty", n, this).render()
        },
        onCanvasResize: function () {
            (o || (o = e("underscore"))).invoke(this.subviews, "onResize")
        },
        setDirty: function (e) {
            (this.isDirty = e) && this.trigger("dirty")
        },
        update: function () {
            if (!this.disposed && this.isDirty) {
                var e, t;
                for (this.context.clearRect(0, 0, this.el.width, this.el.height), e = 0; t = this.subviews[e]; ++e) t.draw();
                this.setDirty(!1)
            }
        }
    })
}),
define("lib/helpers/waveform-helper", [], function (e, t, i) {
    function n(e) {
        var t, i = document.createElement("canvas"),
            n = e.width,
            s = e.height / 2;
        return i.width = n, i.height = s, t = i.getContext("2d"), t.drawImage(e, 0, 0), t.getImageData(0, 0, n, s)
    }

    function s(e) {
        var t, i = n(e),
            s = e.width,
            r = e.height / 2,
            a = new m(s);
        for (t = 0; s > t; ++t) a[t] = o(i, s, r, t);
        return a
    }

    function o(e, t, i, n) {
        for (var s, o, r = t, a = 0, l = i; l > a;) s = a + l >> 1, o = 4 * (s * r + n) + 3, 255 === e.data[o] ? a = s + 1 : l = s;
        return a
    }

    function r(t) {
        return $.ajax({
            url: (c || (c = e("config"))).get("wisHost") + "/" + t,
            type: "GET",
            dataType: "json"
        })
    }

    function a() {
        var t, i, n = this.model.getSounds(),
            o = this.$el.width(),
            a = this.model.duration();
        return i = n.length ? n.map(function (e) {
            return {
                duration: e.duration(),
                waveform_url: e.get("waveform_url")
            }
        }) : [{
            duration: a,
            waveform_url: v
        }], t = i.map(function (t) {
            var i, n, l, u = Math.round(o * t.duration / a),
                c = u > y ? t.waveform_url : x[Math.floor(Math.random() * x.length)],
                d = $.Deferred();
            return c.indexOf(b) > -1 && (c = v), l = c.split("/").pop(), n = w.get(l), n ? d.resolve({
                data: n
            }) : (d.done(function (e) {
                w.set(e.key, e.data)
            }), i = function () {
                (f || (f = e("lib/support"))).corsImg || (c = "/_waveform/" + l), (h || (h = e("lib/helpers/image-helper"))).load(c).done(function (e) {
                    d.resolve({
                        key: l,
                        data: s(e)
                    })
                })
            }, g.enabled ? r(l).done(function (e) {
                g.succeeded();
                var t = new m(e.samples.length);
                e.samples.forEach(function (i, n) {
                    t[n] = e.height - i
                }), d.resolve({
                    key: l,
                    data: t
                })
            }).fail(function () {
                g.failed(), i()
            }) : i()), d
        }), $.when.apply($, t).then(function () {
            this.waveformData = (u || (u = e("underscore"))).pluck(arguments, "data")
        }.bind(this))
    }
    var l, u, c, d, h, p, f, g, m = (f || (f = e("lib/support"))).typedArrays ? Uint8Array : Array,
        v = "90GaSwazbrh1_m.png",
        b = "/images/player-waveform-medium.png",
        _ = 500,
        y = 15,
        w = new(p || (p = e("lib/store")))({
            maxLength: _
        }),
        x = ["oQ4mQ28umFy9_m.png", "yAsGo4Oj2vjn_m.png", "XOsjuw7QwaPt_m.png", "H9uGzKOYK5Ph_m.png", "IHBAsSu3O7qn_m.png", "wco8JS0UScQo_m.png"].map(function (t) {
            return ((f || (f = e("lib/support"))).corsImg ? "//w1.sndcdn.com/" : "/_waveform/") + t
        });
    v = ((f || (f = e("lib/support"))).corsImg ? "//w1.sndcdn.com/" : "/_waveform/") + v, l = i.exports = {
        loadWaveformDataForView: function (t) {
            return g || (g = new(d || (d = e("lib/circuit-breaker")))({
                tolerance: 5,
                baseDelay: 2e3,
                maxDelay: 12e4
            })), a.call(t)
        }
    }
}),
define("lib/views/canvas-view", [], function (e, t, i) {
    function n() {
        var e = this.$el.width(),
            t = this.$el.height();
        this.initCanvasDimensions(e, t), this.onCanvasResize()
    }
    var s, o, r, a, l = window.devicePixelRatio ? (Math.floor(window.devicePixelRatio) || 1) / (o || (o = e("lib/browser"))).backingStoreRatio : 1;
    s = i.exports = (r || (r = e("lib/view"))).extend({
        tagName: "canvas",
        className: "g-box-full waveform__layer",
        attributes: {
            "aria-hidden": "true"
        },
        context: null,
        scale: null,
        template: function () {
            return ""
        },
        onCanvasResize: $.noop,
        _setup: function () {
            this.context = this.el.getContext("2d"), this.scale = l, (a || (a = e("lib/window-events"))).on("resize:x:debounced", n, this), (r || (r = e("lib/view"))).prototype._setup.apply(this, arguments)
        },
        _dispose: function () {
            this.disposed || ((a || (a = e("lib/window-events"))).off("resize:x:debounced", n, this), (r || (r = e("lib/view"))).prototype._dispose.apply(this, arguments))
        },
        renderDecorate: function () {
            this.whenInserted().done(this.initCanvasDimensions.bind(this))
        },
        initCanvasDimensions: function (t, i) {
            var n = this.context,
                s = n.canvas,
                r = this.scale;
            s.width = (t || this.el.offsetWidth) * r, s.height = (i || this.el.offsetHeight) * r, (o || (o = e("lib/browser"))).isHiDPI && 1 !== r && n.scale(r, r)
        }
    })
}),
define("lib/scene/scene-node", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = new(o || (o = e("lib/mixin")))({
        canvas: null,
        context: null,
        isDirty: !1,
        requires: ["draw"],
        applyTo: function (t) {
            t.defaults = (s || (s = e("underscore"))).extend({
                scale: 1,
                $eventEl: null
            }, t.defaults)
        },
        after: {
            draw: function () {
                this.setDirty(!1)
            },
            onResize: function () {
                this.setDirty(!0)
            }
        },
        before: {
            setup: function (e) {
                e.$eventEl || (e.$eventEl = this.$el), this.canvas = this.el, this.context = this.el.getContext("2d")
            }
        },
        override: {
            render: function () {
                this.hasData() ? this.setDirty(!0) : (this.setDirty(!1), this.fetchData())
            },
            destroyElement: $.noop
        },
        defaults: {
            onResize: $.noop
        },
        setDirty: function (e) {
            (this.isDirty = e) && this.trigger("dirty")
        }
    })
}),
define("lib/helpers/mouse-helper", [], function (e, t, i) {
    var n, s;
    n = i.exports = {
        normalizeEvent: function (e) {
            if (e.offsetX === s || e.offsetY === s) {
                var t = $(e.target).offset(),
                    i = e.originalEvent;
                e.offsetX = i.pageX - t.left, e.offsetY = i.pageY - t.top
            }
            return e
        }
    }
}),
define("lib/helpers/conversion-helper", [], function (e, t, i) {
    var n, s, o, r = {
            base: 1e3,
            digits: 1,
            unit: "MB"
        };
    (o || (o = e("lib/browser"))).isWindows && (r.base = 1024), n = i.exports = {
            bytesToMB: function (t, i) {
                var n = (s || (s = e("underscore"))).extend({}, r, i),
                    o = t / Math.pow(n.base, 2);
                return o.toFixed(n.digits) + n.unit
            }
    }
}),
define("config/waveform-styles", [], function (e, t, i) {
    var n = "242,242,242",
        s = "86,86,86",
        o = "153,153,153",
        r = "76,76,76",
        a = "137,137,137",
        l = "255,163,102",
        u = "255,101,0",
        c = "255,33,0",
        d = "204,119,64",
        h = "245,173,115",
        p = "255,187,128";
    i.exports = {
        "default": {
            progressGradient: [
                [0, u],
                [.7, c],
                [.701, d],
                [.72, h],
                [.721, h],
                [1, p]
            ],
            loaderGradient: [
                [0, s],
                [.7, "51,51,51"],
                [.701, r],
                [.72, a],
                [.721, a],
                [1, o]
            ],
            backgroundGradient: [
                [0, "94,94,94"],
                [.7, "64,64,64"],
                [.701, r],
                [.72, a],
                [.721, a],
                [1, o]
            ],
            progressIndicatorBg: "rgba(0, 0, 0, 0.8)",
            progressIndicatorColor: "rgba(255, 102, 0, 1)",
            durationIndicatorBg: "rgba(0, 0, 0, 0.8)",
            durationIndicatorColor: "rgba(153, 153, 153, 1)"
        },
        inverted: {
            progressGradient: [
                [0, u, .9],
                [.7, c, .9],
                [.701, l, .4],
                [1, l, .4]
            ],
            loaderGradient: [
                [0, n, .9],
                [.7, n, .9],
                [.701, n, .4],
                [1, n, .4]
            ],
            backgroundGradient: [
                [0, n, .9],
                [.7, n, .9],
                [.701, n, .4],
                [1, n, .4]
            ],
            progressIndicatorBg: "rgba(0, 0, 0, 0.8)",
            progressIndicatorColor: "rgba(255, 102, 0, 1)",
            durationIndicatorBg: "rgba(0, 0, 0, 0.8)",
            durationIndicatorColor: "rgba(153, 153, 153, 1)"
        },
        promoted: {
            progressGradient: [
                [0, u, 1],
                [.7, c, 1],
                [.701, l, .4],
                [1, l, .4]
            ],
            loaderGradient: [
                [0, n, 1],
                [.7, n, 1],
                [.701, n, .4],
                [1, n, .4]
            ],
            backgroundGradient: [
                [0, n, 1],
                [.7, n, 1],
                [.701, n, .4],
                [1, n, .4]
            ],
            progressIndicatorBg: "rgba(255, 255, 255, 0.8)",
            progressIndicatorColor: "rgba(255, 102, 0, 1)",
            durationIndicatorBg: "rgba(255, 255, 255, 0.8)",
            durationIndicatorColor: "rgba(255, 102, 0, 1)"
        }
    }
}),
define("forms/create-playlist", [], function (e, t, i) {
    function n(t) {
        t !== this.options.startingSound && (l || (l = e("event-bus"))).trigger("tracking:add_to_set:suggestion", !0), this.getFieldMetadata("sounds").datasource.blacklist(t), o.call(this)
    }

    function s(t) {
        (l || (l = e("event-bus"))).trigger("tracking:add_to_set:suggestion", !1), this.getFieldMetadata("sounds").datasource.unblacklist(t), o.call(this)
    }

    function o() {
        this.setActionState("save", this.get("sounds").length ? "enabled" : "disabled"), this.change({
            force: ["sounds"]
        })
    }
    var r, a, l, u, c, d, h, p, f;
    r = i.exports = (u || (u = e("lib/form"))).extend({
        fields: {
            title: {
                defaultValue: ""
            },
            sounds: {
                datasource: function () {
                    return new(f || (f = e("collections/playlist-suggestions")))
                },
                defaultValue: function () {
                    return new(c || (c = e("collections/generic-sounds")))
                }
            },
            playlist: {
                defaultValue: null
            },
            sharing: {
                defaultValue: "public",
                datasource: [{
                    label: "private",
                    value: "private"
                }, {
                    label: "public",
                    value: "public"
                }]
            }
        },
        buttons: {
            save: {
                label: "Save",
                action: "save"
            }
        },
        actions: {
            save: function () {
                var t = (p || (p = e("models/playlist"))).getNewInstance({
                    title: this.get("title"),
                    sharing: this.get("sharing")
                });
                return this.validate().pipe(function (i) {
                    return i ? t.save().pipe(function () {
                        return (p || (p = e("models/playlist"))).instances.add(t), this.get("sounds").each(function (e) {
                            t.addSound(e)
                        }), this.set("playlist", t), this.markFieldsClean(), (a || (a = e("lib/action-controller"))).notify("createPlaylist", {
                            object: t
                        }), t.saveOrder()
                    }.bind(this)) : void(l || (l = e("event-bus"))).trigger("tracking:add_to_set:validation")
                }.bind(this))
            },
            "default": "save"
        },
        constraints: {
            title: [
                [h || (h = e("lib/constraints/not-empty")), {
                    message: "Title is required"
                }],
                [d || (d = e("lib/constraints/max-length")), {
                    maxLength: 255,
                    message: "Title must not exceed {maxLength} characters"
                }]
            ],
            sounds: [
                [h || (h = e("lib/constraints/not-empty")), {
                    message: "Playlist must contain at least one track"
                }]
            ]
        },
        setup: function (e, t) {
            this.get("sounds").on("add", n, this).on("remove", s, this), t && t.startingSound && (this.addSound(t.startingSound), this.set("sharing", t.startingSound.get("sharing")), this.markFieldsClean())
        },
        addSound: function (e) {
            this.get("sounds").add(e)
        }
    }, {
        onCleanup: function (e) {
            e.get("sounds").off("add", n, e).off("remove", s, e).release()
        }
    })
}),
define("collections/generic-sounds", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (s || (s = e("lib/collection"))).extend({
        model: o || (o = e("models/sound")),
        next_href: !1,
        lastFetchTime: Date.now()
    })
}),
define("collections/playlist-suggestions", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (o || (o = e("lib/multi-collection"))).extend({
        model: r || (r = e("models/sound")),
        filters: [
            function (e) {
                return "sound" === e.resource_type
            }
        ],
        setupSources: function () {
            return [new(a || (a = e("collections/user-likes")))(null, {
                userId: (s || (s = e("config"))).get("me").id
            })]
        },
        extractModel: function (e) {
            return e.getAudible()
        }
    }, {
        hashFn: function (e, t) {
            return t && t.resource_id
        }
    })
}),
define("lib/mixins/views/form-container", [], function (e, t, i) {
    var n, s;
    n = i.exports = new(s || (s = e("lib/mixin")))({
        getFormControls: function () {
            return this.getAncestorSubviews().filter(function (e) {
                return e.isFormControl
            })
        },
        getInvalidFormControls: function () {
            return this.getFormControls().filter(function (e) {
                return !e.isValid()
            })
        }
    })
}),
define("lib/views/tabs", [], function (e, t, i) {
    function n(e, t, i) {
        e.isActive = i, t.toggleClass(a, i), e.icon && t.find(".sc-icon").toggleClass(e.icon.activeClass, i).toggleClass(e.icon.defaultClass, !i)
    }
    var s, o, r, a = "active";
    s = i.exports = (r || (r = e("lib/view"))).extend({
        template: e("lib/views/tabs.tmpl"),
        css: e("lib/views/tabs.css"),
        className: "tabs",
        defaults: {
            large: !1,
            tabs: null,
            activeTabIndex: 0
        },
        element2selector: {
            content: ".tabs__content",
            tabs: ".g-tabs",
            tabItems: ".g-tabs-item",
            tabLinks: ".g-tabs-link"
        },
        _tabs: null,
        _activeTabIndex: null,
        _activeTab: null,
        _previousTab: null,
        setup: function (t) {
            this._tabs = t.tabs.map((o || (o = e("underscore"))).clone), (o || (o = e("underscore"))).bindAll(this, "onTabClick"), this._activeTabIndex = this.options.activeTabIndex, this._activeTab = this._tabs[this._activeTabIndex], this._activeTab.isActive = !0
        },
        renderDecorate: function () {
            this._tabEls = this.$el.find(".g-tabs:first .g-tabs-link").on("click", this.onTabClick), this.appendContent()
        },
        teardown: function () {
            this._tabEls.off("click", this.onTabClick)
        },
        appendContent: function () {
            var t = this._activeTab,
                i = t.hasOwnProperty.bind(t),
                n = i("content"),
                s = i("subview"),
                r = i("subviewArgs"),
                a = this.getElement("content"),
                l = this.options;
            n ? a.html(t.content) : s && (r && (l = (o || (o = e("underscore"))).extend(l, t.subviewArgs)), t.subviewInstance = this.addSubview(new t.subview(l)), a.html(t.subviewInstance.render().el))
        },
        removeContent: function () {
            this._previousTab && this._previousTab.subviewInstance && (this._previousTab.subviewInstance._dispose(), this.removeSubview(this._previousTab.subviewInstance))
        },
        replaceContent: function () {
            this.removeContent(), this.appendContent()
        },
        onTabClick: function (e) {
            e.preventDefault(), this.setActiveTab(e)
        },
        setActiveTab: function (e) {
            var t, i, s = e.currentTarget;
            this._previousTabIndex = this._activeTabIndex, this._activeTabIndex = this.getElement("tabLinks").index(s), t = this._tabs[this._previousTabIndex], i = this._tabs[this._activeTabIndex], this._previousTabIndex !== this._activeTabIndex && (n.call(this, t, this.getElement("tabLinks").filter(".active"), !1), n.call(this, i, $(s), !0), this._previousTab = this._activeTab, this._activeTab = i, this.replaceContent(), this.bubble("activeTabChanged", {
                index: this._activeTabIndex
            }))
        },
        getTemplateData: function (e) {
            e.tabs = this._tabs, e.singleTab = 1 === this._tabs.length && this._tabs[0]
        }
    })
}),
define("lib/helpers/input-helper", [], function (e, t, i) {
    var n, s, o, r = [37, 38, 39, 40, 9, 35, 36];
    n = i.exports = {
        makeReadOnly: function (t) {
            (o || (o = e("lib/browser"))).isMobile && (o || (o = e("lib/browser"))).isSafari ? t.on("keydown", function (t) {
                return t.isMetaKey() && !t.shiftKey || (s || (s = e("underscore"))).include(r, t.which) ? !0 : void t.preventDefault()
            }) : t.attr("readOnly", "readOnly")
        }
    }
}),
define("lib/helpers/L10n-helper", [], function (e, t, i) {
    var n, s = (navigator.userLanguage || navigator.language || "").toLowerCase(),
        o = s.split("-")[0],
        r = s.split("-")[1];
    n = i.exports = {
        isUsedLanguage: function (e) {
            return o === e.toLowerCase()
        },
        isCountry: function (e) {
            return r === e.toLowerCase()
        },
        isUsedLanguageAndCountry: function (e) {
            return s === e.toLowerCase()
        }
    }
}),
define("lib/views/confirmable-form", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("lib/view"))).extend(s || (s = e("lib/mixins/views/simple-form")), {
        template: e("lib/views/confirmable-form.tmpl"),
        css: e("lib/views/confirmable-form.css"),
        className: "confirmableForm",
        defaults: {
            confirmText: "",
            confirmButton: "Yes"
        }
    })
}),
define("collections/user-groups", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (o || (o = e("lib/collection"))).extend({
        model: s || (s = e("models/group")),
        defaults: {
            limit: 5e3
        },
        baseUrl: function () {
            return (r || (r = e("lib/url"))).stringify({
                path: ["users", this.options.resource_id, "groups"],
                query: {
                    representation: "mini"
                }
            })
        }
    })
}),
define("collections/user-likes", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c;
    n = i.exports = (a || (a = e("collections/user-items"))).extend(r || (r = e("lib/mixins/collections/pooling")), {
        model: o || (o = e("models/like")),
        defaults: {
            type: "likes"
        },
        isEdgeBaseUrl: !0,
        baseUrlQueryParams: {
            order: "favorited_at"
        },
        setup: function () {
            (a || (a = e("collections/user-items"))).prototype.setup.apply(this, arguments), c.call(this, !0)
        },
        unshuffle: function (e) {
            return -Date.parse(e.get("created_at"))
        },
        parse: function (e) {
            var t = this.options.userId;
            return e.collection.forEach(function (e) {
                e.user_id = t
            }), e.collection
        },
        audibleAt: function (e) {
            return this.at(e).getAudible()
        }
    }, {
        onCleanup: function (e) {
            c.call(e, !1)
        }
    }), c = function (t) {
        var i = t ? "on" : "off";
        (s || (s = e("lib/action-controller")))[i]("like:origin:user:" + this.options.userId, u, this)
    }, u = function (e) {
        var t;
        e.state ? this.add(l(e), {
            at: 0
        }) : (t = this.find(function (t) {
            var i;
            return "sound" === e.targetType && (i = t.get("track")) && e.target === i.id || "playlist" === e.targetType && (i = t.get("playlist")) && e.target === i.id
        }), t && this.remove(t))
    }, l = function (e) {
        var t = {
            user_id: e.origin,
            created_at: (new Date).toISOString(),
            kind: "like"
        };
        return "sound" === e.targetType ? (t.track = {
            id: e.target
        }, t.playlist = null) : (t.playlist = {
            id: e.target
        }, t.track = null), t
    }
}),
define("lib/views/form-controls/textfield", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (r || (r = e("lib/view"))).extend(o || (o = e("lib/mixins/views/form-control")), {
        className: "textfield",
        defaults: {
            updateOn: "change",
            validateOn: "change",
            label: null,
            size: "medium",
            inline: !1,
            messageOutside: !0,
            placeholder: null,
            type: "text",
            rows: 5,
            autocomplete: null,
            autoFocus: !1,
            resizing: "both",
            submitFormOnEnter: !0
        },
        template: e("lib/views/form-controls/textfield.tmpl"),
        css: e("lib/views/form-controls/textfield.css"),
        element2selector: {
            control: ".textfield__input",
            wrapper: ".textfield__inputWrapper",
            validation: ".textfield__validation"
        },
        events: {
            "input .textfield__input": "onInputChange"
        },
        states: {
            invalid: function (e) {
                this.$el.toggleClass("invalid", e), this.getElement("validation").toggleClass("g-input-message-hidden", !e)
            }
        },
        setup: function (e) {
            this.$el.toggleClass("inline", e.inline).toggleClass("messageOutside", e.messageOutside)
        },
        getValue: function (e) {
            var t = this.getElement("control").val();
            return e ? t.trim() : t
        },
        setValue: function (e) {
            return this.getElement("control").val(e)
        },
        renderDecorate: function () {
            var e = this.options,
                t = this.getElement("control"),
                i = this.hasValidation();
            !e.updateOn || e.updateOn === e.validateOn && i || t.on(e.updateOn, function () {
                this.setFieldValue(this.getValue())
            }.bind(this)), e.validateOn && i && t.on(e.validateOn, function () {
                this.runValidation()
            }.bind(this)), this.isTextarea() ? t.css("resize", this.options.resizing) : this.options.submitFormOnEnter && t.on("keydown", function (e) {
                13 === e.which && (e.preventDefault(), this.setFieldValue(this.getValue()), this.form.performAction("default"))
            }.bind(this)), e.autoFocus && this.whenInserted().done(function () {
                setTimeout(function () {
                    this.getElement("control").focus()
                }.bind(this), 150)
            }.bind(this))
        },
        isTextarea: function () {
            return "textarea" === this.options.type
        },
        getTemplateData: function (e) {
            var t = this.options;
            e.isTextarea = this.isTextarea(), t.label !== !1 && (e._label = t.label || t.placeholder)
        },
        onInputChange: function () {
            this.getMetaData().isValid || this.markAsValid()
        },
        onFieldChange: function (e, t) {
            this.getElement("control").val(t)
        },
        onValidationChange: function (e) {
            this.getElement("validation").html(e.isValid ? "" : e.message), this.toggleState("invalid", !e.isValid)
        },
        markAsValid: function () {
            var t = this.getMetaData();
            t.isValid = !0, t.validity = (s || (s = e("lib/constraints/constraint-states"))).UNKNOWN, this.getElement("validation").html(""), this.toggleState("invalid", !1)
        },
        markAsInvalid: function (t) {
            var i = this.getMetaData();
            i.isValid = !1, i.validity = (s || (s = e("lib/constraints/constraint-states"))).INVALID, i.message = t, this.onValidationChange(i)
        },
        runValidation: function () {
            return this.setFieldValue(this.getValue()), this.validateOwnField()
        }
    })
}),
define("lib/views/form-controls/button", [], function (e, t, i) {
    function n() {
        var e = this.getConfiguration().state;
        this.toggleState("disabled", "disabled" === e).toggleState("pending", "pending" === e)
    }
    var s, o, r, a;
    s = i.exports = (a || (a = e("lib/view"))).extend(r || (r = e("lib/mixins/views/form-control")), o || (o = e("lib/mixins/views/button")), {
        defaults: {
            button: null,
            size: "medium",
            responsive: !1
        },
        states: {
            disabled: function (e) {
                this.$el.attr("disabled", e)
            },
            pending: function (e) {
                this.$el.toggleClass("sc-pending", e)
            }
        },
        template: function () {
            return this.getConfiguration().label
        },
        setup: function (e) {
            this.button = this.options.button, this.buttonArgs = this.options.buttonArgs, this.$el.addClass("sc-button-" + e.size), n.call(this), this.form.on("change:button:" + this.button, this.onConfigChange, this)
        },
        dispose: function () {
            this.form.off("change:button:" + this.button, this.onConfigChange, this)
        },
        performAction: function () {
            this.form.performAction(this.getConfiguration().action, this.buttonArgs)
        },
        onClick: function (e) {
            e.preventDefault(), this.performAction()
        },
        onConfigChange: function (e) {
            e.label && this.$el.text(e.label), void 0 !== e.state && n.call(this)
        },
        getConfiguration: function () {
            return this.form.buttons[this.button]
        }
    })
}),
define("collections/user-web-profiles", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (s || (s = e("collections/user-items"))).extend({
        model: o || (o = e("models/web-profile")),
        defaults: {
            type: "web-profiles"
        },
        getProfileByName: function (e) {
            return this.find(function (t) {
                return t.get("service") === e
            })
        }
    })
}),
define("models/like", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (s || (s = e("lib/model"))).extend({
        resource_type: "like",
        submodelMap: {
            track: o || (o = e("models/sound")),
            playlist: r || (r = e("models/playlist"))
        },
        url: null,
        setup: function (e) {},
        getAudible: function () {
            var t;
            return (t = this.get("track")) ? (o || (o = e("models/sound"))).instances.get(t.id) : (t = this.get("playlist")) ? (r || (r = e("models/playlist"))).instances.get(t.id) : void 0
        },
        isPlaylist: function () {
            return !this.get("track")
        },
        isSound: function () {
            return !!this.get("track")
        }
    }, {
        hashFn: function (e) {
            return e.id || [e.user_id, e.track ? "s" : "p", (e.track || e.playlist).id].join("_")
        }
    })
}),
define("collections/my-playlists", [], function (e, t, i) {
    function n(e) {
        this.add(e.object, {
            at: 0
        })
    }
    var s, o, r, a, l;
    s = i.exports = (r || (r = e("lib/collection"))).extend({
        model: l || (l = e("models/playlist")),
        defaults: {
            offset: 0,
            limit: 50
        },
        baseUrl: function () {
            return "me/playlists"
        },
        setup: function () {
            (o || (o = e("lib/action-controller"))).on("createPlaylist:origin:user:" + (a || (a = e("config"))).get("me").id, n, this)
        },
        dispose: function () {
            (o || (o = e("lib/action-controller"))).off("createPlaylist:origin:user:" + (a || (a = e("config"))).get("me").id, n, this)
        }
    }, {
        neverRelease: !0,
        hashFn: function () {
            return 1
        }
    })
}),
define("lib/mixins/views/form-control", [], function (e, t, i) {
    var n, s, o, r, a, l;
    n = i.exports = new(l || (l = e("lib/mixin")))({
        applyTo: function (t) {
            t.defaults = (s || (s = e("underscore"))).defaults(t.defaults || {}, {
                showValidation: !0,
                Form: null
            })
        },
        defaults: {
            getFocusableElement: function () {
                return this.getElement("control")
            },
            onFieldChange: null,
            focus: function () {
                this.getFocusableElement().focus()
            }
        },
        before: {
            setup: function (t) {
                var i, n;
                n = "string" == typeof t.Form ? (a || (a = e("lib/loader"))).get(t.Form) : t.Form, this.form = new n({}, t), t.field && (this.field = t.field, i = this.getDatasource(), i instanceof(o || (o = e("lib/backbone"))).Collection && (this.collection = i, this.collection.hold()), this.listenToFields("on", t.field), t.showValidation && this.onValidationChange && this.form.hasConstraintsFor(t.field) && this.form.on("validation:" + t.field, this.onValidationChange, this))
            }
        },
        after: {
            dispose: function () {
                this.field && (this.listenToFields("off", this.field), this.onValidationChange && this.form.hasConstraintsFor(this.field) && this.form.off("validation:" + this.field, this.onValidationChange, this)), this.form.release(), delete this.form
            },
            renderDecorate: function () {
                this.form.trigger("validation:" + this.options.field, this.getMetaData())
            }
        },
        around: {
            getTemplateData: function (e, t) {
                return t = e(t) || t, t._form = this.form.toJSON(), t._value = t._form[this.field], t
            }
        },
        isFormControl: !0,
        getFieldValue: function () {
            return this.field ? this.form.get(this.field) : void 0
        },
        setFieldValue: function (e) {
            this.field && !this.getMetaData().readOnly && this.form.set(this.field, e)
        },
        hasValidation: function () {
            return !0
        },
        isValid: function () {
            return this.field ? this.getMetaData().validity === (r || (r = e("lib/constraints/constraint-states"))).VALID : !0
        },
        getMetaData: function () {
            return this.form.getFieldMetadata(this.field)
        },
        getDatasource: function () {
            return this.getMetaData().datasource
        },
        validateOwnField: function () {
            return this.form.validate({
                fields: [this.field]
            })
        },
        scrollToAndFocus: function () {
            this.scrollIntoView({
                position: "top",
                topOffset: 40
            }).done(this.focus.bind(this))
        },
        listenToFields: function (t, i, n) {
            "string" == typeof i && (i = [i]);
            var o = i.filter((s || (s = e("underscore"))).identity).map(function (e) {
                return "change:" + e
            }).join(" ");
            return n || (n = this.onFieldChange), o && this.form[t](o, n, this), this
        }
    })
}),
define("lib/views/form-controls/radio-group", [], function (e, t, i) {
    function n() {
        var e = this.getFieldValue(),
            t = this.getElement("buttons");
        t.get().forEach(function (t) {
            t.checked = t.value === e
        })
    }
    var s, o, r, a;
    s = i.exports = (a || (a = e("lib/view"))).extend(r || (r = e("lib/mixins/views/form-control")), {
        className: "radioGroup",
        template: e("lib/views/form-controls/radio-group.tmpl"),
        css: e("lib/views/form-controls/radio-group.css"),
        element2selector: {
            buttons: "input"
        },
        defaults: {
            direction: "horizontal"
        },
        setup: function () {
            this.groupName = (o || (o = e("underscore"))).uniqueId("radio"), this.$el.addClass(this.options.direction)
        },
        getFocusableElement: function () {
            var e = this.getElement("buttons"),
                t = e.filter(":checked");
            return t.length ? t : e.first()
        },
        getTemplateData: function (e) {
            e.groupName = this.groupName, e.buttons = this.getDatasource()
        },
        onFieldChange: n,
        renderDecorate: function () {
            var e = this;
            n.call(this), this.getElement("buttons").on("change", function () {
                e.setFieldValue(this.value)
            })
        }
    })
}),
define("lib/mixins/views/widget-embed", [], function (e, t, i) {
    function n() {
        delete this.widgetParams.secret_token
    }

    function s() {
        var t, i, n, s, o = this.model.attributes,
            r = this.widgetType,
            u = this.widgetParams,
            c = "artwork" === r,
            d = "visual" === r,
            h = c || d,
            p = c ? 500 : d ? 450 : void 0,
            f = h ? this.widgetHeight : void 0;
        t = {
            type: r,
            params: u,
            height: f
        }, i = (l || (l = e("vendor/embed/embed")))(o, t), n = (l || (l = e("vendor/embed/embed")))(o, (a || (a = e("underscore"))).extend({}, t, {
            height: p
        })), s = (l || (l = e("vendor/embed/embed")))(o, (a || (a = e("underscore"))).defaults(t, {
            format: "wordpress"
        })), this.isDirty[r] && (this.getElement(r + "-player").html(n), this.setDirty(!1)), this.getElement("widget-code-input").val(i), this.getElement("wordpress-code-input").val(s)
    }

    function o(t) {
        (u || (u = e("event-bus"))).trigger(t, {
            type: this.model.resource_type,
            id: this.model.id
        })
    }
    var r, a, l, u, c, d, h, p, f, g = "ff5500",
        m = ["visual", "html5", "flash", "mini", "artwork"];
    r = i.exports = new(d || (d = e("lib/mixin")))(h || (h = e("lib/mixins/views/multi-resource-type")), {
        applyTo: function (t) {
            t.events = (a || (a = e("underscore"))).extend({
                'click input[type="text"]': "onInputClick",
                "click .widgetEmbed__widgetCode": "onWidgetCodeClick",
                "click .widgetEmbed__wordpressCode": "onWordpressCodeClick",
                "keyup .widgetEmbed__spectrum .sp-input, .widgetEmbed__colorInput": "onColorInputChange",
                "change .widgetEmbed__size": "onSizeChange"
            }, t.events), t.css ? (Array.isArray(t.css) || (t.css = [t.css]), t.css.push(f || (f = e("lib/mixins/views/widget-embed.css")), p || (p = e("vendor/spectrum-js/spectrum.css")))) : t.css = [f || (f = e("lib/mixins/views/widget-embed.css")), p || (p = e("vendor/spectrum-js/spectrum.css"))], t.element2selector = (a || (a = e("underscore"))).extend({
                options: ".widgetEmbed__option",
                players: ".widgetEmbed__player",
                "color-picker": ".widgetEmbed__colorPicker",
                playerContainer: ".widgetEmbed__players",
                "visual-player": '[data-sc-player-type="visual"]',
                "html5-player": '[data-sc-player-type="html5"]',
                "flash-player": '[data-sc-player-type="flash"]',
                "mini-player": '[data-sc-player-type="mini"]',
                "artwork-player": '[data-sc-player-type="artwork"]',
                "widget-code-input": ".widgetEmbed__widgetCode",
                "wordpress-code-input": ".widgetEmbed__wordpressCode"
            }, t.element2selector), t.bubbleEvents = (a || (a = e("underscore"))).extend({
                "checkbox:change": "onCheckboxChange"
            }, t.bubbleEvents)
        },
        defaults: {
            widgetHeight: null,
            widgetType: null,
            widgetParams: null
        },
        before: {
            setup: function (t) {
                (a || (a = e("underscore"))).bindAll(this, "onColorPickerChange", "decorateColorPicker"), this.$el.addClass("widgetEmbed"), this.isDirty = {}, m.forEach(function (e) {
                    this.isDirty[e] = !0
                }, this), this.widgetParams = {
                    color: g,
                    auto_play: !1,
                    hide_related: !1,
                    show_artwork: !0,
                    show_playcount: !0,
                    show_comments: !0
                }, this.$el.addClass("type-" + t.resource_type), n.call(this), this.insertIframe = (a || (a = e("underscore"))).debounce(s, 500)
            }
        },
        after: {
            renderDecorate: function () {
                this.setupColorPicker(), this.togglePlayer(), this.toggleOptions(), this.insertIframe(), (c || (c = e("lib/helpers/input-helper"))).makeReadOnly(this.getElement("widget-code-input")), (c || (c = e("lib/helpers/input-helper"))).makeReadOnly(this.getElement("wordpress-input"))
            }
        },
        setDirty: function (t) {
            t ? (a || (a = e("underscore"))).each(this.isDirty, function (e, t, i) {
                i[t] = !0
            }) : this.isDirty[this.widgetType] = !1
        },
        setupColorPicker: function () {
            this.whenInserted().done(function () {
                this.getElement("color-picker").spectrum({
                    color: this.widgetParams.color,
                    flat: !0,
                    showInput: !0,
                    className: "widgetEmbed__spectrum",
                    preferredFormat: "hex",
                    showSelectionPalette: !1,
                    change: this.onColorPickerChange,
                    move: this.onColorPickerChange,
                    show: this.decorateColorPicker
                })
            }.bind(this))
        },
        decorateColorPicker: function () {
            this.addElement2selector(), this.changeInputColor({
                "background-color": "#" + this.widgetParams.color,
                color: "#000"
            })
        },
        addElement2selector: function () {
            this.element2selector = (a || (a = e("underscore"))).extend(this.element2selector, {
                "color-input": ".widgetEmbed__spectrum .sp-input, .widgetEmbed__colorInput"
            })
        },
        togglePlayer: function () {
            var e = this.widgetType;
            this.getElement("players").toggleClass("sc-hidden", !0), this.getElement(e + "-player").toggleClass("sc-hidden", !1), this.getElement("playerContainer").removeClass(m.join(" ")).addClass(e)
        },
        toggleOptions: function () {
            this.getElement("options").toggleClass("sc-hidden", !0).filter('[data-sc-available*="' + this.widgetType + '"]').toggleClass("sc-hidden", !1)
        },
        changeInputColor: function (e) {
            this.getElement("color-input").css(e)
        },
        changeColorPickerColor: function (e) {
            var t = this.getElement("color-picker");
            e = e || g, t.spectrum("set", e), this.changeWidgetColor(t.spectrum("get"))
        },
        changeWidgetColor: function (e) {
            var t = e.toHexString();
            this.widgetParams.color = e.toHex(), this.setDirty(!0), this.changeInputColor({
                "background-color": t,
                color: e.toHsl().l <= .4 ? "#fff" : "#000"
            }), this.getElement("color-input").val(t), this.insertIframe()
        },
        onColorInputChange: function (e) {
            var t = e.target.value;
            /^#?[a-f0-9]{6}$/i.test(t) && this.changeColorPickerColor(t)
        },
        onColorPickerChange: function (e) {
            this.changeWidgetColor(e)
        },
        onSizeChange: function (e) {
            this.widgetHeight = e.target.value, this.insertIframe()
        },
        onCheckboxChange: function (e) {
            var t = e.data,
                i = t.name;
            this.widgetParams[i] = t.checked, "auto_play" !== i && this.setDirty(!0), this.insertIframe()
        },
        onWidgetCodeClick: function () {
            o.call(this, "share:widget")
        },
        onWordpressCodeClick: function () {
            o.call(this, "share:wordpress")
        },
        onInputClick: function (e) {
            $(e.target).select()
        }
    })
}),
define("forms/new-message-form", [], function (e, t, i) {
    function n(e) {
        e && -1 === this.getRecipientIds().indexOf(e.id) && this.set("recipients", this.get("recipients").concat(e))
    }

    function s(t) {
        var i = $.Deferred();
        return t instanceof(C || (C = e("models/user"))) || t instanceof(x || (x = e("models/shortcut"))) ? i.resolve(o(t)) : p(t) ? i.reject() : (C || (C = e("models/user"))).resolve(t).done(function (e) {
            e && e.id && i.resolve(o(e))
        }).fail(i.reject), i
    }

    function o(e) {
        return {
            id: e.id,
            username: e.get("username"),
            avatar_url: e.get("avatar_url")
        }
    }

    function r(e) {
        var t = e ? "on" : "off";
        this[t]("change:body", a, this)[t]("validation:body", c, this)[t]("validation:recipients", u, this)[t]("removeSoundFromAttached", d, this)
    }

    function a(t, i) {
        var n;
        i !== this._lastBodyValue && (this._lastBodyValue = i, (k || (k = e("lib/helpers/sc-links-helper"))).getAudibleModels(i.match((k || (k = e("lib/helpers/sc-links-helper"))).scLinksRegexGlobal) || []).done(function (t) {
            n = (m || (m = e("underscore"))).reduce(t, function (e, t) {
                return t && t.audible && e.push(t.audible), e
            }, []), this.set("attachments", n)
        }.bind(this)))
    }

    function l(t, i) {
        i && !i.isValid && (_ || (_ = e("event-bus"))).trigger("messages:new-message-validation-error", {
            field: t
        })
    }

    function u(e) {
        l.call(this, "recipients", e)
    }

    function c(e) {
        l.call(this, "body", e)
    }

    function d(t) {
        var i, n;
        i = (m || (m = e("underscore"))).reject(this.get("attachments"), function (e) {
            return e.resource_id === t ? (n = e, !0) : !1
        }), this.set("attachments", i), h.call(this, n)
    }

    function h(e) {
        var t = this.get("body"),
            i = e.getShareURL(),
            n = new RegExp("\\n{0,2}" + RegExp.escape(i) + "\\S*\\n{0,2}", "igm");
        t = t.replace(n, ""), this.set("body", t)
    }

    function p(e) {
        return "string" == typeof e && "soundcloud" === e.toLowerCase()
    }

    function f() {
        this.clearStoredValues(), this.set("body", "")
    }
    var g, m, v, b, _, y, w, x, k, S, C;
    g = i.exports = (b || (b = e("lib/form"))).extend(S || (S = e("lib/mixins/forms/persistent-form-fields")), {
        fields: {
            recipients: {
                defaultValue: []
            },
            body: {
                defaultValue: ""
            },
            links: {
                defaultValue: []
            },
            attachments: {
                defaultValue: []
            }
        },
        constraints: {
            body: [
                [y || (y = e("lib/constraints/not-empty")), {
                    message: "Please write a message"
                }],
                [w || (w = e("lib/constraints/max-length")), {
                    maxLength: 2e4,
                    message: "Message must not exceed {maxLength} characters"
                }]
            ],
            recipients: [
                [y || (y = e("lib/constraints/not-empty")), {
                    message: "Please choose a user"
                }]
            ]
        },
        buttons: {
            send: {
                label: "Send",
                action: "send"
            }
        },
        serialization: {
            restoreAndStoreOnSetup: !0,
            fields: ["body"]
        },
        actions: {
            "default": "send",
            send: function (t) {
                var i = $.Deferred(),
                    n = this.get("recipients")[0],
                    s = this.get("body");
                return this.validate().done(function (o) {
                    o ? (v || (v = e("collections/conversations"))).send(n, s, t.showSuccessMessage).done(i.resolve).fail(i.reject) : i.reject()
                }.bind(this)).fail(i.reject), i.done(f.bind(this)), i
            }
        },
        setup: function (e, t) {
            this.serialization.storeKey = t.conversationId && "conversation_" + t.conversationId, r.call(this, !0)
        },
        dispose: function () {
            r.call(this, !1)
        },
        getRecipientIds: function () {
            return (m || (m = e("underscore"))).pluck(this.get("recipients"), "id")
        },
        addRecipient: function (e) {
            var t = s(e);
            return t.done(n.bind(this))
        },
        addAttachment: function (e) {
            this.set("body", this.get("body").replace(/\n*$/, "\n" + e.getShareURL() + " "))
        }
    })
}),
define("models/web-profile", [], function (e, t, i) {
    var n, s, o = /^((?:https?:\/\/)?(?:www\.|m\.)?soundcloud\.(?:com|dev))\/?/i,
        r = {
            facebook: "Facebook",
            twitter: "Twitter",
            myspace: "MySpace",
            lastfm: "Last.fm",
            youtube: "YouTube",
            beatport: "Beatport",
            discogs: "Discogs",
            flickr: "Flickr",
            hypem: "Hype Machine",
            ning: "Ning",
            posterous: "Posterous",
            purevolume: "PureVolume",
            residentadvisor: "Resident Advisor",
            residentadvisorlabel: "Resident Advisor",
            reverbnation: "ReverbNation",
            soundcloud: "SoundCloud",
            songkick: "Songkick",
            tumblr: "Tumblr",
            vimeo: "Vimeo",
            virb: "Virb",
            wordpress: "Wordpress",
            ccmixter: "ccMixter",
            itunes_podcast: "iTunes Podcast",
            foursquare: "Foursquare",
            flavors: "flavors.me",
            thedjlist: "The DJ List",
            berklee: "Berklee",
            whatpeopleplay: "Whatpeopleplay",
            zeroinch: "zero",
            google_plus: "Google+"
        };
    n = i.exports = (s || (s = e("lib/model"))).extend({
        getServiceName: function () {
            var e = this.get("service");
            return "personal" === e || "other" === e ? this.get("url").replace(/^https?:\/\//, "") : r[e] || ""
        },
        getUrl: function () {
            var e = this.get("url");
            return "soundcloud" === this.get("service") ? e.replace(o, "/") : e
        }
    })
}),
define("collections/conversations", [], function (e, t, i) {
    function n(e, t) {
        return e + ":" + t
    }

    function s(t, i, n) {
        var s, o = (h || (h = e("collections/conversation-messages"))).instances.get(n.id),
            r = new l;
        o && o.add(n.last_message), r.add(n, {
            userAction: !0
        }), s = (c || (c = e("models/conversation"))).instances.get(n.id), s && s.markAsRead(), (d || (d = e("event-bus"))).trigger("new-message:sent", {
            recipient: t,
            showSuccessMessage: i
        })
    }

    function o(t, i) {
        var n, s = function (e) {
                return i.responseText.indexOf(e) > -1
            };
        i.responseText && (n = s("confirmed their address") ? "emailnotconfirmed" : s("sender must be followed") ? "privacy" : s("sender is muted") ? "youaremuted" : s("rate limit") ? "ratelimit" : s("receiver does not exist") ? "receiverdoesntexist" : null, n && (d || (d = e("event-bus"))).trigger("new-message:failed", {
            errorCode: n,
            recipient: t
        }))
    }

    function r(t) {
        var i = t ? "on" : "off";
        (d || (d = e("event-bus")))[i]("new-unread-messages", a, this)
    }

    function a(e) {
        e.forEach(function (e) {
            var t = this.get(e);
            t || this.add({
                id: e
            }, {
                at: 0
            })
        }, this)
    }
    var l, u, c, d, h, p;
    l = i.exports = (p || (p = e("lib/collection"))).extend({
        model: c || (c = e("models/conversation")),
        currentConversationId: null,
        baseUrl: function () {
            return "me/conversations"
        },
        setup: function () {
            r.call(this, !0)
        },
        getCurrentConversationId: function () {
            return this.currentConversationId
        },
        setCurrentConversationId: function (e) {
            e !== this.currentConversationId && (this.currentConversationId = e, this.trigger("change:currentConversationId", {
                currentConversationId: e
            }))
        },
        comparator: function (e, t) {
            return t.lastMessageSentAt() - e.lastMessageSentAt()
        }
    }, {
        onCleanup: function (e) {
            r.call(e, !1)
        },
        hashFn: function () {
            return 1
        },
        neverRelease: !0,
        send: function (t, i, r) {
            var a = (u || (u = e("config"))).get("me").id,
                l = $.ajax({
                    url: "me/conversations",
                    type: "POST",
                    data: {
                        content: i,
                        id: n(a, t.id)
                    },
                    dataType: "json"
                });
            return l.done(s.bind(this, t, r)).fail(o.bind(this, t)), l
        }
    })
}),
define("lib/mixins/forms/persistent-form-fields", [], function (e, t, i) {
    function n(t) {
        var i = t ? "on" : "off";
        this._onFieldsChange = this._onFieldsChange || (l || (l = e("underscore"))).throttle(s.bind(this), this.serialization.saveOnceIn, {
            leading: !1
        }), this[i](o.call(this), this._onFieldsChange)
    }

    function s() {
        var e = this.serialization.fields.reduce(function (e, t) {
            return e[t] = this.get(t), e
        }.bind(this), {});
        d.set(this.serialization.storeKey, e)
    }

    function o() {
        return "change:" + this.serialization.fields.join(" change:")
    }

    function r() {
        return !this._isStoringFields && this.serialization.storeKey && this.serialization.fields && this.serialization.fields.length
    }
    var a, l, u, c, d = new(u || (u = e("lib/persistent-store")))("persistentFormFields", "session");
    a = i.exports = new(c || (c = e("lib/mixin")))({
        defaultOptions: {
            fields: [],
            storeKey: null,
            saveOnceIn: 3e3,
            restoreAndStoreOnSetup: !1
        },
        _isStoringFields: !1,
        _onFieldsChange: null,
        after: {
            setup: function () {
                this.serialization = (l || (l = e("underscore"))).extend({}, this.defaultOptions, this.serialization), this.serialization.restoreAndStoreOnSetup && (this.restoreFields(), this.startStoringFields())
            },
            dispose: function () {
                this.stopStoringFields()
            }
        },
        restoreFields: function () {
            var e = d.get(this.serialization.storeKey);
            e && this.set(e)
        },
        startStoringFields: function () {
            r.call(this) && (this._isStoringFields = !0, n.call(this, !0))
        },
        stopStoringFields: function () {
            this._isStoringFields && (this._isStoringFields = !1, n.call(this, !1), this._onFieldsChange = null)
        },
        clearStoredValues: function () {
            d.set(this.serialization.storeKey, null)
        },
        _getStore: function () {
            return d
        }
    })
}),
define("collections/conversation-messages", [], function (e, t, i) {
    function n(e) {
        var t = e.audibleInformation.model;
        t && this.attachments.add({
            urn: t.getUrn(),
            timestamp: e.timestamp
        })
    }

    function s(e) {
        e.some(function (e) {
            return e === this.options.resource_id ? (this.fetchUnread(), !0) : void 0
        }, this)
    }

    function o(t) {
        var i = t ? "on" : "off";
        this[i]("audibleInformationUpdated", n, this), (l || (l = e("event-bus")))[i]("new-unread-messages", s, this)
    }
    var r, a, l, u, c;
    r = i.exports = (u || (u = e("lib/collection"))).extend({
        model: c || (c = e("models/conversation-message")),
        setup: function () {
            this.attachments = new(a || (a = e("collections/attachments")))(null, {
                conversationId: this.options.resource_id
            }), o.call(this, !0)
        },
        baseUrl: function () {
            return "me/conversations/" + this.options.resource_id + "/messages"
        },
        comparator: function (e, t) {
            return t.sentAt() - e.sentAt()
        },
        fetchUnread: function () {
            this.fetch({
                add: !0,
                url: this.baseUrl() + "?limit=10&linked_partitioning=1"
            })
        },
        getAttachments: function () {
            return this.attachments
        }
    }, {
        onCleanup: function (e) {
            o.call(e, !1), e.attachments.release()
        }
    })
}),
define("lib/views/form-controls/token-input", [], function (e, t, i) {
    function n() {
        return "." + this.options.tokenClassName.replace(/\s+/g, ".")
    }
    var s, o, r, a, l, u, c;
    s = i.exports = (c || (c = e("lib/view"))).extend(a || (a = e("lib/mixins/views/form-control")), r || (r = e("lib/mixins/views/combo-box")), {
        template: e("lib/views/form-controls/token-input.tmpl"),
        css: e("lib/views/form-controls/token-input.css"),
        className: "tokenInput",
        defaults: {
            allowFreeInputTokens: !0,
            label: null,
            size: "medium",
            placeholder: null,
            tokenClassName: "tokenInput__token",
            maxTokens: 1 / 0,
            type: "Tag",
            value: []
        },
        element2selector: {
            input: ".tokenInput__input",
            inputContainer: ".tokenInput__inputContainer",
            wrapper: ".tokenInput__wrapper",
            validation: ".tokenInput__validation"
        },
        events: {
            "click .tokenInput__wrapper": "onWrapperClick",
            "click .tokenInput__tokenRemove": "onTokenRemoveClick",
            "focus .tokenInput__input": "onInputFocus",
            "blur .tokenInput__input": "onInputBlur",
            "keydown .tokenInput__input": "onInputKeydown",
            "keyup .tokenInput__input": "onInputKeyup"
        },
        states: {
            focused: "focused",
            invalid: function (e) {
                this.$el.toggleClass("invalid", e), this.getElement("validation").toggleClass("g-input-message-hidden", !e)
            }
        },
        selectOnTab: !0,
        inputSelector: ".tokenInput__input",
        getRelativeElement: function () {
            return this.$el
        },
        getFocusableElement: function () {
            return this.getElement("input")
        },
        setup: function (e) {
            e.zIndexLevel && (this.zIndexLevel = e.zIndexLevel)
        },
        renderDecorate: function () {
            this.getElement("wrapper").addClass("sc-input-" + this.options.size), this.addInitialItems(), this.syncState()
        },
        addInitialItems: function () {
            var e = this.options.value;
            e && e.length && this.setFieldValue(e)
        },
        getDisplayValue: $.noop,
        addToken: function (t) {
            var i = this.getFieldValue().slice(),
                n = i.some(function (i) {
                    return (o || (o = e("underscore"))).isEqual(t, i)
                });
            t && !n && (i.push(t), this.setFieldValue(i)), this.getElement("input").focus()
        },
        removeToken: function (e) {
            var t = this.getFieldValue().slice(); - 1 === e && (e = t.length - 1), e < t.length && (t.splice(e, 1), this.setFieldValue(t)), this.getElement("input").focus()
        },
        fadeOutToken: function (e, t) {
            e.width(e.width()), this.addDeferred(setTimeout(e.addClass.bind(e, "hide"), 0)), this.addDeferred(setTimeout(t.bind(this), 300))
        },
        getInputValue: function () {
            return this.getElement("input").val().trim().replace(",", "")
        },
        createFreeInputToken: function () {
            var e = this.isMenuOpened(),
                t = this.selectedItemIndex + 1 >= this.getMenuItemCount();
            this.options.allowFreeInputTokens && this.inputHasQuery() && (e && t || !e) && this.addUserText(this.getInputValue()), this.emptyInput()
        },
        addUserText: function (e) {
            this.addToken(this.cleanUserText(e))
        },
        cleanUserText: (o || (o = e("underscore"))).identity,
        syncState: function () {
            var e, t, i, n;
            n = this.getElement("input"), e = this.getFieldValue(), i = this.options, n.toggleClass("g-hidden", e.length >= i.maxTokens), this.getState("invalid") && this.getMetaData().isValid && this.toggleState("invalid", !1), t = e.map(function (e) {
                return "string" != typeof e && (e = this.getDisplayValue(e)), this.getTokenHTML(e)
            }, this).join(""), this.$("." + i.tokenClassName.replace(/\s+/g, ".")).remove(), this.getElement("inputContainer").before(t)
        },
        onItemSelected: function (e) {
            this.emptyInput(), this.addUserText(e)
        },
        onInputBlur: function () {
            this.toggleState("focused", !1)
        },
        onInputFocus: function () {
            this.toggleState("focused", !0)
        },
        onInputKeydown: function (t) {
            switch (t.which) {
            case (u || (u = e("lib/keys"))).BACKSPACE:
                this.inputHasQuery() || (this.fadeOutToken(this.$(n.call(this)).last(), this.removeToken.bind(this, -1)), t.preventDefault());
                break;
            case (u || (u = e("lib/keys"))).ENTER:
            case (u || (u = e("lib/keys"))).TAB:
                this.inputHasQuery() && (this.createFreeInputToken(), t.preventDefault(), t.stopPropagation())
            }
        },
        onInputKeyup: function (t) {
            t.which === (u || (u = e("lib/keys"))).COMMA && this.createFreeInputToken()
        },
        onWrapperClick: function () {
            this.getElement("input").focus()
        },
        onTokenRemoveClick: function (e) {
            var t = $(e.target).closest(n.call(this)),
                i = t.index();
            this.fadeOutToken(t, this.removeToken.bind(this, i)), e.stopPropagation()
        },
        onFieldChange: function () {
            this.syncState()
        },
        onValidationChange: function (e) {
            this.getElement("validation").html(e.isValid ? "" : e.message), this.toggleState("invalid", !e.isValid)
        },
        getTokenHTML: function (t) {
            return '<div class="' + this.options.tokenClassName + '"><span class="sc-visuallyhidden">' + this.options.type + ": </span>" + (l || (l = e("vendor/handlebars-runtime"))).Utils.escapeExpression(t) + '<button class="tokenInput__tokenRemove sc-ir">Remove ' + this.options.type + " " + t + "</button></div>"
        }
    })
}),
define("collections/attachments", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (a || (a = e("lib/collection"))).extend(s || (s = e("lib/mixins/audio-source")), {
        model: r || (r = e("models/attachment")),
        next_href: !1,
        audibleAt: function (e) {
            var t = this.at(e);
            return t && t.getAudible()
        },
        getSourceInfo: function () {
            var t = (o || (o = e("models/conversation"))).instances.get(this.options.conversationId);
            return {
                type: "conversation",
                resourceType: "user",
                resourceId: t.getRecipient().id
            }
        },
        comparator: function (e) {
            return e.get("timestamp")
        }
    }, {
        hashFn: function (e, t) {
            return t && t.conversationId
        }
    })
}),
define("models/attachment", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = (r || (r = e("lib/model"))).extend({
        _audible: null,
        setup: function () {
            var t, i = this.get("urn");
            i && (t = (o || (o = e("lib/helpers/urn-helper"))).getAsAttributes(i), this._audible = new(s || (s = e("models/audible")))({
                resource_type: t.resource_type,
                id: t.id
            }), this.addSubmodel(this._audible))
        },
        getAudible: function () {
            return this._audible
        }
    })
}),
define("collections/user-audibles", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c;
    n = i.exports = (r || (r = e("lib/collection"))).extend({
        model: o || (o = e("models/audible")),
        defaults: {
            limit: 250,
            includePrivateSounds: !1
        },
        regex: null,
        setup: function () {
            this.playlistsCollection = new(a || (a = e("collections/user-playlists")))(null, {
                userId: this.options.userId,
                type: "playlists"
            }), this.playlistsCollection.next_href = null, this.playlistsCollection.setLimit(250), this.spotlightCollection = new(l || (l = e("collections/spotlight")))(null, {
                userId: this.options.userId
            })
        },
        baseUrl: function () {
            return (c || (c = e("lib/url"))).stringify({
                path: ["users", this.options.userId, "tracks"]
            })
        },
        filterByQuery: function (t, i) {
            return i = (s || (s = e("underscore"))).extend({
                excludeSpotlight: !1
            }, i), this.regex = t ? new RegExp("(^|[\\s.\\(\\)\\[\\]_-])(" + t.replace(/([.?*+\^$\[\]\\(){}\-])/g, "\\$1") + ")", "i") : null, this.filter(function (n) {
                var s = this.spotlightCollection.toJSON();
                return !(!this.options.includePrivateSounds && !n.isPublic() || t && !this.regex.test((u || (u = e("vendor/replace-diacritics/replace-diacritics")))(n.get("title"))) || i.excludeSpotlight && s.some(function (e) {
                    var t = e.playlist ? "playlist" : "track",
                        i = e.playlist || e.track;
                    return i.id === n.id && t === n.get("kind")
                }))
            }.bind(this))
        },
        getRegex: function () {
            return this.regex
        },
        fetch: function () {
            var t = arguments,
                i = $.Deferred();
            return this.playlistsCollection.fetch().done(function () {
                (r || (r = e("lib/collection"))).prototype.fetch.apply(this, t).done(i.resolve).fail(i.reject)
            }.bind(this)).fail(i.reject), i
        },
        parse: function (e) {
            return e.collection.concat(this.playlistsCollection.toJSON())
        }
    }, {
        hashFn: function (e, t) {
            return t.userId + "_audibles"
        },
        onCleanup: function (e) {
            e.playlistsCollection.release(), e.spotlightCollection.release()
        }
    })
}),
define("collections/user-playlists", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("collections/user-items"))).extend({
        model: s || (s = e("models/playlist")),
        defaults: {
            type: "playlists"
        }
    })
}),
define("lib/layouts/fluid-fixed", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/layout"))).extend({
        includeFooter: ".l-sidebar-right",
        css: e("lib/layouts/fluid-fixed.css"),
        template: e("lib/layouts/fluid-fixed.tmpl")
    })
}),
define("lib/layout", [], function (e, t, i) {
    var n, s, o, r, a, l, u, c, d, h;
    d = "l-footer", h = "views/footer/footer", n = i.exports = (r || (r = e("lib/backbone"))).View.extend({
        css: null,
        template: null,
        views: null,
        _currentViews: null,
        _viewPaths: null,
        slots: null,
        includeFooter: null,
        footerClassName: "sc-border-light-top",
        initialize: function () {
            this.views = {}, this._currentViews = {}
        },
        setArgs: function (e) {
            this.args = e || {}
        },
        setup: function () {
            var t = $.Deferred();
            return (s || (s = e("underscore"))).defer(t.resolve), t
        },
        dispose: function () {
            (s || (s = e("underscore"))).invoke(this._currentViews, "_dispose"), (s || (s = e("underscore"))).invoke(this.views, "_dispose"), this.$el.remove(), delete this.slots, delete this.views, delete this._viewPaths, delete this._currentViews
        },
        switchLayout: function (t) {
            t && ((s || (s = e("underscore"))).invoke(this._currentViews, "_dispose"), (s || (s = e("underscore"))).invoke(this.views, "_dispose"), this.template = t.template, this.includeFooter = t.includeFooter, this.slots = null, this.$el.empty())
        },
        render: function () {
            var t, i;
            return this.includeFooter && (t = this.views[d]), this.css && (o || (o = e("lib/css"))).insert(this.css), "" === this.el.innerHTML && ((u || (u = e("lib/template"))).render(this.template, {}, this.el), this.slots = {}, (s || (s = e("underscore"))).each(this.views, function (e, t) {
                this.slots[t] = this.$("." + t)[0]
            }, this)), (s || (s = e("underscore"))).each(this.views, function (e, t) {
                this._currentViews[t] !== e && (this._currentViews[t] && this._currentViews[t]._dispose(), e.render(), t !== d && this.slots[t].appendChild(e.el), this._currentViews[t] = e)
            }, this), i = this.$(this.includeFooter), t && !t.disposed && i[0] && i.append(t.$el.addClass(this.footerClassName)), c(), this.renderDecorate(), this
        },
        renderDecorate: $.noop,
        setViews: function (t) {
            this.includeFooter && (t[d] = [h]);
            var i = Object.keys(t),
                n = (s || (s = e("underscore"))).pluck(t, 0),
                o = $.Deferred();
            return (l || (l = e("lib/loader"))).load(n).done(function () {
                this._viewPaths = {}, (s || (s = e("underscore"))).each(arguments, function (e, s) {
                    var o = i[s],
                        r = t[o][1];
                    this._currentViews[o] && this._currentViews[o].isEquivalentTo(e, r) || (this.views[o] = new e(r)), this._viewPaths[o] = n[s]
                }, this)
            }.bind(this)).done(o.resolve).fail(o.reject), o
        },
        getChangeEventData: function (t) {
            var i = {};
            return (s || (s = e("underscore"))).each(this._viewPaths, function (e, t) {
                i[e] = this.views[t].constructorArguments
            }, this), {
                layoutName: t,
                views: i,
                args: this.args
            }
        },
        setTitle: function (t) {
            (a || (a = e("lib/helpers/title-helper"))).set(t)
        }
    }), c = function () {
        var e, t, i, n, s = window.history && window.history.state && window.history.state.scrollTop,
            o = document.documentElement,
            r = document.body;
        null != s ? (i = function () {
            t ? t = !1 : (clearTimeout(e), $(window).off("scroll", i), e = null)
        }, (n = function () {
            t = !0, o.scrollTop = r.scrollTop = s, (o.scrollTop || r.scrollTop) === s ? ($(window).off("scroll", i), e = null) : (e || $(window).on("scroll", i), e = setTimeout(n, 100))
        })()) : o.scrollTop = r.scrollTop = 0
    }
}),
define("lib/views/sticky-sidebar", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("lib/view"))).extend({
        relativeOffsetTop: null,
        absoluteOffsetTop: null,
        viewportHeight: null,
        pageHeight: null,
        sidebarHeight: null,
        fixedClassName: "l-fixed",
        scrolling: !1,
        isFixed: !1,
        scrollOffsetTop: 0,
        setup: function () {
            this.storeHeight = (s || (s = e("underscore"))).throttle(this.storeHeight, 1e3), this.onResizeHandler = (s || (s = e("underscore"))).debounce(this.onResizeHandler, 200), (s || (s = e("underscore"))).bindAll(this, "onScrollHandler", "onResizeHandler"), $(window).on("scroll", this.onScrollHandler).on("resize", this.onResizeHandler), this.whenInserted().done(function () {
                this.relativeOffsetTop = this.$el.parent().position().top, this.absoluteOffsetTop = this.$el.parent().offset().top, this.viewportHeight = this.getViewportHeight(), this.update()
            }.bind(this)), this.$el.addClass("sc-clearfix sc-browsers-enable-gpu")
        },
        dispose: function () {
            $(window).off("scroll", this.onScrollHandler).off("resize", this.onResizeHandler)
        },
        onScrollHandler: function () {
            this.scrolling || window.requestAnimationFrame(this.update.bind(this)), this.scrolling = !0
        },
        onResizeHandler: function () {
            this.viewportHeight = this.getViewportHeight()
        },
        update: function () {
            this.storeHeight();
            var e = window.pageYOffset,
                t = this.viewportHeight >= this.sidebarHeight,
                i = t,
                n = this.viewportHeight - this.sidebarHeight + (this.absoluteOffsetTop - this.relativeOffsetTop),
                s = n + e - this.absoluteOffsetTop >= 0,
                o = !t && this.pageHeight > this.sidebarHeight + this.absoluteOffsetTop && s;
            o && (i = !0, this.scrollOffsetTop !== n && (this.$el.css("top", n + "px"), this.scrollOffsetTop = n)), this.isFixed !== i && (this.$el.toggleClass(this.fixedClassName, i), this.isFixed = i), this.scrolling = !1
        },
        storeHeight: function () {
            this.disposed || (this.sidebarHeight = this.$el.height(), this.pageHeight = $(document).height())
        },
        getViewportHeight: function () {
            return this.viewportHeight = $(window).height() - (this.absoluteOffsetTop - this.relativeOffsetTop), this.viewportHeight
        }
    })
}),
define("lib/views/sidebar-module", [], function (e, t, i) {
    var n, s, o, r, a = 3;
    n = i.exports = (r || (r = e("lib/view"))).extend({
        template: e("lib/views/sidebar-module.tmpl"),
        css: e("lib/views/sidebar-module.css"),
        tagName: "article",
        className: "sidebarModule sc-border-light-bottom g-all-transitions-200-linear",
        element2selector: {
            content: ".sidebarContent",
            title: ".sidebarHeader__actualTitle"
        },
        states: {
            empty: "empty",
            collapsed: "collapsed"
        },
        moduleClassName: null,
        title: null,
        countableAttribute: null,
        countableName: null,
        countableNamePlural: null,
        iconClassName: null,
        moreText: null,
        moreLink: null,
        moreClassName: null,
        itemsPerRow: 1,
        itemMinHeight: null,
        contentMinHeight: null,
        Subview: null,
        subviewArgs: null,
        titleVariation: "light",
        renderDecorate: function () {
            var e = 0 === this.getCount();
            this.$el.addClass(this.moduleClassName), this.toggleState("empty", e), e || (this.updateTitle(), this.createSubview(), this.update())
        },
        getTemplateData: function () {
            return {
                no_items: 0 === this.getCount(),
                iconClassName: this.iconClassName,
                externalMore: this.moreLink && 0 !== this.moreLink.indexOf("/"),
                moreText: this.moreText,
                moreLink: this.moreLink,
                moreClassName: this.moreClassName,
                contentMinHeight: this.contentMinHeight ? this.contentMinHeight : this.itemMinHeight ? a * this.itemMinHeight : null,
                titleVariation: this.titleVariation
            }
        },
        getCount: function () {
            return this.model && this.countableAttribute && this.model.get(this.countableAttribute)
        },
        updateTitle: function () {
            var t = this.getCount();
            this.countableName && t ? this.title = (t || "&nbsp;") + " " + (o || (o = e("lib/helpers/lang-helper"))).plural(t, this.countableName, this.countableNamePlural) : this.countableName && (this.title = (o || (o = e("lib/helpers/lang-helper"))).capitalize((o || (o = e("lib/helpers/lang-helper"))).plural(2, this.countableName, this.countableNamePlural))), this.getElement("title").html(this.title)
        },
        update: function () {
            if (this.subviews.content) {
                var e, t, i, n, s = this.subviews.content,
                    o = s.options.maxDisplay || 0,
                    r = s.collection;
                if (r) {
                    if (e = r.isPopulated(), t = r.length, e && !t) return void this.hide();
                    this.show(), i = e ? Math.min(t, o) : o, n = this.contentMinHeight ? this.contentMinHeight : Math.ceil(i / this.itemsPerRow) * (this.itemMinHeight || 0), this.getElement("content").css({
                        minHeight: n
                    })
                }
            }
        },
        hide: function () {
            this.$el.hide()
        },
        show: function () {
            this.$el.show()
        },
        createSubview: function () {
            var t = this.addSubview(new this.Subview((s || (s = e("underscore"))).extend({
                resource_id: this.model && this.model.resource_id || this.options.resource_id,
                resource_type: this.model && this.model.resource_type || this.options.resource_type
            }, this.subviewArgs)), "content");
            t.on("update:collection", this.update, this), this.getElement("content").append(t.render().el)
        },
        onModelChange: function (t) {
            var i = (s || (s = e("underscore"))).all(t.changedAttributes(), function (e, i) {
                return i === this.countableAttribute && e > 0 && t.previousAttributes()[i] > 0
            }.bind(this));
            i ? this.updateTitle() : this.rerender()
        }
    })
}),
define("lib/layouts/one-column", [], function (e, t, i) {
    var n, s;
    n = i.exports = (s || (s = e("lib/layout"))).extend({
        includeFooter: ".l-one-column",
        css: e("lib/layouts/one-column.css"),
        template: e("lib/layouts/one-column.tmpl")
    })
}),
define("collections/interactors", [], function (e, t, i) {
    var n, s, o, r, a;
    n = i.exports = (r || (r = e("lib/collection"))).extend({
        actionName: null,
        defaults: {
            resource_id: null,
            resource_type: null
        },
        model: a || (a = e("models/user")),
        setup: function () {
            if (null === this.actionName) throw new Error("Interactors collection should define an action name the collection subscribes to.");
            this.listenToEvents(!0)
        },
        listenToEvents: function (t) {
            var i = t ? "on" : "off",
                n = (s || (s = e("underscore"))).result(this, "actionName"),
                r = this.options.resource_type,
                a = [n, "target", r, this.options.resource_id].join(":");
            (o || (o = e("lib/action-controller")))[i](a, this.onAction, this)
        },
        onAction: function (e) {
            if (e.state) this.add({
                id: e.origin
            }, {
                at: 0
            });
            else {
                var t = this.get(e.origin);
                t && this.remove(t)
            }
        }
    }, {
        onCleanup: function (e) {
            e.listenToEvents(!1)
        }
    })
}),
define("collections/suggested-users", [], function (e, t, i) {
    function n(e) {
        return "News" === e ? "News & Politics" : e
    }
    var s, o, r, a, l, u, c, d = new(a || (a = e("lib/persistent-store")))("rejected-suggested-users");
    s = i.exports = (l || (l = e("collections/user-followings"))).extend({
        defaults: {
            limit: 21,
            category: null,
            excludeFollowing: !0,
            view: null,
            shuffle: !1
        },
        model: u || (u = e("models/user-suggestion")),
        setup: function () {
            this.meIds = new(r || (r = e("models/followings"))), this.on("remove", this.onRemove, this)
        },
        baseUrl: function () {
            return (c || (c = e("lib/url"))).stringify({
                path: ["me", "suggested", "users", n(this.options.category)],
                query: this.options.view ? {
                    view: this.options.view
                } : {}
            })
        },
        fetch: function () {
            var t = arguments,
                i = $.Deferred();
            return this.meIds.fetch().done(function () {
                (l || (l = e("collections/user-followings"))).prototype.fetch.apply(this, t).done(i.resolve).fail(i.reject)
            }.bind(this)).fail(i.reject), i
        },
        getTokens: function () {
            return this.map(function (e) {
                return e.get("token")
            })
        },
        parse: function (t) {
            var i = t.collection;
            return this.options.shuffle && (i = (o || (o = e("underscore"))).shuffle(i)), this.next_href = !1, (o || (o = e("underscore"))).filter(i, function (e) {
                return !this.options.excludeFollowing || this.isValidUserSuggestion(e.user.id)
            }, this)
        },
        isValidUserSuggestion: function (e) {
            return !this.meIds.get(e) && !d.get(e)
        },
        onRemove: function (e) {
            d.set(e.id, !0)
        }
    }, {
        hashFn: function (e, t) {
            return t && t.category || 1
        }
    })
}),
define("collections/user-followings", [], function (e, t, i) {
    var n, s, o, r, a, l;
    n = i.exports = (r || (r = e("collections/user-items"))).extend({
        model: o || (o = e("models/user")),
        defaults: {
            limit: 3,
            type: "followings"
        },
        baseUrlQueryParams: {
            order: "username"
        },
        setup: function () {
            (r || (r = e("collections/user-items"))).prototype.setup.apply(this, arguments), l.call(this, !0)
        }
    }, {
        onCleanup: function (e) {
            l.call(e, !1)
        }
    }), l = function (t) {
        var i = t ? "on" : "off";
        (s || (s = e("lib/action-controller")))[i]("follow:origin:user:" + this.options.userId, a, this)
    }, a = function (e) {
        var t;
        e.state ? this.add({
            id: e.target
        }, {
            at: 0
        }) : (t = this.get(e.target), t && this.remove(t))
    }
}),
define("models/user-suggestion", [], function (e, t, i) {
    var n, s, o;
    n = i.exports = (o || (o = e("lib/model"))).extend({
        submodelMap: {
            user: s || (s = e("models/user"))
        },
        urnPrefix: "soundcloud:users",
        hasDataForView: function () {
            return !0
        },
        getUser: function () {
            return (s || (s = e("models/user"))).instances.get(this.get("user").id)
        },
        parse: function (e) {
            return e.origin && (e.user = e.origin, delete e.origin), e.user && (e.id = e.user.id), e
        },
        isPromoted: function () {
            return "promoted" === this.get("source") || "promoted" === this.get("campaign")
        }
    })
}),
define("lib/mixins/collections/promoted-collection", [], function (e, t, i) {
    var n, s, o, r;
    n = i.exports = new(r || (r = e("lib/mixin")))({
        requires: ["adZone"],
        around: {
            fetch: function (t, i) {
                return i = (s || (s = e("underscore"))).defaults({
                    xhrFields: {
                        withCredentials: !0
                    }
                }, i), t(i)
            },
            parse: function (e, t) {
                return e(t.promoted.map(function (e) {
                    return {
                        campaign: "promoted",
                        origin: e.data,
                        kind: e.data.kind,
                        tracking: e.tracking,
                        promoted_by: e.promoted_by_user
                    }
                }))
            }
        },
        defaults: {
            parse: function (e) {
                return e
            }
        },
        override: {
            url: function () {
                return null !== this.next_href ? this.next_href : (o || (o = e("lib/integrations/adswizz"))).getAdUrl(this.adZone, (s || (s = e("underscore"))).result(this, "adZoneParams"))
            }
        }