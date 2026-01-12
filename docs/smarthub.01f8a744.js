// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"dBODK":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "ccc6a54101f8a744";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"kTBnD":[function(require,module,exports,__globalThis) {
//import { RTC } from "./rtc";
console.warn(window.notificationEmail);
[
    'notificationEmail',
    'emailAPIService',
    'emailAPITemplate',
    'emailAPIKey'
].forEach((key)=>{
    if (window[key]) {
        console.warn(window[key]);
        if (localStorage.getItem(key)) window[key].value = localStorage.getItem(key);
        window[key].addEventListener('input', ()=>{
            localStorage.setItem(key, window[key].value);
        });
    }
});
// sendEmail();
//new RTC();
async function sendEmail(text, title) {
    // code fragment
    var data = {
        service_id: window.emailAPIService.value,
        template_id: window.emailAPITemplate.value,
        user_id: window.emailAPIKey.value,
        template_params: {
            'title': title || "\u041D\u0438\u0437\u043A\u0430\u044F \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430",
            'email': window.notificationEmail.value,
            'text': text
        }
    };
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    try {
        const result = await response.json();
        console.log(result);
    } catch (e) {}
}
//BLE values
var bluetoothDevice, gattServer, Theservice, writeCharacteristic;
var ServiceMain, writeCharacteristicSpeed, nitifiyCharTemp, time_char, enc_main, enc_10, enc_19;
//Firmware values
var firmwareArray = "", startTime = 0, blockCount = 0;
//Connection values
var state = 0, connectTrys = 0;
//Custom firmware
var customEnabled;
var settingsCharacteristics;
//Mi values
var miEnabled = false, miConnected = false, mode_activation;
let fw_version_value = "";
//Login values
var mi_random_key, mi_random_key_recv, mi_device_info_recv, mi_device_info_send, device_known_id, expected_device_infos, is_logged_in = false;
//Activation values
var keypair, is_activated, own_public_key, device_public_key, shared_key, derived_key, mi_write_did;
var device_new_id = "00626c742e332e31323976" + makeRandomID(6) + "415443";
function resetFileSelector() {
    document.getElementById("file").value = '';
}
let busy = false;
function resetVariables() {
    busy = false;
    gattServer = null;
    Theservice = null;
    writeCharacteristic = null;
    miConnected = false;
    is_logged_in = false;
    document.getElementById("known_id").value = '';
    document.getElementById("mi_token").value = '';
    document.getElementById("mi_bind_key").value = '';
    resetFileSelector();
}
function handleError(error) {
    addLog(error);
    resetVariables();
    if (connectTrys < 5) {
        connectTrys++;
        addLog("Reconnect " + connectTrys + " from " + 5);
        doConnect();
    } else {
        addLog("Something went wrong, to many reconnect's");
        connectTrys = 0;
    }
}
function onDisconnected() {
    addLog('Disconnected.');
}
function connect() {
    var deviceOptions = {
        optionalServices: [
            '00010203-0405-0607-0809-0a0b0c0d1912',
            'ebe0ccb0-7a0a-4b0c-8a1a-6ff2997da3a6',
            0xfe95,
            0x1f10
        ],
        acceptAllDevices: true
    };
    const hideUnknown = document.getElementById('hideUnknown').checked;
    const namePrefix = document.getElementById('namePrefix').value;
    if (hideUnknown) {
        deviceOptions.acceptAllDevices = false;
        deviceOptions.filters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz".split("").map((x)=>({
                namePrefix: x
            }));
    }
    if (namePrefix) {
        deviceOptions.acceptAllDevices = false;
        deviceOptions.filters = namePrefix.split(",").map((x)=>({
                namePrefix: x
            }));
    }
    console.log(deviceOptions);
    if (bluetoothDevice != null) bluetoothDevice.gatt.disconnect();
    resetVariables();
    addLog("Searching for devices");
    connectTrys = 0;
    navigator.bluetooth.requestDevice(deviceOptions).then((device)=>{
        bluetoothDevice = device;
        catchAdvertisement(device);
        bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
        addLog("Connecting to: " + bluetoothDevice.name);
        doConnect();
    }).catch(handleError);
}
window.connect = connect;
function catchAdvertisement(device) {
    const abortController = new AbortController();
    device.addEventListener('advertisementreceived', (event)=>{
        console.log('Received advertisement from "' + device.name + '"...');
        event.serviceData.forEach((valueDataView)=>{
            const buffer = new Uint8Array(valueDataView.buffer);
            console.log(buffer, device, event);
            if (device.name == 'LYWSD03MMC') {
                console.log('LYWSD03MMC MAC:', buffer[10].toString(16), buffer[9].toString(16), buffer[8].toString(16), buffer[7].toString(16), buffer[6].toString(16), buffer[5].toString(16));
                document.getElementById("MAC").innerHTML = 'LYWSD03MMC MAC: ' + buffer[10].toString(16) + buffer[9].toString(16) + buffer[8].toString(16) + buffer[7].toString(16) + buffer[6].toString(16) + buffer[5].toString(16);
            }
            if (device.name.startsWith('ATC')) {
                console.log('ATC MAC:', buffer[0].toString(16), buffer[1].toString(16), buffer[2].toString(16), buffer[3].toString(16), buffer[4].toString(16), buffer[5].toString(16));
                document.getElementById("MAC").innerHTML = 'ATC MAC: ' + buffer[0].toString(16) + buffer[1].toString(16) + buffer[2].toString(16) + buffer[3].toString(16) + buffer[4].toString(16) + buffer[5].toString(16);
            } else console.log('only LYWSD03MMC/ATC supported');
        });
        abortController.abort();
    }, {
        once: true
    });
}
let lastSentDate = +localStorage.getItem('lastSent');
function miAction() {
    gattServer.getPrimaryService('ebe0ccb0-7a0a-4b0c-8a1a-6ff2997da3a6').then((service)=>{
        addClog("Found Main service");
        ServiceMain = service;
        return ServiceMain.getCharacteristic('ebe0ccd8-7a0a-4b0c-8a1a-6ff2997da3a6');
    }).then((characteristic)=>{
        addClog("Found Write characteristic Speed");
        writeCharacteristicSpeed = characteristic;
        return ServiceMain.getCharacteristic('ebe0ccc1-7a0a-4b0c-8a1a-6ff2997da3a6');
    }).then((characteristic)=>{
        addClog('Found Temp characteristic');
        nitifiyCharTemp = characteristic;
        return nitifiyCharTemp.startNotifications().then(()=>{
            nitifiyCharTemp.addEventListener('characteristicvaluechanged', (event)=>{
                var value = event.target.value;
                var sign = value.getUint8(1) & 128;
                var temp = (value.getUint8(1) & 0x7F) << 8 | value.getUint8(0);
                if (sign) temp = temp - 32767;
                temp = temp / 100;
                var hum = value.getUint8(2);
                if (temp < parseFloat(window.tempThreshold.value) && Date.now() - lastSentDate > 7200000) {
                    console.warn('sent email');
                    lastSentDate = Date.now();
                    localStorage.setItem('lastSent', lastSentDate);
                    sendEmail(temp + "\xb0C");
                } else if (window.notificationSchedule.checked && Date.now() - lastSentDate > 21600000) {
                    console.warn('sent email');
                    lastSentDate = Date.now();
                    localStorage.setItem('lastSent', lastSentDate);
                    sendEmail(temp + "\xb0C", "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430");
                }
                var tempTempString = "Temp/Humi: " + temp + "\xb0C / " + hum + "%";
                document.getElementById("tempHumiData").innerHTML = tempTempString;
                addClog(tempTempString);
            });
            miAuthorization();
        });
    }).catch(handleError);
}
function customAction() {
    gattServer.getPrimaryService('00001f10-0000-1000-8000-00805f9b34fb').then((service)=>{
        addClog("Found custom Main service");
        ServiceMain = service;
        return ServiceMain.getCharacteristic('00001f1f-0000-1000-8000-00805f9b34fb');
    }).then((characteristic)=>{
        addClog("Found custom write characteristic");
        settingsCharacteristics = characteristic;
    }).catch(handleError);
}
function miAuthorization() {
    gattServer.getPrimaryService(0xfe95).then((service)=>{
        addClog("Found Main service");
        enc_main = service;
        return enc_main.getCharacteristic(0x0010);
    }).then((characteristic)=>{
        addClog("Found enc_10 char");
        enc_10 = characteristic;
        return enc_main.getCharacteristic(0x0004);
    }).then((characteristic)=>{
        addClog("Found enc_04 char");
        return characteristic.readValue();
    }).then((fw_version)=>{
        fw_version_value = hex2ascii(bytesToHex(fw_version.buffer));
        addLog('Fw_version: ' + fw_version_value);
        return enc_main.getCharacteristic(0x0019);
    }).then((characteristic)=>{
        addClog('Found enc_19 char');
        enc_19 = characteristic;
        miConnected = true;
        return enc_10.startNotifications().then(()=>{
            enc_10.addEventListener('characteristicvaluechanged', (event)=>{
                var value = bytesToHex(event.target.value.buffer);
                addClog("Enc_10: " + value);
                if (value == "12000000") addLog("Activation Failed!");
                else if (value == "11000000") {
                    addLog("Activation successfull");
                    sendLogin();
                }
                if (value == "23000000") addLog("Login Failed!");
                else if (value == "21000000") {
                    is_logged_in = true;
                    addLog("Login successfull");
                }
            });
        }).then((characteristic)=>{
            return enc_19.startNotifications().then(()=>{
                enc_19.addEventListener('characteristicvaluechanged', (event)=>{
                    var value = bytesToHex(event.target.value.buffer);
                    addClog("Enc_19: " + value);
                    if (mode_activation == 1) {
                        if (value == "000000000100") {
                            is_activated = false;
                            mainCharSend("00000101", enc_19);
                        } else if (value == "000000000200") {
                            is_activated = true;
                            mainCharSend("00000101", enc_19);
                        } else if (is_activated == true && state == 0 && value.substring(0, 4) == "0100") device_known_id = value.substring(4);
                        else if (is_activated == true && state == 0 && value.substring(0, 4) == "0200") {
                            device_known_id += value.substring(4);
                            device_new_id = device_known_id.substring(8);
                            document.getElementById("known_id").value = hex2ascii(device_known_id.substring(10));
                            mainCharSend("00000100", enc_19).then(function(character) {
                                mainCharSend("15000000", enc_10).then(function(character) {
                                    mainCharSend("000000030400", enc_19);
                                    state = 1;
                                }).catch(function(err) {
                                    updateFail(err);
                                });
                            }).catch(function(err) {
                                updateFail(err);
                            });
                        } else if (value == "010001000000") mainCharSend("00000100", enc_19).then(function(character) {
                            mainCharSend("15000000", enc_10).then(function(character) {
                                mainCharSend("000000030400", enc_19);
                                state = 1;
                            }).catch(function(err) {
                                updateFail(err);
                            });
                        }).catch(function(err) {
                            updateFail(err);
                        });
                        else if (state == 1 && value == "00000101") {
                            state = 2;
                            mainCharSend("0100" + own_public_key.substring(2, 38), enc_19).then(function(character) {
                                mainCharSend("0200" + own_public_key.substring(38, 74), enc_19).then(function(character) {
                                    mainCharSend("0300" + own_public_key.substring(74, 110), enc_19).then(function(character) {
                                        mainCharSend("0400" + own_public_key.substring(110, 146), enc_19);
                                    }).catch(function(err) {
                                        updateFail(err);
                                    });
                                }).catch(function(err) {
                                    updateFail(err);
                                });
                            }).catch(function(err) {
                                updateFail(err);
                            });
                        } else if (value == "000000030400") mainCharSend("00000101", enc_19);
                        else if (state == 2 && value.substring(0, 4) == "0100") device_public_key = "04" + value.substring(4);
                        else if (state == 2 && value.substring(0, 4) == "0200") device_public_key += value.substring(4);
                        else if (state == 2 && value.substring(0, 4) == "0300") device_public_key += value.substring(4);
                        else if (state == 2 && value.substring(0, 4) == "0400") {
                            device_public_key += value.substring(4);
                            mainCharSend("00000100", enc_19).then(function(character) {
                                makeSharedKey();
                            }).catch(function(err) {
                                updateFail(err);
                            });
                        } else if (state == 2 && value == "00000101") {
                            state = 3;
                            mainCharSend("0100" + mi_write_did.substring(0, 36), enc_19).then(function(character) {
                                mainCharSend("0200" + mi_write_did.substring(36, 72), enc_19);
                            }).catch(function(err) {
                                updateFail(err);
                            });
                        } else if (state == 3 && value == "00000100") {
                            state = 0;
                            mainCharSend("13000000", enc_10);
                        } else if (value == "000001050100") addLog("Received Timeout from device");
                        else if (value == "12000000") addLog("Register Failed!");
                        else if (value == "11000000") addLog("Register successfull");
                    } else {
                        if (state == 0 && value == "00000101") {
                            state = 1;
                            mainCharSend("0100" + mi_random_key, enc_19);
                        } else if (state == 1 && value == "0000000d0100") {
                            state = 2;
                            mainCharSend("00000101", enc_19);
                        } else if (state == 2 && value.substring(0, 4) == "0100") {
                            state = 3;
                            mi_random_key_recv = value.substring(4);
                            do_login_generate();
                        } else if (state == 3 && value == "0000000c0200") {
                            state = 4;
                            mainCharSend("00000101", enc_19);
                        } else if (state == 4 && value.substring(0, 4) == "0100") {
                            state = 5;
                            mi_device_info_recv = value.substring(4);
                        } else if (state == 5 && value.substring(0, 4) == "0200") {
                            state = 6;
                            mi_device_info_recv += value.substring(4);
                            if (expected_device_infos == mi_device_info_recv) addLog("Received device infos are correct");
                            else addLog("Received device infos are not correct");
                            mainCharSend("00000100", enc_19).then(function(character) {
                                mainCharSend("0000000a0200", enc_19);
                            });
                        } else if (state == 6 && value == "00000101") {
                            state = 7;
                            mainCharSend("0100" + mi_device_info_send.substring(0, 36), enc_19).then(function(character) {
                                mainCharSend("0200" + mi_device_info_send.substring(36, 72), enc_19);
                            }).catch(function(err) {
                                updateFail(err);
                            });
                        }
                    }
                });
                addLog("Connected");
                if (fw_version_value == "2.1.1_0159") setStatus('Connected, the current Firmware needs you to supply the Mi Token and Bind key and do a Login to flash the Exploit Firmware!!!<br><p style="color: red;">ATTENTION Make sure to flash this <a href="https://github.com/atc1441/ATC_MiThermometer/blob/master/Stock_fw_2.1.1_0159.bin">2.1.1_0159</a> firmware before flashing the exploit.<br>There are different stock firmware versions even with the same numbering!</p>');
                else setStatus("Connected, you can now Do the Activation to either get the Token or flash a new Firmware");
            });
        });
    }).catch(handleError);
}
function doConnect() {
    bluetoothDevice.gatt.connect().then((server)=>{
        addClog("Found GATT server");
        gattServer = server;
        return gattServer.getPrimaryService('00010203-0405-0607-0809-0a0b0c0d1912');
    }).then((service)=>{
        addClog("Found service");
        Theservice = service;
        return Theservice.getCharacteristic('00010203-0405-0607-0809-0a0b0c0d2b12');
    }).then((characteristic)=>{
        addClog("Found write characteristic");
        writeCharacteristic = characteristic;
        detectMi();
    }).catch(handleError);
}
function detectMi() {
    gattServer.getPrimaryServices().then((services)=>{
        miEnabled = false;
        customEnabled = false;
        for(var i = 0; i < services.length; i++){
            console.log("Services: " + services[i].uuid);
            if (services[i].uuid == "ebe0ccb0-7a0a-4b0c-8a1a-6ff2997da3a6") miEnabled = true;
            if (services[i].uuid == "00001f10-0000-1000-8000-00805f9b34fb") customEnabled = true;
        }
        if (miEnabled) {
            addLog("Detected Mi Thermometer");
            setStatus("Detected Mi Thermometer");
            miAction();
        } else if (customEnabled) {
            addLog("Detected custom Firmware");
            setStatus("Detected custom Firmware");
            customAction();
        } else {
            addLog("Connected");
            setStatus("Connected");
        }
    }).catch(handleError);
}
function reConnect() {
    if (bluetoothDevice != null) bluetoothDevice.gatt.disconnect();
    resetVariables();
    addLog("Reconnect");
    connectTrys = 0;
    doConnect();
}
function startDFU() {
    addLog("Start DFU");
    if (miConnected == true && is_logged_in == false) {
        addLog("Please do the Activation first");
        return;
    }
    updateBegin();
}
function sendBLEdata(data) {
    addLog(data);
}
function send10(data) {
    mainCharSend(data, enc_10);
}
function send19(data) {
    mainCharSend(data, enc_19);
}
function sendRegister() {
    if (miConnected == false) {
        addLog("Not connected");
        return;
    }
    addLog("Activating now, please wait...");
    state = 0;
    mode_activation = 1;
    doGenerate();
    mainCharSend("a2000000", enc_10);
}
function sendLogin() {
    mi_random_key = bytesToHex(window.crypto.getRandomValues(new Uint8Array(16)));
    state = 0;
    mode_activation = 0;
    mainCharSend("24000000", enc_10).then(function(character) {
        mainCharSend("0000000b0100", enc_19);
    }).catch(function(err) {
        updateFail(err);
    });
}
function addLog(logTXT) {
    var time = new Date().toLocaleTimeString("de-DE");
    var logString = time + ": " + logTXT;
    document.getElementById("log").innerHTML += logString + "<br>";
}
function addClog(logTXT) {
    console.log(logTXT);
}
function clearLog() {
    document.getElementById("log").innerHTML = "Log:<br>";
}
function setStatus(status) {
    addClog("Status: " + status);
    document.getElementById("percent").innerHTML = "Status: " + status;
}
function updateFail(err) {
    addLog("Update error: " + err);
    setStatus("Update error: " + err);
}
function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    while(hex.length < 4)hex = "0" + hex;
    return hex;
}
function hexToBytes(hex) {
    for(var bytes = [], c = 0; c < hex.length; c += 2)bytes.push(parseInt(hex.substr(c, 2), 16));
    return new Uint8Array(bytes);
}
function bytesToHex(data) {
    return new Uint8Array(data).reduce(function(memo, i) {
        return memo + ("0" + i.toString(16)).slice(-2);
    }, "");
}
function makeRandomID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for(var i = 0; i < length; i++)result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return bytesToHex(new TextEncoder("utf-8").encode(result));
}
function crc16_modbus(buffer) {
    var crc = 0xFFFF;
    var odd;
    for(var i = 0; i < buffer.length; i++){
        crc = crc ^ buffer[i];
        for(var j = 0; j < 8; j++){
            odd = crc & 0x0001;
            crc = crc >> 1;
            if (odd) crc = crc ^ 0xA001;
        }
    }
    return crc;
}
function hex2ascii(hexx) {
    var hex = hexx.toString();
    var str = '';
    for(var i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2)str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
window.onload = function() {
    document.querySelector("#file").addEventListener("change", function() {
        var reader = new FileReader();
        reader.onload = function() {
            firmwareArray = bytesToHex(this.result);
            if (firmwareArray.substring(16, 24) != "4b4e4c54") {
                alert("Select file is no telink firmware .bin");
                addLog("Select file is no telink firmware .bin");
                blockCount = 0;
                firmwareArray = "";
                return;
            }
            addLog("File was selected, size: " + firmwareArray.length / 2 + " bytes");
            if (firmwareArray.length % 32 !== 0) {
                var padHex = "ffffffffffffffffffffffffffffffff";
                firmwareArray += padHex.substr(0, 32 - firmwareArray.length % 32);
            }
            blockCount = firmwareArray.length / 32;
            addLog("Count: " + blockCount);
        };
        if (this.files[0] != null) reader.readAsArrayBuffer(this.files[0]);
        else addLog("No file selected");
    }, false);
};
function updateBegin() {
    if (blockCount <= 0) {
        addLog("No file selected aborting");
        return;
    }
    if (miEnabled) mainCharSend("1e0000", writeCharacteristicSpeed); // this makes the upload faster
    setTimeout(function() {
        otaCharSend("00ff").then(function(character) {
            otaCharSend("01ff").then(function(character) {
                setTimeout(function() {
                    startTime = new Date().getTime();
                    sendOTAblock(0);
                }, 300);
            }).catch(function(err) {
                updateFail(err);
            });
        }).catch(function(err) {
            updateFail(err);
        });
    }, 500);
}
function sendOTAblock(blockNr) {
    if (blockNr >= blockCount) {
        sendLastOTA();
        return;
    }
    setStatus("Sending block nr: " + blockNr + " from " + blockCount + ", " + Math.floor(blockNr / (blockCount * 1.0) * 100) + "% done, time since start " + (new Date().getTime() - startTime) / 1000.0 + "s");
    var blockNrString = getHexBLockCount(blockNr);
    var blockString = blockNrString + firmwareArray.substring(blockNr * 32, blockNr * 32 + 32);
    var blockCRC = getHexCRC(blockString);
    otaCharSend(blockString + blockCRC).then(function(character) {
        setTimeout(function() {
            if ((blockNr + 1) % 8 == 0) writeCharacteristic.readValue().then(function(result) {
                addClog('reading OTA');
                sendOTAblock(blockNr + 1);
            }).catch(function(err) {
                updateFail(err);
            });
            else sendOTAblock(blockNr + 1);
        }, 0);
    }).catch(function(err) {
        updateFail(err);
    });
}
function getHexBLockCount(count) {
    var tempHEX = decimalToHex(count);
    return tempHEX.substring(2, 4) + tempHEX.substring(0, 2);
}
function getHexCRC(data) {
    var tempCRC = decimalToHex(crc16_modbus(hexToBytes(data)));
    return tempCRC.substring(2, 4) + tempCRC.substring(0, 2);
}
function sendLastOTA() {
    var data = "02ff" + getHexBLockCount(blockCount - 1) + getHexBLockCount(~(blockCount - 1) & 0xffff);
    otaCharSend(data).then(function(character) {
        addLog("Update done after " + (new Date().getTime() - startTime) / 1000 + " seconds");
        setStatus("Update done after " + (new Date().getTime() - startTime) / 1000 + " seconds");
    }).catch(function(err) {
        updateFail(err);
    });
}
var otaCharSend = function(data) {
    return new Promise(function(resolve, reject) {
        addClog("OTA: " + data);
        writeCharacteristic.writeValue(hexToBytes(data)).then(function(character) {
            resolve("ok");
        }).catch(function(err) {
            reject("some error while sending char data");
        });
    });
};
function sendCustomSetting(data) {
    mainCharSend(data, settingsCharacteristics).then(function() {
        addLog("Settings " + data + " was send successful");
    }).catch(function(err) {
        addLog("Error on sending setting " + data);
    });
}
var mainCharSend = function(data, characteristic) {
    return new Promise(function(resolve, reject) {
        addClog("Send: " + data);
        characteristic.writeValue(hexToBytes(data)).then(function(character) {
            resolve("ok");
        }).catch(function(err) {
            reject("some error while sending char data");
        });
    });
};
function doGenerate() {
    window.crypto.subtle.generateKey({
        name: 'ECDH',
        namedCurve: 'P-256'
    }, false, [
        'deriveKey',
        'deriveBits'
    ]).then((own_key)=>{
        keypair = own_key;
        return window.crypto.subtle.exportKey('raw', own_key.publicKey);
    }).then((ownPublicKeyExported)=>{
        own_public_key = bytesToHex(ownPublicKeyExported);
    }).catch((err)=>{
        addLog(err);
    });
}
function makeSharedKey() {
    window.crypto.subtle.importKey('raw', hexToBytes(device_public_key), {
        name: 'ECDH',
        namedCurve: 'P-256'
    }, true, []).then((device_key_imported)=>{
        return window.crypto.subtle.deriveBits({
            name: 'ECDH',
            namedCurve: 'P-256',
            public: device_key_imported
        }, keypair.privateKey, 256);
    }).then((sharedSecret)=>{
        shared_key = bytesToHex(sharedSecret);
        deriveTheKey();
    }).catch((err)=>{
        addLog(err);
    });
}
function deriveTheKey() {
    var derived_key = sjcl.codec.hex.fromBits(sjcl.misc.hkdf(sjcl.codec.hex.toBits(shared_key), 512, null, "mible-setup-info", sjcl.hash["sha256"]));
    document.getElementById("mi_token").value = derived_key.substring(0, 24);
    document.getElementById("mi_bind_key").value = derived_key.substring(24, 56);
    var mi_bind_A = derived_key.substring(56, 88);
    mi_write_did = sjcl.codec.hex.fromBits(sjcl.mode.ccm.encrypt(new sjcl.cipher.aes(sjcl.codec.hex.toBits(mi_bind_A)), sjcl.codec.hex.toBits(device_new_id), sjcl.codec.hex.toBits("101112131415161718191A1B"), sjcl.codec.hex.toBits("6465764944"), 32));
    mainCharSend("000000000200", enc_19);
}
function do_login_generate() {
    var salt = hexToBytes(mi_random_key + mi_random_key_recv);
    var salt1 = hexToBytes(mi_random_key_recv + mi_random_key);
    var derived_key = sjcl.codec.hex.fromBits(sjcl.misc.hkdf(sjcl.codec.hex.toBits(document.getElementById("mi_token").value), 512, sjcl.codec.hex.toBits(bytesToHex(salt)), "mible-login-info", sjcl.hash["sha256"]));
    expected_device_infos = sjcl.codec.hex.fromBits(new sjcl.misc.hmac(sjcl.codec.hex.toBits(derived_key.substring(0, 32))).mac(sjcl.codec.hex.toBits(bytesToHex(salt1))));
    mi_device_info_send = sjcl.codec.hex.fromBits(new sjcl.misc.hmac(sjcl.codec.hex.toBits(derived_key.substring(32, 64))).mac(sjcl.codec.hex.toBits(bytesToHex(salt))));
    mainCharSend("00000100", enc_19);
}
function decimalToHex00(d) {
    var hex = Number(d).toString(16);
    while(hex.length < 2)hex = "0" + hex;
    return hex;
}
function mapper_toggle() {
    var mapper_content_div = document.getElementById("mapper_content");
    var mapper_button = document.getElementById("mapper_toggle_button");
    if (mapper_content_div.style.display === "none") {
        mapper_content_div.style.display = "block";
        mapper_button.innerText = "Hide LCD Segment Mapper";
    } else {
        mapper_content_div.style.display = "none";
        mapper_button.innerText = "Show LCD Segment Mapper";
    }
}
function mapper_send() {
    var byte0 = 0;
    var byte1 = 0;
    var byte2 = 0;
    var byte3 = 0;
    var byte4 = 0;
    var byte5 = 0;
    if (document.getElementById("check00").checked) byte0 += 1;
    if (document.getElementById("check01").checked) byte0 += 2;
    if (document.getElementById("check02").checked) byte0 += 4;
    if (document.getElementById("check03").checked) byte0 += 8;
    if (document.getElementById("check04").checked) byte0 += 16;
    if (document.getElementById("check05").checked) byte0 += 32;
    if (document.getElementById("check06").checked) byte0 += 64;
    if (document.getElementById("check07").checked) byte0 += 128;
    if (document.getElementById("check10").checked) byte1 += 1;
    if (document.getElementById("check11").checked) byte1 += 2;
    if (document.getElementById("check12").checked) byte1 += 4;
    if (document.getElementById("check13").checked) byte1 += 8;
    if (document.getElementById("check14").checked) byte1 += 16;
    if (document.getElementById("check15").checked) byte1 += 32;
    if (document.getElementById("check16").checked) byte1 += 64;
    if (document.getElementById("check17").checked) byte1 += 128;
    if (document.getElementById("check20").checked) byte2 += 1;
    if (document.getElementById("check21").checked) byte2 += 2;
    if (document.getElementById("check22").checked) byte2 += 4;
    if (document.getElementById("check23").checked) byte2 += 8;
    if (document.getElementById("check24").checked) byte2 += 16;
    if (document.getElementById("check25").checked) byte2 += 32;
    if (document.getElementById("check26").checked) byte2 += 64;
    if (document.getElementById("check27").checked) byte2 += 128;
    if (document.getElementById("check30").checked) byte3 += 1;
    if (document.getElementById("check31").checked) byte3 += 2;
    if (document.getElementById("check32").checked) byte3 += 4;
    if (document.getElementById("check33").checked) byte3 += 8;
    if (document.getElementById("check34").checked) byte3 += 16;
    if (document.getElementById("check35").checked) byte3 += 32;
    if (document.getElementById("check36").checked) byte3 += 64;
    if (document.getElementById("check37").checked) byte3 += 128;
    if (document.getElementById("check40").checked) byte4 += 1;
    if (document.getElementById("check41").checked) byte4 += 2;
    if (document.getElementById("check42").checked) byte4 += 4;
    if (document.getElementById("check43").checked) byte4 += 8;
    if (document.getElementById("check44").checked) byte4 += 16;
    if (document.getElementById("check45").checked) byte4 += 32;
    if (document.getElementById("check46").checked) byte4 += 64;
    if (document.getElementById("check47").checked) byte4 += 128;
    if (document.getElementById("check50").checked) byte5 += 1;
    if (document.getElementById("check51").checked) byte5 += 2;
    if (document.getElementById("check52").checked) byte5 += 4;
    if (document.getElementById("check53").checked) byte5 += 8;
    if (document.getElementById("check54").checked) byte5 += 16;
    if (document.getElementById("check55").checked) byte5 += 32;
    if (document.getElementById("check56").checked) byte5 += 64;
    if (document.getElementById("check57").checked) byte5 += 128;
    var segment_bytes_to_send = "dd" + decimalToHex00(byte0) + decimalToHex00(byte1) + decimalToHex00(byte2) + decimalToHex00(byte3) + decimalToHex00(byte4) + decimalToHex00(byte5);
    addLog("Sending Segment bytes: " + segment_bytes_to_send);
    sendCustomSetting(segment_bytes_to_send);
}

},{}]},["dBODK","kTBnD"], "kTBnD", "parcelRequire2350", {})

//# sourceMappingURL=smarthub.01f8a744.js.map
