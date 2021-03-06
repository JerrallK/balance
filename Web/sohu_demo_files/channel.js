/** m.tv.sohu.com, v1.0.0 ,time  20140728 11:16:45, sohu inc */
var ENABLE_DEBUG = !1,
    API_KEY = "f351515304020cad28c92f70f002261c",
    API_URL = "/api/",
    API_PARAMS = {
        api_key: API_KEY,
        plat: "17",
        sver: "4.0",
        partner: "78"
    },
    API_PROXY_URL = "http://m.tv.sohu.com/api/",
    H5_URL = "http://h5.tv.sohu.com/",
    H5_TEST_URL = "http://h5.tv.sohu.com/";
ENABLE_DEBUG && (H5_URL = "http://t.m.tv.sohu.com/"), "undefined" == typeof ENABLE_DEBUG && (ENABLE_DEBUG = 1);
var DEBUG = ENABLE_DEBUG = !1,
    Channeled = "",
    GlobalVideoDatas = {},
    DOC = document,
    WIN = window,
    UNDEFINED = void 0,
    IsTouch = "ontouchstart" in WIN,
    UA = WIN.navigator.userAgent,
    AdrPadRegex = /pad|XiaoMi\/MiPad|lepad|MediaPad|GT-P|SM-T|sch-i800|Nexus\s7|Nexus\s8|Nexus\s11|Kindle Fire HD|Tablet/i,
    IsAndroid = !(!/Android|HTC|Adr/i.test(UA) && !(WIN.navigator.platform + "").match(/Linux/i)),
    IsAndroidPad = !(!IsAndroid || !AdrPadRegex.test(UA)),
    IsIPad = !IsAndroid && /iPad/i.test(UA),
    IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA),
    IsIOS = IsIPad || IsIPhone,
    IsWindowsPhone = /Windows Phone/i.test(UA),
    IsWindowsPad = /Windows Pad/i.test(UA),
    IsBlackBerry = /BB10|BlackBerry/i.test(UA),
    IsIEMobile = /IEMobile/i.test(UA),
    IsSymbian = /Symbian/i.test(UA),
    IsIE = !!DOC.all,
    IsSafari = !(!UA.match(/Safari/i) || IsAndroid),
    IsChrome = !(!UA.match(/Chrome/i) || IsAndroid),
    IsWeixin = !(!WIN.WeixinJSBridge && !/MicroMessenger/i.test(UA)),
    IsQQ = !!/MQQBrowser/i.test(UA),
    IsUC = !!/UCBrowser/i.test(UA),
    IsMi = !!/MiuiBrowser/i.test(UA),
    IsBaidu = !!/baidubrowser/i.test(UA),
    PixelRatio = parseFloat(WIN.devicePixelRatio) || 1,
    MAX_TOUCHMOVE_DISTANCE_FOR_CLICK = IsAndroid ? 10 : 6,
    START_EVENT = IsTouch ? "touchstart" : "mousedown",
    MOVE_EVENT = IsTouch ? "touchmove" : "mousemove",
    END_EVENT = IsTouch ? "touchend" : "mouseup",
    RESIZE_EVENT = "onorientationchange" in WIN ? "orientationchange" : "resize",
    CANCEL_EVENT = IsTouch ? "touchcancel" : "mouseup",
    CssTransitions = "WebKitTransitionEvent" in WIN,
    CssHas3d = "WebKitCSSMatrix" in WIN && "m11" in new WebKitCSSMatrix,
    RequestAnimationFrame = "webkitRequestAnimationFrame" in WIN,
    AndroidApk = "",
    DownloadLink = "",
    StartClient, getDevicePixelRatio = function() {
        var a = 1;
        try {
            a = void 0 !== window.screen.systemXDPI && void 0 !== window.screen.logicalXDPI && window.screen.systemXDPI > window.screen.logicalXDPI ? window.screen.systemXDPI / window.screen.logicalXDPI : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : window.devicePixelRatio, a = parseFloat(a) || 1
        } catch (b) {}
        return a
    };
PixelRatio = getDevicePixelRatio();
var IsShouSou = location.host.indexOf("m.sohu.com") > -1,
    ScreenSizeCorrect = 1,
    isGpad = function() {
        var a = 1,
            b = !1,
            c = 1,
            d = Math.floor(window.screen.width * c),
            e = Math.floor(window.screen.height * c),
            f = 1;
        try {
            a = Math.sqrt(d * d + e * e), f = parseFloat(a / (160 * PixelRatio))
        } catch (g) {}
        if ("ontouchstart" in window && IsAndroid) {
            var h = !!AdrPadRegex.test(UA);
            h ? b = !0 : !b && (a >= 2500 || f > 7.8) && (b = !0)
        }
        return b
    };
if (IsAndroidPad = isGpad(), String.prototype.hasOwnProperty("trim") || (String.prototype.trim = function() {
    return this.replace(/^(\s|\r|\n|\r\n)*|(\s|\r|\n|\r\n)*$/g, "")
}), Function.prototype.hasOwnProperty("bind") || (Function.prototype.bind = function(a) {
    var b = this,
        c = arguments.length > 1 ? Array.slice(arguments, 1) : null;
    return function() {
        return b.apply(a || this, c)
    }
}), !IsTouch && IsIE) try {
    DOC.execCommand("BackgroundImageCache", !1, !0)
} catch (e) {
    console.log("BackgroundImageCache hover", e)
}
IsAndroid && (WIN.screen.width / WIN.innerWidth).toFixed(2) == PixelRatio.toFixed(2) && (ScreenSizeCorrect = 1 / PixelRatio);
var APP_VER = {
        android: {
            version: "4.0.2",
            tip: "手势操作，更佳观影体验"
        },
        ios: {
            version: "4.0.2",
            tip: "手势操作，更佳观影体验"
        }
    },
    IS_EXTERNAL_PLAYER = !1;
(location.href.match(/player=1/i) || location.host.indexOf("m.sohu.com") > -1) && (IS_EXTERNAL_PLAYER = !0);
var IsUC = !1;
(UA.match(/ UC(Browser)?/i) || UA.match(/compatible;Android/i)) && (UA.match(/ LT15i /i) || (IsUC = !0));
var IsQQBrowser = UA.match(/MQQBrowser/i),
    h5Src = "",
    WebRoot = "";
"m.s.sohu.com" == location.host && (WebRoot = "http://m.tv.sohu.com");
var SetListVersion = "20131229",
    BlankFn = function() {};
ENABLE_DEBUG && URL.getQueryString("wx") && (IsWeixin = !0);
var H5Channeled = IsWeixin ? "1200230001" : "1211010100",
    LOC = location,
    IsUC = !1;
(UA.match(/ UC(Browser)?/i) || UA.match(/compatible;Android/i)) && (UA.match(/ LT15i /i) || (IsUC = !0));
var IsShouSou = location.host.indexOf("m.sohu.com") > -1,
    hasClass = function(a, b) {
        return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
    },
    addClass = function(a, b) {
        -1 == (" " + a.className + " ").indexOf(" " + b + " ") && (a.className = "" === a.className ? b : a.className + " " + b)
    },
    removeClass = function(a, b) {
        var c, d;
        if (-1 != a.className.indexOf(b)) {
            for (c = a.className.split(" "), d = c.length - 1; d >= 0; d--) c[d] === b && c.splice(d, 1);
            a.className = c.join(" ")
        }
    },
    toggleClass = function(a, b) {
        hasClass(a, b) ? removeClass(a, b) : addClass(a, b)
    },
    onDomReady = function(a) {
        var b = window,
            c = document,
            d = !1,
            e = -1,
            f = 10,
            g = /loaded|complete/,
            h = "DOMContentLoaded",
            i = "onreadystatechange",
            j = "onload",
            k = function() {
                d === !1 && (d = !0, a && a()), b.clearInterval(e)
            },
            l = function() {
                e = b.setInterval(function() {
                    try {
                        c.documentElement.doScroll("left"), k()
                    } catch (a) {}
                }, f)
            },
            m = function() {
                e = b.setInterval(function() {
                    g.test(c.readyState) && k()
                }, f)
            };
        return g.test(c.readyState) ? (d = !0, !1) : (c.addEventListener ? (c.addEventListener(h, function() {
            c.removeEventListener(h, arguments.callee, !1), k()
        }, !1), m()) : c.attachEvent ? (c.attachEvent(i, function() {
            g.test(c.readyState) && (c.detachEvent(i, arguments.callee), k())
        }), b.attachEvent(j, function() {
            b.detachEvent(j, arguments.callee), k()
        }), !c.documentElement.doScroll || null !== b.frameElement && "undefined" != typeof b.frameElement || l()) : b[j] = function() {
            k()
        }, !0)
    };
window.onDomReady = onDomReady;
var URL = {
    getQueryData: function(a) {
        a = a.replace(/^\?+/, "").replace(/&amp;/, "&");
        for (var b, c = a.split("&"), d = c.length, e = {}; d--;)
            if (b = c[d].split("="), b[0]) {
                var f = b[1] || "";
                try {
                    f = decodeURIComponent(f)
                } catch (g) {
                    f = unescape(f)
                }
                e[decodeURIComponent(b[0])] = f
            }
        return e
    },
    getQueryString: function(a, b) {
        var c, d = b ? URL.getElSearchString(b) : window.location.search.substring(1);
        return c = URL.getQueryData(d), a in c ? c[a] : null
    },
    getParam: function(a) {
        var b = new RegExp("(^|&?)" + a + "=([^&]*)(&|$)", "i"),
            c = window.location.search.substr(1).match(b);
        return null !== c ? unescape(c[2]) : null
    },
    getElSearchString: function(a) {
        var a = $(a).get(0),
            b = a.search || "";
        if (!b) {
            var c = a.getAttribute("FORM" == a.nodeName ? "action" : "href"),
                d = c.indexOf("?"); - 1 !== d && (b = c.slice(d))
        }
        return b
    },
    setQueryString: function(a, b) {
        var c, d, a = $(a),
            e = a.get(0),
            f = e.search,
            g = f || "";
        if (!f) {
            var h, i = e.nodeName;
            if ("FORM" == i) {
                if ("post" != e.method.toLowerCase()) {
                    for (c in b) {
                        d = b[c];
                        var j = $('input[name="' + c + '"]', a);
                        j ? j.val(d) : a.append($('<input type="hidden" name="' + c + '" value="' + d + '" />'))
                    }
                    return
                }
                h = a.attr("action") || location.href + ""
            } else h = a.attr("href") || location.href + "";
            var k = h.indexOf("?"),
                l = h.indexOf("#"); - 1 == l && (l = h.length), 0 > k || k > l ? (g = "", k = l) : g = h.slice(k + 1, l)
        }
        var m = URL.getQueryData(g),
            n = [];
        for (c in b) m[c] = b[c];
        for (c in m) d = m[c], n.push(c + (d ? "=" + encodeURIComponent(d) : ""));
        if (!(n.length < 1)) {
            var o = "?" + n.join("&");
            if (f) e.search = o;
            else {
                var p = "FORM" == i ? "action" : "href";
                a.attr(p, h.slice(0, k) + o + h.slice(l))
            }
        }
    },
    objToQueryString: function(a) {
        var b, c, d, e = [];
        for (b in a)
            if (c = a[b], c instanceof Array)
                for (d = c.length; d--;) e.push(b + "[]=" + encodeURIComponent(c[d]));
            else e.push(b + "=" + encodeURIComponent("undefined" == typeof c ? "" : c));
        return e.join("&")
    }
};
URL.updateGlobalParms = function(a, b) {
        for (var c, d, e = $("a[href],form", a), f = e.length, b = b || URL.URLGlobalParms; f--;) c = e.get(f), d = c.href, d && d.match(/^(sms|tel|mail)/i) || URL.setQueryString(c, b)
    },
    function(a, b, c) {
        URL.init = function() {
            var a, c = ["clientType", "clientVer", "actionVer", "plat", "startClient", "useVideoLink", "r", "player"],
                d = URL.getQueryData(location.search.substring(1)),
                e = {},
                f = 0;
            IS_EXTERNAL_PLAYER && c.push("channeled");
            for (var g = c.length; g--;) a = c[g], d.hasOwnProperty(a) && (e[a] = d[a], f++);
            URL.URLGlobalParms = e, f > 0 && (URL.updateGlobalParms(b, e), Notification.reg("DOM.html", URL.updateGlobalParms))
        }, c.fn.param = function(a) {
            return URL.objToQueryString(a)
        }, c.fn.getUrlParam = function(a, b) {
            return URL.getQueryString(a, b)
        }
    }(window, document, Zepto);
