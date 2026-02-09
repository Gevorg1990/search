function _log(e, ...t) {
    try {
        window.Logger && "function" == typeof window.Logger[e] ? window.Logger[e](...t) : "function" == typeof console[e] ? console[e](...t) : console.log(...t)
    } catch (e) {
        console.log(...t)
    }
}
function __fromScript(e) {
    const t = document.currentScript?.src || Array.from(document.scripts).find((e => e.src && e.src.includes("search-v3.js")))?.src || location.href
        , n = new URL(".",t)
        , o = String(e || "").replace(/^(\.\/|\/)+/, "");
    return new URL(o,n).href
}
window.Logger || (window.Logger = {
    level: 4,
    useColors: !0,
    prefix: "[Search]",
    _formatMessage: function(e, t) {
        return "string" == typeof e && e.includes(this.prefix) ? e : `${this.prefix} ${t}: ${e}`
    },
    debug: function(e, ...t) {
        this.level >= 4 && console.debug(this._formatMessage(e, "DEBUG"), ...t)
    },
    info: function(e, ...t) {
        this.level >= 3 && console.info(this._formatMessage(e, "INFO"), ...t)
    },
    warn: function(e, ...t) {
        this.level >= 2 && console.warn(this._formatMessage(e, "WARN"), ...t)
    },
    error: function(e, ...t) {
        this.level >= 1 && console.error(this._formatMessage(e, "ERROR"), ...t)
    },
    setLevel: function(e) {
        if ("number" == typeof e && e >= 0 && e <= 4) {
            const t = this.level;
            return this.level = e,
                this.info(`Logger level changed from ${t} to ${e}`),
                !0
        }
        return !1
    },
    setColorMode: function() {
        return !1
    },
    table: function(e) {
        this.level >= 3 && console.table(e)
    },
    group: function(e) {
        this.level >= 3 && console.group(e)
    },
    groupCollapsed: function(e) {
        this.level >= 3 && console.groupCollapsed(e)
    },
    groupEnd: function() {
        this.level >= 3 && console.groupEnd()
    },
    _log: function(e, ...t) {
        console.log(e, ...t)
    }
},
    console.info("[Search] Using fallback Logger shim until debug-core-v3.js loads")),
window.Logger && "object" == typeof window.Logger && ("function" != typeof window.Logger.debug && (window.Logger.debug = function(e, ...t) {
        console.debug("[Search] DEBUG:", e, ...t)
    }
),
"function" != typeof window.Logger.info && (window.Logger.info = function(e, ...t) {
        console.info("[Search] INFO:", e, ...t)
    }
),
"function" != typeof window.Logger.warn && (window.Logger.warn = function(e, ...t) {
        console.warn("[Search] WARN:", e, ...t)
    }
),
"function" != typeof window.Logger.error && (window.Logger.error = function(e, ...t) {
        console.error("[Search] ERROR:", e, ...t)
    }
));
let selectedIndex = -1
    , _rebuildIndex = null
    , _pendingHideToken = 0;
function init() {
    function e() {
        if (!window.searchListInitialized) {
            if (document.getElementById("searchContainer")) {
                (n = document.getElementById("searchContainer")) && !n.querySelector(".search-field") && (n.outerHTML = SEARCH_MARKUP)
            } else {
                var e = document.getElementById("viewer");
                if (!e)
                    return void console.error("Search Pro initialization failed: #viewer element not found");
                var t = document.createElement("div");
                t.innerHTML = SEARCH_MARKUP,
                    e.appendChild(t.firstChild)
            }
            if ("object" == typeof window.tourSearchFunctions && window.tourSearchFunctions._bindSearchEventListeners) {
                var n = document.getElementById("searchContainer")
                    , o = document.getElementById("tourSearch")
                    , i = n ? n.querySelector(".clear-button") : null
                    , a = n ? n.querySelector(".search-icon") : null;
                window.tourSearchFunctions._bindSearchEventListeners(n, o, i, a, window.tourSearchFunctions.performSearch || function() {}
                )
            }
            window.searchListInitialized = !0
        }
    }
    window.searchListInitialized || ("loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e, {
        once: !0
    }) : e())
}
window.tourSearchInit = init,
    function() {
        function e(e, n=15e3) {
            const o = Date.now();
            !function i() {
                window.tour && window.tour.mainPlayList && "function" == typeof window.tour.mainPlayList.get && Array.isArray(window.tour.mainPlayList.get("items")) && window.tour.mainPlayList.get("items").length > 0 ? e && e() : Date.now() - o < n ? setTimeout(i, 200) : void 0 !== t ? _log("warn", "Tour not ready after waiting for", n, "ms.") : console.warn("Tour not ready after waiting for", n, "ms.")
            }()
        }
        const t = window.Logger;
        if (window._searchProLoaded)
            return void console.warn("Search Pro is already loaded. Skipping initialization.");
        window._searchProLoaded = !0;
        const n = '\n    <div id="searchContainer" class="search-container">\n        \x3c!-- Search input field --\x3e\n        <div class="search-field">\n            <input type="text" id="tourSearch" placeholder="Search tour locations... (* for all)" autocomplete="off">\n            <div class="icon-container">\n                \x3c!-- Search icon --\x3e\n                <div class="search-icon" aria-hidden="true">\n                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                        <circle cx="11" cy="11" r="8"></circle>\n                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>\n                    </svg>\n                </div>\n                \x3c!-- Clear search button --\x3e\n                <button class="clear-button" aria-label="Clear search" style="display: none;">\n                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                        <line x1="18" y1="6" x2="6" y2="18"></line>\n                        <line x1="6" y1="6" x2="18" y2="18"></line>\n                    </svg>\n                </button>\n            </div>\n        </div>\n        \x3c!-- Search results container --\x3e\n        <div class="search-results" role="listbox" style="display: none;">\n            <div class="results-section">\n            </div>\n            \x3c!-- No results message --\x3e\n            <div class="no-results" role="status" aria-live="polite" style="display: none;">\n                <div class="no-results-icon">\n                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                        <circle cx="12" cy="12" r="10"></circle>\n                        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />\n                        <line x1="9" y1="9" x2="9.01" y2="9"></line>\n                        <line x1="15" y1="9" x2="15.01" y2="9"></line>\n                    </svg>\n                </div>\n                No matching results\n            </div>\n        </div>\n    </div>\n';
        function o() {
            return new Promise(( (e, t) => {
                    if ("undefined" != typeof Fuse)
                        return console.log("Fuse.js already loaded, skipping load"),
                            void e();
                    const n = document.createElement("script");
                    n.src = "search-pro-v3/fuse.js/dist/fuse.min.js",
                        n.async = !0,
                        n.onload = () => {
                            _log("info", "Local Fuse.js loaded successfully"),
                                e()
                        }
                        ,
                        n.onerror = () => {
                            console.warn("Local Fuse.js failed to load, attempting to load from CDN...");
                            const n = document.createElement("script");
                            n.src = "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js",
                                n.async = !0,
                                n.onload = () => {
                                    _log("info", "Fuse.js loaded successfully from CDN"),
                                        e()
                                }
                                ,
                                n.onerror = () => {
                                    const e = new Error("Both local and CDN versions of Fuse.js failed to load");
                                    console.error(e),
                                        t(e)
                                }
                                ,
                                document.body.appendChild(n)
                        }
                        ,
                        document.body.appendChild(n)
                }
            ))
        }
        function i() {
            return new Promise((e => {
                    if (!(window.location.search.includes("debug=true") || "true" === localStorage.getItem("searchProDebugEnabled")))
                        return void e(!1);
                    const t = document.createElement("script");
                    t.src = "search-pro-v3/dashboard/js/debug-core-v3.js",
                        t.async = !0,
                        t.onload = () => {
                            _log("info", "Search Pro Debug Tools loaded successfully"),
                                e(!0)
                        }
                        ,
                        t.onerror = () => {
                            console.warn("Search Pro Debug Tools failed to load"),
                                e(!1)
                        }
                        ,
                        document.body.appendChild(t)
                }
            ))
        }
        function a() {
            return new Promise((e => {
                    if (document.querySelector('link[href="search-pro-v3/css/search-v3.css"]'))
                        return void e();
                    const t = document.createElement("link");
                    t.rel = "stylesheet",
                        t.href = "search-pro-v3/css/search-v3.css",
                        t.onload = () => e(),
                        t.onerror = () => {
                            console.warn("Failed to load search CSS, styling may be affected"),
                                e()
                        }
                        ,
                        document.head.appendChild(t)
                }
            ))
        }
        function s() {
            const e = document.getElementById("viewer");
            if (!e)
                return console.error("Search Pro initialization failed: #viewer element not found"),
                    !1;
            if (document.getElementById("searchContainer"))
                return console.log("Search container already exists, skipping DOM creation"),
                    !0;
            const t = document.createElement("div");
            return t.innerHTML = n.trim(),
                e.appendChild(t.firstChild),
                !0
        }
        async function r() {
            try {
                if (await a(),
                    !s())
                    return;
                await o(),
                    await new Promise((e => {
                            const n = "undefined" != typeof _config && _config.thumbnailSettings?.iconSettings || {};
                            if (!n.enableFontAwesome)
                                return _log("debug", "Font Awesome loading disabled"),
                                    void e(!1);
                            if (document.querySelector('link[href*="font-awesome"]') || document.querySelector('link[href*="fontawesome"]') || window.FontAwesome)
                                return _log("debug", "Font Awesome already loaded"),
                                    void e(!0);
                            const o = document.createElement("link");
                            o.rel = "stylesheet",
                                o.href = n.fontAwesomeUrl || "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
                                o.crossOrigin = "anonymous",
                                o.onload = () => {
                                    t.info("Font Awesome loaded successfully"),
                                        e(!0)
                                }
                                ,
                                o.onerror = () => {
                                    t.warn("Font Awesome failed to load"),
                                        e(!1)
                                }
                                ,
                                document.head.appendChild(o)
                        }
                    )),
                    await i();
                const n = {
                    initialized: !1,
                    async init() {
                        if (!this.initialized)
                            try {
                                await this.bindToTour(),
                                    this.initialized = !0
                            } catch (e) {
                                t.error("Tour binding failed:", e)
                            }
                    },
                    async bindToTour() {
                        if (await this.tryEventBinding())
                            t.info("Using official 3DVista events");
                        else if (await this.tryDirectBinding())
                            t.info("Using direct tour binding");
                        else {
                            if (!await this.tryDOMBinding())
                                throw new Error("All tour binding strategies failed");
                            t.info("Using DOM-based binding")
                        }
                    },
                    tryEventBinding() {
                        return new Promise(( (e, n) => {
                                try {
                                    if (window.TDV && window.TDV.Tour && window.tour && (t.debug("3DVista event system detected"),
                                        window.TDV.Tour.EVENT_TOUR_LOADED))
                                        return window.tour.bind(window.TDV.Tour.EVENT_TOUR_LOADED, ( () => {
                                                t.debug("EVENT_TOUR_LOADED fired"),
                                                    this.validateAndInitialize().then(e).catch(n)
                                            }
                                        )),
                                            void setTimeout(( () => {
                                                    n(new Error("EVENT_TOUR_LOADED timeout"))
                                                }
                                            ), 15e3);
                                    n(new Error("3DVista events not available"))
                                } catch (e) {
                                    n(e)
                                }
                            }
                        ))
                    },
                    tryDirectBinding() {
                        return new Promise(( (e, t) => {
                                let n = 0;
                                const o = () => {
                                        n++,
                                            this.isTourReady() ? this.validateAndInitialize().then(e).catch(t) : n >= 100 ? t(new Error("Direct tour binding timeout")) : setTimeout(o, 200)
                                    }
                                ;
                                o()
                            }
                        ))
                    },
                    tryDOMBinding() {
                        return new Promise(( (e, t) => {
                                const n = new MutationObserver((o => {
                                        for (const i of o)
                                            if ("childList" === i.type) {
                                                if (document.querySelectorAll("[data-name], .PanoramaOverlay, .mainViewer").length > 0 && this.isTourReady())
                                                    return n.disconnect(),
                                                        void this.validateAndInitialize().then(e).catch(t)
                                            }
                                    }
                                ));
                                n.observe(document.body, {
                                    childList: !0,
                                    subtree: !0
                                }),
                                    setTimeout(( () => {
                                            n.disconnect(),
                                                t(new Error("DOM binding timeout"))
                                        }
                                    ), 2e4)
                            }
                        ))
                    },
                    isTourReady() {
                        try {
                            const e = [window.tour, window.tourInstance, window.TDV && window.TDV.PlayerAPI && "function" == typeof window.TDV.PlayerAPI.getCurrentPlayer ? window.TDV.PlayerAPI.getCurrentPlayer() : null].filter(Boolean);
                            for (const n of e) {
                                if (!n)
                                    continue;
                                const e = PlaylistUtils.getAllPlayLists(n);
                                if (!e.main && !e.root)
                                    continue;
                                if (!(n.player && "function" == typeof n.player.getByClassName))
                                    continue;
                                try {
                                    if (!1 === n._isInitialized) {
                                        t.debug("Tour not yet initialized (_isInitialized = false)");
                                        continue
                                    }
                                } catch (e) {}
                                const o = e.main?.get("items")?.length || 0
                                    , i = e.root?.get("items")?.length || 0;
                                return t.debug(`Tour readiness validated: ${o} main items, ${i} root items`),
                                    !0
                            }
                            return t.debug("No valid tour found in readiness check"),
                                !1
                        } catch (e) {
                            return t.debug("Tour readiness check failed:", e),
                                !1
                        }
                    },
                    async validateAndInitialize() {
                        if (!this.isTourReady())
                            throw new Error("Tour validation failed");
                        const e = window.tour.mainPlayList.get("items");
                        if (t.info(`Tour ready with ${e.length} panoramas`),
                        !window.tourSearchFunctions || "function" != typeof window.tourSearchFunctions.initializeSearch)
                            throw new Error("tourSearchFunctions not available");
                        window.tourSearchFunctions.initializeSearch(window.tour)
                    }
                };
                e(( () => {
                        n.init().catch((e => {
                                t.error("Tour binding failed completely during init:", e)
                            }
                        ))
                    }
                ))
            } catch (e) {
                console.error("Search Pro initialization failed:", e)
            }
        }
        ({
            bindLifecycle() {
                window.tour && window.TDV && window.TDV.Tour && window.TDV.Tour.EVENT_TOUR_ENDED && window.tour.bind(window.TDV.Tour.EVENT_TOUR_ENDED, ( () => {
                        t.info("Tour ended - cleaning up search"),
                            this.cleanup()
                    }
                )),
                    window.addEventListener("beforeunload", ( () => {
                            this.cleanup()
                        }
                    ))
            },
            cleanup() {
                try {
                    _unbindSearchEventListeners(),
                    _crossWindowChannel && _crossWindowChannel._channel && _crossWindowChannel.close(),
                        window.searchListInitialized = !1,
                        window.searchListInitiinitialized = !1,
                        t.info("Search cleanup completed")
                } catch (e) {
                    t.warn("Cleanup error:", e)
                }
            }
        }).bindLifecycle(),
            "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", r) : r()
    }();
