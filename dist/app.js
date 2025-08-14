import { d as defineComponent, c as createBlock, o as openBlock, w as withCtx, a as createBaseVNode, b as createApp } from "./main.js";
import { _ as _sfc_main$1 } from "./the-header.js";
import "./shared-button.js";
import "./card-xpto.js";
import "./me-icon.min.js";
import "./Badge.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_UApp = _sfc_main$1;
      return openBlock(), createBlock(_component_UApp, null, {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("the-header", null, null, -1)
        ])),
        _: 1,
        __: [0]
      });
    };
  }
});
const app = createApp(_sfc_main);
app.mount("#app");