var Cookie = {
    isEnabled: !1,
    set: function(a, b, c, d) {
        var e = "";
        if (0 !== c) {
            var f = new Date;
            f.setTime(f.getTime() + 36e5 * (c || 24)), e = ";expires=" + f.toGMTString()
        }
        var g = escape(a) + "=" + escape(b) + e + ";path=/" + (d ? ";domain=" + d : "");
        return document.cookie = g, !0
    },
    getByName: function(a) {
        var b = new RegExp("(?:^|;+|\\s+)" + a + "=([^;]*)"),
            c = document.cookie.match(b);
        return c ? c[1] : ""
    },
    get: function(a) {
        for (var b, c = document.cookie.split(";"), d = 0; d < c.length; d++)
            if (b = c[d].split("="), b[0].trim() == a) return unescape(b[1]);
        return ""
    },
    del: function(a, b, c) {
        var d = new Date;
        d.setTime(d.getTime() - 1), document.cookie = a + "=; expires=" + d.toGMTString() + ";" + (c ? "path=" + c + "; " : "path=/; ") + (b ? "domain=" + b + ";" : "domain=" + window.location.host + ";")
    },
    remove: function(a) {
        this.set(a, "", -1e3)
    },
    test: function() {
        var a = "_c_t_";
        return this.set(a, "1"), this.isEnabled = "1" === this.get(a), this.remove(a), this.isEnabled
    },
    setSession: function(a, b) {
        try {
            window.sessionStorage && window.sessionStorage.setItem(a, b)
        } catch (c) {
            console.log("not support session", c), this.set(a, b, 24)
        }
    },
    getSession: function(a) {
        var b = "";
        try {
            window.sessionStorage && (b = window.sessionStorage.getItem(a))
        } catch (c) {
            console.log("not support session", c), b = this.get(a)
        }
        return b
    }
};
if (Cookie.test(), URL && Cookie) {
    var _mtvsrc = h5Src = URL.getQueryString("src") || URL.getQueryString("SRC") || "";
    h5Src && Cookie.set("MTV_SRC", h5Src, 86400, ".m.tv.sohu.com"), h5Src = Cookie.get("MTV_SRC") || _mtvsrc
}! function(a) {
    "use strict";

    function b() {
        try {
            return f in a && a[f]
        } catch (b) {
            return !1
        }
    }
    var c, d = {},
        e = a.document,
        f = "localStorage",
        g = "script",
        h = d;
    if (d.disabled = !1, d.set = function() {}, d.get = function() {}, d.remove = function() {}, d.clear = function() {}, d.transact = function(a, b, c) {
        var e = d.get(a);
        null === c && (c = b, b = null), "undefined" == typeof e && (e = b || {}), c(e), d.set(a, e)
    }, d.getAll = function() {}, d.forEach = function() {}, d.serialize = function(a) {
        return JSON.stringify(a)
    }, d.deserialize = function(a) {
        if ("string" != typeof a) return void 0;
        try {
            return JSON.parse(a)
        } catch (b) {
            return a || void 0
        }
    }, b()) c = a[f], d.set = function(a, b) {
        return void 0 === b ? d.remove(a) : (c.setItem(a, d.serialize(b)), b)
    }, d.get = function(a) {
        return d.deserialize(c.getItem(a))
    }, d.remove = function(a) {
        c.removeItem(a)
    }, d.clearAll = function() {
        c.clear()
    }, d.getAll = function() {
        var a = {};
        return d.forEach(function(b, c) {
            a[b] = c
        }), a
    }, d.forEach = function(a) {
        for (var b = 0; b < c.length; b++) {
            var e = c.key(b);
            a(e, d.get(e))
        }
    };
    else if (e.documentElement.addBehavior) {
        var i, j;
        try {
            j = new ActiveXObject("htmlfile"), j.open();
            var k = "<" + g + ">document.w=window</" + g + ">";
            k += '<iframe src="/favicon.ico"></iframe>', j.write(k), j.close(), i = j.w.frames[0].document, c = i.createElement("div")
        } catch (l) {
            c = e.createElement("div"), i = e.body
        }
        var m = function(a) {
                var b = function() {
                    var b = Array.prototype.slice.call(arguments, 0);
                    b.unshift(c), i.appendChild(c), c.addBehavior("#default#userData"), c.load(f);
                    var e = a.apply(d, b);
                    return i.removeChild(c), e
                };
                return b
            },
            n = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
            o = function(a) {
                return a.replace(/^d/, "___$&").replace(n, "___")
            };
        d.set = m(function(a, b, c) {
            return b = o(b), void 0 === c ? d.remove(b) : (a.setAttribute(b, d.serialize(c)), a.save(f), c)
        }), d.get = m(function(a, b) {
            return b = o(b), d.deserialize(a.getAttribute(b))
        }), d.remove = m(function(a, b) {
            b = o(b), a.removeAttribute(b), a.save(f)
        }), d.clear = m(function(a) {
            var b = a.XMLDocument.documentElement.attributes;
            a.load(f);
            for (var c = 0, d = b.length; d > c; c++) {
                var e = b[c];
                a.removeAttribute(e.name)
            }
            a.save(f)
        }), d.getAll = function() {
            var a = {};
            return d.forEach(function(b, c) {
                a[b] = c
            }), a
        }, d.forEach = m(function(a, b) {
            for (var c = a.XMLDocument.documentElement.attributes, e = 0, f = c.length; f > e; e++) {
                var g = c[e];
                b(g.name, d.deserialize(a.getAttribute(g.name)))
            }
        })
    }
    try {
        var p = "__storejs__";
        d.set(p, p), d.get(p) !== p && (d.disabled = !0), d.remove(p)
    } catch (l) {
        d.disabled = !0
    }
    d.enabled = !d.disabled, "undefined" != typeof module && module.exports && this.module !== module ? module.exports = d : "function" == typeof define && define.amd ? define(d) : a.Storage = d, h.getStorage = function() {
        var b;
        try {
            b = a.localStorage
        } catch (c) {
            ENABLE_DEBUG && alert("localStorage is not supported")
        }
        return h.getStorage = function() {
            return a.localStorage
        }, b
    }, h.clear = function(a) {
        var b = h.getStorage();
        if (b)
            if (a)
                for (var c in b) 0 === c.indexOf(a) && b.removeItem(c);
            else b.clear()
    }
}(this);
var WIN = window,
    DOC = document,
    Util = {
        pingback: function(a, b) {
            if (a)
                for (var c = a.split("|"), d = 0, e = c.length; e > d; d++)(new Image).src = c[d], ENABLE_DEBUG && void 0 !== b && (ADPingbackCount++, console.log("第" + ADPingbackCount + "个上报,第" + b + "秒:", c[d]))
        },
        getOSVersion: function() {
            var a = 0;
            if (IsIOS) {
                var b = UA.match(/os ([0-9_]+)/i);
                b && b[1] && (a = Util.getVersionNumber(b[1]))
            } else a = IsAndroid ? Util.getAndroidVersionNumber() : "4.0.1";
            return a
        },
        getAndroidVersionNumber: function() {
            var a = UA.match(/android(.*?);/i) || [];
            return a[1] || 0
        },
        getVersionNumber: function(a) {
            var b = a.replace(/_/g, ".").replace(/^([0-9]+\.[0-9]+)[0-9\.]*/, "$1");
            return parseFloat(b || 0)
        },
        timeFromNow: function(a) {
            var b = 60,
                c = 60 * b,
                d = 24 * c,
                e = 30 * d,
                f = 12 * e;
            return a = (+new Date - parseInt(a)) / 1e3, a >= f ? Math.floor(a / f) + "年前" : a >= e ? Math.floor(a / e) + "个月前" : a >= d ? Math.floor(a / d) + "天前" : a >= c ? Math.floor(a / c) + "小时前" : a >= b ? Math.floor(a / b) + "分钟前" : "刚刚"
        },
        getTotalMonth: function(a) {
            var b = new Date(a);
            return 12 * b.getFullYear() + b.getMonth()
        },
        secondsToTime: function(a) {
            var b = parseInt(a);
            isNaN(b) && (b = 0);
            var c = Math.floor(b / 60),
                a = b % 60;
            if (10 > a && (a = "0" + a), 60 > c) return 10 > c && (c = "0" + c), c + ":" + a;
            var d = Math.floor(c / 60);
            return c %= 60, 10 > c && (c = "0" + c), 10 > d && (d = "0" + d), d + ":" + c + ":" + a
        },
        secondsToTimeText: function(a) {
            var b = parseInt(a);
            isNaN(b) && (b = 0);
            var c = Math.floor(b / 60),
                a = b % 60 + "秒";
            if (60 > c) return (c > 0 ? c + "分" : "") + a;
            var d = Math.floor(c / 60);
            return c %= 60, (d > 0 ? d + "小时" : "") + c + "分" + a
        },
        shortCount: function(a) {
            return a = parseInt(a), a > 1e8 ? a = Math.floor(a / 1e8) + "亿" : a > 1e4 && (a = Math.floor(a / 1e4) + "万"), a
        },
        dateString: function(a) {
            var b;
            return (b = a.match(/([0-9]{4}\-[0-9]+\-[0-9]+)/)) && (a = b[1]), a
        },
        setLoad: function(a) {
            var a = $(a);
            return a.hasClass("_load_inited") || a.addClass("_load_inited").append($('<i class="ui_loading"><u></u><u></u><u></u></i>')), a
        },
        loadScript: function(a, b, c) {
            var d = DOC.getElementsByTagName("head")[0] || DOC.body,
                e = DOC.createElement("script"),
                f = !1;
            e.src = a, e.onload = e.onreadystatechange = function() {
                f || this.readyState && "loading" === this.readyState || (f = !0, b && b.apply(null, c || []), e.onload = e.onreadystatechange = null, d.removeChild(e))
            }, d.appendChild(e)
        },
        formatURL: function(a) {
            return (a + "").replace(/^https?:\/\/(my\.|v\.)?tv\./i, "http://m.tv.").replace("http://s.", "http://m.s.").replace("http://m.s.", "http://m.tv.").replace(/^http:\/\/(video\.)?2012/i, "http://m.s")
        },
        getPageOffset: function() {
            return WIN.pageYOffset || DOC.body && DOC.body.scrollTop || 0
        },
        getDownloadAppLink: function(a, b) {
            var c = (window.location.href, Cookie.get("MTV_SRC") || "0");
            c = c.substr(0, 4);
            var d = "/h5/cooperation/" + c + ".json?pos=1&platform=" + Util.getUserPt() + "&callback=?";
            $.ajax({
                url: d,
                type: "get",
                dataType: "JSONP",
                success: function(c) {
                    if (c && c.records.length > 0) {
                        var d = c.records[0].link,
                            e = $("#new_ad_appdownload")[0];
                        e && (e.href = d)
                    }
                    var f;
                    IsIPhone ? 1 == URL.getQueryString("isappinstalled") ? (d = "sohuvideo://", (f = WIN.VideoData) && (d += "action.cmd?action=1.1&vid=" + f.vid + "&cid=" + f.cid + "&sid=" + f.sid + "&cateCode=" + f.cateCode)) : d = d || "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8" : IsIPad ? d = d || "https://itunes.apple.com/cn/app/sou-hu-shi-pin-hd/id414430589?mt=8" : IsAndroid ? d = "string" == typeof a ? a : IsAndroidPad ? d || "http://upgrade.m.tv.sohu.com/channels/hdv/3.5/SohuTV_3.5.0_680_201406191825.apk" : d || "http://upgrade.m.tv.sohu.com/channels/hdv/4.3.1/SohuTV_4.3.1_680_201407080857.apk" : IsWindowsPhone && (d = d || "http://www.windowsphone.com/zh-CN/apps/403faf93-d22c-4331-ac32-9560ee9fac94");
                    var g = h5Src && 0 === h5Src.indexOf("1073");
                    if (IsAndroid && g) {
                        var h;
                        if (f = window.VideoData) {
                            var i = player && player.videoData.urls.downloadUrl;
                            i > 0 && (i = i[0] || ""), h = "xgm://m.tv.sohu.com/download/video?vid=" + f.vid + "&aid=" + f.sid + "&video_order=" + f.videoOrder + "&video_name=" + (f.video_name || f.tvname) + "&url_down=" + i + "&hor_high_pic=" + f.horHighPic + "&isSohuFormat=0"
                        }
                        d = h
                    }
                    return a && a(d), void 0 != b && b(d), d
                }
            })
        },
        getDownloadAppLinkIndex: function(a) {
            var b, c = "http://m.tv.sohu.com/app";
            return IsIPhone ? 1 == URL.getQueryString("isappinstalled") ? (c = "sohuvideo://", (b = WIN.VideoData) && (c += "action.cmd?action=1.1&vid=" + b.vid + "&cid=" + b.cid + "&sid=" + b.sid + "&cateCode=" + b.cateCode)) : c = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8" : IsIPad ? c = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-hd/id414430589?mt=8" : IsAndroid ? (c = IsAndroidPad ? a || "http://upgrade.m.tv.sohu.com/channels/hdv/3.5/SohuTV_3.5.0_680_201406191825.apk" : a || "http://upgrade.m.tv.sohu.com/channels/hdv/4.3.1/SohuTV_4.3.1_680_201407080857.apk", IS_EXTERNAL_PLAYER && DOC.referrer.match(/m\.sohu\.com/i) && (c = "http://upgrade.m.tv.sohu.com/channels/hdv/862/4.0.2/SohuTV_4.0.2_862_201403121205.apk")) : IsWindowsPhone && (c = "http://www.windowsphone.com/zh-CN/apps/403faf93-d22c-4331-ac32-9560ee9fac94"), IsWeixin && (c = "http://a.app.qq.com/o/simple.jsp?pkgname=com.sohu.sohuvideo&g_f=991881"), c
        },
        appLink: function() {
            function a(a) {
                setTimeout(function() {
                    location.href = b.attr("href") || a
                }, 50)
            } {
                var b = $(this);
                b.attr("channel")
            }
            return ClickTrace.pingback(b), Util.getDownloadAppLink(a), !1
        },
        appLinkForDiors: function() {
            function a(a) {
                setTimeout(function() {
                    location.href = a
                }, 50)
            }
            var b = ($(this), h5Src),
                c = "";
            switch (String(b)) {
                case "433":
                    c = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_433_201403101517.apk";
                    break;
                case "435":
                case "1001|1100":
                    c = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_435_201403101517.apk";
                    break;
                case "1028|1100":
                    c = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_436_201403101517.apk";
                    break;
                default:
                    c = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_983_201403101517.apk"
            }
            return Util.getDownloadAppLink(c, a), !1
        },
        getConnectionType: function() {
            var a, b = window.navigator.connection,
                c = "";
            return b && (a = b.type, a == b.CELL_2G ? c = "2g" : a == b.CELL_3G ? c = "3g" : a == b.WIFI && (c = "wifi")), c
        },
        _isMeizu: !1,
        isMeizu: function() {
            var a = !1;
            if (IsAndroid)
                if (IsUC || IsQQBrowser || !UA.match(/(M9|M032) Build/i)) {
                    if (UA.match(/Mac OS X/i) && !IsUC) {
                        var b = WIN.screen.width,
                            c = WIN.screen.height;
                        (640 == b || 960 == b || 320 == b && 410 == c || 410 == b && 320 == c) && (a = !0)
                    }
                } else a = !0;
            return Util._isMeizu = a, Util.isMeizu = function() {
                return Util._isMeizu
            }, a
        },
        fixVideoMask: function() {
            IsAndroid && (IsUC || IsQQBrowser) && (SohuMobilePlayer.pause(), Util.shaveWindow())
        },
        shaveWindow: function() {
            return WIN.scrollTo(0, Util.getPageOffset() + 1)
        },
        formatDateWithBar: function(a) {
            var a = a || new Date,
                b = a.getMonth() + 1,
                c = a.getDate();
            return b.toString().length < 2 && (b = "0" + b), c.toString().length < 2 && (c = "0" + c), a.getFullYear() + "-" + b + "-" + c
        },
        getDownloadURL: function(a) {
            a = a || "";
            var b = a.indexOf(".mp4");
            return b > -1 && (URL.getQueryString("src") || Cookie.get("src")) && (a = a.replace("plat=17", "plat=3")), a
        },
        getUserPt: function() {
            var a = 1;
            return IsIPad && (a = 2), IsIPhone && (a = 3), IsAndroid && (a = 5, /tv/i.test(UA) && (a = 6)), IsAndroidPad && (a = 4), IsWindowsPad && (a = 7), IsWindowsPhone && (a = 8), IsSymbian && (a = 9), a
        }
    },
    EncodeUtil = {
        utf8to16: function(a) {
            var b, c, d, e, f, g, h, i, j;
            for (b = [], e = a.length, c = d = 0; e > c;) {
                switch (f = a.charCodeAt(c++), f >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        b[d++] = a.charAt(c - 1);
                        break;
                    case 12:
                    case 13:
                        g = a.charCodeAt(c++), b[d++] = String.fromCharCode((31 & f) << 6 | 63 & g);
                        break;
                    case 14:
                        g = a.charCodeAt(c++), h = a.charCodeAt(c++), b[d++] = String.fromCharCode((15 & f) << 12 | (63 & g) << 6 | 63 & h);
                        break;
                    case 15:
                        switch (15 & f) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                                g = a.charCodeAt(c++), h = a.charCodeAt(c++), i = a.charCodeAt(c++), j = (7 & f) << 18 | (63 & g) << 12 | (63 & h) << 6 | (63 & i) - 65536, b[d] = j >= 0 && 1048575 >= j ? String.fromCharCode(j >>> 10 & 1023 | 55296, 1023 & j | 56320) : "?";
                                break;
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                                c += 4, b[d] = "?";
                                break;
                            case 12:
                            case 13:
                                c += 5, b[d] = "?"
                        }
                }
                d++
            }
            return b.join("")
        },
        b64_decodex: function(a) {
            var b, c, d = [],
                e = "";
            for (b = 0, c = a.length; c > b; b += 4) e += EncodeUtil.b64_423(a.substr(b, 4));
            for (b = 0, c = e.length; c > b; b += 8) d += EncodeUtil.b2i(e.substr(b, 8));
            return d
        },
        b64_423: function(a) {
            for (var b = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"), c = 0, d = a.length, e = ""; d > c; c++) {
                for (var f = 0; 64 > f; f++)
                    if (a.charAt(c) == b[f]) {
                        var g = f.toString(2);
                        e += ("000000" + g).substr(g.length);
                        break
                    }
                if (64 == f) return 2 == c ? e.substr(0, 8) : e.substr(0, 16)
            }
            return e
        },
        b2i: function(a) {
            for (var b = 0, c = 128, d = 0; 8 > d; d++, c /= 2) "1" == a.charAt(d) && (b += c);
            return String.fromCharCode(b)
        }
    },
    Passport = function() {
        var a, b = {},
            c = function() {
                var a, b, c, d = ["ppinf", "ppinfo", "passport"];
                for (a = 0, b = d.length; b > a; a++)
                    if (c = new RegExp("\\b" + d[a] + "\\b=(.*?)(?:$|;)").exec(document.cookie), c && c.length) {
                        c = c[1];
                        break
                    }
                return c
            },
            d = function(a) {
                var b = "";
                try {
                    a = unescape(a).split("|"), ("1" == a[0] || "2" == a[0]) && (b = EncodeUtil.utf8to16(EncodeUtil.b64_decodex(a[3])))
                } catch (c) {}
                return b
            },
            e = function(a) {
                var b, c, d, e = {};
                for (a = (a || "").split("|"), b = 0, c = a.length; c > b; b++) d = a[b].split(":"), d.length > 1 && (e[d[0]] = d[2]);
                return e
            },
            f = function() {
                var f = c(),
                    g = b;
                return a != f && (a = f, g = e(d(f)), b = g), g
            };
        return {
            getPassport: function() {
                return f().userid || ""
            },
            getUid: function() {
                return f().uid || ""
            },
            getUUID: function() {
                return f().uuid || ""
            },
            getQname: function() {
                return f().uniqname || ""
            }
        }
    }();