const Papa = {
    parse: function(e, t={}) {
        const n = {
            header: !1,
            skipEmptyLines: !0,
            dynamicTyping: !1,
            ...t
        };
        let o = e.split(/\r\n|\n/);
        n.skipEmptyLines && (o = o.filter((e => "" !== e.trim())));
        let i = [];
        if (n.header && o.length > 0) {
            const e = o.shift();
            i = e.split(",").map((e => e.trim()))
        }
        return {
            data: o.map((e => {
                    const t = e.split(",").map((e => {
                            let t = e.trim();
                            if (n.dynamicTyping) {
                                if (/^[-+]?\d+(\.\d+)?$/.test(t))
                                    return parseFloat(t);
                                if ("true" === t.toLowerCase())
                                    return !0;
                                if ("false" === t.toLowerCase())
                                    return !1
                            }
                            return t
                        }
                    ));
                    if (n.header) {
                        const e = {};
                        return i.forEach(( (n, o) => {
                                o < t.length && (e[n] = t[o])
                            }
                        )),
                            e
                    }
                    return t
                }
            )),
            errors: [],
            meta: {
                delimiter: ",",
                linebreak: "\n",
                aborted: !1,
                truncated: !1,
                cursor: 0
            }
        }
    }
};
function ensurePlaylistsReady(e) {
    window.tour && window.tour._isInitialized && window.tour.mainPlayList && "function" == typeof window.tour.mainPlayList.get && window.tour.mainPlayList.get("items") && window.tour.mainPlayList.get("items").length > 0 ? e() : window.tour && void 0 !== window.TDV && window.TDV.Tour && window.TDV.Tour.EVENT_TOUR_LOADED && "function" == typeof window.tour.bind ? window.tour.bind(window.TDV.Tour.EVENT_TOUR_LOADED, e) : setTimeout(( () => ensurePlaylistsReady(e)), 100)
}
window.tourSearchFunctions = function() {
    let e = ""
        , t = null
        , n = null;
    const o = {
        getMainPlayList(e=null) {
            const t = e || window.tour || window.tourInstance;
            if (!t)
                return null;
            if (t.mainPlayList?.get && t.mainPlayList.get("items")?.length)
                return l.debug("Found mainPlayList via direct access"),
                    t.mainPlayList;
            if (t.player?.getByClassName)
                try {
                    const e = t.player.getByClassName("PlayList").find((e => e.get && "mainPlayList" === e.get("id")));
                    if (e?.get("items")?.length)
                        return l.debug("Found mainPlayList via getByClassName search"),
                            e
                } catch (e) {
                    l.debug("getByClassName search for mainPlayList failed:", e)
                }
            return null
        },
        getRootPlayerPlayList(e=null) {
            const t = e || window.tour || window.tourInstance;
            if (!t)
                return null;
            try {
                if (t.locManager?.rootPlayer?.mainPlayList?.get && t.locManager.rootPlayer.mainPlayList.get("items")?.length)
                    return l.debug("Found rootPlayer mainPlayList"),
                        t.locManager.rootPlayer.mainPlayList
            } catch (e) {
                l.debug("Root player playlist access failed:", e)
            }
            return null
        },
        getAllPlayLists(e=null) {
            return {
                main: this.getMainPlayList(e),
                root: this.getRootPlayerPlayList(e)
            }
        }
    }
        , i = {
        init(e, t, n) {
            if (!e || !t)
                return l.error("Invalid parameters for keyboard manager"),
                    () => {}
                    ;
            let o = [];
            const i = {
                    documentKeydown: null,
                    inputKeyup: null,
                    inputKeydown: null
                }
                , a = n => {
                    if (o = e.querySelectorAll(".result-item"),
                        o.length)
                        if (selectedIndex >= 0 && selectedIndex < o.length && (o[selectedIndex].classList.remove("selected"),
                            y.setSelected(o[selectedIndex], !1)),
                            selectedIndex = n,
                        selectedIndex >= 0 && selectedIndex < o.length) {
                            const e = o[selectedIndex];
                            e.classList.add("selected"),
                                y.setSelected(e, !0),
                                e.scrollIntoView({
                                    block: "nearest",
                                    behavior: "smooth"
                                }),
                                e.focus()
                        } else
                            t.focus()
                }
            ;
            return i.documentKeydown = function(i) {
                if ("k" === i.key && (i.metaKey || i.ctrlKey) && (i.preventDefault(),
                    $(!0)),
                    e.classList.contains("visible"))
                    switch (i.key) {
                        case "Escape":
                            i.preventDefault(),
                                "" !== t.value.trim() ? (t.value = "",
                                    n(),
                                    selectedIndex = -1) : $(!1);
                            break;
                        case "ArrowDown":
                            i.preventDefault(),
                                a(Math.min(selectedIndex + 1, o.length - 1));
                            break;
                        case "ArrowUp":
                            i.preventDefault(),
                                a(Math.max(selectedIndex - 1, -1));
                            break;
                        case "Enter":
                            selectedIndex >= 0 && selectedIndex < o.length && (i.preventDefault(),
                                o[selectedIndex].click());
                            break;
                        case "Tab":
                            if (selectedIndex >= 0 && selectedIndex < o.length) {
                                i.preventDefault();
                                const e = o[selectedIndex]
                                    , n = e.querySelector(".result-title")?.textContent || e.textContent.split("\n")[0].trim();
                                if (n && t) {
                                    t.value = n;
                                    const e = new Event("input",{
                                        bubbles: !0
                                    });
                                    t.dispatchEvent(e)
                                }
                            }
                            selectedIndex = -1
                    }
            }
                ,
                i.inputKeyup = p((function() {
                        selectedIndex = -1
                    }
                ), 200),
                i.inputKeydown = function(t) {
                    "Enter" === t.key && (t.preventDefault(),
                        setTimeout(( () => {
                                o = e.querySelectorAll(".result-item"),
                                o.length > 0 && o[0].click()
                            }
                        ), 100))
                }
                ,
                document.addEventListener("keydown", i.documentKeydown),
                t.addEventListener("keyup", i.inputKeyup),
                t.addEventListener("keydown", i.inputKeydown),
                function() {
                    try {
                        document.removeEventListener("keydown", i.documentKeydown),
                        t && (t.removeEventListener("keyup", i.inputKeyup),
                            t.removeEventListener("keydown", i.inputKeydown)),
                            l.debug("Keyboard manager event listeners cleaned up")
                    } catch (e) {
                        l.warn("Error cleaning up keyboard manager:", e)
                    }
                }
        }
    }
        , a = 768;
    function s() {
        const e = window.innerWidth <= (r?.mobileBreakpoint ?? 768);
        return e && r?.autoHide?.mobile || !e && r?.autoHide?.desktop
    }
    let r = (new class {
            constructor() {
                this.config = {
                    autoHide: {
                        mobile: !1,
                        desktop: !1
                    },
                    mobileBreakpoint: a,
                    minSearchChars: 2,
                    showTagsInResults: !1,
                    elementTriggering: {
                        initialDelay: 300,
                        maxRetries: 3,
                        retryInterval: 300,
                        maxRetryInterval: 1e3,
                        baseRetryInterval: 300
                    },
                    animations: {
                        enabled: !0,
                        duration: {
                            fast: 200,
                            normal: 300,
                            slow: 500
                        },
                        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                        searchBar: {
                            openDuration: 300,
                            closeDuration: 200,
                            scaleEffect: !0
                        },
                        results: {
                            fadeInDuration: 200,
                            slideDistance: 10,
                            staggerDelay: 50
                        },
                        reducedMotion: {
                            respectPreference: !0,
                            fallbackDuration: 100
                        }
                    },
                    displayLabels: {
                        Panorama: "Panorama",
                        Hotspot: "Hotspot",
                        Polygon: "Polygon",
                        Video: "Video",
                        Webframe: "Webframe",
                        Image: "Image",
                        Text: "Text",
                        ProjectedImage: "Projected Image",
                        Element: "Element",
                        Business: "Business",
                        "3DHotspot": "3D Hotspot",
                        "3DModel": "3D Model",
                        "3DModelObject": "3D Model Object",
                        Container: "Container"
                    },
                    businessData: {
                        useBusinessData: !0,
                        businessDataFile: "business.json",
                        businessDataDir: "business-data",
                        matchField: "id",
                        fallbackMatchField: "tags",
                        replaceTourData: !0,
                        includeStandaloneEntries: !0,
                        businessDataUrl: ""
                    },
                    googleSheets: {
                        useGoogleSheetData: !1,
                        includeStandaloneEntries: !1,
                        googleSheetUrl: "",
                        localCSVUrl: "",
                        fetchMode: "csv",
                        useAsDataSource: !0,
                        csvOptions: {
                            header: !0,
                            skipEmptyLines: !0,
                            dynamicTyping: !0
                        },
                        caching: {
                            enabled: !1,
                            timeoutMinutes: 60,
                            storageKey: "tourGoogleSheetsData"
                        },
                        progressiveLoading: {
                            enabled: !1,
                            initialFields: ["id", "tag", "name"],
                            detailFields: ["description", "imageUrl", "elementType", "parentId"]
                        },
                        authentication: {
                            enabled: !1,
                            authType: "apiKey",
                            apiKey: "",
                            apiKeyParam: "key"
                        }
                    },
                    includeContent: {
                        unlabeledWithSubtitles: !0,
                        unlabeledWithTags: !0,
                        completelyBlank: !0,
                        elements: {
                            includePanoramas: !0,
                            includeHotspots: !0,
                            includePolygons: !0,
                            includeVideos: !0,
                            includeWebframes: !0,
                            includeImages: !0,
                            includeText: !0,
                            includeProjectedImages: !0,
                            includeElements: !0,
                            include3DHotspots: !0,
                            include3DModels: !0,
                            include3DModelObjects: !0,
                            includeBusiness: !0,
                            includeContainers: !0,
                            skipEmptyLabels: !1,
                            minLabelLength: 0
                        },
                        containerSearch: {
                            enableContainerSearch: !0,
                            containerNames: [""]
                        }
                    },
                    thumbnailSettings: {
                        enableThumbnails: !0,
                        thumbnailSize: "medium",
                        thumbnailSizePx: 120,
                        borderRadius: 4,
                        borderColor: "#9CBBFF",
                        borderWidth: 4,
                        defaultImagePath: "assets/default-thumbnail.jpg",
                        defaultImages: {
                            Panorama: "assets/default-thumbnail.jpg",
                            Hotspot: "assets/hotspot-default.jpg",
                            Polygon: "assets/polygon-default.jpg",
                            Video: "assets/video-default.jpg",
                            Webframe: "assets/webframe-default.jpg",
                            Image: "assets/image-default.jpg",
                            Text: "assets/text-default.jpg",
                            ProjectedImage: "assets/projected-image-default.jpg",
                            Element: "assets/element-default.jpg",
                            Business: "assets/business-default.jpg",
                            Container: "assets/container-default.jpg",
                            "3DModel": "assets/3d-model-default.jpg",
                            "3DHotspot": "assets/3d-hotspot-default.jpg",
                            "3DModelObject": "assets/3d-model-object-default.jpg",
                            default: "assets/default-thumbnail.jpg"
                        },
                        iconSettings: {
                            enableCustomIcons: !0,
                            iconSize: "48px",
                            iconColor: "#6e85f7",
                            iconOpacity: .8,
                            iconBorderRadius: 4,
                            iconAlignment: "left",
                            iconMargin: 10,
                            enableIconHover: !0,
                            iconHoverScale: 1.1,
                            iconHoverOpacity: 1,
                            customIcons: {
                                Panorama: "🏠",
                                Hotspot: "🎯",
                                Polygon: "⬟",
                                Video: "🎬",
                                Webframe: "🌐",
                                Image: "🖼️",
                                Text: "📝",
                                ProjectedImage: "🖥️",
                                Element: "⚪",
                                Business: "🏢",
                                "3DHotspot": "🎮",
                                "3DModel": "🎲",
                                "3DModelObject": "🔧",
                                Container: "📦",
                                default: "⚪"
                            },
                            fallbackSettings: {
                                useDefaultOnError: !0,
                                hideIconOnError: !1,
                                showTypeLabel: !1
                            },
                            showIconFor: {
                                panorama: !0,
                                hotspot: !0,
                                polygon: !0,
                                video: !0,
                                webframe: !0,
                                image: !0,
                                text: !0,
                                projectedimage: !0,
                                element: !0,
                                business: !0,
                                "3dmodel": !0,
                                "3dhotspot": !0,
                                "3dmodelobject": !0,
                                container: !0,
                                other: !0
                            }
                        },
                        alignment: "left",
                        groupHeaderAlignment: "left",
                        groupHeaderPosition: "top",
                        showFor: {
                            panorama: !0,
                            hotspot: !0,
                            polygon: !0,
                            video: !0,
                            webframe: !0,
                            image: !0,
                            text: !0,
                            projectedimage: !0,
                            element: !0,
                            business: !0,
                            "3dmodel": !0,
                            "3dhotspot": !0,
                            "3dmodelobject": !0,
                            container: !0,
                            other: !0
                        }
                    }
                }
            }
            setDisplayOptions(e) {
                return this.config.display = {
                    showGroupHeaders: void 0 === e?.showGroupHeaders || e.showGroupHeaders,
                    showGroupCount: void 0 === e?.showGroupCount || e.showGroupCount,
                    showIconsInResults: void 0 === e?.showIconsInResults || e.showIconsInResults,
                    onlySubtitles: void 0 !== e?.onlySubtitles && e.onlySubtitles,
                    showSubtitlesInResults: void 0 === e?.showSubtitlesInResults || e.showSubtitlesInResults,
                    showParentLabel: void 0 === e?.showParentLabel || e.showParentLabel,
                    showParentInfo: void 0 === e?.showParentInfo || e.showParentInfo,
                    showParentTags: void 0 === e?.showParentTags || e.showParentTags,
                    showParentType: void 0 === e?.showParentType || e.showParentType
                },
                    this
            }
            setContentOptions(e) {
                return this.config.includeContent = {
                    unlabeledWithSubtitles: void 0 === e?.unlabeledWithSubtitles || e.unlabeledWithSubtitles,
                    unlabeledWithTags: void 0 === e?.unlabeledWithTags || e.unlabeledWithTags,
                    completelyBlank: void 0 === e?.completelyBlank || e.completelyBlank,
                    elements: {
                        includePanoramas: void 0 === e?.elements?.includePanoramas || e.elements.includePanoramas,
                        includeHotspots: void 0 === e?.elements?.includeHotspots || e.elements.includeHotspots,
                        includePolygons: void 0 === e?.elements?.includePolygons || e.elements.includePolygons,
                        includeVideos: void 0 === e?.elements?.includeVideos || e.elements.includeVideos,
                        includeWebframes: void 0 === e?.elements?.includeWebframes || e.elements.includeWebframes,
                        includeImages: void 0 === e?.elements?.includeImages || e.elements.includeImages,
                        includeText: void 0 === e?.elements?.includeText || e.elements.includeText,
                        includeProjectedImages: void 0 === e?.elements?.includeProjectedImages || e.elements.includeProjectedImages,
                        includeElements: void 0 === e?.elements?.includeElements || e.elements.includeElements,
                        include3DHotspots: void 0 === e?.elements?.include3DHotspots || e.elements.include3DHotspots,
                        include3DModels: void 0 === e?.elements?.include3DModels || e.elements.include3DModels,
                        include3DModelObjects: void 0 === e?.elements?.include3DModelObjects || e.elements.include3DModelObjects,
                        includeBusiness: void 0 === e?.elements?.includeBusiness || e.elements.includeBusiness,
                        includeContainers: void 0 === e?.elements?.includeContainers || e.elements.includeContainers,
                        skipEmptyLabels: void 0 !== e?.elements?.skipEmptyLabels && e.elements.skipEmptyLabels,
                        minLabelLength: void 0 !== e?.elements?.minLabelLength ? e.elements.minLabelLength : 0
                    },
                    containerSearch: {
                        enableContainerSearch: void 0 !== e?.containerSearch?.enableContainerSearch && e.containerSearch.enableContainerSearch,
                        containerNames: e?.containerSearch?.containerNames || []
                    }
                },
                    this
            }
            setFilterOptions(e) {
                return this.config.filter = {
                    mode: void 0 !== e?.mode ? e?.mode : "none",
                    allowedValues: e?.allowedValues || [],
                    blacklistedValues: e?.blacklistedValues || [],
                    valueMatchMode: {
                        whitelist: e?.valueMatchMode?.whitelist || "exact",
                        blacklist: e?.valueMatchMode?.blacklist || "contains"
                    },
                    elementTypes: {
                        mode: void 0 !== e?.elementTypes?.mode ? e?.elementTypes?.mode : "none",
                        allowedTypes: e?.elementTypes?.allowedTypes || [],
                        blacklistedTypes: e?.elementTypes?.blacklistedTypes || []
                    },
                    elementLabels: {
                        mode: void 0 !== e?.elementLabels?.mode ? e?.elementLabels?.mode : "none",
                        allowedValues: e?.elementLabels?.allowedValues || [],
                        blacklistedValues: e?.elementLabels?.blacklistedValues || []
                    },
                    tagFiltering: {
                        mode: void 0 !== e?.tagFiltering?.mode ? e?.tagFiltering?.mode : "none",
                        allowedTags: e?.tagFiltering?.allowedTags || [],
                        blacklistedTags: e?.tagFiltering?.blacklistedTags || []
                    },
                    mediaIndexes: {
                        mode: void 0 !== e?.mediaIndexes?.mode ? e?.mediaIndexes?.mode : "none",
                        allowed: e?.mediaIndexes?.allowed || [],
                        blacklisted: e?.mediaIndexes?.blacklisted || []
                    }
                },
                    this
            }
            setLabelOptions(e) {
                return this.config.useAsLabel = {
                    subtitles: void 0 === e?.subtitles || e.subtitles,
                    tags: void 0 === e?.tags || e.tags,
                    elementType: void 0 === e?.elementType || e.elementType,
                    parentWithType: void 0 !== e?.parentWithType && e.parentWithType,
                    customText: e?.customText || "[Unnamed Item]"
                },
                    this
            }
            setAppearanceOptions(e) {
                return e ? (this.config.appearance = {
                    searchField: {
                        borderRadius: {
                            topLeft: e.searchField?.borderRadius?.topLeft ?? 25,
                            topRight: e.searchField?.borderRadius?.topRight ?? 25,
                            bottomRight: e.searchField?.borderRadius?.bottomRight ?? 25,
                            bottomLeft: e.searchField?.borderRadius?.bottomLeft ?? 25
                        },
                        typography: {
                            fontSize: "16px",
                            fontFamily: "inherit",
                            fontWeight: "400",
                            fontStyle: "normal",
                            lineHeight: "1.5",
                            letterSpacing: "0px",
                            textTransform: "none",
                            placeholder: {
                                fontSize: "16px",
                                fontFamily: "inherit",
                                fontWeight: "400",
                                fontStyle: "italic",
                                opacity: .7,
                                letterSpacing: "0px",
                                textTransform: "none"
                            },
                            focus: {
                                fontSize: "16px",
                                fontWeight: "400",
                                letterSpacing: "0.25px"
                            }
                        }
                    },
                    searchResults: {
                        borderRadius: {
                            topLeft: e.searchResults?.borderRadius?.topLeft ?? 5,
                            topRight: e.searchResults?.borderRadius?.topRight ?? 5,
                            bottomRight: e.searchResults?.borderRadius?.bottomRight ?? 5,
                            bottomLeft: e.searchResults?.borderRadius?.bottomLeft ?? 5
                        }
                    },
                    setSearchFieldTypography(e) {
                        return e ? (this.config.appearance || (this.config.appearance = {}),
                        this.config.appearance.searchField || (this.config.appearance.searchField = {}),
                            this.config.appearance.searchField.typography = {
                                fontSize: e.fontSize || "16px",
                                fontFamily: e.fontFamily || "inherit",
                                fontWeight: e.fontWeight || "400",
                                fontStyle: e.fontStyle || "normal",
                                lineHeight: e.lineHeight || "1.5",
                                letterSpacing: e.letterSpacing || "0px",
                                textTransform: e.textTransform || "none",
                                placeholder: {
                                    fontSize: e.placeholder?.fontSize || e.fontSize || "16px",
                                    fontFamily: e.placeholder?.fontFamily || e.fontFamily || "inherit",
                                    fontWeight: e.placeholder?.fontWeight || "400",
                                    fontStyle: e.placeholder?.fontStyle || "italic",
                                    opacity: void 0 !== e.placeholder?.opacity ? e.placeholder.opacity : .7,
                                    letterSpacing: e.placeholder?.letterSpacing || "0px",
                                    textTransform: e.placeholder?.textTransform || "none"
                                },
                                focus: {
                                    fontSize: e.focus?.fontSize || e.fontSize || "16px",
                                    fontWeight: e.focus?.fontWeight || "400",
                                    letterSpacing: e.focus?.letterSpacing || "0.25px"
                                }
                            },
                            this) : this
                    },
                    colors: {
                        searchBackground: e.colors?.searchBackground ?? "#f4f3f2",
                        searchText: e.colors?.searchText ?? "#1a1a1a",
                        placeholderText: e.colors?.placeholderText ?? "#94a3b8",
                        searchIcon: e.colors?.searchIcon ?? "#94a3b8",
                        clearIcon: e.colors?.clearIcon ?? "#94a3b8",
                        resultsBackground: e.colors?.resultsBackground ?? "#ffffff",
                        groupHeaderBackground: e.colors?.groupHeaderBackground ?? "#ffffff",
                        groupHeaderColor: e.colors?.groupHeaderColor ?? "#20293A",
                        groupCountColor: e.colors?.groupCountColor ?? "#94a3b8",
                        resultHover: e.colors?.resultHover ?? "#f0f0f0",
                        resultBorderLeft: e.colors?.resultBorderLeft ?? "#ebebeb",
                        resultText: e.colors?.resultText ?? "#1e293b",
                        resultSubtitle: e.colors?.resultSubtitle ?? "#64748b",
                        resultIconColor: e.colors?.resultIconColor ?? "#6e85f7",
                        resultSubtextColor: e.colors?.resultSubtextColor ?? "#000000",
                        highlightBackground: e.colors?.highlightBackground ?? "#ffff00",
                        highlightBackgroundOpacity: e.colors?.highlightBackgroundOpacity ?? .5,
                        highlightText: e.colors?.highlightText ?? "#000000",
                        highlightWeight: e.colors?.highlightWeight ?? "bold",
                        tagBackground: e.colors?.tagBackground ?? "#e2e8f0",
                        tagText: e.colors?.tagText ?? "#475569",
                        tagBorder: e.colors?.tagBorder ?? "#cbd5e1",
                        tagHover: e.colors?.tagHover ?? "#d1d5db"
                    },
                    tags: {
                        borderRadius: e.tags?.borderRadius ?? 12,
                        fontSize: e.tags?.fontSize ?? "12px",
                        padding: e.tags?.padding ?? "2px 8px",
                        margin: e.tags?.margin ?? "2px",
                        fontWeight: e.tags?.fontWeight ?? "500",
                        textTransform: e.tags?.textTransform ?? "none",
                        showBorder: e.tags?.showBorder ?? !0,
                        borderWidth: e.tags?.borderWidth ?? "1px"
                    }
                },
                    this) : this
            }
            setSearchBarOptions(e) {
                return this.config.searchBar = {
                    placeholder: e?.placeholder || "Search...",
                    width: e?.width || 350,
                    position: {
                        top: void 0 !== e?.position?.top ? e.position.top : 70,
                        right: void 0 !== e?.position?.right ? e.position.right : 70,
                        left: void 0 !== e?.position?.left ? e.position.left : null,
                        bottom: void 0 !== e?.position?.bottom ? e.position.bottom : null
                    },
                    useResponsive: void 0 === e?.useResponsive || e.useResponsive,
                    mobilePosition: {
                        top: void 0 !== e?.mobilePosition?.top ? e.mobilePosition.top : 60,
                        left: void 0 !== e?.mobilePosition?.left ? e.mobilePosition.left : 20,
                        right: void 0 !== e?.mobilePosition?.right ? e.mobilePosition.right : 20,
                        bottom: void 0 !== e?.mobilePosition?.bottom ? e.mobilePosition.bottom : "auto"
                    },
                    mobileOverrides: {
                        enabled: void 0 === e?.mobileOverrides?.enabled || e.mobileOverrides.enabled,
                        breakpoint: void 0 !== e?.mobileOverrides?.breakpoint ? e.mobileOverrides.breakpoint : 768,
                        width: void 0 !== e?.mobileOverrides?.width ? e.mobileOverrides.width : "90%",
                        maxWidth: void 0 !== e?.mobileOverrides?.maxWidth ? e.mobileOverrides.maxWidth : 350,
                        visibility: {
                            behavior: e?.mobileOverrides?.visibility?.behavior || "dynamic",
                            showOnScroll: void 0 !== e?.mobileOverrides?.visibility?.showOnScroll && e.mobileOverrides.visibility.showOnScroll,
                            hideThreshold: void 0 !== e?.mobileOverrides?.visibility?.hideThreshold ? e.mobileOverrides.visibility.hideThreshold : 100
                        }
                    }
                },
                    this
            }
            setGeneralOptions(e) {
                return void 0 !== e?.autoHide && (this.config.autoHide = e.autoHide),
                void 0 !== e?.mobileBreakpoint && (this.config.mobileBreakpoint = e.mobileBreakpoint),
                void 0 !== e?.minSearchChars && (this.config.minSearchChars = e.minSearchChars),
                void 0 !== e?.showTagsInResults && (this.config.showTagsInResults = e.showTagsInResults),
                void 0 !== e?.elementTriggering && (this.config.elementTriggering = {
                    ...this.config.elementTriggering,
                    ...e.elementTriggering
                }),
                    this
            }
            setDisplayLabels(e) {
                return e ? (this.config.displayLabels = {
                    ...this.config.displayLabels,
                    ...e
                },
                    this) : this
            }
            setBusinessDataOptions(e) {
                return e ? (this.config.businessData = {
                    useBusinessData: void 0 === e.useBusinessData || e.useBusinessData,
                    businessDataFile: e.businessDataFile || "business.json",
                    businessDataDir: e.businessDataDir || "business-data",
                    matchField: e.matchField || "id",
                    fallbackMatchField: e.fallbackMatchField || "tags",
                    replaceTourData: void 0 === e.replaceTourData || e.replaceTourData
                },
                    this) : this
            }
            setThumbnailSettings(e) {
                if (!e)
                    return this;
                const t = ["panorama", "hotspot", "polygon", "video", "webframe", "image", "text", "projectedimage", "element", "business", "container", "3dmodel", "3dhotspot", "3dmodelobject", "other"]
                    , n = {};
                e.showFor && Object.keys(e.showFor).forEach((o => {
                        const i = o.toLowerCase();
                        t.includes(i) ? n[i] = e.showFor[o] : (l.warn(`[Config] Unknown thumbnail type: ${o}, mapping to 'other'`),
                            n.other = e.showFor[o])
                    }
                ));
                const o = function(e) {
                    if (null == e || "" === e)
                        return "0px";
                    if ("string" == typeof e) {
                        if ("small" === e)
                            return "32px";
                        if ("medium" === e)
                            return "48px";
                        if ("large" === e)
                            return "64px";
                        if (/^\d+(\.\d+)?(%|px|em|rem|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/.test(e))
                            return e;
                        const t = parseFloat(e);
                        return isNaN(t) ? "48px" : `${t}px`
                    }
                    return "number" == typeof e ? `${e}px` : "48px"
                };
                let i;
                return i = void 0 !== e.thumbnailSize ? o(e.thumbnailSize) : void 0 !== e.thumbnailSizePx ? o(e.thumbnailSizePx) : "48px",
                    this.config.thumbnailSettings = {
                        enableThumbnails: void 0 === e.enableThumbnails || e.enableThumbnails,
                        thumbnailSize: i,
                        borderRadius: void 0 !== e.borderRadius ? e.borderRadius : 4,
                        borderColor: e.borderColor || "#9CBBFF",
                        borderWidth: e.borderWidth || 2,
                        defaultImagePath: e.defaultImagePath || "assets/default-thumbnail.jpg",
                        defaultImages: e.defaultImages || {
                            Panorama: "assets/default-thumbnail.jpg",
                            Hotspot: "assets/hotspot-default.jpg",
                            Polygon: "assets/polygon-default.jpg",
                            Video: "assets/video-default.jpg",
                            Webframe: "assets/webframe-default.jpg",
                            Image: "assets/image-default.jpg",
                            Text: "assets/text-default.jpg",
                            ProjectedImage: "assets/projected-image-default.jpg",
                            Element: "assets/element-default.jpg",
                            Business: "assets/business-default.jpg",
                            "3DModel": "assets/3d-model-default.jpg",
                            "3DHotspot": "assets/3d-hotspot-default.jpg",
                            default: "assets/default-thumbnail.jpg"
                        },
                        alignment: "right" === e.alignment ? "right" : "left",
                        groupHeaderAlignment: ["left", "right"].includes(e.groupHeaderAlignment) ? e.groupHeaderAlignment : "left",
                        groupHeaderPosition: "bottom" === e.groupHeaderPosition ? "bottom" : "top",
                        showFor: {
                            panorama: void 0 === n.panorama || n.panorama,
                            hotspot: void 0 === n.hotspot || n.hotspot,
                            polygon: void 0 === n.polygon || n.polygon,
                            video: void 0 === n.video || n.video,
                            webframe: void 0 === n.webframe || n.webframe,
                            image: void 0 === n.image || n.image,
                            text: void 0 === n.text || n.text,
                            projectedimage: void 0 === n.projectedimage || n.projectedimage,
                            element: void 0 === n.element || n.element,
                            business: void 0 === n.business || n.business,
                            "3dmodel": void 0 === n["3dmodel"] || n["3dmodel"],
                            "3dhotspot": void 0 === n["3dhotspot"] || n["3dhotspot"],
                            "3dmodelobject": void 0 === n["3dmodelobject"] || n["3dmodelobject"],
                            other: void 0 === n.other || n.other
                        }
                    },
                    this
            }
            setIconSettings(e) {
                if (!e)
                    return this;
                this.config.thumbnailSettings || (this.config.thumbnailSettings = {});
                let t = 48;
                e.iconSize && e.iconSize.endsWith("px") && (t = parseInt(e.iconSize.replace("px", "")));
                const n = ["panorama", "hotspot", "polygon", "video", "webframe", "image", "text", "projectedimage", "element", "business", "container", "3dmodel", "3dhotspot", "3dmodelobject", "other"]
                    , o = {};
                e.showIconFor && Object.keys(e.showIconFor).forEach((t => {
                        const i = t.toLowerCase();
                        n.includes(i) ? o[i] = e.showIconFor[t] : (l.warn(`[Config] Unknown icon type: ${t}, mapping to 'other'`),
                            o.other = e.showIconFor[t])
                    }
                ));
                return this.config.thumbnailSettings.iconSettings = {
                    enableCustomIcons: Boolean(e.enableCustomIcons),
                    iconSize: e.iconSize || "48px",
                    iconColor: e.iconColor || "#6e85f7",
                    iconOpacity: void 0 !== e.iconOpacity ? e.iconOpacity : .8,
                    iconBorderRadius: void 0 !== e.iconBorderRadius ? e.iconBorderRadius : 4,
                    iconAlignment: "right" === e.iconAlignment ? "right" : "left",
                    iconMargin: void 0 !== e.iconMargin ? e.iconMargin : 10,
                    enableIconHover: void 0 === e.enableIconHover || e.enableIconHover,
                    iconHoverScale: void 0 !== e.iconHoverScale ? e.iconHoverScale : 1.1,
                    iconHoverOpacity: void 0 !== e.iconHoverOpacity ? e.iconHoverOpacity : 1,
                    enableFontAwesome: Boolean(e.enableFontAwesome),
                    fontAwesomeUrl: e.fontAwesomeUrl || "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
                    customIcons: {
                        Panorama: "🏠",
                        Hotspot: "🎯",
                        Polygon: "⬟",
                        Video: "🎬",
                        Webframe: "🌐",
                        Image: "🖼️",
                        Text: "📝",
                        ProjectedImage: "🖥️",
                        Element: "⚪",
                        Business: "🏢",
                        "3DHotspot": "🎮",
                        "3DModel": "🎲",
                        "3DModelObject": "🔧",
                        Container: "📦",
                        default: "⚪",
                        ...e.customIcons
                    },
                    fallbackSettings: {
                        useDefaultOnError: void 0 === e.fallbackSettings?.useDefaultOnError || e.fallbackSettings.useDefaultOnError,
                        hideIconOnError: void 0 !== e.fallbackSettings?.hideIconOnError && e.fallbackSettings.hideIconOnError,
                        showTypeLabel: void 0 !== e.fallbackSettings?.showTypeLabel && e.fallbackSettings.showTypeLabel
                    },
                    showIconFor: {
                        panorama: void 0 === o.panorama || o.panorama,
                        hotspot: void 0 === o.hotspot || o.hotspot,
                        polygon: void 0 === o.polygon || o.polygon,
                        video: void 0 === o.video || o.video,
                        webframe: void 0 === o.webframe || o.webframe,
                        image: void 0 === o.image || o.image,
                        text: void 0 === o.text || o.text,
                        projectedimage: void 0 === o.projectedimage || o.projectedimage,
                        element: void 0 === o.element || o.element,
                        business: void 0 === o.business || o.business,
                        container: void 0 === o.container || o.container,
                        "3dmodel": void 0 === o["3dmodel"] || o["3dmodel"],
                        "3dhotspot": void 0 === o["3dhotspot"] || o["3dhotspot"],
                        "3dmodelobject": void 0 === o["3dmodelobject"] || o["3dmodelobject"],
                        other: void 0 === o.other || o.other
                    }
                },
                    console.log(`[CONFIG] Set thumbnailSettings.iconSettings.enableCustomIcons to: ${this.config.thumbnailSettings.iconSettings.enableCustomIcons}`),
                    console.log(`[CONFIG] Original value passed: ${e.enableCustomIcons} (type: ${typeof e.enableCustomIcons})`),
                    this
            }
            setGoogleSheetsOptions(e) {
                return e ? (this.config.googleSheets = {
                    useGoogleSheetData: void 0 !== e.useGoogleSheetData && e.useGoogleSheetData,
                    googleSheetUrl: e.googleSheetUrl || "",
                    useLocalCSV: void 0 !== e.useLocalCSV && e.useLocalCSV,
                    localCSVFile: e.localCSVFile || "search-data.csv",
                    localCSVDir: e.localCSVDir || "business-data",
                    localCSVUrl: e.localCSVUrl || "",
                    fetchMode: e.fetchMode || "csv",
                    useAsDataSource: void 0 !== e.useAsDataSource && e.useAsDataSource,
                    csvOptions: {
                        header: void 0 === e.csvOptions?.header || e.csvOptions.header,
                        skipEmptyLines: void 0 === e.csvOptions?.skipEmptyLines || e.csvOptions.skipEmptyLines,
                        dynamicTyping: void 0 === e.csvOptions?.dynamicTyping || e.csvOptions.dynamicTyping,
                        ...e.csvOptions
                    },
                    caching: {
                        enabled: void 0 === e.caching?.enabled || e.caching.enabled,
                        timeoutMinutes: e.caching?.timeoutMinutes || 60,
                        storageKey: e.caching?.storageKey || "tourGoogleSheetsData"
                    },
                    progressiveLoading: {
                        enabled: void 0 !== e.progressiveLoading?.enabled && e.progressiveLoading.enabled,
                        initialFields: e.progressiveLoading?.initialFields || ["id", "tag", "name"],
                        detailFields: e.progressiveLoading?.detailFields || ["description", "imageUrl", "elementType", "parentId"]
                    },
                    authentication: {
                        enabled: void 0 !== e.authentication?.enabled && e.authentication.enabled,
                        authType: e.authentication?.authType || "apiKey",
                        apiKey: e.authentication?.apiKey || "",
                        apiKeyParam: e.authentication?.apiKeyParam || "key"
                    }
                },
                    this) : this
            }
            setAnimationOptions(e) {
                return e ? (this.config.animations || (this.config.animations = {}),
                    this.config.animations = {
                        enabled: void 0 === e.enabled || e.enabled,
                        duration: {
                            fast: e.duration?.fast || 200,
                            normal: e.duration?.normal || 300,
                            slow: e.duration?.slow || 500
                        },
                        easing: e.easing || "cubic-bezier(0.22, 1, 0.36, 1)",
                        searchBar: {
                            openDuration: e.searchBar?.openDuration || 300,
                            closeDuration: e.searchBar?.closeDuration || 200,
                            scaleEffect: !1 !== e.searchBar?.scaleEffect
                        },
                        results: {
                            fadeInDuration: e.results?.fadeInDuration || 200,
                            slideDistance: e.results?.slideDistance || 10,
                            staggerDelay: e.results?.staggerDelay || 50
                        },
                        reducedMotion: {
                            respectPreference: !1 !== e.reducedMotion?.respectPreference,
                            fallbackDuration: e.reducedMotion?.fallbackDuration || 100
                        }
                    },
                    console.log("🎬 Animation options set:", this.config.animations),
                    this) : this
            }
            setSearchOptions(e) {
                return e ? (this.config.searchSettings = {
                    fieldWeights: {
                        label: e.fieldWeights?.label ?? 1,
                        businessName: e.fieldWeights?.businessName ?? .9,
                        subtitle: e.fieldWeights?.subtitle ?? .8,
                        businessTag: e.fieldWeights?.businessTag ?? .7,
                        tags: e.fieldWeights?.tags ?? .6,
                        parentLabel: e.fieldWeights?.parentLabel ?? .3
                    },
                    behavior: {
                        threshold: e.behavior?.threshold ?? .4,
                        distance: e.behavior?.distance ?? 40,
                        minMatchCharLength: e.behavior?.minMatchCharLength ?? 1,
                        useExtendedSearch: e.behavior?.useExtendedSearch ?? !0,
                        ignoreLocation: e.behavior?.ignoreLocation ?? !0,
                        location: e.behavior?.location ?? 0,
                        includeScore: e.behavior?.includeScore ?? !0
                    },
                    boostValues: {
                        businessMatch: e.boostValues?.businessMatch ?? 2,
                        sheetsMatch: e.boostValues?.sheetsMatch ?? 2.5,
                        labeledItem: e.boostValues?.labeledItem ?? 1.5,
                        unlabeledItem: e.boostValues?.unlabeledItem ?? 1,
                        childElement: e.boostValues?.childElement ?? .8
                    }
                },
                    this) : this
            }
            build() {
                return this.config
            }
        }
    ).setDisplayOptions({}).setContentOptions({}).setFilterOptions({}).setLabelOptions({}).setAppearanceOptions({}).setSearchBarOptions({}).setBusinessDataOptions({}).setGoogleSheetsOptions({}).setAnimationOptions({}).setSearchOptions({}).setDisplayLabels({}).setThumbnailSettings({}).setIconSettings({}).build();
    if (void 0 !== window.searchProConfig && window.searchProConfig) {
        console.log("Loading external search configuration...");
        try {
            r = function e(t, n) {
                if (!n || "object" != typeof n)
                    return t;
                if (!t || "object" != typeof t)
                    return n;
                const o = {
                    ...t
                };
                for (const t in n)
                    n.hasOwnProperty(t) && (n[t] && "object" == typeof n[t] && !Array.isArray(n[t]) ? o[t] = e(o[t] || {}, n[t]) : o[t] = n[t]);
                return o
            }(r, window.searchProConfig),
                console.log("External search configuration loaded successfully"),
                console.log("Merged config:", r)
        } catch (e) {
            console.warn("Error loading external search configuration:", e)
        }
    }
    const l = window.Logger;
    let c = !1
        , d = null
        , u = []
        , g = [];
    const h = {
        container: null,
        input: null,
        results: null,
        clearButton: null,
        searchIcon: null
    }
        , m = {
        _channel: null,
        channelName: "tourSearchChannel",
        init() {
            try {
                return "undefined" != typeof BroadcastChannel ? (this._channel = new BroadcastChannel(this.channelName),
                    l.info("BroadcastChannel initialized for cross-window communication"),
                    !0) : (l.warn("BroadcastChannel API not available"),
                    !1)
            } catch (e) {
                return l.warn("Failed to initialize BroadcastChannel:", e),
                    !1
            }
        },
        send(e, t) {
            try {
                return !(!this._channel && !this.init()) && (this._channel.postMessage({
                    type: e,
                    data: t,
                    timestamp: Date.now()
                }),
                    !0)
            } catch (e) {
                return l.warn("Error sending message through BroadcastChannel:", e),
                    !1
            }
        },
        listen(e) {
            try {
                return !(!this._channel && !this.init()) && (this._channel.onmessage = t => {
                    t && t.data && "function" == typeof e && e(t.data)
                }
                    ,
                    !0)
            } catch (e) {
                return l.warn("Error setting up BroadcastChannel listener:", e),
                    !1
            }
        },
        close() {
            try {
                return !!this._channel && (this._channel.close(),
                    this._channel = null,
                    !0)
            } catch (e) {
                return l.warn("Error closing BroadcastChannel:", e),
                    !1
            }
        }
    };
    function p(e, t) {
        let n;
        return function(...o) {
            clearTimeout(n),
                n = setTimeout(( () => {
                        clearTimeout(n),
                            e(...o)
                    }
                ), t)
        }
    }
    function f(e, t=!0) {
        return b(e)
    }
    function b(e) {
        if (!e)
            return null;
        let t = String(e).trim();
        if (/^(https?:)?\/\//i.test(t) || t.startsWith("/"))
            return t;
        t = t.replace(/^\.?\/?search-pro-v3\/assets\//i, "assets/"),
            t = t.replace(/^\.\//, ""),
        /^assets\//i.test(t) || (t = "assets/" + t.replace(/^\/+/, ""));
        const n = function() {
            const e = Array.from(document.scripts || []).find((e => /search-v3\.js(\?|$)/.test(e.src)));
            if (e?.src) {
                const t = new URL(e.src,window.location.href)
                    , n = t.pathname.split("/")
                    , o = n.lastIndexOf("search-pro-v3");
                return t.pathname = o > -1 ? n.slice(0, o + 1).join("/") + "/" : t.pathname.replace(/\/[^/]*$/, "/"),
                    t.toString()
            }
            return window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "/")
        }();
        try {
            return new URL(t,n).toString()
        } catch {
            return t
        }
    }
    const y = {
        setAutoComplete: function(e, t) {
            return e && e.setAttribute && e.setAttribute("aria-autocomplete", t),
                e
        },
        setRole: (e, t) => (e && t && e.setAttribute("role", t),
            e),
        setLabel: (e, t) => (e && t && e.setAttribute("aria-label", t),
            e),
        setExpanded: (e, t) => (e && e.setAttribute("aria-expanded", String(!!t)),
            e),
        setSelected: (e, t) => (e && e.setAttribute("aria-selected", String(!!t)),
            e),
        setHidden: (e, t) => (e && e.setAttribute("aria-hidden", String(!!t)),
            e),
        setCurrent: (e, t) => (e && t && e.setAttribute("aria-current", t),
            e)
    };
    function w(e) {
        return (e || "").toString().toLowerCase().normalize("NFKD").replace(/["""']/g, "").replace(/[‐-–—−]/g, "-").replace(/[\[\](){}]/g, "").replace(/\s+/g, " ").trim()
    }
    function v(e, t) {
        if (!e)
            return "Element";
        try {
            if (l.debug("[ELEMENT TYPE DEBUG] Called with:", {
                overlayId: e.id,
                overlayClass: e.class,
                label: t,
                hasVertices: e.vertices ? e.vertices.length : "none"
            }),
            !0 === e.projected || "true" === e.projected)
                return console.log(`[ELEMENT TYPE DEBUG] Returning ProjectedImage for: ${e.id}`),
                    "ProjectedImage";
            if (e.id || t) {
                const n = (e.id || "").toString().toLowerCase()
                    , o = (t || "").toLowerCase();
                if (["projected-image", "projectedimage", "text-projected-image", "textprojectedimage"].some((e => n.includes(e) || o.includes(e))))
                    return console.log(`[ELEMENT TYPE DEBUG] Returning ProjectedImage based on name: ${n}`),
                        "ProjectedImage"
            }
            if (e.vertices && Array.isArray(e.vertices) && e.vertices.length > 2)
                return e.video || e.videoResource || e.data && e.data.video ? (console.log(`[ELEMENT TYPE DEBUG] Returning Video polygon for: ${e.id}`),
                    "Video") : e.image || e.imageResource || e.data && e.data.image ? (console.log(`[ELEMENT TYPE DEBUG] Returning Image polygon for: ${e.id}`),
                    "Image") : (console.log(`[ELEMENT TYPE DEBUG] Returning Polygon for: ${e.id}`),
                    "Polygon");
            if (e.id) {
                const n = e.id.toString().toLowerCase()
                    , o = (t || "").toLowerCase();
                console.log(`[ELEMENT TYPE DEBUG] Checking image keywords for: ${n}, label: ${o}`);
                if (["projected-image", "projectedimage", "text-projected-image", "textprojectedimage"].some((e => n.includes(e) || o.includes(e))))
                    console.log(`[ELEMENT TYPE DEBUG] Skipping image classification - this is a projected image: ${n}`);
                else {
                    const e = ["image", "placeholder", "photo", "picture", "img"].some((e => n.includes(e) || o.includes(e)));
                    if (console.log(`[ELEMENT TYPE DEBUG] Image keywords check result: ${e} for ${n}`),
                        e)
                        return console.log(`[DEBUG] Reclassifying as Image based on ID/label: ${n}`),
                            "Image"
                }
            }
            if (e.id) {
                const t = e.id.toString().toLowerCase();
                if (l.debug(`[DEBUG] Checking ID: ${t}`),
                    t.includes("sprite"))
                    return l.debug("[DEBUG] ID contains 'sprite', returning 3DHotspot"),
                        "3DHotspot"
            }
            if (e.class && (e.class.includes("SpriteModel3DObject") || e.class.includes("InnerModel3DObject")))
                return l.debug(`[ELEMENT TYPE DEBUG] Detected 3DModelObject: ${e.class}`),
                    "3DModelObject";
            const n = {
                FramePanoramaOverlay: "Webframe",
                QuadVideoPanoramaOverlay: "Video",
                ImagePanoramaOverlay: "Image",
                TextPanoramaOverlay: "Text",
                HotspotPanoramaOverlay: "Hotspot",
                Model3DObject: "3DModelObject",
                SpriteModel3DObject: "3DModelObject",
                InnerModel3DObject: "3DModelObject",
                SpriteHotspotObject: "3DHotspot",
                Sprite3DObject: "3DHotspot",
                Model3D: "3DModel",
                Model3DPlayListItem: "3DModel",
                ProjectedImagePanoramaOverlay: "ProjectedImage",
                PolygonPanoramaOverlay: "Polygon",
                VideoPolygonPanoramaOverlay: "Video",
                ImagePolygonPanoramaOverlay: "Image",
                Container: "Container"
            };
            if (e.class && n[e.class])
                return n[e.class];
            if ("function" == typeof e.get)
                try {
                    const t = e.get("class");
                    if (n[t])
                        return n[t]
                } catch (e) {
                    l.debug("Error getting class via get method:", e)
                }
            if (("HotspotPanoramaOverlay" === e.class || "function" == typeof e.get && "HotspotPanoramaOverlay" === e.get("class")) && t && t.toLowerCase().includes("polygon"))
                return l.debug(`[DEBUG] HotspotPanoramaOverlay with polygon label detected: ${t}`),
                    "Polygon";
            const o = [{
                props: ["url", "data.url"],
                type: "Webframe"
            }, {
                props: ["video", "data.video"],
                type: "Video"
            }, {
                props: ["vertices", "polygon", "data.vertices", "data.polygon"],
                type: "Polygon"
            }, {
                props: ["model3d", "data.model3d"],
                type: "3DModel"
            }, {
                props: ["sprite3d", "data.sprite3d"],
                type: "3DHotspot"
            }, {
                props: ["projected", "data.projected"],
                type: "ProjectedImage"
            }];
            for (const t of o)
                for (const n of t.props)
                    if (n.includes(".")) {
                        const [o,i] = n.split(".");
                        if (e[o] && e[o][i])
                            return t.type
                    } else if (e[n])
                        return t.type;
            const i = [{
                pattern: "web",
                type: "Webframe"
            }, {
                pattern: "video",
                type: "Video"
            }, {
                pattern: "image",
                type: "Image"
            }, {
                pattern: "text",
                type: "Text"
            }, {
                pattern: "polygon",
                type: "Polygon"
            }, {
                pattern: "goto",
                type: "Hotspot"
            }, {
                pattern: "info",
                type: "Hotspot"
            }, {
                pattern: "3d-model",
                type: "3DModel"
            }, {
                pattern: "model3d",
                type: "3DModel"
            }, {
                pattern: "3d-hotspot",
                type: "3DHotspot"
            }, {
                pattern: "sprite",
                type: "3DHotspot"
            }, {
                pattern: "projected",
                type: "ProjectedImage"
            }, {
                pattern: "projectedimage",
                type: "ProjectedImage"
            }]
                , a = (e.label || t || "").toLowerCase();
            if (a)
                for (const {pattern: e, type: t} of i)
                    if (a === e || a.includes(e))
                        return t;
            return "Element"
        } catch (e) {
            return l.warn("Error in element type detection:", e),
                "Element"
        }
    }
    function S(e, t, n, o) {
        const i = (t ?? "").toString();
        try {
            const a = function(e) {
                try {
                    const t = ["Panorama", "Hotspot", "Polygon", "Video", "Webframe", "Image", "Text", "ProjectedImage", "Element", "Business", "3DHotspot", "3DModel", "3DModelObject", "Container"];
                    if (!e || "string" != typeof e)
                        return {
                            isValid: !1,
                            normalized: "",
                            reason: "Invalid or missing element type"
                        };
                    const n = e.trim();
                    if (t.includes(n))
                        return {
                            isValid: !0,
                            normalized: n,
                            reason: "Known element type"
                        };
                    const o = t.find((e => e.toLowerCase() === n.toLowerCase()));
                    return o ? {
                        isValid: !0,
                        normalized: o,
                        reason: "Case-corrected match"
                    } : (l.info(`Unknown element type encountered: ${n}`),
                        {
                            isValid: !0,
                            normalized: n,
                            reason: "Unknown but allowed"
                        })
                } catch (e) {
                    return l.warn("Error validating element type:", e),
                        {
                            isValid: !1,
                            normalized: "",
                            reason: "Validation error"
                        }
                }
            }(e);
            if (!a.isValid)
                return l.warn(`Invalid element type rejected: ${e} - ${a.reason}`),
                    !1;
            const s = a.normalized;
            if (!t && r.includeContent.elements.skipEmptyLabels)
                return !1;
            if (t && r.includeContent.elements.minLabelLength > 0 && t.length < r.includeContent.elements.minLabelLength)
                return !1;
            const c = r.filter?.mode;
            if (c && "none" !== c)
                if (l.debug("[TOP-LEVEL FILTER] Evaluating", {
                    type: s,
                    label: i,
                    mode: c
                }),
                "whitelist" === c) {
                    const t = r.filter?.allowedValues;
                    if (Array.isArray(t) && t.length > 0) {
                        const n = t.map((e => w(e))).filter((e => e.length > 0));
                        if (n.length > 0) {
                            const t = w(i)
                                , a = r.filter?.valueMatchMode?.whitelist || "exact";
                            let s = !1;
                            if (s = "exact" === a ? n.includes(t) : "startsWith" === a ? n.some((e => t.startsWith(e))) : "regex" === a ? n.some((e => {
                                    try {
                                        return new RegExp(e,"i").test(i)
                                    } catch {
                                        return !1
                                    }
                                }
                            )) : n.some((e => t.includes(e))),
                                l.debug("[TOP-LEVEL FILTER DEBUG] Normalized check:", {
                                    displayLabel: i,
                                    labelNorm: t,
                                    normalizedAllowed: n,
                                    mode: a,
                                    hasMatch: s,
                                    elementType: e,
                                    subtitle: o || "[none]"
                                }),
                                !s)
                                return r.debugMode && l.debug(`Top-level whitelist rejected: "${i}" did not match whitelist (${a})`),
                                    l.debug(`[TOP-LEVEL FILTER REJECT] "${i}" not in whitelist (${a})`),
                                    !1;
                            r.debugMode && l.debug(`Top-level whitelist passed: "${i}" matched whitelist (${a})`),
                                l.debug(`[TOP-LEVEL FILTER PASS] "${i}" found in whitelist (${a})`)
                        }
                    }
                } else if ("blacklist" === c) {
                    const t = r.filter?.blacklistedValues;
                    if (Array.isArray(t) && t.length > 0) {
                        const n = t.map((e => w(e))).filter((e => e.length > 0));
                        if (n.length > 0) {
                            const t = w(i)
                                , a = r.filter?.valueMatchMode?.blacklist || "contains";
                            let s = !1;
                            if (s = "exact" === a ? n.includes(t) : "startsWith" === a ? n.some((e => t.startsWith(e))) : "regex" === a ? n.some((e => {
                                    try {
                                        return new RegExp(e,"i").test(i)
                                    } catch {
                                        return !1
                                    }
                                }
                            )) : n.some((e => t.includes(e))),
                                l.debug("[TOP-LEVEL BLACKLIST DEBUG] Normalized check:", {
                                    displayLabel: i,
                                    labelNorm: t,
                                    normalizedBlacklisted: n,
                                    mode: a,
                                    hasMatch: s,
                                    elementType: e,
                                    subtitle: o || "[none]"
                                }),
                                s)
                                return r.debugMode && l.debug(`Top-level blacklist rejected: "${i}" matched blacklist (${a})`),
                                    l.debug(`[TOP-LEVEL BLACKLIST REJECT] "${i}" matched blacklist (${a})`),
                                    !1;
                            r.debugMode && l.debug(`Top-level blacklist passed: "${i}" did not match blacklist (${a})`),
                                l.debug(`[TOP-LEVEL BLACKLIST PASS] "${i}" did not match blacklist (${a})`)
                        }
                    }
                }
            const d = r.filter.elementTypes?.mode;
            if (d && "none" !== d)
                if ("whitelist" === d) {
                    const e = r.filter.elementTypes?.allowedTypes;
                    if (Array.isArray(e) && e.length > 0) {
                        const t = e.map((e => e ? String(e).trim().toLowerCase() : "")).filter((e => e.length > 0))
                            , n = s.toLowerCase()
                            , o = t.includes(n);
                        if (l.debug(`[ELEMENT-TYPE WHITELIST DEBUG] Checking "${s}":`, {
                            elementType: s,
                            normalizedElementTypeLower: n,
                            normalizedAllowedTypes: t,
                            hasMatch: o,
                            displayLabel: i
                        }),
                        t.length > 0 && !o)
                            return r.debugMode && l.debug(`Element type whitelist rejected: "${s}", allowed: ${JSON.stringify(t)}`),
                                l.debug(`[ELEMENT-TYPE WHITELIST REJECT] "${s}" not in allowed types`),
                                !1;
                        o && l.debug(`[ELEMENT-TYPE WHITELIST PASS] "${s}" found in allowed types`)
                    }
                } else if ("blacklist" === d) {
                    const e = r.filter.elementTypes?.blacklistedTypes;
                    if (Array.isArray(e) && e.length > 0) {
                        const t = e.map((e => e ? String(e).trim().toLowerCase() : "")).filter((e => e.length > 0))
                            , n = s.toLowerCase()
                            , o = t.includes(n);
                        if (l.debug(`[ELEMENT-TYPE BLACKLIST DEBUG] Checking "${s}":`, {
                            elementType: s,
                            normalizedElementTypeLower: n,
                            normalizedBlacklistedTypes: t,
                            hasMatch: o,
                            displayLabel: i
                        }),
                        t.length > 0 && o)
                            return r.debugMode && l.debug(`Element type blacklist rejected: "${s}", blacklisted: ${JSON.stringify(t)}`),
                                l.debug(`[ELEMENT-TYPE BLACKLIST REJECT] "${s}" found in blacklisted types`),
                                !1;
                        o || l.debug(`[ELEMENT-TYPE BLACKLIST PASS] "${s}" not in blacklisted types`)
                    }
                }
            const u = r.filter.elementLabels?.mode;
            if (l.debug(`[ELEMENT-LABELS] Checking element "${t}" (mode: ${u || "none"})`),
            t && "whitelist" === u && Array.isArray(r.filter.elementLabels?.allowedValues) && r.filter.elementLabels.allowedValues.length > 0) {
                const e = t.toLowerCase()
                    , n = r.filter.elementLabels.allowedValues.map((e => "string" == typeof e ? e.trim().toLowerCase() : String(e).trim().toLowerCase())).filter((e => e.length > 0));
                if (l.debug(`[ELEMENT-LABELS WHITELIST] Checking "${e}" against allowed values:`, n),
                n.length > 0) {
                    const o = n.filter((t => e.includes(t)))
                        , i = o.length > 0;
                    if (l.debug("[ELEMENT-LABELS WHITELIST] Partial text matches found:", o),
                        !i)
                        return r.debugMode && l.debug(`Element label whitelist rejected: "${t}", allowed: ${JSON.stringify(n)}`),
                            l.debug(`[ELEMENT-LABELS WHITELIST REJECT] No partial matches found for "${t}"`),
                            !1;
                    l.debug("[ELEMENT-LABELS WHITELIST PASS] Partial matches found:", o)
                }
            } else if (t && "blacklist" === u && Array.isArray(r.filter.elementLabels?.blacklistedValues) && r.filter.elementLabels.blacklistedValues.length > 0) {
                const e = t.toLowerCase()
                    , n = r.filter.elementLabels.blacklistedValues.map((e => "string" == typeof e ? e.trim().toLowerCase() : String(e).trim().toLowerCase())).filter((e => e.length > 0));
                if (l.debug(`[ELEMENT-LABELS BLACKLIST] Checking "${e}" against blacklisted values:`, n),
                n.length > 0) {
                    const o = n.filter((t => e.includes(t)))
                        , i = o.length > 0;
                    if (l.debug("[ELEMENT-LABELS BLACKLIST] Partial text matches found:", o),
                        i)
                        return r.debugMode && l.debug(`Element label blacklist rejected: "${t}", blacklisted: ${JSON.stringify(n)}`),
                            l.debug("[ELEMENT-LABELS BLACKLIST REJECT] Partial matches found:", o),
                            !1;
                    l.debug("[ELEMENT-LABELS BLACKLIST PASS] No partial matches found")
                }
            } else
                u && l.debug("[ELEMENT-LABELS] No filtering applied (empty config or no displayLabel)");
            const g = r.filter.tagFiltering?.mode;
            if (l.debug(`[TAG-FILTERING] Checking element with tags ${JSON.stringify(n || [])} (mode: ${g || "none"})`),
            Array.isArray(n) && n.length > 0) {
                const e = n.map((e => (e || "").toString().toLowerCase()));
                if (l.debug("[TAG-FILTERING] Normalized element tags:", e),
                "whitelist" === g && Array.isArray(r.filter.tagFiltering?.allowedTags) && r.filter.tagFiltering.allowedTags.length > 0) {
                    const t = r.filter.tagFiltering.allowedTags.map((e => "string" == typeof e ? e.trim().toLowerCase() : String(e).trim().toLowerCase())).filter((e => e.length > 0));
                    if (l.debug("[TAG-FILTERING WHITELIST] Checking against allowed tags:", t),
                    t.length > 0) {
                        const o = e.filter((e => t.includes(e)))
                            , i = o.length > 0;
                        if (l.debug("[TAG-FILTERING WHITELIST] Matching tags found:", o),
                            !i)
                            return r.debugMode && l.debug(`Tag whitelist rejected: tags="${JSON.stringify(n)}", allowed: ${JSON.stringify(t)}`),
                                l.debug("[TAG-FILTERING WHITELIST REJECT] No matching tags found"),
                                !1;
                        l.debug("[TAG-FILTERING WHITELIST PASS] Matching tags:", o)
                    }
                } else if ("blacklist" === g && Array.isArray(r.filter.tagFiltering?.blacklistedTags) && r.filter.tagFiltering.blacklistedTags.length > 0) {
                    const t = r.filter.tagFiltering.blacklistedTags.map((e => "string" == typeof e ? e.trim().toLowerCase() : String(e).trim().toLowerCase())).filter((e => e.length > 0));
                    if (l.debug("[TAG-FILTERING BLACKLIST] Checking against blacklisted tags:", t),
                    t.length > 0) {
                        const o = e.filter((e => t.includes(e)))
                            , i = o.length > 0;
                        if (l.debug("[TAG-FILTERING BLACKLIST] Matching blacklisted tags found:", o),
                            i)
                            return r.debugMode && l.debug(`Tag blacklist rejected: tags="${JSON.stringify(n)}", blacklisted: ${JSON.stringify(t)}`),
                                l.debug("[TAG-FILTERING BLACKLIST REJECT] Blacklisted tags found:", o),
                                !1;
                        l.debug("[TAG-FILTERING BLACKLIST PASS] No blacklisted tags found")
                    }
                }
            } else if ("whitelist" === g && Array.isArray(r.filter.tagFiltering?.allowedTags) && r.filter.tagFiltering.allowedTags.length > 0) {
                const e = r.filter.tagFiltering.allowedTags.map((e => "string" == typeof e ? e.trim().toLowerCase() : String(e).trim().toLowerCase())).filter((e => e.length > 0));
                if (l.debug("[TAG-FILTERING WHITELIST] Element has no tags, required tags:", e),
                e.length > 0)
                    return r.debugMode && l.debug(`Tag whitelist rejected: no tags present, required tags: ${JSON.stringify(e)}`),
                        l.debug("[TAG-FILTERING WHITELIST REJECT] Element has no tags but tags are required"),
                        !1
            } else
                g && l.debug("[TAG-FILTERING] No filtering applied (no tags present or empty config)");
            const h = {
                Panorama: "includePanoramas",
                Hotspot: "includeHotspots",
                Polygon: "includePolygons",
                Video: "includeVideos",
                Webframe: "includeWebframes",
                Image: "includeImages",
                Text: "includeText",
                ProjectedImage: "includeProjectedImages",
                Element: "includeElements",
                "3DHotspot": "include3DHotspots",
                "3DModel": "include3DModels",
                "3DModelObject": "include3DModelObjects",
                Business: "includeBusiness",
                Container: "includeContainers"
            }[s];
            if (h) {
                if (!1 === r.includeContent?.elements?.[h])
                    return !1
            } else {
                const e = `include${s}s`;
                if (!1 === r.includeContent?.elements?.[e])
                    return !1;
                if (!1 === r.includeContent?.elements?.includeUnknownTypes)
                    return l.warn(`Unknown element type encountered: ${s}`),
                        !1
            }
            return r.debugMode && l.debug(`Element passed all filters: type="${s}", label="${label || "[empty]"}", subtitle="${o || "[none]"}", tags="${JSON.stringify(n || [])}"`),
                !0
        } catch (e) {
            return l.warn("Error in element filtering:", e),
                !1
        }
    }
    function E(e, t, n, o={}) {
        if (!e || !t)
            return l.warn("Invalid tour or elementId for trigger"),
                void (n && n(!1));
        const i = {
            ...r.elementTriggering,
            ...o
        };
        let a = 0;
        const s = () => {
                try {
                    if (!e || !e.player)
                        return l.warn("Tour or player not available"),
                            void (n && n(!1));
                    const o = function(e, t) {
                        let n = null;
                        try {
                            if (n = e.player.getById(t),
                                n)
                                return n
                        } catch (e) {
                            l.debug("getById method failed:", e)
                        }
                        try {
                            if (n = e.get(t) || e.player.get(t),
                                n)
                                return n
                        } catch (e) {
                            l.debug("get method failed:", e)
                        }
                        try {
                            if ("function" == typeof e.player.getAllIDs) {
                                if (e.player.getAllIDs().includes(t))
                                    return e.player.getById(t)
                            }
                        } catch (e) {
                            l.debug("getAllIDs method failed:", e)
                        }
                        return null
                    }(e, t);
                    if (o) {
                        l.info(`Element found: ${t}`);
                        const e = [{
                            name: "trigger",
                            fn: e => e.trigger("click")
                        }, {
                            name: "click",
                            fn: e => e.click()
                        }, {
                            name: "onClick",
                            fn: e => e.onClick()
                        }];
                        for (const t of e)
                            try {
                                if ("function" == typeof o[t.name] || "onClick" === t.name && o.onClick)
                                    return t.fn(o),
                                        l.info(`Element triggered successfully using ${t.name}`),
                                        void (n && n(!0))
                            } catch (e) {
                                l.debug(`Error with ${t.name} method:`, e)
                            }
                        l.warn("All trigger methods failed for element:", t)
                    }
                    if (a++,
                    a < i.maxRetries) {
                        const e = (e => {
                                const t = i.baseRetryInterval * Math.pow(1.5, e);
                                return Math.min(t, i.maxRetryInterval)
                            }
                        )(a);
                        l.debug(`Element trigger attempt ${a} failed, retrying in ${e}ms...`),
                            setTimeout(s, e)
                    } else
                        l.warn(`Failed to trigger element ${t} after ${i.maxRetries} attempts`),
                        n && n(!1)
                } catch (e) {
                    l.warn(`Error in triggerElement: ${e.message}`),
                    n && n(!1)
                }
            }
        ;
        setTimeout(s, i.initialDelay)
    }
    function L(e, {label: t, parentModelId: n}) {
        if (!e || !t)
            return null;
        const o = ["SpriteModel3DObject", "SpriteHotspotObject", "Sprite3DObject"]
            , i = t.toLowerCase();
        let a = [];
        try {
            if (e.player && "function" == typeof e.player.getByClassName)
                for (const t of o) {
                    const n = e.player.getByClassName(t);
                    Array.isArray(n) && a.push(...n)
                }
        } catch (e) {
            l.debug("[3D DEBUG] getByClassName failed:", e)
        }
        for (const e of a)
            try {
                const t = _safeGetData(e)
                    , o = (t?.label || e.label || e.get && e.get("label") || "").trim().toLowerCase();
                if (!o)
                    continue;
                let a = !0;
                if (n) {
                    const t = e.get ? e.get("parent") : e.parent
                        , o = t && t.get ? t.get("id") : t?.id;
                    a = !o || o === n
                }
                if (a && (o === i || o.includes(i)))
                    return e
            } catch (e) {}
        return null
    }
    function I() {
        if (!document.getElementById("searchContainer"))
            return void l?.warn?.("[STYLE] Skipping styling; #searchContainer not mounted yet");
        console.log("Thumbnail settings:", window.searchFunctions?.getConfig()?.thumbnailSettings);
        const e = document.getElementById("searchContainer");
        e?.querySelector(".search-results");
        if (e)
            h.container = e;
        else {
            l.warn("Search container not found, will attempt to create it");
            try {
                const e = document.getElementById("viewer");
                if (!e)
                    return void l.error("Cannot create search container: #viewer element not found");
                const t = document.createElement("div");
                t.innerHTML = SEARCH_MARKUP.trim(),
                    e.appendChild(t.firstChild),
                    l.info("Search container created successfully");
                const n = document.getElementById("searchContainer");
                if (!n)
                    return void l.error("Failed to create search container");
                h.container = n
            } catch (e) {
                return void l.error("Error creating search container:", e)
            }
        }
        h.input = h.container.querySelector("#tourSearch"),
            h.results = h.container.querySelector(".search-results"),
            h.clearButton = h.container.querySelector(".clear-button"),
            h.searchIcon = h.container.querySelector(".search-icon");
        const t = r.searchBar.position
            , n = r.searchBar.mobileOverrides || {}
            , o = (n?.enabled && r.searchBar.useResponsive ? n?.breakpoint : null) ?? r.mobileBreakpoint
            , i = window.innerWidth <= o
            , a = document.getElementById("searchContainer");
        if (!a)
            return void l.error("Search container still not available after creation attempt");
        const s = i && r.searchBar.useResponsive && r.searchBar.mobileOverrides?.enabled;
        null !== t.left && null === t.right ? a.setAttribute("data-position", "left") : null !== t.left && "50%" === t.left ? a.setAttribute("data-position", "center") : a.setAttribute("data-position", "right"),
            a.setAttribute("data-visibility-behavior", s ? n.visibility?.behavior || "dynamic" : "fixed");
        const c = document.getElementById("search-custom-vars");
        c && c.remove();
        const d = document.createElement("style");
        d.id = "search-custom-vars";
        const u = r.searchBar.mobilePosition
            , g = "number" == typeof r.searchBar.width ? `${r.searchBar.width}px` : r.searchBar.width
            , m = n.width ? "number" == typeof n.width ? `${n.width}px` : n.width : `calc(100% - ${2 * (u.left || 0) + 2 * (u.right || 0)}px)`
            , p = n.maxWidth ? "number" == typeof n.maxWidth ? `${n.maxWidth}px` : n.maxWidth : ""
            , f = s ? `\n            /* Mobile positioning with overrides */\n            #searchContainer {\n                position: fixed;\n                ${null !== u.top && void 0 !== u.top ? `top: ${u.top}px;` : ""}\n                ${null !== u.right && void 0 !== u.right ? `right: ${u.right}px;` : ""}\n                ${null !== u.left && void 0 !== u.left ? `left: ${u.left}px;` : ""}\n                ${null !== u.bottom && void 0 !== u.bottom ? "auto" === u.bottom ? "bottom: auto;" : `bottom: ${u.bottom}px;` : ""}\n                width: ${m};\n                ${p ? `max-width: ${p};` : ""}\n                z-index: 9999;\n            }\n\n            /* Apply mobile-specific visibility behavior */\n            ${"dynamic" === n.visibility?.behavior ? '\n            #searchContainer[data-visibility-behavior="dynamic"] {\n                transition: opacity 0.3s ease, transform 0.3s ease;\n            }\n            ' : ""}\n\n            ${"fixed" === n.visibility?.behavior ? '\n            #searchContainer[data-visibility-behavior="fixed"] {\n                opacity: 1 !important;\n                transform: none !important;\n            }\n            ' : ""}\n        ` : `\n            /* Desktop positioning */\n            #searchContainer {\n                position: fixed;\n                ${null !== t.top ? `top: ${t.top}px;` : ""}\n                ${null !== t.right ? `right: ${t.right}px;` : ""}\n                ${null !== t.left ? `left: ${t.left}px;` : ""}\n                ${null !== t.bottom ? `bottom: ${t.bottom}px;` : ""}\n                width: ${g};\n                z-index: 9999;\n            }\n        `
            , b = document.documentElement;
        b.style.setProperty("--result-tags-display", r.showTagsInResults ? "block" : "none"),
            r.display.showGroupHeaders ? document.body.classList.remove("hide-group-headers") : document.body.classList.add("hide-group-headers"),
            r.display.showGroupCount ? document.body.classList.remove("hide-group-count") : document.body.classList.add("hide-group-count"),
            r.display.showIconsInResults ? document.body.classList.remove("hide-result-icons") : document.body.classList.add("hide-result-icons"),
            b.style.setProperty("--color-result-icon", r.appearance.colors.resultIconColor || "#6e85f7");
        const w = r.appearance.searchField.borderRadius
            , v = r.appearance.searchResults.borderRadius;
        b.style.setProperty("--search-field-radius-top-left", Math.min(w.topLeft, 50) + "px"),
            b.style.setProperty("--search-field-radius-top-right", Math.min(w.topRight, 50) + "px"),
            b.style.setProperty("--search-field-radius-bottom-right", Math.min(w.bottomRight, 50) + "px"),
            b.style.setProperty("--search-field-radius-bottom-left", Math.min(w.bottomLeft, 50) + "px"),
            b.style.setProperty("--search-results-radius-top-left", Math.min(v.topLeft, 10) + "px"),
            b.style.setProperty("--search-results-radius-top-right", Math.min(v.topRight, 10) + "px"),
            b.style.setProperty("--search-results-radius-bottom-right", Math.min(v.bottomRight, 10) + "px"),
            b.style.setProperty("--search-results-radius-bottom-left", Math.min(v.bottomLeft, 10) + "px");
        const S = r.thumbnailSettings?.borderRadius || 4
            , E = r.thumbnailSettings?.borderColor || "#e5e7eb"
            , L = r.thumbnailSettings?.borderWidth || 2;
        b.style.setProperty("--thumbnail-border-radius", S + "px"),
            b.style.setProperty("--thumbnail-border-color", E),
            0 === L ? (b.style.setProperty("--thumbnail-border-width", "0px"),
                b.style.setProperty("--thumbnail-border-style", "none")) : (b.style.setProperty("--thumbnail-border-width", L + "px"),
                b.style.setProperty("--thumbnail-border-style", "solid"));
        const I = r.thumbnailSettings?.thumbnailSize || "48px";
        let T = 48;
        I && I.endsWith("px") && (T = parseInt(I.replace("px", ""))),
            b.style.setProperty("--thumbnail-current-size", T + "px"),
            b.style.setProperty("--thumbnail-small-size", "32px"),
            b.style.setProperty("--thumbnail-medium-size", "48px"),
            b.style.setProperty("--thumbnail-large-size", "64px");
        const x = void 0 !== r && r.thumbnailSettings?.iconSettings || {};
        let D = 20;
        if ("small" === x.iconSize ? D = 16 : "medium" === x.iconSize ? D = 20 : "large" === x.iconSize ? D = 24 : "custom" === x.iconSize && x.iconSizePx && (D = x.iconSizePx),
            b.style.setProperty("--icon-current-size", D + "px"),
            b.style.setProperty("--icon-color", x.iconColor || "#6e85f7"),
            b.style.setProperty("--icon-opacity", void 0 !== x.iconOpacity ? x.iconOpacity : .8),
            b.style.setProperty("--icon-border-radius", (void 0 !== x.iconBorderRadius ? x.iconBorderRadius : 4) + "px"),
            b.style.setProperty("--icon-margin", (void 0 !== x.iconMargin ? x.iconMargin : 10) + "px"),
            b.style.setProperty("--icon-hover-scale", void 0 !== x.iconHoverScale ? x.iconHoverScale : 1.1),
            b.style.setProperty("--icon-hover-opacity", void 0 !== x.iconHoverOpacity ? x.iconHoverOpacity : 1),
            document.body.setAttribute("data-icon-alignment", "right" === x.iconAlignment ? "right" : "left"),
            document.body.setAttribute("data-icon-hover-enabled", !1 !== x.enableIconHover ? "true" : "false"),
            l.debug("[ICON CSS] Applied icon variables:", {
                size: D + "px",
                color: x.iconColor || "#6e85f7",
                opacity: void 0 !== x.iconOpacity ? x.iconOpacity : .8,
                margin: (void 0 !== x.iconMargin ? x.iconMargin : 10) + "px",
                alignment: "right" === x.iconAlignment ? "right" : "left"
            }),
        x.enableFontAwesome && x.fontAwesomeUrl) {
            l.debug("[ICON] Loading Font Awesome:", x.fontAwesomeUrl);
            if (document.querySelector('link[href*="font-awesome"]') || document.querySelector('link[href="' + x.fontAwesomeUrl + '"]'))
                l.debug("[ICON] Font Awesome already loaded");
            else {
                const e = document.createElement("link");
                e.rel = "stylesheet",
                    e.href = x.fontAwesomeUrl,
                    e.crossOrigin = "anonymous",
                    e.onload = () => {
                        l.info("[ICON] Font Awesome loaded successfully");
                        const e = document.querySelector("#tourSearch");
                        if (e && e.value) {
                            const t = new Event("input",{
                                bubbles: !0
                            });
                            e.dispatchEvent(t)
                        }
                    }
                    ,
                    e.onerror = () => {
                        console.error("[ICON] Failed to load Font Awesome from:", x.fontAwesomeUrl)
                    }
                    ,
                    document.head.appendChild(e)
            }
        } else
            x.enableFontAwesome && !x.fontAwesomeUrl ? console.warn("[ICON] Font Awesome enabled but no URL provided") : l.debug("[ICON] Font Awesome loading disabled");
        b.style.setProperty("--search-background", r.appearance.colors.searchBackground || "#f4f3f2"),
            b.style.setProperty("--search-text", r.appearance.colors.searchText || "#1a1a1a"),
            b.style.setProperty("--placeholder-text", r.appearance.colors.placeholderText || "#94a3b8"),
            b.style.setProperty("--search-icon", r.appearance.colors.searchIcon || "#94a3b8"),
            b.style.setProperty("--clear-icon", r.appearance.colors.clearIcon || "#94a3b8"),
            b.style.setProperty("--results-background", r.appearance.colors.resultsBackground || "#ffffff"),
            b.style.setProperty("--group-header-bg", r.appearance.colors.groupHeaderBackground || "#ffffff"),
            b.style.setProperty("--group-header", r.appearance.colors.groupHeaderColor || "#20293A"),
            b.style.setProperty("--group-count", r.appearance.colors.groupCountColor || "#94a3b8"),
            b.style.setProperty("--result-hover", r.appearance.colors.resultHover || "#f0f0f0"),
            b.style.setProperty("--result-border-left", r.appearance.colors.resultBorderLeft || "#ebebeb"),
            b.style.setProperty("--result-text", r.appearance.colors.resultText || "#1e293b"),
            b.style.setProperty("--result-subtitle", r.appearance.colors.resultSubtitle || "#64748b"),
            b.style.setProperty("--color-result-icon", r.appearance.colors.resultIconColor || "#6e85f7"),
            b.style.setProperty("--result-subtext-color", r.appearance.colors.resultSubtextColor || "#000000");
        const C = r.appearance?.searchField?.typography || {}
            , P = C.placeholder || {}
            , A = C.focus || {};
        console.log("🎯 TYPOGRAPHY CSS VARS: Applying typography variables:", {
            searchTypography: C,
            hasTypography: !!r.appearance?.searchField?.typography,
            configStructure: {
                hasAppearance: !!r.appearance,
                hasSearchField: !!r.appearance?.searchField,
                hasTypography: !!r.appearance?.searchField?.typography
            }
        });
        const $ = C.fontSize || "16px"
            , B = C.fontFamily || "inherit"
            , k = C.fontWeight || "400"
            , M = C.fontStyle || "normal"
            , O = C.lineHeight || "1.5"
            , j = C.letterSpacing || "0px"
            , F = C.textTransform || "none";
        console.log("🎯 TYPOGRAPHY CSS VARS: Setting input text variables:", {
            fontSize: $,
            fontFamily: B,
            fontWeight: k,
            fontStyle: M,
            lineHeight: O,
            letterSpacing: j,
            textTransform: F
        }),
            b.style.setProperty("--search-input-font-size", $),
            b.style.setProperty("--search-input-font-family", B),
            b.style.setProperty("--search-input-font-weight", k),
            b.style.setProperty("--search-input-font-style", M),
            b.style.setProperty("--search-input-line-height", O),
            b.style.setProperty("--search-input-letter-spacing", j),
            b.style.setProperty("--search-input-text-transform", F),
            b.style.setProperty("--search-placeholder-font-size", P.fontSize || C.fontSize || "16px"),
            b.style.setProperty("--search-placeholder-font-family", P.fontFamily || C.fontFamily || "inherit"),
            b.style.setProperty("--search-placeholder-font-weight", P.fontWeight || "400"),
            b.style.setProperty("--search-placeholder-font-style", P.fontStyle || "italic"),
            b.style.setProperty("--search-placeholder-opacity", P.opacity || "0.7"),
            b.style.setProperty("--search-placeholder-letter-spacing", P.letterSpacing || "0px"),
            b.style.setProperty("--search-placeholder-text-transform", P.textTransform || "none"),
            b.style.setProperty("--search-focus-font-size", A.fontSize || C.fontSize || "16px"),
            b.style.setProperty("--search-focus-font-weight", A.fontWeight || C.fontWeight || "400"),
            b.style.setProperty("--search-focus-letter-spacing", A.letterSpacing || C.letterSpacing || "0.25px"),
            b.style.setProperty("--search-highlight-color", r.appearance.colors.highlightText || "#000000");
        const R = r.appearance.colors.highlightBackground || "#ffff00"
            , N = void 0 !== r.appearance.colors.highlightBackgroundOpacity ? r.appearance.colors.highlightBackgroundOpacity : .5;
        let U;
        if (N < 1) {
            let e = 255
                , t = 255
                , n = 0;
            if (R && R.startsWith("#")) {
                const o = R.slice(1);
                3 === o.length ? (e = parseInt(o[0] + o[0], 16),
                    t = parseInt(o[1] + o[1], 16),
                    n = parseInt(o[2] + o[2], 16)) : 6 === o.length && (e = parseInt(o.slice(0, 2), 16),
                    t = parseInt(o.slice(2, 4), 16),
                    n = parseInt(o.slice(4, 6), 16))
            }
            U = `rgba(${e}, ${t}, ${n}, ${N})`
        } else
            U = R;
        b.style.setProperty("--search-highlight-bg", U),
            b.style.setProperty("--highlight-font-weight", r.appearance.colors.highlightWeight || "bold"),
            b.style.setProperty("--tag-background", r.appearance.colors.tagBackground || "#e2e8f0"),
            b.style.setProperty("--tag-text", r.appearance.colors.tagText || "#475569"),
            b.style.setProperty("--tag-border", r.appearance.colors.tagBorder || "#cbd5e1"),
            b.style.setProperty("--tag-hover", r.appearance.colors.tagHover || "#d1d5db"),
            b.style.setProperty("--tag-border-radius", (r.appearance.tags?.borderRadius || 12) + "px"),
            b.style.setProperty("--tag-font-size", r.appearance.tags?.fontSize || "12px"),
            b.style.setProperty("--tag-padding", r.appearance.tags?.padding || "2px 8px"),
            b.style.setProperty("--tag-margin", r.appearance.tags?.margin || "2px"),
            b.style.setProperty("--tag-font-weight", r.appearance.tags?.fontWeight || "500"),
            b.style.setProperty("--tag-text-transform", r.appearance.tags?.textTransform || "none"),
            b.style.setProperty("--tag-border-width", r.appearance.tags?.borderWidth || "1px"),
            b.style.setProperty("--tag-show-border", r.appearance.tags?.showBorder ? "solid" : "none");
        const G = "right" === r.thumbnailSettings?.alignment ? "right" : "left";
        document.body.setAttribute("data-thumbnail-align", G),
            d.textContent = f,
            document.head.appendChild(d);
        const H = document.getElementById("search-highlight-styles");
        H && H.remove();
        const V = document.createElement("style");
        V.id = "search-highlight-styles",
            V.textContent = "\n.result-item strong,\n.result-item mark,\n.result-item .highlight {\n  background-color: var(--search-highlight-bg, rgba(255, 255, 0, 0.5));\n  color: var(--search-highlight-color, #000000);\n  font-weight: var(--highlight-font-weight, bold);\n  padding: 0 2px;\n  border-radius: 2px;\n}",
            document.head.appendChild(V),
            h.input = h.container.querySelector("#tourSearch"),
            h.results = h.container.querySelector(".search-results"),
            h.clearButton = h.container.querySelector(".clear-button"),
            h.searchIcon = h.container.querySelector(".search-icon"),
        h.input && (h.input.placeholder = r.searchBar.placeholder,
            y.setRole(h.input, "searchbox"),
            y.setLabel(h.input, "Search tour"),
            y.setAutoComplete(h.input, "list")),
            l.info("Search styling applied successfully")
    }
    function T(e) {
        if (!u || !u.length || !e)
            return null;
        const t = e.name || ""
            , n = e.id || ""
            , o = e.subtitle || ""
            , i = Array.isArray(e.tags) ? e.tags : [];
        if (l.debug(`[MATCHING] Processing: ${t || n} (Subtitle: ${o}, Tags: ${i.join(",")})`),
            o)
            for (const e of u) {
                if (e.id === o)
                    return l.debug(`[MATCH:SUBTITLE_ID] Element subtitle "${o}" matches business entry with ID: ${e.id}`),
                        a(e);
                if (e.matchTags && Array.isArray(e.matchTags) && e.matchTags.includes(o))
                    return l.debug(`[MATCH:SUBTITLE_TAG] Element subtitle "${o}" matches business entry with ID: ${e.id}`),
                        a(e)
            }
        if (t)
            for (const e of u)
                if (e.id === t)
                    return l.debug(`[MATCH:NAME] Element name "${t}" matches business entry with ID: ${e.id}`),
                        a(e);
        for (const e of u)
            if (e.matchTags && Array.isArray(e.matchTags))
                for (const t of i)
                    if (e.matchTags.includes(t))
                        return l.debug(`[MATCH:TAG] Element tag "${t}" matches business entry with ID: ${e.id}`),
                            a(e);
        return l.debug(`[MATCH:NONE] No business match for: ${t || n || o}`),
            null;
        function a(e) {
            const t = {
                ...e
            };
            return l.debug("[DEBUG] Before normalization:", {
                imageUrl: t.imageUrl,
                localImage: t.localImage
            }),
            t.imageUrl && (t.imageUrl = f(t.imageUrl)),
            t.localImage && (t.localImage = f(t.localImage)),
            !t.imageUrl && t.localImage && (t.imageUrl = t.localImage,
                console.log("[DEBUG] Using localImage as imageUrl:", t.imageUrl)),
                l.debug("[DEBUG] After normalization:", {
                    imageUrl: t.imageUrl,
                    localImage: t.localImage
                }),
                t
        }
    }
    function x(e, t, o, i, a) {
        !function() {
            try {
                return window._searchEventCleanup && Array.isArray(window._searchEventCleanup) && (window._searchEventCleanup.forEach((e => {
                        try {
                            e()
                        } catch (e) {
                            l.warn("Error in cleanup function:", e)
                        }
                    }
                )),
                    window._searchEventCleanup = []),
                    l.debug("Search event listeners cleaned up"),
                    !0
            } catch (e) {
                return l.warn("Error during event cleanup:", e),
                    !1
            }
        }(),
            l.debug("Binding search event listeners...");
        const s = [];
        if (t) {
            const e = window.innerWidth <= r.mobileBreakpoint || "ontouchstart"in window
                , n = p(a, e ? 300 : 150)
                , o = () => n();
            if (t.addEventListener("input", o),
                s.push(( () => t.removeEventListener("input", o))),
            "ontouchstart"in window) {
                const e = () => t.focus();
                t.addEventListener("touchend", e),
                    s.push(( () => t.removeEventListener("touchend", e)))
            }
        }
        if (o) {
            const e = e => {
                    e.stopPropagation(),
                    t && (t.value = "",
                        a(),
                        t.focus()),
                    window.innerWidth <= r.mobileBreakpoint && r.autoHide.mobile && $(!1)
                }
            ;
            o.addEventListener("click", e),
                s.push(( () => o.removeEventListener("click", e)))
        }
        if (i) {
            i && i.classList.add("search-icon");
            const e = () => {
                    t && (t.value = "*",
                        a())
                }
            ;
            i.addEventListener("click", e),
                s.push(( () => i.removeEventListener("click", e)))
        }
        const c = t => {
                e.classList.contains("visible") && (e.contains(t.target) || $(!1))
            }
        ;
        if (document.addEventListener("click", c),
            s.push(( () => document.removeEventListener("click", c))),
        "ontouchstart"in window) {
            const t = t => {
                    e.classList.contains("visible") && !e.contains(t.target) && $(!1)
                }
            ;
            document.addEventListener("touchstart", t),
                s.push(( () => document.removeEventListener("touchstart", t)))
        }
        const d = o => {
                if ("k" === o.key && (o.metaKey || o.ctrlKey) && (o.preventDefault(),
                    $(!0)),
                e.classList.contains("visible") && "Escape" === o.key)
                    o.preventDefault(),
                        t && "" !== t.value.trim() ? (t.value = "",
                            n(),
                            selectedIndex = -1) : $(!1)
            }
        ;
        return document.addEventListener("keydown", d),
            s.push(( () => document.removeEventListener("keydown", d))),
            window._searchEventCleanup = s,
            l.debug("Search event listeners bound successfully"),
            !0
    }
    function D(a) {
        l.info("Initializing enhanced search v2.0...");
        let p = a;
        if (a && "function" == typeof a.get)
            try {
                const e = a.get("data")?.tour;
                e && e.mainPlayList && (p = e,
                    l.debug("Retrieved tour from rootPlayer context via get('data').tour"))
            } catch (e) {
                l.debug("Could not extract tour from rootPlayer context, using passed parameter")
            }
        if (!p || !p.mainPlayList) {
            const e = [a, window.tour, window.tourInstance, window.tour && window.tour.locManager && window.tour.locManager.rootPlayer ? window.tour.locManager.rootPlayer : null, window.TDV && window.TDV.PlayerAPI && "function" == typeof window.TDV.PlayerAPI.getCurrentPlayer ? window.TDV.PlayerAPI.getCurrentPlayer() : null].filter(Boolean);
            for (const t of e)
                if (t && t.mainPlayList && "function" == typeof t.mainPlayList.get) {
                    p = t,
                        l.debug("Found valid tour via fallback detection");
                    break
                }
        }
        if (p && p.mainPlayList ? "function" != typeof p.mainPlayList.get ? l.warn("Tour found but mainPlayList.get is not a function") : l.info(`Tour initialized successfully with ${p.mainPlayList.get("items")?.length || 0} panoramas`) : l.warn("Could not find valid tour reference with mainPlayList"),
            window.tourInstance = p,
            e = "",
            t = null,
            c)
            return void l.info("Search already initialized.");
        c = !0,
            window.searchListInitialized = !0,
            m.init(),
            window.addEventListener("message", (function(e) {
                    try {
                        !function() {
                            try {
                                const t = e.origin || ""
                                    , n = t === window.location.origin || "null" === t
                                    , o = Array.isArray(r?.controlPanel?.allowedOrigins) ? r.controlPanel.allowedOrigins : []
                                    , i = e.source === window.parent && window.parent !== window
                                    , a = o.length > 0 && o.includes(t)
                                    , s = 0 === o.length && (n || i);
                                if (!a && !s)
                                    return
                            } catch (e) {
                                return
                            }
                        }();
                        const t = e.data;
                        if (!t || "object" != typeof t)
                            return;
                        if ("searchProColorPreview" === t.type) {
                            const {cssVariable: e, value: n, field: o} = t;
                            if (e && n && (document.documentElement.style.setProperty(e, n),
                                _log(`🎨 LIVE PREVIEW: Applied ${e} = ${n} from control panel`),
                            "--group-header-bg" === e)) {
                                const e = document.querySelectorAll(".group-header");
                                e.forEach((e => {
                                        e.style.backgroundColor = n
                                    }
                                )),
                                    _log(`🎨 LIVE PREVIEW: Updated ${e.length} group headers`)
                            }
                        } else if ("searchProConfigPreview" === t.type)
                            t.config && (localStorage.setItem("searchProLiveConfig", JSON.stringify(t.config)),
                                _log(`🔄 LIVE PREVIEW: Updated config preview for field ${t.field}`));
                        else if ("searchProConfigUpdate" === t?.type && t?.config)
                            try {
                                localStorage.setItem("searchProLiveConfig", JSON.stringify(t.config)),
                                    localStorage.setItem("searchProConfigUpdate", String(Date.now())),
                                    window.searchFunctions?.updateConfig ? (window.searchFunctions.updateConfig(t.config),
                                    "function" == typeof l?.info && l.info("[SearchPro] Applied full config update from control panel.")) : console.warn("[SearchPro] updateConfig not available on window.searchFunctions")
                            } catch (e) {
                                console.warn("[SearchPro] Error handling searchProConfigUpdate:", e)
                            }
                    } catch (e) {
                        l.warn("Error handling live preview message:", e)
                    }
                }
            ));
        !function() {
            const e = r.businessData?.useBusinessData
                , t = r.googleSheets?.useGoogleSheetData
                , n = r.googleSheets?.useLocalCSV;
            let o = 0
                , i = "tour";
            e && (o++,
                i = "business"),
            t && (o++,
                i = n ? "local-csv" : "google-sheets"),
            o > 1 && (l.warn("⚠️  CONFIGURATION CONFLICT: Multiple data sources enabled!"),
                l.warn("Active sources:", {
                    business: e,
                    googleSheets: t && !n,
                    localCSV: t && n
                }),
                l.warn("🔧 FIX: Only enable ONE external data source at a time"),
            e && (r.googleSheets.useGoogleSheetData = !1,
                l.warn("🚨 AUTO-FIX: Disabled Google Sheets to prevent conflicts"))),
            t && n && !r.googleSheets.googleSheetUrl && l.warn("⚠️  LOCAL CSV MODE: Disabling online Google Sheets URL processing"),
                l.info(`🎯 Data Source Priority: ${i.toUpperCase()} (+ tour data)`)
        }();
        const f = [];
        if (r.businessData.useBusinessData && f.push(function() {
            if (!r.businessData.useBusinessData)
                return l.info("Business data integration disabled, skipping load"),
                    Promise.resolve([]);
            let e;
            const t = (r.businessData.businessDataUrl || "").trim();
            e = t ? /^https?:\/\//i.test(t) ? t : __fromScript(t) : __fromScript(`${r.businessData.businessDataDir || "business-data"}/${r.businessData.businessDataFile || "business.json"}`);
            return l.info(`Loading business data from: ${e}`),
                console.log("[search-v3] data URLs OK:", {
                    business: e,
                    csv: void 0
                }),
                l.info("[BUSINESS DATA] Attempting to load from:", e),
                fetch(e).then((e => {
                        if (!e.ok)
                            throw new Error(`Failed to load business data: ${e.status} ${e.statusText}`);
                        return e.json()
                    }
                )).then((e => {
                        Array.isArray(e) || (l.warn("Business data is not an array, converting to array"),
                            e = [e]),
                            l.info("=== BUSINESS DATA LOADED ==="),
                            l.info(`Successfully loaded ${e.length} business data entries`);
                        for (let t = 0; t < Math.min(3, e.length); t++)
                            console.log(`Entry ${t + 1}:`, {
                                id: e[t].id,
                                name: e[t].name,
                                elementType: e[t].elementType
                            });
                        return u = e,
                            window._businessData = e,
                            e
                    }
                )).catch((e => (console.error(`Error loading business data: ${e.message}`),
                    u = [],
                    [])))
        }()),
        r.googleSheets.useGoogleSheetData && (l.debug("[DEBUG] Adding Google Sheets data loading to promise chain"),
            f.push(function() {
                if (!r.googleSheets.useGoogleSheetData)
                    return console.log("🔴 [DATA SOURCE] Google Sheets integration DISABLED - skipping load"),
                        Promise.resolve([]);
                if (l.debug("🔍 [DATA SOURCE DEBUG] Configuration check:"),
                    console.log("   useGoogleSheetData:", r.googleSheets.useGoogleSheetData),
                    console.log("   useLocalCSV:", r.googleSheets.useLocalCSV),
                    console.log("   googleSheetUrl:", r.googleSheets.googleSheetUrl),
                    console.log("   localCSVUrl:", r.googleSheets.localCSVUrl),
                !r.googleSheets.googleSheetUrl && !r.googleSheets.useLocalCSV)
                    return console.log("🔴 [DATA SOURCE] No data source provided - need either googleSheetUrl or useLocalCSV=true"),
                        Promise.resolve([]);
                let e, t;
                if (r.googleSheets.useLocalCSV) {
                    const n = (r.googleSheets.localCSVUrl || "").trim();
                    e = n && /^https?:\/\//i.test(n) ? n : __fromScript(n || `${r.googleSheets.localCSVDir || "business-data"}/${r.googleSheets.localCSVFile || "search-data.csv"}`),
                        t = "local",
                        l.info(`🔌 LOCAL CSV MODE: Loading from ${e}`),
                    r.googleSheets.googleSheetUrl && l.info("ℹ️  Google Sheets URL ignored (Local CSV mode active)")
                } else {
                    if (!r.googleSheets.googleSheetUrl)
                        return l.warn("⚠️  No data source configured (no URL and useLocalCSV=false)"),
                            Promise.resolve([]);
                    if (e = (r.googleSheets.googleSheetUrl || "").trim(),
                        !e)
                        return Promise.resolve([]);
                    t = "online",
                        l.info(`🌐 ONLINE MODE: Loading from ${e}`)
                }
                const n = r.googleSheets.fetchMode || "csv"
                    , o = r.googleSheets.caching || {}
                    , i = r.googleSheets.progressiveLoading || {}
                    , a = r.googleSheets.authentication || {};
                if (o.enabled && "online" === t)
                    try {
                        const e = o.storageKey || "tourGoogleSheetsData"
                            , t = o.timeoutMinutes || 60
                            , n = localStorage.getItem(e)
                            , i = localStorage.getItem(`${e}_timestamp`);
                        if (n && i) {
                            const e = parseInt(i, 10)
                                , o = (Date.now() - e) / 6e4;
                            if (o < t)
                                try {
                                    const e = JSON.parse(n);
                                    return l.info(`Using cached Google Sheets data (${e.length} rows, ${o.toFixed(1)} minutes old)`),
                                        g = e,
                                        Promise.resolve(e)
                                } catch (e) {
                                    l.warn("Error parsing cached data, will fetch fresh data:", e)
                                }
                            else
                                l.info(`Cached data expired (${o.toFixed(1)} minutes old), fetching fresh data`)
                        }
                    } catch (e) {
                        l.warn("Error checking cache, will fetch fresh data:", e)
                    }
                if (console.log("[search-v3] data URLs OK:", {
                    business: void 0,
                    csv: e
                }),
                "online" === t && "csv" === n && !e.includes("/export?format=csv") && e.includes("spreadsheets.google.com/") && !e.includes("/export")) {
                    let t = "";
                    try {
                        const n = e.match(/\/d\/([a-zA-Z0-9-_]+)/);
                        n && n[1] && (t = n[1],
                            e = `https://docs.google.com/spreadsheets/d/${t}/export?format=csv`)
                    } catch (e) {
                        l.warn("Failed to convert Google Sheets URL to CSV export URL:", e)
                    }
                }
                if (l.info(`Final fetch URL: ${e}`),
                "online" === t && a.enabled && "apiKey" === a.authType && a.apiKey) {
                    const t = e.includes("?") ? "&" : "?";
                    e = `${e}${t}${a.apiKeyParam || "key"}=${encodeURIComponent(a.apiKey)}`,
                        l.debug("Added API key authentication to request")
                }
                return fetch(e).then((e => {
                        if (l.info(`${"local" === t ? "Local CSV" : "Google Sheets"} fetch response status: ${e.status}`),
                            !e.ok)
                            throw new Error(`Failed to load ${"local" === t ? "local CSV" : "Google Sheets"} data: ${e.status} ${e.statusText}`);
                        return e.text()
                    }
                )).then((e => {
                        l.info(`${"local" === t ? "Local CSV" : "Google Sheets"} raw data length: ${e.length}`),
                            l.info(`${"local" === t ? "Local CSV" : "Google Sheets"} first 200 chars: ${e.substring(0, 200)}`);
                        let a = [];
                        try {
                            if ("csv" === n) {
                                const t = e.split("\n")
                                    , n = t[0].split(",").map((e => e.trim().replace(/"/g, "")));
                                for (let e = 1; e < t.length; e++) {
                                    const o = t[e].trim();
                                    if (!o)
                                        continue;
                                    const i = o.split(",").map((e => e.trim().replace(/"/g, "")))
                                        , s = {};
                                    n.forEach(( (e, t) => {
                                            s[e] = i[t] || ""
                                        }
                                    )),
                                    (s.id || s.tag || s.name) && a.push(s)
                                }
                            } else if (a = JSON.parse(e),
                            a.feed && a.feed.entry)
                                a = a.feed.entry.map((e => {
                                        const t = {};
                                        return Object.keys(e).forEach((n => {
                                                if (n.startsWith("gsx$")) {
                                                    const o = n.substr(4);
                                                    t[o] = e[n].$t
                                                }
                                            }
                                        )),
                                            t
                                    }
                                ));
                            else if (a.values) {
                                const e = a.values[0];
                                a = a.values.slice(1).map((t => {
                                        const n = {};
                                        return e.forEach(( (e, o) => {
                                                n[e] = t[o]
                                            }
                                        )),
                                            n
                                    }
                                ))
                            }
                            Array.isArray(a) || (l.warn(("local" === t ? "Local CSV" : "Google Sheets") + " data is not an array after parsing, converting to array"),
                                a = [a]),
                                l.info(`Successfully loaded ${a.length} rows from ${"local" === t ? "local CSV file" : "Google Sheets"}`);
                            let s = [];
                            if (i.enabled && a.length > 20) {
                                l.info("Progressive loading enabled, processing essential fields first");
                                const e = i.initialFields || ["id", "tag", "name"];
                                s = a.map((t => {
                                        const n = {};
                                        return e.forEach((e => {
                                                n[e] = t[e] || ""
                                            }
                                        )),
                                            n
                                    }
                                )),
                                    setTimeout(( () => {
                                            const e = a.map((e => ({
                                                id: e.id || "",
                                                tag: e.tag || "",
                                                name: e.name || "",
                                                description: e.description || "",
                                                imageUrl: e.imageUrl || e.image || "",
                                                elementType: e.elementType || e.type || "",
                                                parentId: e.parentId || ""
                                            })));
                                            if (g = e,
                                            o.enabled && "online" === t)
                                                try {
                                                    const t = o.storageKey || "tourGoogleSheetsData";
                                                    localStorage.setItem(t, JSON.stringify(e)),
                                                        localStorage.setItem(`${t}_timestamp`, Date.now().toString()),
                                                        l.debug("Updated cache with full Google Sheets data")
                                                } catch (e) {
                                                    l.warn("Failed to cache full Google Sheets data:", e)
                                                }
                                            l.info(`Background loading of detailed ${"local" === t ? "local CSV" : "Google Sheets"} data complete`)
                                        }
                                    ), 2e3)
                            } else
                                s = a.map((e => ({
                                    id: e.id || "",
                                    tag: e.tag || "",
                                    name: e.name || "",
                                    description: e.description || "",
                                    imageUrl: e.imageUrl || e.image || "",
                                    elementType: e.elementType || e.type || "",
                                    parentId: e.parentId || ""
                                })));
                            if (o.enabled && "online" === t)
                                try {
                                    const e = o.storageKey || "tourGoogleSheetsData";
                                    localStorage.setItem(e, JSON.stringify(s)),
                                        localStorage.setItem(`${e}_timestamp`, Date.now().toString()),
                                        l.debug("Cached Google Sheets data successfully")
                                } catch (e) {
                                    l.warn("Failed to cache Google Sheets data:", e)
                                }
                            else
                                "local" === t && l.debug("Local CSV data not cached (caching disabled for local files)");
                            g = s;
                            const r = s.filter((e => !e.id)).length
                                , c = s.filter((e => !e.tag)).length;
                            return (r > 0 || c > 0) && l.warn(`Data quality issues: ${r} rows missing ID, ${c} rows missing tag`),
                                s
                        } catch (e) {
                            return l.error(`Error parsing ${"local" === t ? "local CSV" : "Google Sheets"} data:`, e),
                                g = [],
                                []
                        }
                    }
                )).catch((e => (l.warn(`Error loading ${"local" === t ? "local CSV" : "Google Sheets"} data: ${e.message}`),
                    g = [],
                    [])))
            }())),
            Promise.all(f).then(( () => {
                    l.info("All external data sources loaded successfully"),
                        B()
                }
            )).catch((e => {
                    l.warn("Error loading some external data sources:", e),
                        B()
                }
            )),
            m.listen((function(e) {}
            )),
        !a || !a.mainPlayList)
            return void l.error("Tour or mainPlayList not available, cannot initialize search");
        function w(e, t, n, o, i, a, s) {
            const c = e.get ? e.get("class") : e.class;
            l.debug(`[PLAYLIST DEBUG] Processing item ${t}, class:`, c),
                "Model3DPlayListItem" === c ? (l.debug(`[PLAYLIST DEBUG] Found 3D Model at index ${t}`),
                    function(e, t, n, o, i, a, s) {
                        l.debug(`[3D DEBUG] Processing 3D model at index ${t}`),
                            l.debug(`[3D MODEL DEBUG] Starting 3D model processing for index ${t}`, n),
                            l.debug(`[CACHE BUSTER] 3D MODEL PROCESSING - TIMESTAMP: ${Date.now()}`);
                        const c = k(n)
                            , d = c?.label?.trim() || ""
                            , u = c?.subtitle?.trim() || ""
                            , g = Array.isArray(c?.tags) ? c.tags : [];
                        if (!M(t, r.filter.mediaIndexes))
                            return void l.debug(`[3D DEBUG] 3D model filtered out at index ${t}`);
                        const h = O(d, u, g, {
                            type: "Panorama",
                            id: n.get ? n.get("id") : n.id,
                            index: t,
                            source: o
                        })
                            , m = D(d, n, g, a)
                            , p = C(d, n, g, a);
                        S("3DModel", h, g, u) ? (i.push({
                            type: "3DModel",
                            source: o,
                            index: t,
                            originalIndex: t,
                            playlistOrder: t,
                            label: P(h, m, p, a),
                            originalLabel: d,
                            subtitle: A(u, m, p, a),
                            tags: g,
                            businessData: m,
                            businessName: m?.name,
                            sheetsData: p,
                            imageUrl: m?.imageUrl || p?.imageUrl || null,
                            item: e,
                            boost: m ? r.searchSettings.boostValues.businessMatch : p ? r.searchSettings.boostValues.sheetsMatch : d ? r.searchSettings.boostValues.labeledItem : r.searchSettings.boostValues.unlabeledItem
                        }),
                            l.debug(`[3D DEBUG] Added 3D model to index: ${h}`)) : l.debug(`[3D MODEL FILTERED] "${h}" was filtered out by _shouldIncludeElement`);
                        let f = n.get ? n.get("objects") : n.objects;
                        l.debug("[3D OBJECTS DEBUG] Media object structure:", n),
                            l.debug("[3D OBJECTS DEBUG] Media has get method:", "function" == typeof n.get),
                            l.debug("[3D OBJECTS DEBUG] Raw objects via get():", n.get ? n.get("objects") : "no get method"),
                            l.debug("[3D OBJECTS DEBUG] Raw objects via direct access:", n.objects),
                            l.debug("[3D OBJECTS DEBUG] Media keys:", Object.keys(n)),
                        n.get && "function" == typeof n.get && (l.debug("[3D OBJECTS DEBUG] Trying get('wr'):", n.get("wr")),
                            l.debug("[3D OBJECTS DEBUG] Trying get('Qc'):", n.get("Qc")),
                            l.debug("[3D OBJECTS DEBUG] Trying get('data'):", n.get("data")));
                        if ((!f || !Array.isArray(f)) && (l.debug("[3D OBJECTS DEBUG] Trying alternative access methods..."),
                        s && s.get))
                            try {
                                const e = n.get ? n.get("id") : n.id;
                                if (l.debug("[3D OBJECTS DEBUG] Media ID:", e),
                                    e) {
                                    const t = s.get(e);
                                    l.debug("[3D OBJECTS DEBUG] Media object from tour:", t),
                                    t && t.get && (f = t.get("objects"),
                                        l.debug("[3D OBJECTS DEBUG] Objects from tour media:", f))
                                }
                            } catch (e) {
                                l.debug("[3D OBJECTS DEBUG] Error accessing tour objects:", e)
                            }
                        l.debug("[3D OBJECTS DEBUG] Final objects variable:", f),
                            l.debug("[3D OBJECTS DEBUG] Objects is array:", Array.isArray(f)),
                            l.debug("[3D OBJECTS DEBUG] Objects length:", f ? f.length : "objects is null/undefined"),
                            l.debug("[3D DEBUG] Found objects:", f),
                            l.debug("[3D DEBUG] Objects is array:", Array.isArray(f)),
                            Array.isArray(f) ? (l.debug(`[3D DEBUG] Processing ${f.length} objects`),
                                f.forEach(( (s, c) => {
                                        l.debug(`[3D DEBUG] Processing object ${c}:`, s);
                                        const d = k(s);
                                        let u = d?.label?.trim() || "";
                                        if (!u && s.get)
                                            try {
                                                u = s.get("label") || ""
                                            } catch (e) {
                                                l.debug("[3D DEBUG] Error getting label via get():", e)
                                            }
                                        if (u || (u = s.label || ""),
                                            l.debug("[3D DEBUG] Object label:", u),
                                        !u || "Object" === u)
                                            return void l.debug("[3D DEBUG] Skipping object with invalid label:", u);
                                        const g = Array.isArray(d?.tags) ? d.tags : []
                                            , h = d?.subtitle || "";
                                        let f = "";
                                        if (s.class)
                                            f = s.class;
                                        else if (s.get && "function" == typeof s.get)
                                            try {
                                                f = s.get("class") || ""
                                            } catch (e) {
                                                l.debug("[3D DEBUG] Error getting class via get():", e)
                                            }
                                        let b = "3DModelObject";
                                        f && ("SpriteModel3DObject" === f || "SpriteHotspotObject" === f || "Sprite3DObject" === f ? (b = "3DHotspot",
                                            l.debug(`[3D DEBUG] Detected sprite object as 3DHotspot: ${u}`)) : b = "InnerModel3DObject" === f || "Model3DObject" === f ? "3DModelObject" : v(s, u));
                                        const y = O(u, h, g, {
                                            type: b,
                                            id: s.get ? s.get("id") : s.id,
                                            index: c
                                        });
                                        if (l.debug("[3D OBJECT DEBUG] Processing 3D object:", {
                                            objLabel: u,
                                            displayLabel: y,
                                            elementType: b,
                                            objClass: f,
                                            objSubtitle: h,
                                            objTags: g
                                        }),
                                            !S(b, y, g, h))
                                            return l.debug("[3D DEBUG] Object filtered out:", y),
                                                void l.debug(`[3D OBJECT FILTERED] "${y}" was filtered out by _shouldIncludeElement`);
                                        const w = s.get ? s.get("id") : s.id;
                                        l.debug(`[3D DEBUG] Adding object to search index with type ${b}:`, y),
                                            i.push({
                                                type: b,
                                                source: o,
                                                label: y,
                                                originalLabel: u,
                                                subtitle: h,
                                                tags: g,
                                                parentModel: n.get ? n.get("id") : n.id,
                                                parentLabel: P(y, m, p, a),
                                                parentIndex: t,
                                                playlistOrder: 1e3 * t + c,
                                                id: w,
                                                item: s,
                                                parentItem: e,
                                                boost: r.searchSettings.boostValues.childElement
                                            })
                                    }
                                ))) : l.debug("[3D DEBUG] No objects array found")
                    }(e, t, n, o, i, a, s)) : function(e, t, n, o, i, a, s) {
                    const c = k(n)
                        , d = c?.label?.trim() || ""
                        , g = c?.subtitle?.trim() || ""
                        , h = Array.isArray(c?.tags) ? c.tags : [];
                    if (l.debug(`[PANORAMA DEBUG] Processing panorama ${t}:`, {
                        label: d,
                        subtitle: g,
                        tags: h,
                        mediaId: n.get ? n.get("id") : "unknown"
                    }),
                        !M(t, r.filter.mediaIndexes))
                        return;
                    let m = O(d, g, h, {
                        type: "Panorama",
                        id: n.get ? n.get("id") : n.id,
                        index: t,
                        source: o
                    });
                    const p = D(d, n, h, a)
                        , f = C(d, n, h, a);
                    p && a.businessData.replaceTourData ? m = p.name || d || `Panorama ${t + 1}` : f && a.googleSheets.useAsDataSource && (m = f.name || d || `Panorama ${t + 1}`);
                    let b = null;
                    try {
                        n && n.get && (b = n.get("thumbnail") || n.get("firstFrame") || n.get("preview"),
                            l.debug(`[THUMBNAIL] Extracted URL from panorama: ${b}`))
                    } catch (e) {
                        l.debug("Error extracting panorama thumbnail:", e)
                    }
                    !1 !== a.includeContent?.elements?.includePanoramas && (S("Panorama", m, h, g) ? i.push({
                        type: "Panorama",
                        source: o,
                        index: t,
                        originalIndex: t,
                        playlistOrder: t,
                        label: m,
                        originalLabel: d,
                        subtitle: A(g, p, f, a),
                        tags: h,
                        businessData: p,
                        businessName: p?.name,
                        sheetsData: f,
                        imageUrl: p?.imageUrl || f?.imageUrl || null,
                        thumbnailUrl: b,
                        item: e,
                        media: n,
                        boost: p ? r.searchSettings.boostValues.businessMatch : f ? r.searchSettings.boostValues.sheetsMatch : d ? r.searchSettings.boostValues.labeledItem : r.searchSettings.boostValues.unlabeledItem
                    }) : l.debug(`[PANORAMA FILTERED] "${m}" was filtered out by _shouldIncludeElement`));
                    const y = function(e, t, n) {
                        const o = []
                            , i = [ () => {
                            try {
                                const t = e.get("overlays");
                                if (Array.isArray(t) && t.length > 0)
                                    return t
                            } catch (e) {
                                l.debug("Method 1 overlay detection failed:", e)
                            }
                            return null
                        }
                            , () => {
                                try {
                                    if (Array.isArray(e.overlays) && e.overlays.length > 0)
                                        return e.overlays
                                } catch (e) {
                                    l.debug("Method 2 overlay detection failed:", e)
                                }
                                return null
                            }
                            , () => {
                                try {
                                    if (Array.isArray(n.overlays) && n.overlays.length > 0)
                                        return n.overlays
                                } catch (e) {
                                    l.debug("Method 3 overlay detection failed:", e)
                                }
                                return null
                            }
                            , () => {
                                try {
                                    if ("function" == typeof e.get) {
                                        const t = e.get("overlaysByTags");
                                        if (t && "object" == typeof t) {
                                            const e = [];
                                            if (Object.values(t).forEach((t => {
                                                    Array.isArray(t) && e.push(...t)
                                                }
                                            )),
                                            e.length > 0)
                                                return e
                                        }
                                    }
                                } catch (e) {
                                    l.debug("Method 4 overlay detection failed:", e)
                                }
                                return null
                            }
                            , () => {
                                try {
                                    if (t.player && "function" == typeof t.player.getByClassName) {
                                        const n = t.player.getByClassName("SpriteModel3DObject");
                                        if (Array.isArray(n) && n.length > 0) {
                                            const t = e.get ? e.get("id") : e.id
                                                , o = n.filter((e => {
                                                    try {
                                                        const n = e.get ? e.get("parent") : e.parent
                                                            , o = n && n.get ? n.get("id") : n?.id
                                                            , i = e.get ? e.get("media") : e.media
                                                            , a = i && i.get ? i.get("id") : i?.id;
                                                        return o === t || a === t
                                                    } catch (e) {
                                                        return l.debug("Could not determine sprite parent, including in search:", e),
                                                            !0
                                                    }
                                                }
                                            ));
                                            if (o.length > 0)
                                                return l.info(`Found ${o.length} SpriteModel3DObject(s) for panorama ${t}`),
                                                    o
                                        }
                                    }
                                } catch (e) {
                                    l.debug("Enhanced SpriteModel3DObject overlay detection failed:", e)
                                }
                                return null
                            }
                            , () => {
                                try {
                                    if (0 === (n.get ? n.get("index") : 0) && t.player && "function" == typeof t.player.getByClassName) {
                                        const e = t.player.getByClassName("SpriteModel3DObject");
                                        if (Array.isArray(e) && e.length > 0)
                                            return l.info(`Fallback: Adding ${e.length} unassigned SpriteModel3DObject(s) to first panorama`),
                                                e
                                    }
                                } catch (e) {
                                    l.debug("Fallback 3D object detection failed:", e)
                                }
                                return null
                            }
                            , () => {
                                try {
                                    if (t.player && "function" == typeof t.player.getByClassName) {
                                        const e = [...t.player.getByClassName("Model3DObject"), ...t.player.getByClassName("Sprite3DObject"), ...t.player.getByClassName("SpriteHotspotObject")];
                                        if (e.length > 0)
                                            return l.info(`Found ${e.length} other 3D objects`),
                                                e
                                    }
                                } catch (e) {
                                    l.debug("Other 3D object detection failed:", e)
                                }
                                return null
                            }
                            , () => {
                                try {
                                    if (t.player && "function" == typeof t.player.getByClassName) {
                                        const n = t.player.getByClassName("PanoramaOverlay");
                                        if (Array.isArray(n) && n.length > 0)
                                            return n.filter((t => {
                                                    try {
                                                        const n = t.get("media");
                                                        return n && n.get("id") === e.get("id")
                                                    } catch {
                                                        return l.debug("Could not determine overlay parent, including in search"),
                                                            !0
                                                    }
                                                }
                                            ))
                                    }
                                } catch {
                                    l.debug("Method 8 overlay detection failed")
                                }
                                return null
                            }
                        ];
                        for (const e of i) {
                            const t = e();
                            if (t && t.length > 0) {
                                o.push(...t),
                                    l.debug(`Overlay detection method found ${t.length} overlays`);
                                break
                            }
                        }
                        return l.info(`Total overlays found for panorama: ${o.length}`),
                            o
                    }(n, s, e);
                    !function(e, t, n, o, i, a) {
                        if (!Array.isArray(e) || 0 === e.length)
                            return;
                        e.forEach(( (e, s) => {
                                try {
                                    const c = k(e);
                                    let d = "";
                                    if (c.label)
                                        d = c.label.trim();
                                    else if (e.label)
                                        d = e.label.trim();
                                    else if ("function" == typeof e.get)
                                        try {
                                            const t = e.get("label");
                                            t && (d = t.trim())
                                        } catch {}
                                    if (!d && a.includeContent.elements.skipEmptyLabels)
                                        return;
                                    let g = v(e, d);
                                    const h = Array.isArray(c.tags) ? c.tags : []
                                        , m = c?.subtitle || "";
                                    let p = O(d, m, h, {
                                        type: g,
                                        id: e.id || (e.get ? e.get("id") : null),
                                        index: s
                                    });
                                    if (l.debug("[OVERLAY DEBUG] Processing overlay:", {
                                        overlayLabel: d,
                                        displayLabel: p,
                                        elementType: g,
                                        overlayClass: e.class,
                                        overlaySubtitle: m,
                                        elementTags: h
                                    }),
                                        !S(g, p, h, m))
                                        return void l.debug(`[OVERLAY FILTERED] "${p}" was filtered out by _shouldIncludeElement`);
                                    let f = null;
                                    if (e.id)
                                        f = e.id;
                                    else if ("function" == typeof e.get)
                                        try {
                                            f = e.get("id")
                                        } catch {}
                                    let b = null;
                                    if (a.businessData?.useBusinessData && u.length > 0)
                                        try {
                                            b = T({
                                                name: d,
                                                id: f,
                                                subtitle: m,
                                                tags: h,
                                                type: g
                                            })
                                        } catch (e) {
                                            l.warn(`Error matching business data for overlay ${d}:`, e)
                                        }
                                    const y = C(d, e, h, a, {
                                        type: g,
                                        source: i,
                                        index: s
                                    });
                                    b && a.businessData.replaceTourData ? p = b.name || d || `${g} ${n}.${s}` : y && a.googleSheets.useAsDataSource && (p = y.name || d || `${g} ${n}.${s}`);
                                    const w = function(e) {
                                        if (!e)
                                            return null;
                                        let t = null
                                            , n = null
                                            , o = null;
                                        try {
                                            if (e.items && e.items.length > 0) {
                                                const i = e.items[0];
                                                void 0 !== i.yaw && (t = i.yaw),
                                                void 0 !== i.pitch && (n = i.pitch),
                                                    void 0 !== i.hfov ? o = i.hfov : void 0 !== i.fov && (o = i.fov)
                                            }
                                            if (null === t && void 0 !== e.yaw && (t = e.yaw),
                                            null === n && void 0 !== e.pitch && (n = e.pitch),
                                            null === o && (void 0 !== e.hfov ? o = e.hfov : void 0 !== e.fov && (o = e.fov)),
                                            (null === t || null === n) && e.vertices && Array.isArray(e.vertices)) {
                                                let o = 0
                                                    , i = 0
                                                    , a = 0;
                                                e.vertices.forEach((e => {
                                                        e && "number" == typeof e.yaw && "number" == typeof e.pitch && (o += e.yaw,
                                                            i += e.pitch,
                                                            a++)
                                                    }
                                                )),
                                                a > 0 && (null === t && (t = o / a),
                                                null === n && (n = i / a))
                                            }
                                            if (null === o && (o = 70),
                                            null != t && null != n) {
                                                for (; t > 180; )
                                                    t -= 360;
                                                for (; t < -180; )
                                                    t += 360;
                                                return {
                                                    yaw: t,
                                                    pitch: n,
                                                    fov: o
                                                }
                                            }
                                        } catch (e) {
                                            l.warn("[CAMERA DEBUG] Error extracting camera from overlay:", e)
                                        }
                                        return null
                                    }(e)
                                        , E = {
                                        type: g,
                                        source: i,
                                        label: p,
                                        subtitle: b && a.businessData.replaceTourData ? b.description || "" : y && a.googleSheets.useAsDataSource ? y.description || m || "" : m || "",
                                        tags: h,
                                        parentIndex: n,
                                        parentLabel: o,
                                        playlistOrder: 1e3 * n + s,
                                        id: f,
                                        businessData: b,
                                        businessName: b?.name,
                                        sheetsData: y,
                                        imageUrl: b?.imageUrl || y?.imageUrl || null,
                                        localImage: b?.localImage || null,
                                        boost: b ? r.searchSettings.boostValues.businessMatch : y ? r.searchSettings.boostValues.sheetsMatch : d ? r.searchSettings.boostValues.labeledItem : r.searchSettings.boostValues.unlabeledItem,
                                        mediaIndex: n
                                    };
                                    if (w && null !== w.yaw && null !== w.pitch && (E.camera = w),
                                    "3DModelObject" === g) {
                                        const t = k(e);
                                        E.modelSpot = {
                                            x: e.x ?? e.translationX ?? e.tx ?? t?.x ?? t?.translationX ?? t?.tx ?? null,
                                            y: e.y ?? e.translationY ?? e.ty ?? t?.y ?? t?.translationY ?? t?.ty ?? null,
                                            z: e.z ?? e.translationZ ?? e.tz ?? t?.z ?? t?.translationZ ?? t?.tz ?? null
                                        },
                                            l.debug(`Added modelSpot for 3DModelObject ${f}:`, E.modelSpot)
                                    }
                                    t.push(E)
                                } catch (e) {
                                    l.warn(`Error processing overlay at index ${s}:`, e)
                                }
                            }
                        ))
                    }(y, i, t, m, o, a)
                }(e, t, n, o, i, a, s)
        }
        function D(e, t, n, o) {
            if (!o.businessData?.useBusinessData || !u.length)
                return null;
            try {
                const o = k(t)
                    , i = o?.subtitle?.trim() || "";
                return console.log(`[DEBUG] Business match for ${e || i || "unknown"} :`, T({
                    name: e,
                    id: t.get ? t.get("id") : t.id,
                    subtitle: i,
                    tags: n || []
                })),
                    T({
                        name: e,
                        id: t.get ? t.get("id") : t.id,
                        subtitle: i,
                        tags: n || []
                    })
            } catch (e) {
                return l.warn("Error matching business data:", e),
                    null
            }
        }
        function C(e, t, n, o, i) {
            if (!o.googleSheets?.useGoogleSheetData || !g.length)
                return null;
            try {
                const o = {
                    label: e || "",
                    itemId: (t.get ? t.get("id") : t.id) || "",
                    tags: n || [],
                    source: i?.source || "unknown",
                    index: i?.index || -1,
                    elementType: i?.type || "unknown"
                };
                l.debug(`[SHEETS MATCH] Looking for match for: ${o.label} (ID: ${o.itemId}, Type: ${o.elementType})`);
                const a = g.filter((e => e.id && o.itemId && e.id.toString() === o.itemId.toString() ? (l.debug(`[SHEETS MATCH] Found exact ID match: ${e.id}`),
                    !0) : e.tag && o.label && o.label.toLowerCase().includes(e.tag.toLowerCase()) ? (l.debug(`[SHEETS MATCH] Found tag match: ${e.tag} in ${o.label}`),
                    !0) : !(!e.name || !o.label || e.name.toLowerCase() !== o.label.toLowerCase()) && (l.debug(`[SHEETS MATCH] Found exact name match: ${e.name}`),
                    !0)));
                if (0 === a.length)
                    return l.debug(`[SHEETS MATCH] No matches found for: ${o.label}`),
                        null;
                if (1 === a.length)
                    return l.debug(`[SHEETS MATCH] Single match found: ${a[0].name || a[0].id}`),
                        a[0];
                l.warn(`[SHEETS MATCH] Multiple matches found for ${o.label} (${a.length} matches)`);
                const s = a.filter((e => e.id && o.itemId && e.id.toString() === o.itemId.toString()));
                if (1 === s.length)
                    return l.info(`[SHEETS MATCH] Resolved to exact ID match: ${s[0].id}`),
                        s[0];
                const r = a.filter((e => e.elementType && e.elementType.toLowerCase() === o.elementType.toLowerCase()));
                if (1 === r.length)
                    return l.info(`[SHEETS MATCH] Resolved to type-specific match: ${r[0].name} (${r[0].elementType})`),
                        r[0];
                const c = a.filter((e => e.description && e.description.length > 10));
                return 1 === c.length ? (l.info(`[SHEETS MATCH] Resolved to detailed match: ${c[0].name}`),
                    c[0]) : (l.warn(`[SHEETS MATCH] Could not resolve ambiguity for ${o.label}. Using first match: ${a[0].name}`),
                    l.warn("[SHEETS MATCH] Consider adding unique IDs or elementType to Google Sheets for better matching"),
                    a[0])
            } catch (e) {
                return l.warn("[SHEETS MATCH] Error matching Google Sheets data:", e),
                    null
            }
        }
        function P(e, t, n, o) {
            return t && o.businessData.replaceTourData ? t.name || e : n && o.googleSheets.useAsDataSource ? n.name || e : t && t.name || e
        }
        function A(e, t, n, o) {
            return t && o.businessData.replaceTourData ? t.description || "" : n && o.googleSheets.useAsDataSource ? n.description || e || "" : e || ""
        }
        function B() {
            t = function(e, t) {
                try {
                    l.info("Starting hybrid search index preparation..."),
                        new Set;
                    let n = e;
                    const i = o.getAllPlayLists(n);
                    let a = i.main?.get("items")
                        , s = i.root?.get("items");
                    if (!a && !s) {
                        const e = [window.tour, window.tourInstance, window.player, window.TDV && window.TDV.PlayerAPI && "function" == typeof window.TDV.PlayerAPI.getCurrentPlayer ? window.TDV.PlayerAPI.getCurrentPlayer() : null].filter(Boolean);
                        for (const t of e) {
                            if (t === n)
                                continue;
                            const e = o.getAllPlayLists(t);
                            if (e.main || e.root) {
                                n = t,
                                    a = e.main?.get("items"),
                                    s = e.root?.get("items"),
                                    l.info("Using fallback tour with playlists from candidate");
                                break
                            }
                        }
                    }
                    if (!a && !s)
                        throw new Error("No valid playlist found with any method");
                    l.info(`Found playlists - Main: ${a?.length || 0}, Root: ${s?.length || 0}`);
                    const c = [];
                    if (t.filter.mode,
                        t.filter.allowedValues,
                        t.filter.blacklistedValues,
                        t.filter.mediaIndexes,
                        t.filter.mediaIndexes,
                    a && a.length > 0 && (l.info(`Processing ${a.length} main playlist items...`),
                        a.forEach(( (e, t) => {
                                try {
                                    const o = e.get ? e.get("class") : e.class
                                        , i = e.get ? e.get("media") : e.media;
                                    if (l.debug(`[MAIN PLAYLIST DEBUG] Processing index ${t}, class: ${o}`),
                                        !i)
                                        return void l.warn(`No media found for main playlist item at index ${t}`);
                                    w(e, t, i, "main", c, r, n)
                                } catch (e) {
                                    l.warn(`Error processing main playlist item at index ${t}:`, e)
                                }
                            }
                        ))),
                    s && s.length > 0 && (l.info(`Processing ${s.length} root player playlist items...`),
                        s.forEach(( (e, t) => {
                                try {
                                    e.get ? e.get("class") : e.class;
                                    const o = e.get ? e.get("media") : e.media;
                                    if (!o)
                                        return void l.warn(`No media found for root playlist item at index ${t}`);
                                    w(e, (a?.length || 0) + t, o, "root", c, r, n)
                                } catch (e) {
                                    l.warn(`Error processing root playlist item at index ${t}:`, e)
                                }
                            }
                        ))),
                    t.googleSheets?.useGoogleSheetData && g.length > 0) {
                        l.info(`Processing ${g.length} Google Sheets entries for search index`);
                        const e = new Set
                            , n = new Set
                            , o = new Set;
                        c.forEach((t => {
                                t.label && o.add(t.label.toLowerCase()),
                                t.sheetsData && (t.sheetsData.id && e.add(t.sheetsData.id),
                                t.sheetsData.tag && n.add(t.sheetsData.tag)),
                                t.imageUrl && t.imageUrl.includes("unsplash") && t.label && t.label.startsWith("** ") && n.add(t.label.replace("** ", ""))
                            }
                        )),
                            g.forEach(( (i, a) => {
                                    try {
                                        if (!i.id && !i.tag && !i.name)
                                            return;
                                        const s = i.id
                                            , d = i.tag
                                            , u = i.name;
                                        let g = !1
                                            , h = null;
                                        if (s && e.has(s) && (g = !0,
                                            l.debug(`Skipping Google Sheets entry "${u}" - ID already matched: ${s}`)),
                                        d && n.has(d) && (g = !0,
                                            l.debug(`Skipping Google Sheets entry "${u}" - tag already matched: ${d}`)),
                                        u && o.has(u.toLowerCase()) && (g = !0,
                                            l.debug(`Skipping Google Sheets entry "${u}" - label already exists in search index`)),
                                        !g && d) {
                                            const e = c.find((e => {
                                                    if (!e.item)
                                                        return !1;
                                                    if (Array.isArray(e.tags) && e.tags.includes(d))
                                                        return !0;
                                                    if (e.id && e.id === d)
                                                        return !0;
                                                    if (e.originalLabel && e.originalLabel.toLowerCase().includes(d.toLowerCase()))
                                                        return !0;
                                                    if (e.item && e.item.get) {
                                                        const t = e.item.get("media");
                                                        if (t && t.get && t.get("id") === d)
                                                            return !0
                                                    }
                                                    return !1
                                                }
                                            ));
                                            if (e) {
                                                if (h = e,
                                                    l.debug(`Found tour item match for Google Sheets entry "${u}": enhancing existing item`),
                                                !0 !== t.googleSheets.useAsDataSource)
                                                    return void l.debug(`Skipping standalone Google Sheets entry "${u}" - tour item exists and not using as primary data source`);
                                                l.debug(`Creating enhanced Google Sheets entry "${u}" linked to tour item`)
                                            }
                                        }
                                        if (!h && !t.googleSheets.includeStandaloneEntries)
                                            return void l.debug(`Skipping standalone Google Sheets entry "${u}" - standalone entries disabled`);
                                        if (g)
                                            return;
                                        const m = i.name || i.id || ""
                                            , p = i.description || ""
                                            , f = i.elementType || "Element"
                                            , b = O(m, p, [], {
                                            type: f,
                                            id: i.id,
                                            index: -1
                                        })
                                            , y = i.tag ? [i.tag] : [];
                                        if (!S(f, b, y, p))
                                            return void l.debug(`Filtering out Google Sheets entry ${b} due to element filter`);
                                        o.add(b.toLowerCase()),
                                            c.push({
                                                type: f,
                                                source: h ? h.source : "sheets",
                                                label: b,
                                                subtitle: description,
                                                originalLabel: b,
                                                tags: y,
                                                sheetsData: i,
                                                imageUrl: i.imageUrl || null,
                                                id: i.id,
                                                parentIndex: h ? h.index : null,
                                                originalIndex: h ? h.originalIndex : null,
                                                playlistOrder: h ? h.playlistOrder : 1e4 + a,
                                                item: h ? h.item : null,
                                                isStandalone: !h,
                                                isEnhanced: !!h,
                                                boost: t.googleSheets.useAsDataSource ? r.searchSettings.boostValues.sheetsMatch : r.searchSettings.boostValues.labeledItem,
                                                businessName: null,
                                                businessData: null
                                            }),
                                            l.debug(`Added ${h ? "linked" : "standalone"} Google Sheets entry: ${b}`)
                                    } catch (e) {
                                        l.warn(`Error processing Google Sheets entry at index ${a}:`, e)
                                    }
                                }
                            ))
                    }
                    r.includeContent?.containerSearch?.enableContainerSearch && Array.isArray(r.includeContent?.containerSearch?.containerNames) && r.includeContent.containerSearch.containerNames.length > 0 && (l.info(`Processing ${r.includeContent.containerSearch.containerNames.length} container search entries`),
                        r.includeContent.containerSearch.containerNames.forEach(( (e, t) => {
                                try {
                                    if (!e || "string" != typeof e)
                                        return;
                                    const n = e
                                        , o = "Container"
                                        , i = [];
                                    if (!S(o, n, i))
                                        return void l.debug(`Filtering out container ${n} due to element filter`);
                                    c.push({
                                        type: o,
                                        source: "container",
                                        label: n,
                                        subtitle: "Click to toggle container",
                                        originalLabel: n,
                                        tags: i,
                                        containerName: e,
                                        id: `container_${e}`,
                                        playlistOrder: 2e4 + t,
                                        isContainer: !0,
                                        boost: r.searchSettings.boostValues.childElement,
                                        businessName: null,
                                        businessData: null,
                                        sheetsData: null,
                                        imageUrl: null
                                    }),
                                        l.debug(`Added container to search index: ${n}`)
                                } catch (t) {
                                    l.warn(`Error processing container entry "${e}":`, t)
                                }
                            }
                        )));
                    const d = new Fuse(c,{
                        keys: [{
                            name: "label",
                            weight: r.searchSettings.fieldWeights.label
                        }, {
                            name: "subtitle",
                            weight: r.searchSettings.fieldWeights.subtitle
                        }, {
                            name: "tags",
                            weight: r.searchSettings.fieldWeights.tags
                        }, {
                            name: "parentLabel",
                            weight: r.searchSettings.fieldWeights.parentLabel
                        }, {
                            name: "businessTag",
                            weight: r.searchSettings.fieldWeights.businessTag
                        }, {
                            name: "businessName",
                            weight: r.searchSettings.fieldWeights.businessName
                        }, {
                            name: "containerName",
                            weight: r.searchSettings.fieldWeights.label
                        }, {
                            name: "originalLabel",
                            weight: r.searchSettings.fieldWeights.label
                        }],
                        includeScore: r.searchSettings.behavior.includeScore,
                        threshold: r.searchSettings.behavior.threshold,
                        distance: r.searchSettings.behavior.distance,
                        minMatchCharLength: r.searchSettings.behavior.minMatchCharLength,
                        useExtendedSearch: r.searchSettings.behavior.useExtendedSearch,
                        ignoreLocation: r.searchSettings.behavior.ignoreLocation,
                        location: r.searchSettings.behavior.location
                    });
                    return l.info(`Hybrid search index created with ${c.length} total items`),
                        l.info(`Hybrid search index created with ${c.length} total items`),
                        l.info(`Main playlist contributed: ${a?.length || 0} items`),
                        l.info(`Root playlist contributed: ${s?.length || 0} items`),
                        d
                } catch (e) {
                    return l.error("Error preparing hybrid search index:", e),
                        new Fuse([],{
                            keys: ["label"],
                            includeScore: !0
                        })
                }
            }(a, r)
        }
        function k(e) {
            if (!e)
                return {};
            try {
                return e.data ? e.data : "function" == typeof e.get && e.get("data") || {}
            } catch (e) {
                return l.debug("Error getting data:", e),
                    {}
            }
        }
        function M(e, t) {
            const {mode: n="none", allowed: o=[], blacklisted: i=[]} = t || {};
            if (l?.debug?.("[MEDIA-INDEX]", {
                mode: n,
                index: e,
                allowed: o,
                blacklisted: i,
                action: "checked"
            }),
            "whitelist" === n && o.length > 0) {
                const t = String(e);
                if (!o.includes(t))
                    return l?.debug?.("[MEDIA-INDEX]", {
                        mode: n,
                        index: e,
                        allowed: o,
                        blacklisted: i,
                        action: "rejected-whitelist"
                    }),
                        !1
            } else if ("blacklist" === n && i.length > 0) {
                const t = String(e);
                if (i.includes(t))
                    return l?.debug?.("[MEDIA-INDEX]", {
                        mode: n,
                        index: e,
                        allowed: o,
                        blacklisted: i,
                        action: "rejected-blacklist"
                    }),
                        !1
            }
            return l?.debug?.("[MEDIA-INDEX]", {
                mode: n,
                index: e,
                allowed: o,
                blacklisted: i,
                action: "passed"
            }),
                !0
        }
        function O(e, t, n, o) {
            const i = o || {}
                , a = i.type || "Element"
                , s = (i.id,
                void 0 !== i.index ? i.index : -1);
            if (r.display.onlySubtitles && t)
                return t;
            if (e && e.trim())
                return e.trim();
            if (!e || !e.trim()) {
                if (t && t.trim() && r.useAsLabel.subtitles)
                    return l.debug(`[LABEL DEBUG] Using subtitle as label: "${t}"`),
                        t.trim();
                if (Array.isArray(n) && n.length > 0 && r.useAsLabel.tags)
                    return console.log(`[LABEL DEBUG] Using tags as label: "${n.join(", ")}"`),
                        n.join(", ");
                if (r.useAsLabel.elementType)
                    return s >= 0 ? `${a} ${s + 1}` : a;
                return r.useAsLabel.customText || "[Unnamed Item]"
            }
            return e
        }
        y.setRole(h.container, "search"),
            y.setLabel(h.container, "Tour search"),
            function(e) {
                if (!e)
                    return void l.error("Cannot create search interface: container is null or undefined");
                try {
                    !function(e) {
                        if (!e.querySelector("#tourSearch")) {
                            const t = document.createElement("div");
                            t.className = "search-field",
                                t.innerHTML = `\n                    <input type="text" id="tourSearch" placeholder="${r.searchBar.placeholder}" \n                          autocomplete="off">\n                    <div class="icon-container">\n                        <div class="search-icon"></div>\n                        <button class="clear-button">\n                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                                <line x1="18" y1="6" x2="6" y2="18"></line>\n                                <line x1="6" y1="6" x2="18" y2="18"></line>\n                            </svg>\n                        </button>\n                    </div>\n                `;
                            const n = t.querySelector("#tourSearch")
                                , o = t.querySelector(".clear-button")
                                , i = t.querySelector(".search-icon");
                            y.setRole(n, "searchbox"),
                                y.setLabel(n, "Search tour"),
                                y.setRole(t, "search"),
                                y.setLabel(o, "Clear search"),
                                y.setHidden(i, !0),
                                e.insertBefore(t, e.firstChild)
                        }
                    }(e),
                        function(e) {
                            if (!e.querySelector(".search-results")) {
                                const t = document.createElement("div");
                                t.className = "search-results",
                                    y.setRole(t, "listbox"),
                                    y.setLabel(t, "Search results");
                                const n = document.createElement("div");
                                n.className = "results-section",
                                    t.appendChild(n),
                                    t.appendChild(function() {
                                        const e = document.createElement("div");
                                        return e.className = "no-results",
                                            e.innerHTML = "<p>No results found</p>",
                                            e
                                    }()),
                                    e.appendChild(t)
                            }
                        }(e)
                } catch (e) {
                    l.error("Error creating search interface:", e)
                }
            }(h.container),
            e = "",
            t = null,
            _rebuildIndex = function() {
                try {
                    B()
                } catch (e) {
                    l?.warn?.("Rebuild index failed:", e)
                }
            }
        ;
        const j = (e, t) => {
                if (!e || !t || "*" === t)
                    return e || "";
                try {
                    const n = t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
                        , o = new RegExp(`(${n})`,"gi")
                        , i = document.createElement("div");
                    i.textContent = e;
                    return i.innerHTML.replace(o, "<mark>$1</mark>")
                } catch (t) {
                    return l.warn("Error highlighting text:", t),
                        e
                }
            }
        ;
        n = () => {
            const n = document.getElementById("searchContainer");
            if (!n)
                return void l.error("Search container not found");
            const i = n.querySelector("#tourSearch")
                , a = i ? i.value.trim() : ""
                , c = n.querySelector(".clear-button")
                , d = n.querySelector(".search-icon")
                , u = n.querySelector(".results-section")
                , g = n.querySelector(".no-results")
                , h = n.querySelector(".search-results");
            if (h && u && g) {
                if (h.setAttribute("aria-live", "polite"),
                    g.setAttribute("role", "status"),
                    a.length > 0 ? (c && c.classList.add("visible"),
                    d && (d.classList.add("icon-hidden"),
                        d.classList.remove("icon-visible"))) : (c && c.classList.remove("visible"),
                    d && (d.classList.add("icon-visible"),
                        d.classList.remove("icon-hidden"))),
                a !== e) {
                    if (e = a,
                        u.innerHTML = "",
                        !a)
                        return n.classList.remove("has-results"),
                            g.classList.remove("visible"),
                            g.classList.add("hidden"),
                            h.classList.remove("visible"),
                            h.classList.add("hidden"),
                            void (u.innerHTML = "");
                    if ("*" !== a && a.length < r.minSearchChars)
                        return g.classList.remove("visible"),
                            g.classList.add("hidden"),
                            h.classList.remove("visible"),
                            h.classList.add("hidden"),
                            void (u.innerHTML = `\n                    <div class="search-min-chars" role="status" aria-live="assertive">\n                        <p>Please type at least ${r.minSearchChars} characters to search</p>\n                    </div>\n                `);
                    h.classList.remove("hidden"),
                        h.classList.add("visible");
                    try {
                        let e;
                        if (t || (l.warn("Search index not initialized, preparing now..."),
                            B()),
                        "*" === a)
                            e = t._docs ? t._docs.map(( (e, t) => ({
                                item: e,
                                score: 0,
                                refIndex: t
                            }))) : [];
                        else {
                            const n = (m = a) ? /[0-9\-_]/.test(m) ? `'${m}` : m : "";
                            e = "string" == typeof n && n.startsWith("=") ? t.search({
                                $or: [{
                                    label: n
                                }]
                            }) : t.search(n)
                        }
                        if (!e || !e.length)
                            return n.classList.remove("has-results"),
                                g.classList.remove("hidden"),
                                g.classList.add("visible"),
                                g.setAttribute("role", "status"),
                                g.setAttribute("aria-live", "polite"),
                                h.classList.remove("hidden"),
                                h.classList.add("visible", "no-results-bg"),
                                void u.classList.add("hidden");
                        n.classList.add("has-results"),
                            g.classList.remove("visible"),
                            g.classList.add("hidden"),
                            h.classList.remove("no-results-bg", "hidden"),
                            h.classList.add("visible"),
                            u.classList.remove("hidden"),
                            h.setAttribute("aria-live", "polite"),
                            h.setAttribute("aria-relevant", "additions text"),
                            g.classList.remove("visible"),
                            g.classList.add("hidden"),
                            u.classList.remove("hidden"),
                            u.classList.add("visible"),
                            g.classList.remove("visible"),
                            g.classList.add("hidden");
                        const i = (e => {
                                const t = e.reduce(( (e, t) => {
                                        let n = t.item.type || "Element";
                                        return r.businessData?.useBusinessData && r.businessData?.replaceTourData && t.item.businessData?.elementType ? n = t.item.businessData.elementType : r.googleSheets?.useAsDataSource && r.googleSheets?.useGoogleSheetData && t.item.sheetsData?.elementType ? n = t.item.sheetsData.elementType : r.businessData?.useBusinessData && t.item.businessName && !t.item.item && (n = "Business"),
                                        e[n] || (e[n] = []),
                                            e[n].push(t),
                                            e
                                    }
                                ), {});
                                return Object.keys(t).forEach((e => {
                                        t[e].sort(( (e, t) => {
                                                if (void 0 !== e.item.playlistOrder && void 0 !== t.item.playlistOrder)
                                                    return e.item.playlistOrder - t.item.playlistOrder;
                                                const n = e.item.label.localeCompare(t.item.label);
                                                return 0 !== n ? n : e.item.parentLabel && t.item.parentLabel ? e.item.parentLabel.localeCompare(t.item.parentLabel) : 0
                                            }
                                        ))
                                    }
                                )),
                                    t
                            }
                        )(e);
                        "whitelist" === r.filter.typeFilter?.mode && Array.isArray(r.filter.typeFilter?.allowedTypes) && r.filter.typeFilter.allowedTypes.length > 0 ? Object.keys(i).forEach((e => {
                                r.filter.typeFilter.allowedTypes.includes(e) || delete i[e]
                            }
                        )) : "blacklist" === r.filter.typeFilter?.mode && Array.isArray(r.filter.typeFilter?.blacklistedTypes) && r.filter.typeFilter.blacklistedTypes.length > 0 && Object.keys(i).forEach((e => {
                                r.filter.typeFilter.blacklistedTypes.includes(e) && delete i[e]
                            }
                        ));
                        let c = 0;
                        const d = ["Panorama", "Hotspot", "Polygon", "Video", "Webframe", "Image", "Text", "ProjectedImage", "3DModel", "3DHotspot", "Element", "Business", "Container"];
                        Object.entries(i).sort(( ([e], [t]) => {
                                const n = d.indexOf(e)
                                    , o = d.indexOf(t);
                                return (-1 !== n ? n : d.length) - (-1 !== o ? o : d.length)
                            }
                        )).forEach(( ([e,t]) => {
                                const n = document.createElement("div");
                                n.className = "results-group",
                                    n.setAttribute("data-type", e),
                                    n.setAttribute("data-header-align", r.thumbnailSettings?.groupHeaderAlignment || "left"),
                                    n.setAttribute("data-header-position", r.thumbnailSettings?.groupHeaderPosition || "top"),
                                    y.setRole(n, "group"),
                                    y.setLabel(n, `${e} results`);
                                const i = r.displayLabels[e] || e;
                                n.innerHTML = `\n                        <div class="group-header">\n                            <span class="group-title">${i}</span>\n                            <span class="group-count">${t.length} result${1 !== t.length ? "s" : ""}</span>\n                        </div>\n                    `;
                                const d = r.animations || {}
                                    , g = !0 === d.enabled;
                                g && (console.log("🎬 Applying group animation:", d.results),
                                    n.style.opacity = "0",
                                    n.style.transform = `translateY(${d.results?.slideDistance || 10}px)`,
                                    requestAnimationFrame(( () => {
                                            n.style.transition = `opacity ${d.results?.fadeInDuration || 200}ms ease-out, transform ${d.results?.fadeInDuration || 200}ms ease-out`,
                                                n.style.opacity = "1",
                                                n.style.transform = "translateY(0)",
                                                console.log("🎬 Group animation applied")
                                        }
                                    ))),
                                    t.forEach((e => {
                                            c++;
                                            const t = document.createElement("div");
                                            t.className = "result-item",
                                                y.setRole(t, "option"),
                                                t.tabIndex = 0,
                                                t.setAttribute("aria-posinset", c),
                                                y.setSelected(t, !1),
                                                t.dataset.type = e.item.type,
                                            g && (console.log(`🎬 Applying item animation ${c}:`, d.results),
                                                t.style.opacity = "0",
                                                t.style.transform = "translateX(-10px)",
                                                setTimeout(( () => {
                                                        t.style.transition = `opacity ${d.results?.fadeInDuration || 200}ms ease-out, transform ${d.results?.fadeInDuration || 200}ms ease-out`,
                                                            t.style.opacity = "1",
                                                            t.style.transform = "translateX(0)",
                                                            console.log(`🎬 Item ${c} animation applied`)
                                                    }
                                                ), (c - 1) * (d.results?.staggerDelay || 50))),
                                            r.businessData?.useBusinessData && e.item.businessName && (t.dataset.business = "true",
                                                t.dataset.businessTag = e.item.businessTag || ""),
                                            r.googleSheets?.useGoogleSheetData && e.item.sheetsData && (t.dataset.sheets = "true",
                                            e.item.sheetsData.elementType && (t.dataset.sheetsType = e.item.sheetsData.elementType)),
                                                t.addEventListener("click", function(e, t) {
                                                    return function(n) {
                                                        n && "function" == typeof n.preventDefault && n.preventDefault(),
                                                        n && "function" == typeof n.stopPropagation && n.stopPropagation();
                                                        try {
                                                            if ("Container" === e.item.type) {
                                                                if (e.item.isContainer && e.item.containerName)
                                                                    try {
                                                                        if (window.tourMenu && "function" == typeof window.tourMenu.toggleContainer)
                                                                            window.tourMenu.toggleContainer(e.item.containerName, !1),
                                                                                l.info(`Toggled container: ${e.item.containerName}`);
                                                                        else if (l.warn("tourMenu not available for container toggle"),
                                                                        window.tour && window.tour.player) {
                                                                            const t = window.tour.player.getByClassName("Container").find((t => {
                                                                                    const n = t.get("data");
                                                                                    return n && n.name === e.item.containerName
                                                                                }
                                                                            ));
                                                                            if (t) {
                                                                                const n = t.get("visible");
                                                                                t.set("visible", !n),
                                                                                    l.info(`Direct toggle container "${e.item.containerName}" to: ${!n}`)
                                                                            } else
                                                                                l.warn(`Container "${e.item.containerName}" not found`)
                                                                        }
                                                                    } catch (n) {
                                                                        l.error(`Error toggling container: ${n.message}`)
                                                                    }
                                                                return void (s() && setTimeout(( () => $(!1)), 150))
                                                            }
                                                            let i;
                                                            if ("root" === e.item.source || "3DModel" === e.item.type || "3DModelObject" === e.item.type || "3DHotspot" === e.item.type) {
                                                                const e = o.getAllPlayLists(t);
                                                                i = e.root || e.main || t?.mainPlayList
                                                            } else {
                                                                const e = o.getAllPlayLists(t);
                                                                i = e.main || t?.mainPlayList
                                                            }
                                                            if (!i)
                                                                return void l.error("[NAV] No target playlist available");
                                                            if ("Panorama" === e.item.type || "3DModel" === e.item.type) {
                                                                const t = "number" == typeof e.item.originalIndex ? e.item.originalIndex : "number" == typeof e.item.index ? e.item.index : void 0;
                                                                if ("number" == typeof t)
                                                                    return i.set("selectedIndex", t),
                                                                        l.info("[NAV] media", {
                                                                            type: e.item.type,
                                                                            idx: t,
                                                                            label: e.item.label
                                                                        }),
                                                                        void (s() && setTimeout(( () => $(!1)), 150))
                                                            }
                                                            if ("3DModelObject" === e.item.type || "3DHotspot" === e.item.type) {
                                                                if (void 0 !== e.item.parentIndex)
                                                                    try {
                                                                        i.set("selectedIndex", e.item.parentIndex),
                                                                            l.info(`[3D NAV] Parent model index ${e.item.parentIndex} selected for ${e.item.type} "${e.item.label}"`)
                                                                    } catch (n) {
                                                                        l.error(`[3D NAV] Could not select parent index: ${n.message}`)
                                                                    }
                                                                const o = () => {
                                                                        const n = e.item.originalLabel || e.item.label || ""
                                                                            , o = e.item.parentModel
                                                                            , a = i.get && i.get("items")
                                                                            , s = a && a[e.item.parentIndex];
                                                                        if (s && "function" == typeof s.bind) {
                                                                            const i = () => {
                                                                                    l.info("[3D BEGIN] Model begin triggered, attempting element trigger");
                                                                                    const a = () => {
                                                                                            const e = L(t, {
                                                                                                label: n,
                                                                                                parentModelId: o
                                                                                            });
                                                                                            if (e) {
                                                                                                const o = e.get && e.get("id") || e.id;
                                                                                                if (o)
                                                                                                    l.info(`[3D TRIGGER] Fallback by label -> id ${o}`),
                                                                                                        E(t, o, (e => {
                                                                                                                e || l.warn(`[3D TRIGGER] Fallback trigger failed for id ${o}`)
                                                                                                            }
                                                                                                        ), {
                                                                                                            maxRetries: 20,
                                                                                                            initialDelay: 0,
                                                                                                            baseRetryInterval: 250,
                                                                                                            maxRetryInterval: 1200
                                                                                                        });
                                                                                                else if ("function" == typeof e.trigger) {
                                                                                                    l.info("[3D TRIGGER] Direct sprite.trigger('click') fallback");
                                                                                                    try {
                                                                                                        e.trigger("click")
                                                                                                    } catch (e) {
                                                                                                        l.warn("Direct trigger failed:", e)
                                                                                                    }
                                                                                                } else
                                                                                                    l.warn(`[3D TRIGGER] Sprite found but no triggerable interface for "${n}"`)
                                                                                            } else
                                                                                                l.warn(`[3D TRIGGER] No sprite found for "${n}" under model ${o || "(unknown)"}`)
                                                                                        }
                                                                                    ;
                                                                                    e.item.id ? (l.info(`[3D TRIGGER] Trying by id: ${e.item.id}`),
                                                                                        E(t, e.item.id, (t => {
                                                                                                t || (l.warn(`[3D TRIGGER] id ${e.item.id} not found; trying label fallback "${n}"`),
                                                                                                    a())
                                                                                            }
                                                                                        ), {
                                                                                            maxRetries: 20,
                                                                                            initialDelay: 0,
                                                                                            baseRetryInterval: 250,
                                                                                            maxRetryInterval: 1200
                                                                                        })) : (l.info(`[3D TRIGGER] No id on result; using label fallback "${n}"`),
                                                                                        a());
                                                                                    try {
                                                                                        s.unbind && s.unbind("begin", i)
                                                                                    } catch (e) {
                                                                                        l.debug("Failed to unbind begin handler:", e)
                                                                                    }
                                                                                }
                                                                            ;
                                                                            s.bind("begin", i),
                                                                                l.info("[3D SETUP] Begin handler bound, ready for model activation")
                                                                        } else {
                                                                            l.warn("[3D FALLBACK] No parent item bind capability, using immediate trigger");
                                                                            const i = () => {
                                                                                    const e = L(t, {
                                                                                        label: n,
                                                                                        parentModelId: o
                                                                                    });
                                                                                    if (e) {
                                                                                        const o = e.get && e.get("id") || e.id;
                                                                                        if (o)
                                                                                            l.info(`[3D TRIGGER] Fallback by label -> id ${o}`),
                                                                                                E(t, o, (e => {
                                                                                                        e || l.warn(`[3D TRIGGER] Fallback trigger failed for id ${o}`)
                                                                                                    }
                                                                                                ), {
                                                                                                    maxRetries: 20,
                                                                                                    initialDelay: 0,
                                                                                                    baseRetryInterval: 250,
                                                                                                    maxRetryInterval: 1200
                                                                                                });
                                                                                        else if ("function" == typeof e.trigger) {
                                                                                            l.info("[3D TRIGGER] Direct sprite.trigger('click') fallback");
                                                                                            try {
                                                                                                e.trigger("click")
                                                                                            } catch (e) {
                                                                                                l.warn("Direct trigger failed:", e)
                                                                                            }
                                                                                        } else
                                                                                            l.warn(`[3D TRIGGER] Sprite found but no triggerable interface for "${n}"`)
                                                                                    } else
                                                                                        l.warn(`[3D TRIGGER] No sprite found for "${n}" under model ${o || "(unknown)"}`)
                                                                                }
                                                                            ;
                                                                            e.item.id ? (l.info(`[3D TRIGGER] Trying by id: ${e.item.id}`),
                                                                                E(t, e.item.id, (t => {
                                                                                        t || (l.warn(`[3D TRIGGER] id ${e.item.id} not found; trying label fallback "${n}"`),
                                                                                            i())
                                                                                    }
                                                                                ), {
                                                                                    maxRetries: 20,
                                                                                    initialDelay: 0,
                                                                                    baseRetryInterval: 250,
                                                                                    maxRetryInterval: 1200
                                                                                })) : (l.info(`[3D TRIGGER] No id on result; using label fallback "${n}"`),
                                                                                i())
                                                                        }
                                                                    }
                                                                ;
                                                                return setTimeout(o, 600),
                                                                    void (s() && setTimeout(( () => $(!1)), 800))
                                                            }
                                                            if (e.item.camera && ("Hotspot" === e.item.type || "Polygon" === e.item.type || "ProjectedImage" === e.item.type || "Image" === e.item.type || "Text" === e.item.type || "Video" === e.item.type || "Webframe" === e.item.type) && "number" == typeof e.item.mediaIndex) {
                                                                const o = i.get && i.get("items")
                                                                    , a = o && o[e.item.mediaIndex];
                                                                if (a && "function" == typeof t.setPanoramaCameraWithSpot) {
                                                                    const o = () => {
                                                                            const {yaw: n, pitch: o, fov: s} = e.item.camera;
                                                                            void 0 !== s ? t.setPanoramaCameraWithSpot(i, a, n, o, s) : t.setPanoramaCameraWithSpot(i, a, n, o),
                                                                                l.info("[NAV] hotspot+camera (one-shot)", {
                                                                                    mediaIndex: e.item.mediaIndex,
                                                                                    yaw: n,
                                                                                    pitch: o,
                                                                                    fov: s
                                                                                })
                                                                        }
                                                                    ;
                                                                    if (a.get && a.get("player") && a.get("player").get("viewerArea"))
                                                                        o(),
                                                                            i.set("selectedIndex", e.item.mediaIndex);
                                                                    else if (a.bind && "function" == typeof a.bind) {
                                                                        if (a._searchCameraBeginHandler) {
                                                                            l.debug("[NAV] clearing previous camera begin handler");
                                                                            try {
                                                                                a.unbind && a.unbind("begin", a._searchCameraBeginHandler)
                                                                            } catch (n) {}
                                                                            a._searchCameraBeginHandler = null
                                                                        }
                                                                        const t = () => {
                                                                                try {
                                                                                    a.unbind && a.unbind("begin", t)
                                                                                } catch (e) {}
                                                                                a._searchCameraBeginHandler = null,
                                                                                    o()
                                                                            }
                                                                        ;
                                                                        a._searchCameraBeginHandler = t,
                                                                            a.bind("begin", t),
                                                                            l.debug("[NAV] bound one-shot camera begin handler"),
                                                                            i.set("selectedIndex", e.item.mediaIndex)
                                                                    } else
                                                                        i.set("selectedIndex", e.item.mediaIndex),
                                                                            setTimeout(o, 250)
                                                                } else
                                                                    i.set("selectedIndex", e.item.mediaIndex);
                                                                return void (s() && setTimeout(( () => $(!1)), 150))
                                                            }
                                                            if (("Hotspot" === e.item.type || "Polygon" === e.item.type || "ProjectedImage" === e.item.type || "Image" === e.item.type || "Text" === e.item.type || "Video" === e.item.type || "Webframe" === e.item.type) && "number" == typeof e.item.mediaIndex) {
                                                                i.set("selectedIndex", e.item.mediaIndex);
                                                                const n = i.get && i.get("items")
                                                                    , o = n && n[e.item.mediaIndex];
                                                                return o && "function" == typeof t.focusOverlayByName && e.item.label && (t.focusOverlayByName(o, e.item.label),
                                                                    l.info("[NAV] hotspot+focus", {
                                                                        mediaIndex: e.item.mediaIndex,
                                                                        label: e.item.label
                                                                    })),
                                                                    void (s() && setTimeout(( () => $(!1)), 150))
                                                            }
                                                        } catch (e) {
                                                            l.error(`Error in hybrid click handler: ${e.message}`)
                                                        }
                                                    }
                                                }(e, window.tourInstance)),
                                                t.addEventListener("keydown", (e => {
                                                        "Enter" !== e.key && " " !== e.key || (e.preventDefault(),
                                                            t.click())
                                                    }
                                                )),
                                                t.setAttribute("aria-posinset", c),
                                                y.setSelected(t, !1),
                                                t.dataset.type = e.item.type,
                                            e.item.id && (t.dataset.id = e.item.id),
                                            void 0 !== e.item.parentIndex && (t.dataset.parentIndex = e.item.parentIndex),
                                            void 0 !== e.item.index && (t.dataset.index = e.item.index);
                                            const i = "Panorama" !== e.item.type && e.item.parentLabel && !1 !== r.display.showParentInfo ? `<div class="result-parent">in ${j(e.item.parentLabel, a)}</div>` : "";
                                            e.item.type;
                                            let u = !1
                                                , h = !1;
                                            r.businessData?.useBusinessData && e.item.businessName && (u = !0),
                                            r.googleSheets?.useGoogleSheetData && e.item.sheetsData && (h = !0);
                                            r.googleSheets?.useGoogleSheetData && e.item.imageUrl;
                                            const m = function(e, t) {
                                                if (!t.thumbnailSettings?.enableThumbnails)
                                                    return null;
                                                const n = t.thumbnailSettings?.showFor || {}
                                                    , o = e.type?.toLowerCase() || "other"
                                                    , i = {
                                                    panorama: "panorama",
                                                    hotspot: "hotspot",
                                                    polygon: "polygon",
                                                    video: "video",
                                                    webframe: "webframe",
                                                    image: "image",
                                                    text: "text",
                                                    projectedimage: "projectedimage",
                                                    element: "element",
                                                    business: "business",
                                                    "3dmodel": "3dmodel",
                                                    "3dhotspot": "3dhotspot",
                                                    "3dmodelobject": "3dmodelobject"
                                                }[o] || "other";
                                                if (!1 === n[i])
                                                    return l.debug(`[THUMBNAIL] Thumbnails disabled for type: ${o} (showFor.${i}=false)`),
                                                        null;
                                                if (l.debug(`[THUMBNAIL] Thumbnails enabled for type: ${o} (showFor.${i}=${n[i]})`),
                                                    e.businessData?.imageUrl)
                                                    return b(e.businessData.imageUrl);
                                                if (e.imageUrl)
                                                    return b(e.imageUrl);
                                                if ("Panorama" === e.type && e.item)
                                                    try {
                                                        const t = e.item.get("media");
                                                        if (t) {
                                                            let n = t.get("thumbnail") || t.get("firstFrame") || t.get("preview");
                                                            if (n)
                                                                return l.debug(`[THUMBNAIL] Found for ${e.label}: ${n}`),
                                                                    b(n)
                                                        }
                                                    } catch (e) {
                                                        l.debug(`[THUMBNAIL] Error extracting from tour: ${e.message}`)
                                                    }
                                                const a = t.thumbnailSettings?.defaultImages || {};
                                                if (console.log(`🔍 THUMBNAIL DEBUG: Looking for default image for type "${e.type}"`),
                                                    console.log("🔍 THUMBNAIL DEBUG: Available defaultImages:", Object.keys(a)),
                                                    a[e.type]) {
                                                    const t = b(a[e.type]);
                                                    return l.debug(`🔍 THUMBNAIL DEBUG: Found type-specific image: ${a[e.type]} -> ${t}`),
                                                        t
                                                }
                                                const s = b(a.default || t.thumbnailSettings?.defaultImagePath);
                                                return console.log(`🔍 THUMBNAIL DEBUG: Using fallback image: ${s}`),
                                                    s
                                            }(e.item, r)
                                                , p = null !== m;
                                            let f = "thumbnail-medium";
                                            const w = r.thumbnailSettings || {}
                                                , v = w.thumbnailSize || "48px";
                                            v.endsWith("px") ? f = `thumbnail-${v}` : "16px" === v || "24px" === v ? f = "thumbnail-small" : "32px" === v || "48px" === v ? f = "thumbnail-medium" : "64px" !== v && "80px" !== v && "96px" !== v || (f = "thumbnail-large"),
                                            p && t.setAttribute("data-thumbnail-align", "right" === w.alignment ? "right" : "left"),
                                                t.setAttribute("data-icon-align", "right" === w.alignment ? "right" : "left");
                                            const S = e => e ? String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : ""
                                                , I = S(m || "")
                                                , T = S(e.item.label || "Search result");
                                            t.innerHTML = `\n                ${p ? `\n                  <div class="result-image ${f}">\n                    <img src="${I}" \n                         alt="${T}" \n                         loading="lazy"\n                         onerror="if (!this.dataset.fallbackApplied) { this.dataset.fallbackApplied = '1'; this.src = '${S(b("assets/default-thumbnail.jpg") || "")}'; }">\n                  </div>` : `\n                  <div class="result-icon ${( () => {
                                                    const e = r.thumbnailSettings?.iconSettings?.iconSize || "48px";
                                                    return e.endsWith("px") ? `icon-${e}` : "icon-48px"
                                                }
                                            )()}">${( (e, t=r) => {
                                                    const n = e => {
                                                        const t = {
                                                            Panorama: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>\n                    <circle cx="12" cy="10" r="3"></circle>\n                </svg>',
                                                            Hotspot: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                   <circle cx="12" cy="12" r="3"></circle>\n                   <circle cx="12" cy="12" r="9"></circle>\n                </svg>',
                                                            Polygon: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                   <polygon points="5 3 19 12 5 21 5 3"></polygon>\n                </svg>',
                                                            "3DHotspot": '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n              <circle cx="12" cy="12" r="3"></circle>\n              <circle cx="12" cy="12" r="8"></circle>\n              <path d="M12 2v4"></path>\n              <path d="M12 18v4"></path>\n              <path d="M2 12h4"></path>\n              <path d="M18 12h4"></path>\n            </svg>',
                                                            "3DModel": '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                  <polygon points="12,2 22,7 22,17 12,22 2,17 2,7"></polygon>\n                  <polyline points="2,7 12,12 22,7"></polyline>\n                  <polyline points="12,2 12,22"></polyline>\n                </svg>',
                                                            "3DModelObject": '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n              <circle cx="12" cy="12" r="9"></circle>\n              <path d="M12 3v18"></path>\n              <path d="M3 12h18"></path>\n            </svg>',
                                                            Video: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                 <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>\n                 <polygon points="10 9 15 12 10 15" fill="currentColor"></polygon>\n              </svg>',
                                                            Webframe: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                    <rect x="2" y="2" width="20" height="16" rx="2" ry="2"></rect>\n                    <line x1="2" y1="6" x2="22" y2="6"></line>\n                 </svg>',
                                                            Image: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>\n                 <circle cx="8.5" cy="8.5" r="1.5"></circle>\n                 <path d="M21 15l-5-5L5 21"></path>\n              </svg>',
                                                            ProjectedImage: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>\n                 <circle cx="8.5" cy="8.5" r="1.5"></circle>\n                 <path d="M21 15l-5-5L5 21"></path>\n                 <path d="M2 2l20 20"></path>\n               </svg>',
                                                            Text: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                <line x1="4" y1="7" x2="20" y2="7"></line>\n                <line x1="4" y1="12" x2="20" y2="12"></line>\n                <line x1="4" y1="17" x2="14" y2="17"></line>\n             </svg>',
                                                            Element: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n                   <circle cx="12" cy="12" r="9"></circle>\n                </svg>',
                                                            Container: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>\n            <rect x="7" y="7" width="10" height="6" rx="1" ry="1"></rect>\n            <line x1="3" y1="17" x2="21" y2="17"></line>\n          </svg>',
                                                            Business: '<svg xmlns="http://www.w3.org/2000/svg" class="search-result-icon business-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\n              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>\n              <line x1="4" y1="7" x2="20" y2="7"></line>\n              <line x1="4" y1="12" x2="20" y2="12"></line>\n              <line x1="4" y1="17" x2="20" y2="17"></line>\n              <line x1="9" y1="7" x2="9" y2="22"></line>\n              <line x1="15" y1="7" x2="15" y2="22"></line>\n            </svg>'
                                                        };
                                                        return t[e] || t.Element
                                                    }
                                                        , o = void 0 !== t && t.thumbnailSettings?.iconSettings || {};
                                                    if (l.debug(`[ICON DEBUG] Processing type: ${e}`),
                                                        console.log(`[ICON DEBUG] enableCustomIcons value: ${o.enableCustomIcons}`, typeof o.enableCustomIcons),
                                                    !0 !== o.enableCustomIcons)
                                                        return console.log(`[ICON] Custom icons DISABLED, using default SVG for: ${e}`),
                                                            n(e);
                                                    console.log(`[ICON] Custom icons ENABLED, processing custom icon for: ${e}`);
                                                    const i = o.showIconFor || {}
                                                        , a = e?.toLowerCase() || "other";
                                                    if (!1 === i[{
                                                        panorama: "panorama",
                                                        hotspot: "hotspot",
                                                        polygon: "polygon",
                                                        video: "video",
                                                        webframe: "webframe",
                                                        image: "image",
                                                        text: "text",
                                                        projectedimage: "projectedimage",
                                                        element: "element",
                                                        business: "business",
                                                        "3dmodel": "3dmodel",
                                                        "3dhotspot": "3dhotspot",
                                                        "3dmodelobject": "3dmodelobject"
                                                    }[a] || "other"])
                                                        return l.debug(`[ICON] Icons disabled for type: ${a}`),
                                                            "";
                                                    const s = o.customIcons || {};
                                                    let c = s[e] || s.default || "⚪";
                                                    return l.debug(`[ICON] Using custom icon for ${e}: ${c}`),
                                                        c.startsWith("<svg") ? c : c.startsWith("fa-") || c.startsWith("fas ") || c.startsWith("far ") || c.startsWith("fab ") || c.startsWith("fal ") || c.startsWith("fad ") ? o.enableFontAwesome ? function() {
                                                            const e = document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]');
                                                            if (e)
                                                                return console.log(`[ICON] Font Awesome detected via CSS link: ${e.href}`),
                                                                    !0;
                                                            try {
                                                                const e = document.createElement("i");
                                                                e.className = "fas fa-home",
                                                                    e.style.display = "none",
                                                                    document.body.appendChild(e);
                                                                const t = window.getComputedStyle(e).getPropertyValue("font-family");
                                                                if (document.body.removeChild(e),
                                                                t.includes("Font Awesome") || t.includes("FontAwesome") || t.includes("fa-"))
                                                                    return console.log(`[ICON] Font Awesome detected via font-family: ${t}`),
                                                                        !0
                                                            } catch (e) {
                                                                console.debug(`[ICON] Font Awesome style detection failed: ${e.message}`)
                                                            }
                                                            return window.FontAwesome || window.fontawesome ? (l.debug("[ICON] Font Awesome detected via JavaScript object"),
                                                                !0) : (console.log("[ICON] Font Awesome not detected - CSS not loaded or not available"),
                                                                !1)
                                                        }() ? `<i class="${c}" aria-hidden="true"></i>` : (console.warn(`[ICON] Font Awesome enabled but not loaded. Falling back to default SVG for ${e}.`),
                                                            n(e)) : (console.warn(`[ICON] Font Awesome class "${c}" specified but enableFontAwesome is false. Falling back to default SVG for ${e}.`),
                                                            n(e)) : c.startsWith("http") || c.includes(".") ? `<img src="${c}" alt="${e} icon" aria-hidden="true">` : `<span class="custom-icon-emoji" aria-hidden="true">${c}</span>`
                                                }
                                            )(e.item.type)}</div>`}\n                <div class="result-content">\n                  <div class="result-text">${j(e.item.label, a)}</div>\n                  ${r.businessData?.useBusinessData && e.item.businessName && e.item.originalLabel ? `\n                    <div class="result-business-context">\n                      Location: ${j(e.item.originalLabel, a)}\n                    </div>` : ""}\n                  ${i}\n                  ${e.item.tags && e.item.tags.length > 0 && r.showTagsInResults ? `\n                    <div class="result-tags">\n                      Tags: ${j(Array.isArray(e.item.tags) ? e.item.tags.join(", ") : e.item.tags, a)}\n                    </div>` : ""}\n                  ${!r.display.onlySubtitles && e.item.subtitle && !1 !== r.display.showSubtitlesInResults ? `\n                    <div class="result-description">${j(e.item.subtitle, a)}</div>` : ""}\n                </div>\n              `,
                                                n.appendChild(t)
                                        }
                                    )),
                                    u.appendChild(n)
                            }
                        )),
                            h.setAttribute("aria-setsize", c)
                    } catch (e) {
                        l.error("Search error:", e),
                            u.innerHTML = `\n                <div class="search-error" role="alert">\n                    <p>An error occurred while searching. Please try again.</p>\n                    <p class="search-error-details">${e.message}</p>\n                </div>\n            `,
                            h.classList.remove("hidden"),
                            h.classList.add("visible"),
                            h.classList.remove("no-results-bg")
                    }
                    var m
                }
            } else
                l.error("Search UI components not found")
        }
            ,
            d = i.init(h.container, h.container.querySelector("#tourSearch"), n),
            x(h.container, h.container.querySelector("#tourSearch"), h.container.querySelector(".clear-button"), h.container.querySelector(".search-icon"), n),
            B(),
            I();
        let F = document.getElementById("search-custom-styles");
        F && F.remove(),
            document.body.classList.toggle("show-result-tags", r.showTagsInResults);
        const R = h.container.querySelector("#tourSearch")
            , N = h.container.querySelector(".clear-button")
            , U = h.container.querySelector(".search-icon");
        x(h.container, R, N, U, n),
            window.searchListInitialized = !0,
            c = !0,
            l.info("Enhanced search initialized successfully")
    }
    let C = 0
        , P = 300
        , A = !1;
    function $(e) {
        const t = h.container && h.container.classList.contains("visible");
        if (A = t,
        void 0 !== e && (e && t || !e && !t))
            return void l.debug(`[toggleSearch] Ignoring duplicate state request: ${e}`);
        const n = Date.now();
        if (n - C < P)
            return void l.debug("[toggleSearch] Ignoring rapid toggle call, debouncing");
        if (C = n,
        void 0 === e) {
            e = !(h.container && h.container.classList.contains("visible")),
                console.log("[toggleSearch] Toggle request - changing visibility to:", e)
        }
        if (window.searchProDebug?.logSearchToggle && window.searchProDebug.logSearchToggle(e, h),
            !h.container)
            return void l.error("Search container not found");
        const o = r.animations || {}
            , i = !0 === o.enabled;
        if (console.log("🎬 Animation config:", o),
            console.log("🎬 Animations enabled:", i),
            e) {
            l.debug("[toggleSearch] Showing search UI"),
                h.container.style.display = "block",
                h.container.classList.remove("hiding", "closing", "hidden"),
                i ? (console.log("🎬 Applying opening animations"),
                    h.container.classList.add("opening"),
                o.searchBar?.scaleEffect && (h.container.classList.add("scale-effect"),
                    console.log("🎬 Scale effect enabled"))) : console.log("🎬 Animations disabled - showing immediately"),
                h.container.offsetHeight,
                h.container.classList.add("visible"),
                A = !0,
                y.setExpanded(h.input, !0);
            const e = window.innerHeight
                , t = h.container.getBoundingClientRect()
                , n = t.top
                , a = t.height;
            if (n + a > e) {
                const t = Math.max(10, e - a - 20);
                h.container.style.setProperty("--container-top", `${t}px`)
            }
            const s = i ? o.searchBar?.openDuration || 300 : 0;
            setTimeout(( () => {
                    h.input && h.input.focus()
                }
            ), s)
        } else {
            l.debug("[toggleSearch] Hiding search UI"),
                h.container.classList.remove("visible", "opening"),
                i ? (console.log("🎬 Applying closing animations"),
                    h.container.classList.add("hiding", "closing")) : console.log("🎬 Animations disabled - hiding immediately"),
                A = !1,
            h.input && (h.input.value = "",
                h.input.blur()),
            h.results && (h.results.style.display = "none",
                h.results.classList.remove("visible")),
            h.clearButton && h.clearButton.classList.remove("visible"),
                y.setExpanded(h.input, !1);
            const e = i ? o.searchBar?.closeDuration || 200 : 0
                , t = ++_pendingHideToken;
            setTimeout(( () => {
                    t === _pendingHideToken && (h.container.classList.contains("visible") || (h.container.style.display = "none",
                        h.container.classList.remove("hiding", "closing", "scale-effect"),
                        h.container.classList.add("hidden"),
                        console.log("🎬 Container hidden after animation delay")))
                }
            ), e + 50),
                setTimeout(( () => {
                        h.input && (h.input.value = "",
                            h.input.blur()),
                        h.clearButton && h.clearButton.classList.remove("visible");
                        const e = h.container.querySelector(".results-section");
                        e && (e.innerHTML = "");
                        const t = h.container.querySelector(".no-results");
                        t && (t.classList.remove("visible"),
                            t.classList.add("hidden"))
                    }
                ), e + 200)
        }
    }
    function B() {
        !function(e) {
            e || (e = {});
            const t = document.documentElement;
            console.log("🎬 Setting animation CSS variables:", e);
            const n = window.matchMedia("(prefers-reduced-motion: reduce)").matches
                , o = e.enabled && (!n || !e.reducedMotion?.respectPreference);
            if (console.log("🎬 Animations enabled:", o),
                console.log("🎬 Prefers reduced motion:", n),
                document.documentElement.classList.add("sp-anim-on"),
                t.style.setProperty("--animations-enabled", o ? "1" : "0"),
                o)
                t.style.setProperty("--animation-easing", e.easing || "cubic-bezier(0.22, 1, 0.36, 1)"),
                    t.style.setProperty("--animation-fast-duration", `${e.duration?.fast || 200}ms`),
                    t.style.setProperty("--animation-normal-duration", `${e.duration?.normal || 300}ms`),
                    t.style.setProperty("--animation-slow-duration", `${e.duration?.slow || 500}ms`),
                    t.style.setProperty("--animation-open-duration", `${e.searchBar?.openDuration || 300}ms`),
                    t.style.setProperty("--animation-close-duration", `${e.searchBar?.closeDuration || 200}ms`),
                    t.style.setProperty("--animation-results-duration", `${e.results?.fadeInDuration || 200}ms`),
                    t.style.setProperty("--animation-slide-distance", `${e.results?.slideDistance || 10}px`),
                    t.style.setProperty("--animation-stagger-delay", `${e.results?.staggerDelay || 50}ms`);
            else {
                const n = e.reducedMotion?.fallbackDuration || 0;
                t.style.setProperty("--animation-easing", "ease"),
                    t.style.setProperty("--animation-fast-duration", `${n}ms`),
                    t.style.setProperty("--animation-normal-duration", `${n}ms`),
                    t.style.setProperty("--animation-slow-duration", `${n}ms`),
                    t.style.setProperty("--animation-open-duration", `${n}ms`),
                    t.style.setProperty("--animation-close-duration", `${n}ms`),
                    t.style.setProperty("--animation-results-duration", `${n}ms`),
                    t.style.setProperty("--animation-slide-distance", "0px"),
                    t.style.setProperty("--animation-stagger-delay", "0ms")
            }
            t.style.setProperty("--animation-scale-enabled", o && e.searchBar?.scaleEffect ? "1" : "0"),
                console.log("🎬 Animation CSS variables applied"),
                function(e) {
                    const t = document.getElementById("search-animation-styles");
                    t && t.remove();
                    if (!e)
                        return;
                    const n = document.createElement("style");
                    n.id = "search-animation-styles",
                        n.textContent = "\n/* Search Animation Styles - Only active when .sp-anim-on is present */\n.sp-anim-on #searchContainer {\n  transition: opacity var(--animation-normal-duration) var(--animation-easing),\n              transform var(--animation-normal-duration) var(--animation-easing);\n}\n\n.sp-anim-on .search-results {\n  transition: opacity var(--animation-results-duration) var(--animation-easing);\n}\n\n.sp-anim-on .result-item {\n  transition: transform var(--animation-fast-duration) var(--animation-easing),\n              opacity var(--animation-fast-duration) var(--animation-easing);\n}\n\n.sp-anim-on .result-item:hover {\n  transform: translateY(-2px);\n}\n\n.sp-anim-on #searchInput {\n  transition: transform var(--animation-normal-duration) var(--animation-easing),\n              box-shadow var(--animation-fast-duration) var(--animation-easing);\n}\n",
                        document.head.appendChild(n),
                        console.log("🎬 Animation styles injected")
                }(o)
        }(r.animations || {})
    }
    return {
        elements: h,
        initializeSearch: function(e) {
            try {
                if (!e)
                    throw new Error("Tour instance is required for initialization");
                if (!h.container && (h.container = document.getElementById("searchContainer"),
                    !h.container))
                    throw new Error("Search container not found. Element with ID 'searchContainer' is required.");
                D(e)
            } catch (e) {
                l.error("Search initialization failed:", e)
            }
        },
        toggleSearch: function(e) {
            h.container || (h.container = document.getElementById("searchContainer"),
                h.container) ? $(e) : l.error("Search container not found. Element with ID 'searchContainer' is required.")
        },
        updateConfig: function(t) {
            try {
                if (!t || "object" != typeof t)
                    return l.warn("No valid configuration provided for update"),
                        this.getConfig();
                const i = {
                    ...t
                };
                if (void 0 !== t.minSearchLength && (i.minSearchChars = t.minSearchLength,
                    delete i.minSearchLength),
                void 0 !== t.allowedMediaIndexes && (i.filter || (i.filter = {}),
                i.filter.mediaIndexes || (i.filter.mediaIndexes = {}),
                    i.filter.mediaIndexes.allowed = t.allowedMediaIndexes,
                    delete i.allowedMediaIndexes),
                void 0 !== t.blacklistedMediaIndexes && (i.filter || (i.filter = {}),
                i.filter.mediaIndexes || (i.filter.mediaIndexes = {}),
                    i.filter.mediaIndexes.blacklisted = t.blacklistedMediaIndexes,
                    delete i.blacklistedMediaIndexes),
                    i.thumbnailSettings?.thumbnailSize) {
                    const s = {
                        small: "32px",
                        medium: "48px",
                        large: "64px"
                    }
                        , c = i.thumbnailSettings.thumbnailSize;
                    s[c] && (i.thumbnailSettings.thumbnailSize = s[c])
                }
                function o(e) {
                    return Array.isArray(e) ? e.map((e => "string" == typeof e ? e.trim() : String(e).trim())).filter((e => e.length > 0)).filter(( (e, t, n) => n.indexOf(e) === t)) : []
                }
                r = function e(t, n) {
                    if (!n)
                        return t;
                    if (!t)
                        return n;
                    for (const o in n)
                        Object.prototype.hasOwnProperty.call(n, o) && void 0 !== n[o] && (n[o] && "object" == typeof n[o] && !Array.isArray(n[o]) ? (t[o] && "object" == typeof t[o] || (t[o] = {}),
                            e(t[o], n[o])) : t[o] = n[o]);
                    return t
                }(r, i),
                r.filter && (r.filter.allowedValues && (r.filter.allowedValues = o(r.filter.allowedValues)),
                r.filter.blacklistedValues && (r.filter.blacklistedValues = o(r.filter.blacklistedValues)),
                r.filter.elementLabels && (r.filter.elementLabels.allowedValues && (r.filter.elementLabels.allowedValues = o(r.filter.elementLabels.allowedValues)),
                r.filter.elementLabels.blacklistedValues && (r.filter.elementLabels.blacklistedValues = o(r.filter.elementLabels.blacklistedValues))),
                r.filter.tagFiltering && (r.filter.tagFiltering.allowedTags && (r.filter.tagFiltering.allowedTags = o(r.filter.tagFiltering.allowedTags.map((e => e.toLowerCase())))),
                r.filter.tagFiltering.blacklistedTags && (r.filter.tagFiltering.blacklistedTags = o(r.filter.tagFiltering.blacklistedTags.map((e => e.toLowerCase()))))),
                r.filter.mediaIndexes && (r.filter.mediaIndexes.allowed && (r.filter.mediaIndexes.allowed = o(r.filter.mediaIndexes.allowed)),
                r.filter.mediaIndexes.blacklisted && (r.filter.mediaIndexes.blacklisted = o(r.filter.mediaIndexes.blacklisted))));
                const a = Object.keys(i);
                l.debug(`[CFG.UPDATE] Updated keys: ${a.join(", ")}`);
                try {
                    const d = a.some((e => /^(appearance|thumbnailSettings|iconSettings|displayLabels|useAsLabel|animations)/.test(e)))
                        , u = a.some((e => /^(filter|includeContent|searchSettings|fuse|behavior|googleSheets|businessData)/.test(e)));
                    d && (I && I(),
                    B && B()),
                    u && ("function" == typeof _rebuildIndex ? _rebuildIndex() : l?.debug?.("Reindex deferred; initializeSearch not completed yet."),
                    "string" == typeof e && e.trim() && n && n(e)),
                        l.info("Config patch applied without re-init", {
                            styleTouch: d,
                            indexTouch: u,
                            changedKeys: a
                        })
                } catch (g) {
                    l.warn("updateConfig post-merge apply failed; falling back to re-init", g),
                    window.tourInstance && "function" == typeof initializeSearch && initializeSearch(window.tourInstance)
                }
                return this.getConfig()
            } catch (h) {
                return _log("error", "Error updating configuration:", h),
                    this.getConfig()
            }
        },
        getConfig: function() {
            try {
                return JSON.parse(JSON.stringify(r))
            } catch (e) {
                return l.error("Error getting configuration:", e),
                    {}
            }
        },
        searchHistory: {
            get: () => [],
            clear: () => !0,
            save: e => !0
        },
        setLogLevel: e => l.setLevel(e),
        utils: {
            debounce: p,
            getElementType: v,
            triggerElement: E,
            normalizeImagePath: f,
            makeSizePxString: function(e) {
                if (null == e || "" === e)
                    return "0px";
                if ("string" == typeof e) {
                    if (/^\d+(\.\d+)?(%|px|em|rem|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/.test(e))
                        return e;
                    const t = parseFloat(e);
                    return isNaN(t) ? "0px" : `${t}px`
                }
                return "number" == typeof e ? `${e}px` : "0px"
            },
            imageUtils: {
                getImageExtension: function(e) {
                    if (!e)
                        return "";
                    const t = e.match(/\.([^.]+)$/);
                    return t ? t[1].toLowerCase() : ""
                },
                isImagePath: function(e) {
                    if (!e)
                        return !1;
                    const t = this.getImageExtension(e);
                    return ["jpg", "jpeg", "png", "gif", "webp"].includes(t)
                },
                getAlternateFormat: function(e) {
                    if (!e)
                        return "";
                    const t = this.getImageExtension(e);
                    return "jpg" === t || "jpeg" === t ? e.replace(/\.(jpg|jpeg)$/i, ".png") : "png" === t ? e.replace(/\.png$/i, ".jpg") : ""
                }
            }
        },
        _getGoogleSheetsData: function() {
            return g || []
        },
        _getBusinessData: function() {
            return u || []
        },
        getSearchIndex: function() {
            return t && t._docs || []
        },
        findBusinessMatch: function(e) {
            return T(e)
        }
    }
}(),
    window.searchFunctions = {
        ...window.tourSearchFunctions,
        getConfig: window.tourSearchFunctions.getConfig,
        updateConfig: window.tourSearchFunctions.updateConfig
    },
    document.addEventListener("DOMContentLoaded", (function() {
            setTimeout((function() {
                    window.Logger && "function" == typeof window.Logger.debug || (console.warn("[Search] Logger not properly initialized, using console fallback"),
                            window.Logger = window.Logger || {},
                        void 0 === window.Logger.level && (window.Logger.level = 0),
                            window.Logger.debug = window.Logger.debug || function(e) {
                                if (!(window.Logger.level > 0))
                                    if (arguments.length > 1) {
                                        var t = Array.prototype.slice.call(arguments, 1);
                                        console.debug("[Search] DEBUG:", e, t)
                                    } else
                                        console.debug("[Search] DEBUG:", e)
                            }
                            ,
                            window.Logger.info = window.Logger.info || function(e) {
                                if (!(window.Logger.level > 1))
                                    if (arguments.length > 1) {
                                        var t = Array.prototype.slice.call(arguments, 1);
                                        console.info("[Search] INFO:", e, t)
                                    } else
                                        console.info("[Search] INFO:", e)
                            }
                            ,
                            window.Logger.warn = window.Logger.warn || function(e) {
                                if (!(window.Logger.level > 2))
                                    if (arguments.length > 1) {
                                        var t = Array.prototype.slice.call(arguments, 1);
                                        console.warn("[Search] WARN:", e, t)
                                    } else
                                        console.warn("[Search] WARN:", e)
                            }
                            ,
                            window.Logger.error = window.Logger.error || function(e) {
                                if (!(window.Logger.level > 3))
                                    if (arguments.length > 1) {
                                        var t = Array.prototype.slice.call(arguments, 1);
                                        console.error("[Search] ERROR:", e, t)
                                    } else
                                        console.error("[Search] ERROR:", e)
                            }
                    );
                    const e = document.getElementById("searchContainer");
                    if (!e || window.searchFunctions && window.searchFunctions.elements.container || (Logger.debug("[Search] Found existing searchContainer in DOM, updating element cache"),
                    window.searchFunctions && window.searchFunctions.elements && (window.searchFunctions.elements.container = e,
                        window.searchFunctions.elements.input = e.querySelector("#tourSearch"),
                        window.searchFunctions.elements.results = e.querySelector(".search-results"),
                        window.searchFunctions.elements.clearButton = e.querySelector(".clear-button"),
                        window.searchFunctions.elements.searchIcon = e.querySelector(".search-icon"))),
                        window.searchFunctions) {
                        window.searchFunctions.updateConfig({
                            autoHide: {
                                mobile: !1,
                                desktop: !1
                            },
                            mobileBreakpoint: 768,
                            minSearchChars: 2,
                            showTagsInResults: !0,
                            elementTriggering: {
                                initialDelay: 300,
                                maxRetries: 3,
                                retryInterval: 300,
                                maxRetryInterval: 1e3,
                                baseRetryInterval: 300
                            },
                            searchBar: {
                                placeholder: "Search... Type * for all",
                                width: 350,
                                position: {
                                    top: 70,
                                    right: 70,
                                    left: null,
                                    bottom: null
                                },
                                useResponsive: !0,
                                mobilePosition: {
                                    top: 60,
                                    left: 20,
                                    right: 20,
                                    bottom: "auto"
                                },
                                mobileOverrides: {
                                    enabled: !0,
                                    breakpoint: 768,
                                    width: "90%",
                                    maxWidth: 350,
                                    visibility: {
                                        behavior: "dynamic",
                                        showOnScroll: !0,
                                        hideThreshold: 100
                                    }
                                }
                            },
                            appearance: {
                                searchField: {
                                    borderRadius: {
                                        topLeft: 35,
                                        topRight: 35,
                                        bottomRight: 35,
                                        bottomLeft: 35
                                    },
                                    typography: {
                                        fontSize: "16px",
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
                                        fontWeight: "400",
                                        fontStyle: "normal",
                                        lineHeight: "1.5",
                                        letterSpacing: "0px",
                                        textTransform: "none",
                                        placeholder: {
                                            fontSize: "16px",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
                                            fontWeight: "400",
                                            fontStyle: "italic",
                                            opacity: .7,
                                            letterSpacing: "0px",
                                            textTransform: "none"
                                        },
                                        focus: {
                                            fontSize: "16px",
                                            fontWeight: "400",
                                            letterSpacing: "0.25px"
                                        }
                                    }
                                },
                                searchResults: {
                                    borderRadius: {
                                        topLeft: 5,
                                        topRight: 5,
                                        bottomRight: 5,
                                        bottomLeft: 5
                                    }
                                },
                                colors: {
                                    searchBackground: "#f4f3f2",
                                    searchText: "#1a1a1a",
                                    placeholderText: "#94a3b8",
                                    searchIcon: "#94a3b8",
                                    clearIcon: "#94a3b8",
                                    resultsBackground: "#ffffff",
                                    groupHeaderBackground: "#ffffff",
                                    groupHeaderColor: "#20293A",
                                    groupCountColor: "#94a3b8",
                                    resultHover: "#f0f0f0",
                                    resultBorderLeft: "#ebebeb",
                                    resultText: "#1e293b",
                                    resultSubtitle: "#64748b",
                                    resultIconColor: "#6e85f7",
                                    resultSubtextColor: "#000000",
                                    tagBackground: "#e0f2fe",
                                    tagText: "#0369a1",
                                    tagBorder: "#0891b2",
                                    highlightBackground: "#ffff00",
                                    highlightBackgroundOpacity: .5,
                                    highlightText: "#000000",
                                    highlightWeight: "bold"
                                },
                                tags: {
                                    borderRadius: 16,
                                    fontSize: "11px",
                                    padding: "3px 10px",
                                    margin: "2px",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                    showBorder: !0,
                                    borderWidth: "1px"
                                }
                            },
                            thumbnailSettings: {
                                enableThumbnails: !1,
                                thumbnailSize: "48px",
                                borderRadius: 4,
                                borderColor: "#9CBBFF",
                                borderWidth: 4,
                                defaultImagePath: "assets/default-thumbnail.jpg",
                                defaultImages: {
                                    Panorama: "assets/default-thumbnail.jpg",
                                    Hotspot: "assets/hotspot-default.jpg",
                                    Polygon: "assets/polygon-default.jpg",
                                    Video: "assets/video-default.jpg",
                                    Webframe: "assets/webframe-default.jpg",
                                    Image: "assets/image-default.jpg",
                                    Text: "assets/text-default.jpg",
                                    ProjectedImage: "assets/projected-image-default.jpg",
                                    Element: "assets/element-default.jpg",
                                    Business: "assets/business-default.jpg",
                                    "3DModel": "assets/3d-model-default.jpg",
                                    "3DHotspot": "assets/3d-hotspot-default.jpg",
                                    "3DModelObject": "assets/3d-model-object-default.jpg",
                                    default: "assets/default-thumbnail.jpg"
                                },
                                iconSettings: {
                                    enableCustomIcons: !1,
                                    enableFontAwesome: !1,
                                    fontAwesomeUrl: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
                                    iconSize: "48px",
                                    iconColor: "#3b82f6",
                                    iconOpacity: .9,
                                    iconAlignment: "left",
                                    iconMargin: 12,
                                    iconBorderRadius: 6,
                                    enableIconHover: !0,
                                    iconHoverScale: 1.15,
                                    iconHoverOpacity: 1,
                                    customIcons: {
                                        Panorama: "fas fa-home",
                                        Hotspot: "fas fa-laptop",
                                        Polygon: "fas fa-diamond",
                                        Video: "fas fa-video",
                                        Webframe: "fas fa-laptop",
                                        Image: "fas fa-image",
                                        Text: "fas fa-file-alt",
                                        ProjectedImage: "fas fa-desktop",
                                        Element: "fas fa-circle",
                                        Business: "fas fa-building",
                                        "3DHotspot": "fas fa-gamepad",
                                        Container: "fas fa-window-restore",
                                        "3DModel": "fas fa-cube",
                                        "3DModelObject": "fas fa-wrench",
                                        default: "fas fa-circle"
                                    },
                                    showIconFor: {
                                        panorama: !0,
                                        hotspot: !0,
                                        polygon: !0,
                                        video: !0,
                                        webframe: !0,
                                        image: !0,
                                        text: !0,
                                        projectedImage: !0,
                                        element: !0,
                                        business: !0,
                                        "3dmodel": !0,
                                        "3dhotspot": !0,
                                        "3dmodelobject": !0,
                                        container: !0,
                                        other: !0
                                    },
                                    fallbackSettings: {
                                        useDefaultOnError: !0,
                                        hideIconOnError: !1,
                                        showTypeLabel: !1
                                    }
                                },
                                groupHeaderAlignment: "left",
                                groupHeaderPosition: "top",
                                showFor: {
                                    panorama: !0,
                                    hotspot: !0,
                                    polygon: !0,
                                    video: !0,
                                    webframe: !0,
                                    image: !0,
                                    text: !0,
                                    projectedImage: !0,
                                    element: !0,
                                    business: !0,
                                    container: !0,
                                    "3dmodel": !0,
                                    "3dhotspot": !0,
                                    "3dmodelobject": !0,
                                    other: !0
                                }
                            },
                            display: {
                                showGroupHeaders: !0,
                                showGroupCount: !0,
                                showIconsInResults: !0,
                                showSubtitlesInResults: !0,
                                showParentInfo: !0
                            },
                            displayLabels: {
                                Panorama: "Panorama",
                                Hotspot: "Hotspot",
                                Polygon: "Polygon",
                                Video: "Video",
                                Webframe: "Webframe",
                                Image: "Image",
                                Text: "Text",
                                ProjectedImage: "Projected Image",
                                Element: "Element",
                                Business: "Business",
                                "3DHotspot": "3D Hotspot",
                                "3DModel": "3D Model",
                                "3DModelObject": "3D Model Object",
                                Container: "Container"
                            },
                            useAsLabel: {
                                subtitles: !0,
                                tags: !0,
                                elementType: !1,
                                parentWithType: !1,
                                customText: "[Unnamed Item]"
                            },
                            includeContent: {
                                unlabeledWithSubtitles: !0,
                                unlabeledWithTags: !0,
                                completelyBlank: !0,
                                elements: {
                                    includePanoramas: !0,
                                    includeHotspots: !0,
                                    includePolygons: !0,
                                    includeVideos: !0,
                                    includeWebframes: !0,
                                    includeImages: !0,
                                    includeText: !0,
                                    includeProjectedImages: !0,
                                    include3DHotspots: !0,
                                    include3DModels: !0,
                                    include3DModelObjects: !0,
                                    includeBusiness: !0,
                                    includeContainers: !0,
                                    skipEmptyLabels: !0,
                                    minLabelLength: 0
                                },
                                containerSearch: {
                                    enableContainerSearch: !0,
                                    containerNames: [""]
                                }
                            },
                            filter: {
                                mode: "none",
                                allowedValues: [""],
                                blacklistedValues: [""],
                                valueMatchMode: {
                                    whitelist: "exact",
                                    blacklist: "contains"
                                },
                                mediaIndexes: {
                                    mode: "none",
                                    allowed: [""],
                                    blacklisted: [""]
                                },
                                elementTypes: {
                                    mode: "none",
                                    allowedTypes: [""],
                                    blacklistedTypes: [""]
                                },
                                elementLabels: {
                                    mode: "none",
                                    allowedValues: [""],
                                    blacklistedValues: [""]
                                },
                                tagFiltering: {
                                    mode: "none",
                                    allowedTags: [""],
                                    blacklistedTags: [""]
                                }
                            },
                            animations: {
                                enabled: !1,
                                duration: {
                                    fast: 600,
                                    normal: 800,
                                    slow: 1200
                                },
                                easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                                searchBar: {
                                    openDuration: 700,
                                    closeDuration: 500,
                                    scaleEffect: !0
                                },
                                results: {
                                    fadeInDuration: 600,
                                    slideDistance: 25,
                                    staggerDelay: 150
                                },
                                reducedMotion: {
                                    respectPreference: !1,
                                    fallbackDuration: 80
                                }
                            },
                            searchSettings: {
                                fieldWeights: {
                                    label: 1,
                                    businessName: .9,
                                    subtitle: .8,
                                    businessTag: 1,
                                    tags: .6,
                                    parentLabel: .3
                                },
                                behavior: {
                                    threshold: .4,
                                    distance: 40,
                                    minMatchCharLength: 1,
                                    useExtendedSearch: !0,
                                    ignoreLocation: !0,
                                    includeScore: !0
                                },
                                boostValues: {
                                    businessMatch: 2,
                                    sheetsMatch: 2.5,
                                    labeledItem: 1.5,
                                    unlabeledItem: 1,
                                    childElement: .8
                                }
                            },
                            businessData: {
                                useBusinessData: !1,
                                replaceTourData: !1,
                                includeStandaloneEntries: !1,
                                businessDataFile: "business.json",
                                businessDataDir: "business-data",
                                matchField: "id",
                                businessDataUrl: ""
                            },
                            googleSheets: {
                                useGoogleSheetData: !1,
                                includeStandaloneEntries: !1,
                                useAsDataSource: !1,
                                fetchMode: "csv",
                                googleSheetUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrQ9oy4JjwYAdTG1DKne9cu76PZCrZgtIOCX56sxVoBwRzys36mTqvFMvTE2TB-f-k5yZz_uWwW5Ou/pub?output=csv",
                                useLocalCSV: !1,
                                localCSVFile: "search-data.csv",
                                localCSVDir: "business-data",
                                localCSVUrl: "",
                                csvOptions: {
                                    header: !0,
                                    skipEmptyLines: !0,
                                    dynamicTyping: !0
                                },
                                caching: {
                                    enabled: !1,
                                    timeoutMinutes: 60,
                                    storageKey: "tourGoogleSheetsData"
                                }
                            }
                        }),
                            console.log("Thumbnail settings:", window.searchFunctions.getConfig().thumbnailSettings),
                            Logger.debug("[DEBUG] Google Sheets Config Applied:", window.searchFunctions.getConfig().googleSheets),
                        window.tourInstance && (Logger.info("[GOOGLE SHEETS] Reinitializing search with updated config"),
                            window.searchFunctions.initializeSearch(window.tourInstance))
                    }
                    setInterval((function() {
                            try {
                                const e = localStorage.getItem("searchProLiveConfig")
                                    , t = localStorage.getItem("searchProConfigUpdate")
                                    , n = Object.keys(localStorage).filter((e => e.includes("searchPro")));
                                if (console.log("🔍 ALL SEARCH KEYS in localStorage:", n),
                                    console.log("🔍 LIVE CONFIG CHECK:", {
                                        hasLiveConfig: !!e,
                                        configSize: e?.length,
                                        timestamp: t,
                                        configPreview: e ? e.substring(0, 100) + "..." : "none"
                                    }),
                                    e) {
                                    const t = JSON.parse(e);
                                    console.log("🔍 LIVE CONFIG: Parsed config thumbnails:", {
                                        enableThumbnails: t.thumbnailSettings?.enableThumbnails,
                                        defaultImages: t.thumbnailSettings?.defaultImages,
                                        showFor: t.thumbnailSettings?.showFor
                                    });
                                    const n = localStorage.getItem("searchProLastAppliedConfig")
                                        , o = JSON.stringify(t);
                                    console.log("🔍 LIVE CONFIG: Hash comparison:", {
                                        newHash: o.substring(0, 50) + "...",
                                        lastHash: n?.substring(0, 50) + "...",
                                        isNew: n !== o
                                    }),
                                        n !== o ? (console.log("🎯 SEARCH ENGINE: Found NEW live config in localStorage:", {
                                            hasConfig: !!t,
                                            hasAppearance: !!t.appearance,
                                            hasSearchField: !!t.appearance?.searchField,
                                            hasTypography: !!t.appearance?.searchField?.typography,
                                            typographyStructure: t.appearance?.searchField?.typography
                                        }),
                                        window.searchFunctions && window.searchFunctions.updateConfig && (window.searchFunctions.updateConfig(t),
                                            console.log("🎯 SEARCH ENGINE: Applied NEW live configuration from control panel"),
                                            localStorage.setItem("searchProLastAppliedConfig", o),
                                            function() {
                                                const e = document.createElement("div");
                                                e.className = "config-notification",
                                                    e.style.bottom = "60px",
                                                    e.style.top = "auto";
                                                const t = document.createElement("div");
                                                t.className = "config-notification-checkmark",
                                                    t.innerHTML = '\n    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">\n        <path d="M20 6L9 17l-5-5"/>\n    </svg>\n  ',
                                                    e.appendChild(t),
                                                    e.appendChild(document.createTextNode("Search settings updated from control panel")),
                                                    document.body.appendChild(e),
                                                    setTimeout(( () => {
                                                            e.classList.add("fadeout"),
                                                                setTimeout(( () => {
                                                                        e.remove()
                                                                    }
                                                                ), 400)
                                                        }
                                                    ), 3e3)
                                            }())) : console.log("🎯 SEARCH ENGINE: Config unchanged, skipping reapplication")
                                }
                            } catch (e) {
                                console.error("[Search Plugin] Failed to apply live configuration:", e)
                            }
                        }
                    ), 2e3)
                }
            ), 100)
        }
    )),
    console.log("🔥 CACHE BUST: Search engine reloaded at Sun Aug  3 11:34:37 PM UTC 2025");