! function() {
    "use strict";
    var a = {
            param: {
                navId: "js_nav",
                lsHisName: "latest_visit_history_url"
            },
            model: {
                pageInfo: {
                    curPage: 1,
                    totPage: 1,
                    detail: {}
                },
                focusIndex: -1,
                touchStartX: 0,
                touchMoveX: 0,
                touchEndX: 0,
                isMobile: !0,
                pcDragFlag: !1,
                pcMoveInATag: !1
            },
            ctrl: {}
        },
        b = a.param,
        c = a.model,
        d = a.ctrl;
    b.init = function(a) {
        return "undefined" != typeof a && (b.navId = a), 0 === $("#" + b.navId).length ? !1 : !0
    }, c.init = function() {
        return c.initPageInfo() && c.initFoucsIndex() ? (c.initIsMobile(), !0) : !1
    }, c.initIsMobile = function() {
        c.isMobile = "createTouch" in document
    }, c.initFoucsIndex = function() {
        return c.focusIndex = $("#" + b.navId + " .c").index(), c.focusIndex > -1 ? !0 : !1
    }, c.initPageInfo = function() {
        var a = c.pageInfo,
            b = c.getScreenWidth(),
            d = c.getNavContentWidth();
        if (-1 === d) return !1;
        var e = 0;
        b >= d ? a.totPage = 1 : (e = d % b, a.totPage = 0 === e ? d / b : (d - e) / b + 1);
        var f = a.detail;
        if (f[1] = 0, a.totPage > a.curPage)
            for (var g = 2, h = a.totPage; h >= g; g++) f[g + ""] = g !== h ? b * (g - 1) * -1 : 0 !== e ? -1 * (b * (g - 2) + e) : b * (g - 1) * -1;
        return !0
    }, c.getNavContentWidth = function() {
        var a = $("#" + b.navId + " > a"),
            c = a.length,
            d = 0,
            e = -1;
        return c > 0 ? ($.each(a, function(a, b) {
            b = $(b), -1 === e && (e = 1, e += parseInt(b.css("margin-left").split("px")[0], 10), e += parseInt(b.css("margin-right").split("px")[0], 10)), d += e + b.width()
        }), d) : -1
    }, c.getScreenWidth = function() {
        return $(document.body).width()
    }, d.init = function(a) {
        b.init(a) && c.init() && (d.initNavLocation(), Storage.set(b.lsHisName, window.location.href), d.cssInit(), d.iconInit(), d.eventInit())
    }, d.initNavLocation = function() {
        var a = c.getScreenWidth(),
            d = $("#" + b.navId + " .c").position().left;
        if (d > a) {
            var e = d % a,
                f = 0 === e ? d / a : (d - e) / a + 1;
            c.pageInfo.curPage = f, $("#" + b.navId).css({
                "-webkit-transform": "-webkit-transform 0ms",
                transition: "-webkit-transform 0ms"
            }).css({
                "-webkit-transform": "translate3d(" + c.pageInfo.detail[f + ""] + "px,0,0)"
            })
        }
    }, d.cssInit = function() {
        $("#" + b.navId).css({
            "-webkit-backface-visibility": "hidden",
            "-webkit-transform": "-webkit-transform 200ms",
            transition: "-webkit-transform 200ms"
        })
    }, d.iconInit = function() {
        c.focusIndex > 0 && $(".logo em").show()
    }, d.eventInit = function() {
        var a, e, f, g = d.process;
        a = c.isMobile ? "touchstart" : "mousedown", e = c.isMobile ? "touchmove" : "mousemove", f = c.isMobile ? "touchend" : "mouseleave click", $("#" + b.navId).on(a, function(a) {
            return g.proStart(a), !1
        }), $("#" + b.navId).on(e, function(a) {
            return g.proMove(a), !1
        }), $("#" + b.navId).on(f, function() {
            g.proEnd()
        }), c.isMobile ? ($("#" + b.navId + " a").on(a, function() {
            g.down($(this))
        }), $("#" + b.navId + " a").on(f, function() {
            g.touchEnd($(this))
        })) : ($("#" + b.navId + " a").on("click", function(a) {
            g.pcNavClick($(this), a)
        }), $("#" + b.navId + " a").on("mousedown", function(a) {
            g.down($(this), a)
        }), $("#" + b.navId + " a").on("mouseleave", function() {
            g.pcAMouseLeave()
        }), $("#" + b.navId + " a").on("mouseover", function() {
            g.pcAMouseOver()
        }), $("#" + b.navId).on("mouseup", function(a) {
            g.pcMouseUp(a)
        }))
    }, d.showNavContentsByType = function(a) {
        var d = c.pageInfo,
            e = 0;
        "next" === a && d.curPage < d.totPage ? d.curPage++ : "prev" === a && d.curPage > 1 && d.curPage--, e = d.detail[d.curPage + ""], $("#" + b.navId).css({
            "-webkit-transform": "-webkit-transform 0ms",
            transition: "-webkit-transform 0ms"
        }).css({
            "-webkit-transform": "translate3d(" + e + "px,0,0)"
        })
    }, d.process = {}, d.process.touchEnd = function(a) {
        0 === c.touchMoveX && (window.location.href = a.attr("href"))
    }, d.process.down = function(a, b) {
        a.addClass("c"), c.isMobile || (c.touchMoveX = b.clientX)
    }, d.process.pcAMouseLeave = function() {
        c.pcMoveInATag = !0
    }, d.process.pcAMouseOver = function() {
        c.pcMoveInATag = !1
    }, d.process.pcMouseUp = function(a) {
        var b = d.process;
        c.pcMoveInATag && (b.proEnd(), a.preventDefault(), a.stopPropagation())
    }, d.process.pcNavClick = function(a, b) {
        var e = d.process;
        (c.isMobile && 0 !== c.touchMoveX || !c.isMobile && c.touchStartX !== c.touchMoveX) && (e.proEnd(), b.preventDefault(), b.stopPropagation())
    }, d.process.proStart = function(a) {
        c.touchStartX = c.isMobile ? a.touches[0].pageX : a.clientX, c.isMobile || (c.pcDragFlag = !0)
    }, d.process.proMove = function(a) {
        if (c.isMobile || c.pcDragFlag) {
            if ($("#" + b.navId + " a.c").length > 1) {
                var d = $("#" + b.navId + " a");
                d.removeClass("c"), $(d[c.focusIndex]).addClass("c")
            }
            c.touchMoveX = c.isMobile ? a.touches[0].pageX : a.clientX;
            var e = c.touchMoveX - c.touchStartX + c.pageInfo.detail[c.pageInfo.curPage + ""];
            $("#" + b.navId).css({
                "-webkit-transform": "-webkit-transform 0ms",
                transition: "-webkit-transform 0ms"
            }).css({
                "-webkit-transform": "translate3d(" + e + "px,0,0)"
            })
        }
    }, d.process.proEnd = function() {
        if (!c.isMobile) {
            if (!c.pcDragFlag) return;
            c.pcDragFlag = !1
        }
        if (0 !== c.touchMoveX) c.touchMoveX - c.touchStartX > 0 ? d.showNavContentsByType("prev") : c.touchMoveX - c.touchStartX < 0 && d.showNavContentsByType("next");
        else if ($("#" + b.navId + " a.c").length > 1) {
            var a = $("#" + b.navId + " a");
            a.removeClass("c"), $(a[c.focusIndex]).addClass("c")
        }
        $("#" + b.navId).css({
            "-webkit-transform": "-webkit-transform 200ms",
            transition: "-webkit-transform 200ms"
        }), c.touchMoveX = 0, c.touchStartX = 0
    }, $(document).ready(function() {
        d.init("js_nav")
    })
}(),
function() {
    "use strict";
    var a = {
            param: {
                numClass: "js_history_num"
            },
            model: {},
            ctrl: {}
        },
        b = a.param,
        c = a.model,
        d = a.ctrl;
    b.init = function() {
        return 0 === $("." + b.numClass).length ? !1 : !0
    }, c.storage = function(a, b) {
        var c = window.localStorage;
        return "undefined" == typeof b ? "undefined" != typeof c ? JSON.parse(c.getItem(a)) : null : void("undefined" != typeof c && c.setItem(a, b))
    }, d.init = function() {
        if (b.init()) {
            var a = c.storage("watch_later");
            a instanceof Array && a.length > 0 && $("." + b.numClass).html(a.length)
        }
    }, $(document).ready(function() {
        d.init()
    })
}(),
function() {
    "use strict";
    var a = {
            param: {
                listClass: "js_focusList",
                locationClass: "js_focusLocation",
                showClass: "js_focusShow",
                showLocationClass: "c",
                firstCloneClass: "js_firstClone",
                lastCloneClass: "js_lastClone",
                minMoveDist: 20,
                animateTime: 200,
                autoScrollTime: 5e3
            },
            model: {
                startX: 0,
                startY: 0,
                moveX: 0,
                moveFlag: !0,
                moveLock: !1,
                listMarginLeft: 0,
                isMobile: !0,
                autoInterval: null,
                pcDragFlag: !1
            },
            view: {},
            ctrl: {}
        },
        b = a.param,
        c = a.model,
        d = a.ctrl;
    b.init = function() {
        return 0 === $("." + b.listClass).length || 0 === $("." + b.listClass + " a").length ? !1 : !0
    }, c.init = function() {
        c.isMobile = "createTouch" in document
    }, c.getItemWidth = function() {
        var a = $("." + b.listClass + " a");
        return a.length > 1 ? a[1].offsetLeft - a[0].offsetLeft : $(a[0]).width()
    }, c.getFocusListWidth = function() {
        var a = -1,
            c = $("." + b.listClass + " a"),
            d = c.length;
        if (d > 0) {
            var e = $(c[0]);
            a = e.width() * d
        }
        return a
    }, c.isHashLocationBTag = function() {
        var a = $("." + b.locationClass + " b");
        return a.length > 0
    }, d.init = function() {
        b.init() ? (c.init(), d.focusInit(), d.addCloneTag(), d.eventInit(), d.startAutoScroll()) : $("." + b.listClass).hide()
    }, d.startAutoScroll = function() {
        c.autoInterval = setInterval(function() {
            d.showFocusByType("next")
        }, b.autoScrollTime)
    }, d.focusInit = function() {
        var a = $("." + b.listClass + " a");
        a.removeClass(b.showClass);
        var d = $(a[0]);
        if (d.addClass(b.showClass), c.isHashLocationBTag()) {
            var e = $("." + b.locationClass + " b");
            e.removeClass("c");
            var f = $(e[0]);
            f.addClass("c")
        }
    }, d.eventInit = function() {
        var a, e, f, g = d.process;
        a = c.isMobile ? "touchstart" : "mousedown", e = c.isMobile ? "touchmove" : "mousemove", f = c.isMobile ? "touchend" : "mouseleave click", $("." + b.listClass).on(a, function(a) {
            g.proStart(a)
        }), $("." + b.listClass).on(e, function(a) {
            c.moveLock || g.proMove(a)
        }), $("." + b.listClass).on(f, function(a) {
            return g.proEnd(a), !1
        })
    }, d.moveByIndex = function(a, d) {
        var e = "function" == typeof d ? d : function() {},
            f = a * c.getItemWidth() * -1;
        $("." + b.listClass).animate({
            "margin-left": f + "px"
        }, b.animateTime, "", e)
    }, d.showFocusByType = function(a) {
        if (!c.moveLock) {
            c.moveLock = !0;
            var e = $("." + b.showClass),
                f = "next" === a ? e.next() : e.prev();
            if (c.moveFlag) {
                var g, h = $("." + b.listClass + " a"),
                    i = $("." + b.locationClass + " b");
                if (h.removeClass(b.showClass), i.removeClass(b.showLocationClass), g = f.index(), f.hasClass(b.firstCloneClass) || f.hasClass(b.lastCloneClass)) {
                    var j, k, l;
                    "next" === a ? (k = 1, l = 0, j = -1 * c.getItemWidth() + "px") : (k = h.length - 2, l = i.length - 1, j = -1 * c.getItemWidth() * k + "px"), d.moveByIndex(g, function() {
                        c.moveLock = !1, $(this).css({
                            "margin-left": j
                        }), $(h[k]).addClass(b.showClass), $($("." + b.locationClass + " b")[l]).addClass(b.showLocationClass)
                    })
                } else d.moveByIndex(g, function() {
                    c.moveLock = !1
                }), f.addClass(b.showClass), $($("." + b.locationClass + " b")[g - 1]).addClass(b.showLocationClass)
            } else d.moveByIndex(e.index(), function() {
                c.moveLock = !1
            })
        }
    }, d.addCloneTag = function() {
        var a = $("." + b.listClass),
            d = a.find("a"),
            e = $(d[0]).clone();
        e.addClass(b.firstCloneClass);
        var f = $(d[d.length - 1]).clone();
        f.addClass(b.lastCloneClass), a.append(e), a.prepend(f);
        var g = -1 * c.getItemWidth() + "px";
        a.css({
            "margin-left": g
        })
    }, d.process = {}, d.process.proStart = function(a) {
        (c.isMobile || !c.moveLock) && (c.startX = c.isMobile ? a.touches[0].pageX : a.clientX, c.startY = c.isMobile ? a.touches[0].pageY : a.clientY, c.listMarginLeft = parseInt($("." + b.listClass).css("margin-left").split("px")[0], 10), clearInterval(c.autoInterval), c.isMobile || (c.pcDragFlag = !0))
    }, d.process.proMove = function(a) {
        if (c.isMobile || c.pcDragFlag && !c.moveLock) {
            var d, e, f = c.isMobile ? a.touches[0].pageX : a.clientX,
                g = c.isMobile ? a.touches[0].pageY : a.clientY;
            if (d = f > c.startX ? f - c.startX : c.startX - f, e = g < c.startY ? c.startY - g : g - c.startY, d > e) {
                a.preventDefault(), a.stopPropagation(), c.moveX = f;
                var h = c.listMarginLeft + (f - c.startX);
                $("." + b.listClass).css({
                    "margin-left": h + "px"
                })
            }
        }
    }, d.process.proEnd = function(a) {
        if (!c.isMobile) {
            if (c.moveX = a.clientX, !c.pcDragFlag) return;
            c.pcDragFlag = !1
        }(c.isMobile && 0 === c.moveX || !c.isMobile && c.startX === c.moveX) && (window.location.href = $("." + b.showClass).attr("href")), c.moveX > c.startX ? (c.moveX - c.startX < b.minMoveDist && (c.moveFlag = !1), d.showFocusByType("prev")) : (c.startX - c.moveX < b.minMoveDist && (c.moveFlag = !1), d.showFocusByType("next")), c.moveFlag = !0, c.moveX = 0, d.startAutoScroll()
    }, $(window).ready(function() {
        d.init()
    })
}();
var IsHistorySupport = "pushState" in history,
    Channel = {
        isResfresh: !1,
        isSportsChannel: !1,
        ajaxObj: null,
        pageSize: 15,
        currentPage: 1,
        searchAlias: [],
        searchKeys: {},
        elChannelListWrap: null,
        elItemListWrap: null,
        elLoadMore: null,
        elItemList: null,
        elLoading: null,
        currentURL: null,
        channelAPI: API_URL + "search2/album.json",
        channelDomain: "",
        channeledMap: {
            101: "1002",
            106: "1003",
            100: "1004",
            115: "1005",
            122: "1006",
            112: "1007",
            9004: "1008",
            107: "1009",
            121: "1010",
            165: "1014",
            166: "1014",
            167: "1014",
            168: "1014"
        },
        init: function() {
            Channel.elChannelListWrap = $(".channel_page .channel_list_wrap"), Channel.elItemListWrap = $(".item_list_wrap"), Channel.elItemList = $(".item_list", Channel.elItemListWrap);
            var a = $(".filter_handle").on("click", Channel.onFilterHandleClick);
            if (a.length > 0) {
                Channel.getSearchKeys();
                var b = Channel.searchAlias.join(" ");
                $(".filter_handle b").html(b || "筛选"), Channel.elCategoryListWrap = $(".category_list_wrap"), Channel.elFilterButton = $(".button", Channel.elCategoryListWrap).on("click", Channel.onFilterButtonClick), $("a[search_key]").each(function(a, b) {
                    b.setAttribute("href", "#" + b.getAttribute("href"))
                }).on("click", Channel.onSearchItemClick)
            }
            Channel.elChannelListWrap.length > 0 && (Channel.elLoadMore = $(".more", Channel.elChannelListWrap).on("click", Channel.loadMore), IsHistorySupport && $(window).on("popstate", Channel.updatePage), $(DOC.body).hasClass("sports_page") && (Channel.channelAPI = "/h5/sportscat", Channel.channelDomain = "http://m.s.sohu.com", Channel.isSportsChannel = !0))
        },
        updatePage: function() {
            if (!(Channel.elChannelListWrap.length < 1)) {
                if (null === Channel.currentURL) return void(Channel.currentURL = location.href);
                var a = (location.pathname.match(/\/[^\/]+\/(.+)/), URL.getQueryData(location.search));
                if (Channel.isSportsChannel && !a.cat) {
                    var b = $(".row[search_name=cat] a").eq(0);
                    if (b.length > 0) {
                        var c = b.attr("search_key").split("/");
                        c.length > 0 && (a.cat = c[1])
                    }
                }
                Channel.elLoading = null, Channel.currentPage = 1, Channel.searchKeys = $.extend({}, a), Channel.updateFilterItemsBySearchKey(), Channel.updateChannelList(!0)
            }
        },
        updateURL: function() {
            if (IsHistorySupport) {
                var a, b, c, d = [],
                    e = location.pathname.match(/\/[^\/\?]+/),
                    f = e[0];
                for (a in Channel.searchKeys) b = Channel.searchKeys[a], "" !== b && d.push(a + "=" + Channel.searchKeys[a]);
                c = (location.origin || "") + f + "?" + d.join("&"), c !== location.href && (history.pushState(null, DOC.title, c), Channel.currentURL = c)
            }
        },
        onFilterHandleClick: function() {
            var a = $(".filter_wrap"),
                b = Channel.elCategoryListWrap;
            if (a.hasClass("filter_open")) IsAndroid || b.css({
                "-webkit-transform": ""
            }), a.removeClass("filter_open"), Channel.elFilterButton.addClass("white_button"), Channel.updateFilterItemsBySearchKey();
            else {
                a.addClass("filter_open");
                var c = b.height() + 150;
                IsAndroid || b.css({
                    top: -c,
                    "-webkit-transform": "translate3d(0," + c + "px,0)"
                })
            }
        },
        updateFilterItemsBySearchKey: function() {
            var a = $(".filter_wrap");
            $("a", a).removeClass("c"); {
                var b = $.extend({
                    o: "-1"
                }, Channel.searchKeys);
                $("div[search_name]", a).each(function(a, c) {
                    var d, e = $(c),
                        f = e.attr("search_name");
                    d = f + "/" + (b[f] || ""), $('a[search_key="' + d + '"]').addClass("c")
                })
            }
        },
        getSearchKeys: function() {
            var a = {},
                b = [];
            return $(".c[search_key]").each(function(c, d) {
                var e = $(d),
                    f = e.attr("search_key"),
                    g = f.split("/");
                a[g[0]] = g[1], "" !== g[1] && "o" !== g[0] && b.push(e.html().replace(/<.*>/, ""))
            }), Channel.searchAlias = b, Channel.searchKeys = $.extend({}, a), a
        },
        setLoadingEl: function(a) {
            Channel.elLoading && Channel.elLoading.removeClass("loading"), Channel.elLoading = a
        },
        onSearchItemClick: function() {
            var a = $(this),
                b = a.hasClass("o");
            return a.hasClass("c") || ($(".c", a.parent()).removeClass("c"), a.addClass("c"), b || Channel.elFilterButton.removeClass("white_button")), (WIN.innerWidth >= 768 || b) && (Channel.setLoadingEl(a), Channel.currentPage = 1, Channel.updateChannelList()), !1
        },
        onFilterButtonClick: function() {
            var a = $(this);
            return a.hasClass("white_button") || (Channel.setLoadingEl($(".filter_handle em")), Channel.currentPage = 1, Channel.updateChannelList(), Channel.onFilterHandleClick()), !1
        },
        loadMore: function() {
            return Channel.setLoadingEl(Channel.elLoadMore), Channel.currentPage++, Channel.updateChannelList(), !1
        },
        updateChannelList: function(a) {
            var b = Channel.getSearchKeys(),
                c = {
                    cateCode: $(DOC.body).attr("cate_code") || "",
                    pageSize: Channel.pageSize,
                    page: Channel.currentPage,
                    o: "-1"
                };
            if (Channel.isSportsChannel) {
                var d = b.cat || "",
                    e = [];
                d && (e = d.split("_"), e.length > 0 && (d = e[0]), d.length > 3 && (d = d.slice(0, 3))), c.c = d, c.cateCode = d
            } else c.c = 2;
            b = $.extend($.extend(c, API_PARAMS), b);
            var f = Channel.channelAPI + "?" + $.param(b);
            Channel.elLoading && Util.setLoad(Channel.elLoading.addClass("loading")), $.ajax({
                url: f,
                type: "get",
                dataType: "json",
                success: function(a) {
                    Channel.elLoading && Channel.elLoading.removeClass("loading"), Channel.updateChannelListLoaded(a)
                }
            }), a || Channel.updateURL()
        },
        updateChannelListLoaded: function(a) {
            var a = a.data || a,
                b = a && a.videos,
                c = b && b.length || 0,
                d = [],
                e = Channel.searchAlias.join(" "),
                f = $(DOC.body).attr("cate_code");
            if (f) {
                var g = Channel.channeledMap[f];
                if (g) var h = "12" + g + (Channel.currentPage > 1 ? "0200" : "0100")
            }
            if ($(".filter_handle b").html(e || "筛选"), DOC.title = ($(".channel_nav .c").html() || "") + (e ? ": " + e : "") + " - 搜狐视频", c > 0) {
                for (var i, j, k = 0; c > k; k++) {
                    j = b[k], i = Channel.channelDomain + "/v" + j.vid + ".shtml", h && (i += "?channeled=" + h);
                    var l = j.tv_score;
                    l && (l = "评分:" + l), d.push("<dd>", '<a href="' + i + '" class="cover">', '<b style="background-image:url(' + (7 != j.cid && j.ver_big_pic || j.video_big_pic || "") + ')"></b>', "</a>", "<p>", '<a href="' + i + '">' + j.tv_name + "</a>", "<span>" + (j.tip || l || "") + "</span>", "</p>", "</dd>")
                }
                Channel.elChannelListWrap.removeClass("blank_list").toggleClass("has_more", a.count > Channel.currentPage * Channel.pageSize)
            } else Channel.elChannelListWrap.addClass("blank_list").removeClass("has_more");
            d = '<dl class="' + Channel.elItemList.attr("class") + '">' + d.join("") + "</dl>", 1 == Channel.currentPage ? Channel.elItemListWrap.html(d) : Channel.elItemListWrap.append('<h1 class="cate_title">第' + Channel.currentPage + "页</h1>" + d)
        }
    };
$(document).ready(function() {
        Channel.init()
    }),
    function() {
        "use strict";
        var a = {
            level: "info",
            dateFormat: "yyyyMMdd hh:mm:ss",
            DOM: null,
            line: '<p class="Console-line"></p>',
            tgt: '<div id="Console-log" style="max-height: 200px;-webkit-overflow-scrolling:touch;overflow:auto;line-height:1.5;z-index:5000;position:fixed;left:0;top:0;width:70%;font-size:11px;background:rgba(0,0,0,.8);color:#fff;"></div>',
            style: "<style>.Console-line{ margin-top:-1px;padding:.5em;border-top:1px solid rgba(255,255,255,.3);width:70% } .c_info .c_log { color:white; } .c_error { color:red; } .c_warn { color:yellow; } .c_debug { color:green; } </style>",
            inited: !1
        };
        a.util = {}, a.util.getType = function(a) {
            var b, c = a;
            return ("object" == (b = typeof c) ? null === c && "null" || Object.prototype.toString.call(c).slice(8, -1) : b).toLowerCase()
        }, a.util.DateFormat = function(a, b) {
            var c = {
                "M+": a.getMonth() + 1,
                "d+": a.getDate(),
                "h+": a.getHours(),
                "m+": a.getMinutes(),
                "s+": a.getSeconds(),
                "q+": Math.floor((a.getMonth() + 3) / 3),
                S: a.getMilliseconds()
            };
            /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var d in c) new RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 === RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
            return b
        }, a.applyData = function(a) {
            a.alisLevel = a.level.toUpperCase().substring(0, 1);
            var b = [" [ ", a.level, " ] "].join("");
            return b
        }, a.getTimestamp = function() {
            return a.util.DateFormat(new Date, a.dateFormat)
        }, a.output = function(b, c) {
            try {
                a.inited || a.init();
                var d = document.createElement("div");
                d.className = "c_" + b.level.toLowerCase() || "c_info", d.innerHTML = a.applyData(b) + " " + c, a.DOM.appendChild(d)
            } catch (e) {
                console.log("exception :" + c)
            }
        }, a._logObj = function(b) {
            var c = b || "INFO",
                d = {
                    timestamp: a.getTimestamp(),
                    level: c
                };
            return d
        }, a.log = function(b) {
            var c = a._logObj("LOG");
            a.output(c, b)
        }, a.debug = function(b) {
            var c = a._logObj("DEBUG");
            a.output(c, b)
        }, a.info = function(b) {
            var c = a._logObj("INFO");
            a.output(c, b)
        }, a.error = function(b) {
            var c = a._logObj("ERROR");
            a.output(c, b)
        }, a.warn = function(b) {
            var c = a._logObj("WARN");
            a.output(c, b)
        }, a.convertToText = function(a) {
            var b;
            try {
                return a ? "true" === a || ("false" === a ? !1 : "null" === a ? null : /^0/.test(a) || isNaN(b = Number(a)) ? /^\[\[\{]/.test(a) ? JSON.stringify(a) : a : b) : a.toString()
            } catch (c) {
                return a
            }
        }, a.init = function() {
            if (!a.inited) {
                var b = document.createElement("style");
                b.innerHTML = a.style, document.body.appendChild(b);
                var c = document.createElement("div");
                c.innerHTML = a.tgt, document.body.appendChild(c), a.DOM = document.getElementById("Console-log"), a.inited = !0
            }
        }, window.Console = a
    }(), IS_EXTERNAL_PLAYER = location.href.match(/player=1/i) || location.host.indexOf("m.sohu.com") > -1 ? !0 : !1;
var cookieSUV = Cookie.get("SUV"),
    cookieIPLOC = Cookie.get("IPLOC");
if (!cookieSUV || !cookieIPLOC) {
    var _suv = 1e3 * +new Date + Math.round(1e3 * Math.random());
    cookieSUV || Cookie.set("SUV", _suv, 5e4, ".sohu.com"), cookieIPLOC || IS_EXTERNAL_PLAYER || Util.loadScript("http://pv.sohu.com/suv/" + _suv)
}
window.sohuPV = {
    pv: function() {
        var a = {},
            b = window.isRecomend || !1,
            c = window.VideoData || window.videoData || {},
            d = URL.getQueryString("channeled") || c.channeled || "1212120001",
            e = (c.vid || "", location.href || "http://m.tv.sohu.com/");
        try {
            e.indexOf("hots") && !b && (d = c.channeled || URL.getQueryString("channeled") || "1212120001"), IsWeixin && (d = "1211110001"), "sogou" == URL.getQueryString("from") && (d = "1200150001"), a = {
                url: encodeURIComponent(e),
                refer: encodeURIComponent(document.referrer),
                uid: Trace.getUid(),
                webtype: Trace.getConnectionType(),
                screen: Trace.getScreenSize(),
                catecode: Trace.getVideoData("cateCode") || "",
                pid: Trace.getVideoData("plid") || "",
                vid: Trace.getVideoData("vid") || "",
                os: Trace.getOS(),
                platform: Trace.getPlatform(),
                passport: Trace.getPassport(),
                t: +new Date,
                channeled: d || "1212120001"
            }
        } catch (f) {
            console.log("trace pv exception ", f)
        }
        ENABLE_DEBUG && console.log("trace pv ", a), Util.pingback("http://z.m.tv.sohu.com/pv.gif?" + $.param(a))
    }
};
var TracePV = window.sohuPV;
IS_EXTERNAL_PLAYER || (window._iwt_UA = "UA-sohu-123456", $(function() {
    window.sohuPV.pv()
}), Util.loadScript("http://tv.sohu.com/upload/Trace/iwt-min.js"), Util.loadScript(("https:" == document.location.protocol ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js", function() {
    "undefined" != typeof window.COMSCORE && window.COMSCORE.beacon({
        c1: "2",
        c2: "7395122",
        c3: "",
        c4: "",
        c5: "",
        c6: "",
        c15: ""
    })
}), "m.s.sohu.com" === location.host ? $().ready(function() {
    Util.loadScript("http://js.sohu.com/wrating20120726.js", function() {
        var a;
        try {
            a = window._getAcc()
        } catch (b) {}
        a && Util.loadScript("http://sohu.wrating.com/a1.js", function() {
            window.vjAcc = a, window.wrUrl = "http://sohu.wrating.com/";
            try {
                if (!0 === window.vjValidateTrack()) {
                    var b = window.wrUrl + "a.gif" + window.vjGetTrackImgUrl();
                    $(document.body).append('<div style="display:none"><img src="' + b + '" id="wrTagImage" /></div>'), window.vjSurveyCheck()
                }
            } catch (c) {}
        })
    })
}) : Util.loadScript("http://tv.sohu.com/upload/Trace/wrating.js"));
var Trace = function() {
        var a = 1,
            b = parseFloat(window.devicePixelRatio) || 1;
        $.os.android && (window.screen.width / window.innerWidth).toFixed(2) == b.toFixed(2) && (a = 1 / b);
        var c = window.screen,
            d = Math.floor(c.width * a) + "x" + Math.floor(c.height * a),
            e = Passport.getPassport(),
            f = "",
            g = "";
        return IsIOS ? (g = "ios", IsIPad ? f = "ipad" : IsIPhone && (f = "iphone")) : IsAndroid ? f = g = "android" : IsWindowsPhone && (f = g = "windowsphone"), {
            getUid: function() {
                return Cookie.get("SUV") || ""
            },
            getScreenSize: function() {
                return d
            },
            getPassport: function() {
                return e
            },
            getOS: function() {
                return g
            },
            getPlatform: function() {
                return f
            },
            getVideoData: function(a) {
                var b = window.VideoData || window.videoData || {};
                return b[a] || ""
            },
            getConnectionType: function() {
                return Util.getConnectionType() || ""
            }
        }
    }(),
    ClickTrace = {
        pingback: function(a, b, c) {
            var b = b || a.attr("position") || "",
                c = c || a && a.attr("details") || "",
                d = window.VideoData || window.videoData || {},
                e = {},
                f = window.isRecomend || !1,
                g = URL.getQueryString("channeled") || d.channeled || "1212120001",
                h = Trace.getVideoData("vid") || "",
                i = location.href || "http://m.tv.sohu.com/";
            try {
                i.indexOf("hots") && !f && (g = d.channeled || URL.getQueryString("channeled") || "1212120001"), IsWeixin && (g = "1211110001"), "sogou" == URL.getQueryString("from") && (g = "1200150001"), e = {
                    t: +new Date,
                    uid: Trace.getUid(),
                    position: b,
                    op: "click",
                    details: c,
                    nid: Trace.getVideoData("nid") || "",
                    url: encodeURIComponent(i),
                    refer: encodeURIComponent(document.referrer),
                    screen: Trace.getScreenSize(),
                    os: Trace.getOS(),
                    platform: Trace.getPlatform(),
                    passport: Trace.getPassport(),
                    vid: h || "",
                    channeled: g || "1212120001"
                }
            } catch (j) {
                console.log("trace click exception ", j)
            }
            Util.pingback("http://z.m.tv.sohu.com/h5_cc.gif?" + $.param(e))
        }
    },
    svp = svp || {};
! function(svp) {
    "use strict";
    var Action = {
        URLProtocol: "sohuvideo" + (IsIPad ? "hd" : "") + "://",
        openTime: IsIOS ? 800 : 1e3,
        channelSrc: "0",
        appointUrl: "",
        getDownloadUrl: function(a, b) {
            var c = this;
            if (a && a.downUrl) b(a.downUrl);
            else if ("" !== this.appointUrl) b(this.appointUrl);
            else {
                var d = a && a.channelSrc ? a.channelSrc : this.channelSrc;
                (d + "").length > 4 && (d = d.substr(0, 4));
                var e = "http://m.tv.sohu.com/h5/cooperation/" + d + ".json?pos=1&platform=" + Util.getUserPt() + "&callback=?";
                console.log("获取下载链接ajax:", e), $.ajax({
                    url: e,
                    type: "get",
                    dataType: "jsonp",
                    success: function(a) {
                        var d;
                        a && a.records.length > 0 && (d = c.appointUrl = a.records[0].link), b(d && "" !== d ? d : Action.getSohuDefaultApplink())
                    },
                    error: function() {
                        b(Action.getSohuDefaultApplink())
                    }
                })
            }
        },
        gotoDownload: function(a) {
            this.getDownloadUrl(a, function(b) {
                if ("" !== b) {
                    var c = a && a.delayTime ? a.delayTime : Action.openTime;
                    setTimeout(function() {
                        window.location.href = b
                    }, c)
                }
            })
        },
        openIos: function(a, b) {
            if (a) {
                ClickTrace.pingback(null, "app2_action");
                var c = document.createElement("iframe");
                c.style.display = "none";
                var d, e = document.body,
                    f = function(a, d) {
                        b && "function" == typeof b && b(d), window.removeEventListener("pagehide", g, !0), window.removeEventListener("pageshow", g, !0), c && (c.onload = null, e.removeChild(c), c = null)
                    },
                    g = function(a) {
                        clearTimeout(d), f(a, !1)
                    };
                window.addEventListener("pagehide", g, !0), window.addEventListener("pageshow", g, !0), c.onload = f, c.src = a, e.appendChild(c);
                var h = +new Date;
                d = setTimeout(function() {
                    d = setTimeout(function() {
                        var a = +new Date;
                        h - a > 1300 ? f(null, !1) : f(null, !0)
                    }, 1200)
                }, 60)
            }
        },
        openAndroid: function(a, b) {
            if (a) {
                if (ClickTrace.pingback(null, "app1_action"), /SAMSUNG-SM-G90|SAMSUNG[\s-]+SM-N900|Nexus\s5/i.test(UA) || "undefined" != typeof a && a.indexOf("intent") > -1 || /Nexus\s5/i.test(UA) || /UCBrowser/i.test(UA)) window.location.href = a;
                else {
                    var c = document.createElement("iframe");
                    c.style.display = "none", c.src = a;
                    var d = document.body;
                    d.appendChild(c), setTimeout(function() {
                        d.removeChild(c), c.onload = null, c = null
                    }, 200)
                }
                b && "function" == typeof b && b()
            }
        },
        sendAction: function(a, b) {
            var c = Action.makeActionUrl(a);
            if (IsAndroid) Action.openAndroid(c, b);
            else if (IsIOS) Action.openIos(c, b);
            else {
                var d = this.getIframe();
                d.attr("src", c)
            }
        },
        getIframe: function() {
            var a = $("#j_redirectNativeFrame");
            return 0 === a.length && (a = $('<iframe id="j_redirectNativeFrame" style="display:none"></iframe'), $("body").append(a)), a
        },
        getPopTipsView: function() {
            var a = [];
            return a.push('<div class="app_download_select js_download_select" style="display: none;">'), a.push('<div class="app_download_title js_download_select_title"></div>'), a.push('<div class="app_downlaod_btn app_downlaod_left js_download_select_left">立刻安装</div>'), a.push('<div class="app_downlaod_btn app_downlaod_right js_download_select_right">关闭</div>'), a.push("</div>"), a.push('<div class="download_masklayer js_download_masklayer" style="display: none;"></div>'), a.join("")
        },
        popTips: function(a, b) {
            var c = $(".js_download_select"),
                d = $(".js_download_masklayer");
            0 === c.length && ($("body").append(this.getPopTipsView()), c = $(".js_download_select"), d = $(".js_download_masklayer"), $(".js_download_select_left").on(END_EVENT, function() {
                Action.gotoDownload(), c.oriHide(), d.oriHide()
            }), $(".js_download_select_right").on(END_EVENT, function() {
                c.oriHide(), d.oriHide()
            }));
            var e = a && a.title ? a.title : "高速观看需安装搜狐视频客户端";
            $(".js_download_select_title", c).html(e), d.oriShow(), c.oriShow(), $.isFunction(b) && b()
        },
        isIntentList: function() {
            var a = !1;
            return IsAndroid && /SAMSUNG-SM-G90|SAMSUNG[\s-]+SM-N900|Nexus\s5/i.test(UA) && (a = !0), a
        },
        isForceIntent: function() {
            var a = !1;
            return IsAndroid && Action.isIntentList() && (a = !0), a
        },
        makeActionUrl: function(a) {
            var b = Action.URLGlobalParms;
            a.scheme = b.clientType && "1" === b.startClient || !Cookie.test() ? "sohuvideo" : "1" === b.startClient || Action.isForceIntent() ? "intent" : "sohuvideo";
            var c = a.scheme,
                d = a.action || a.actionVer || "1.1",
                e = a.cateCode || "",
                f = a.channeled || "";
            e = e.split(",")[0] || "", a = Action.formatArgs(a);
            var g = {
                action: d,
                vid: a.vid,
                sid: a.sid,
                cid: a.cid,
                cateCode: e,
                ex1: a.ex1 || 1,
                ex2: a.ex2 || "",
                ex3: a.ex3 || ""
            };
            if (a && a.action && a.site && "2" === a.site && (g.ex3 = 2, g.sid = "", g.site = "2"), a && a.more) g.more = a.more;
            else {
                var h = {
                    sourcedata: {
                        channeled: f,
                        preid: location.href,
                        enterid: 4
                    }
                };
                g.more = h
            }
            c ? c = c.replace("://", "") : (c = Action.URLProtocol, c = c.replace("://", ""));
            var i = "";
            if (IsAndroid)
                if (c.indexOf("intent") > -1) {
                    i = "intent://", i += "?" + URL.objToQueryString(g).replace(/index\.html%2C/, "index.html");
                    var j = "#Intent;scheme=sohuvideo;package=com.sohu.sohuvideo;end";
                    i += j, console.log("android intent 1:", JSON.stringify(g))
                } else i = c + "://", i += "action.cmd", i += "?" + URL.objToQueryString(g).replace(/index\.html%2C/, "index.html"), console.log("android intent 2:", JSON.stringify(g));
            else console.log("android sohovideo:", JSON.stringify(g)), console.log("android sohovideo:###", c), i = Action.URLProtocol, i += "action.cmd", i += "?" + URL.objToQueryString(g).replace(/index\.html%2C/, "index.html");
            return console.log("makeActionUrl : " + i), i
        },
        getSohuDefaultApplink: function() {
            var a = "http://m.tv.sohu.com/app";
            return IsAndroid && (a = IsAndroidPad ? "http://upgrade.m.tv.sohu.com/channels/hdv/3.5/SohuTV_3.5.0_680_201406191825.apk" : "http://upgrade.m.tv.sohu.com/channels/hdv/4.3.1/SohuTV_4.3.1_680_201407080857.apk?t=1"), IsIPhone && (a = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8"), IsIPad && (a = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-hd/id414430589?mt=8"), IsWindowsPhone && (a = "http://www.windowsphone.com/zh-CN/apps/403faf93-d22c-4331-ac32-9560ee9fac94"), IsWindowsPad && (a = "http://apps.microsoft.com/windows/zh-CN/app/c5ae3c2a-5573-45c2-ac63-7d67e01de6bb"), IsWeixin && (a = "http://a.app.qq.com/o/simple.jsp?pkgname=com.sohu.sohuvideo&g_f=991881"), a
        },
        URLGlobalParms: {},
        updateGlobalParms: function(a, b) {
            var c, d = $("a[href],form", a),
                e = d.length;
            for (b = b || Action.URLGlobalParms; e--;) c = d.get(e), URL.setQueryString(c, b)
        },
        formatArgs: function(a) {
            var b = a.vid || "",
                c = a.sid || "",
                d = a.url || window.location.href,
                e = a.action + "" || "1.1";
            if (!a) return a;
            if (b || c) {
                if (a.action = e, "1.1" === e && (9001 === a.cid || "2" === a.site) && (a.ex3 = 2, a.sid = "", a.site = "2"), "1.19" === e || "1.20" === e) {
                    if (!b) return;
                    d = d.split("?")[0], a.urls = d, a.ex1 = "", a.ex2 = "", a.ex3 = "", "1.20" === e && (a.urls = d.replace(/play/, "index") + "," + d)
                }
                "1.17" === e && (a.ex1 = a.ex1 || 1, a.ex2 = a.ex2 || "", a.ex3 = a.ex3 || "", 2 === a.ex1 && (a.open = 1))
            } else(a.live || d.match(/live/i) || d.match(/\.m3u8/i)) && (a.action = a.action || "1.1", a.ex1 = a.ex1 || 3);
            return a
        },
        parserUrls: function() {
            !StartClient || Action.URLGlobalParms.clientType || Action.URLGlobalParms.actionVer || URL.setQueryString(this, {
                startClient: 1
            });
            for (var a, b = ["clientType", "clientVer", "actionVer", "startClient", "actionId"], c = b.length, d = URL.getQueryData(location.search.substring(1)), e = {}; c--;) a = b[c], d.hasOwnProperty(a) && d[a] && (e[a] = d[a]);
            Action.updateGlobalParms(DOC, e), Action.URLGlobalParms = e
        },
        parserAttributes: function(data, el) {
            for (var videoParmsKeys = ["vid", "cid", "sid", "plid", "cateCode", "site"], c = videoParmsKeys.length, URLParms = Action.URLGlobalParms, vd = data || window.VideoData || window.videoData || {}, args = {}; c--;) {
                var key = videoParmsKeys[c];
                vd && vd[key] && (args[key] = vd[key]), URLParms && URLParms.hasOwnProperty(key) && URLParms[key] && (args[key] = URLParms[key])
            }
            var more = {
                    sourcedata: {
                        preid: location.href,
                        enterid: 4
                    }
                },
                vid = args.vid || "",
                channeled = args.channeled || "",
                sch = Action.URLProtocol,
                downUrl = args.downUrl || "",
                actionId = args.actionId || args.actionVer || "1.1";
            if ("undefined" != typeof el) {
                el = $(el), channeled = el.attr("channeled") || channeled, vid = el.attr("vid") || vid;
                var _sch = el.attr("data-scheme");
                _sch && (sch = _sch.toLowerCase()), downUrl = el.attr("data-downUrl") || downUrl, actionId = el.attr("actionId") || "1.1";
                try {
                    var _params = eval(el.attr("data-params")) || [];
                    for (var i in _params) {
                        var jsonObj = _params[i] || {};
                        jsonObj && $.extend(!0, args, jsonObj)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            return vd.site && "2" === vd.site ? args.ex3 = 2 : args.ex1 = 1, more.sourcedata.channeled = channeled, more = JSON.stringify(more), args.more = more, args.action = actionId, args = Action.formatArgs(args), args.scheme = sch, args.downUrl = downUrl, console.log("parserAttributes:", JSON.stringify(args)), args
        },
        init: function() {
            this.parserUrls(), this.URLProtocol = "sohuvideo" + (IsIPad ? "hd" : "") + "://", this.channelSrcInit()
        },
        channelSrcInit: function() {
            var a = URL.getQueryString("src") || URL.getQueryString("SRC") || Cookie.get("MTV_SRC") || "0";
            this.channelSrc = a.split("|")[0] || "0"
        },
        addIosMeta: function() {
            var a, b, c, d = document.createElement("meta");
            IsIOS && (IsIPhone && (a = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8", content = "app-id=458587755", content += ", app-argument=sohuvideo://action.cmd ", content += ", affiliate-data=mt=8", d.setAttribute("content", content), d.setAttribute("name", "apple-itunes-app"), b = document.getElementsByTagName("meta"), c = b[0].parentNode, c.appendChild(d)), IsIPad && (a = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8", content = "app-id=414430589", content += ", app-argument=sohuvideo://action.cmd ", content += ", affiliate-data=mt=8", d.setAttribute("content", content), d.setAttribute("name", "apple-itunes-app"), b = document.getElementsByTagName("meta"), c = b[0].parentNode, c.appendChild(d)))
        },
        bindAction: function() {
            var a = "ontouchstart" in window ? "touchend" : "mouseup";
            $("body").on(a, ".actionLink", function() {
                var a = this,
                    b = window.VideoData || window.videoData || {},
                    c = Action.parserAttributes(b, a);
                console.log("params", c), Action.sendAction(c)
            }), $("body").on("click", ".hotActionLink", function() {
                var a = this,
                    b = window.VideoData || window.videoData || {},
                    c = Action.parserAttributes(b, a);
                console.log("params", c), Action.sendAction(c)
            })
        }
    };
    Action.init(), onDomReady(Action.bindAction), window.Action = Action, svp.playInClient = function(a) {
        var b = {
                param: {
                    conDom: null,
                    settings: null,
                    firstLoadFlag: !0
                },
                model: {
                    videoData: null,
                    channeled: null,
                    urlParam: {}
                },
                view: {},
                ctrl: {}
            },
            c = b.param,
            d = b.model,
            e = b.view,
            f = b.ctrl;
        c.init = function(a) {
            $.isUndefined(a.parentDom) || 0 === $(a.parentDom).length || (c.conDom = $(a.parentDom)), $.isUndefined(a.settings) || (c.settings = a.settings)
        }, d.init = function(a) {
            return $.isUndefined(a.videoData) ? !1 : (d.videoData = a.videoData, $.isUndefined(a.channeled) && (d.channeled = a.channeled), d.urlParam = URL.getQueryData(location.search.substring(1)), !0)
        }, d.getClientUrl = function(a) {
            var b = URL.getQueryData(location.search.substring(1));
            (b.clientType || "1" == b.startClient) && (a.scheme = "sohuvideo");
            var c = Action.makeActionUrl(a);
            return c
        }, e.download = function() {
            var a = [];
            return a.push('<div class="appdl_download2">'), a.push('<div class="msg_block">'), a.push('<span class="msg">体验高清视频,请使用</span>'), a.push('<a href="javascript:void(0);" class="actionLink">搜狐视频客户端</a>'), a.push("</div>"), a.push("</div>"), a.join("")
        }, f.init = function(a) {
            c.init(a), d.init(a) && (null !== c.conDom && $(c.conDom).append(e.download()), Action.sendAction(Action.parserAttributes()), c.firstLoadFlag && (c.firstLoadFlag = !1), setTimeout(function() {
                VideoTrace.realVV(+new Date)
            }, 200))
        }, f.init(a)
    }
}(svp);
var banner = function() {
    "use strict";
    var a = {
            param: {
                topBannerConClass: "player_column",
                topBannerConDom: null,
                maxCloseTime: 2592e5,
                downloadConClass: "appbar",
                downloadConDom: null,
                indexBannerId: "js_nav",
                indexNavDom: null,
                indexBannerBtnClass: "js_index_banner",
                bannerLeftBtnClass: "js_banner_left",
                bannerRightBtnClass: "js_banner_right",
                weixinBannerConId: "wx_navigation",
                weixinBannerConDom: null,
                downloadClass: "js_download",
                downloadSelectConDom: null
            },
            model: {},
            view: {},
            ctrl: {}
        },
        b = a.param,
        c = (a.model, a.view),
        d = a.ctrl;
    b.init = function(a) {
        if (URL.getQueryString("clientType")) return !1;
        if ($("#" + b.indexBannerId).length > 0)
            for (var c = $("#" + b.indexBannerId).parent();
                "nav" !== c[0].tagName.toLowerCase();) {
                if (c = c.parent(), "nav" === c[0].tagName.toLowerCase()) {
                    b.indexNavDom = c;
                    break
                }
                if ("body" === c[0].tagName.toLowerCase()) break
            }
        return "indexPage" !== a || b.indexNavDom && 0 !== b.indexNavDom.length ? (b.weixinBannerConDom = $("#" + b.weixinBannerConId), "weixinPage" !== a || b.weixinBannerConDom && 0 !== b.weixinBannerConDom.length ? (b.topBannerConDom = $("." + b.topBannerConClass), "playPage" !== a || b.topBannerConDom && 0 !== b.topBannerConDom.length ? (b.downloadConDom = $("." + b.downloadConClass), !0) : !1) : !1) : !1
    }, c.topBanner = function() {
        var a = [];
        return a.push('<div class="sohuapp_download app_download_2">'), a.push("<b>"), a.push('<div class="app_download_2_right ' + b.bannerRightBtnClass + '" position="appdownload_banner_open"></div>'), a.push('<div class="app_download_2_left ' + b.bannerLeftBtnClass + '" position="appdownload_banner_download"></div>'), a.push("</b>"), a.push("<span></span>"), a.push("</div>"), a.join("")
    }, c.indexTopBanner = function() {
        var a = [];
        return a.push('<a class="sohuapp_download app_download_2 ' + b.indexBannerBtnClass + '" position="appdownload_banner_2" href="javascript:void(0);">'), a.push("<b></b>"), a.push("<span></span>"), a.push("</a>"), a.join("")
    }, c.downloadBtn = function() {
        var a = [];
        return a.push('<span class="app_download_link ' + b.downloadClass + '" position="appdownload_belowplayer">'), a.push("<b></b>下载"), a.push("</span>"), a.join("")
    }, d.init = function(a, c) {
        b.init(a) && c()
    }, d.eventInit = function() {
        var a = d.process;
        $("." + b.indexBannerBtnClass).on("click", function() {
            return a.indexBannerClick($(this)), !1
        }), $("." + b.bannerLeftBtnClass).on("click", function() {
            return a.downloadClient($(this)), !1
        }), $("." + b.bannerRightBtnClass).on("click", function() {
            return a.startClient($(this)), !1
        }), $("." + b.downloadClass, b.downloadConDom).on("click", function() {
            return a.downloadClient($(this)), !1
        })
    }, d.process = {}, d.process.indexBannerClick = function(a) {
        console.log("发送行为统计点: " + a.attr("position")), ClickTrace.pingback(a), Action.gotoDownload({
            channelSrc: "0"
        })
    }, d.process.downloadClient = function(a) {
        console.log("发送行为统计点: " + a.attr("position")), ClickTrace.pingback(a), Action.gotoDownload(a)
    }, d.process.startClient = function(a) {
        console.log("发送行为统计点: " + a.attr("position")), ClickTrace.pingback(a), Action.sendAction(Action.parserAttributes())
    }, d.indexPage = function() {
        d.init("indexPage", function() {
            b.indexNavDom && b.indexNavDom.length > 0 && $(c.indexTopBanner()).insertAfter(b.indexNavDom), d.eventInit()
        })
    }, d.playPage = function() {
        d.init("playPage", function() {
            b.topBannerConDom && b.topBannerConDom.length > 0 && b.topBannerConDom.prepend(c.topBanner()), b.downloadConDom && b.downloadConDom.length > 0 && b.downloadConDom.prepend(c.downloadBtn()), d.eventInit()
        })
    }, d.weixinPage = function() {
        d.init("weixinPage", function() {
            b.weixinBannerConDom && b.weixinBannerConDom.length > 0 && b.weixinBannerConDom.html(c.topBanner()), d.eventInit()
        })
    };
    var e = {
        indexPage: d.indexPage,
        playPage: d.playPage,
        weixinPage: d.weixinPage
    };
    return e
}();
$(document).ready(function() {
    banner.playPage(), banner.indexPage(), banner.weixinPage()
});