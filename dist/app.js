import { i as isFunction, c as createRenderer, a as isString, e as extend, b as isOn, d as isModelListener, f as isSpecialBooleanAttr, g as camelize, h as includeBooleanAttr, j as isSymbol, k as isArray$1, l as hyphenate, m as capitalize, n as callWithAsyncErrorHandling, o as createHooks, t as toValue, p as isRef, q as hasInjectionContext, r as inject, s as ref, w as watchEffect, u as onBeforeUnmount, v as onDeactivated, x as onActivated, y as getCurrentInstance, z as toRef$1, A as readonly, B as customRef, C as nextTick, D as watch, E as onMounted, F as getCurrentScope, G as onScopeDispose, H as computed, I as effectScope, J as reactive, K as unref, L as toRefs, M as shallowRef, N as defineComponent, O as h, P as defineNuxtPlugin, Q as useNuxtApp, R as useAppConfig, S as Fragment, T as Comment, U as mergeProps, V as cloneVNode, W as createBlock, X as openBlock, Y as withCtx, Z as renderSlot, _ as provide, $ as onUnmounted, a0 as toHandlerKey, a1 as createCommentVNode, a2 as Teleport, a3 as markRaw, a4 as createTextVNode, a5 as toDisplayString, a6 as createElementBlock, a7 as createVNode, a8 as normalizeProps$1, a9 as guardReactiveProps, aa as normalizeStyle, ab as useState, ac as Icon, ad as mergeModels, ae as useModel, af as tv, ag as normalizeClass, ah as resolveDynamicComponent, ai as useSlots, aj as renderList, ak as createBaseVNode, al as shallowReactive, am as useId } from "./shared-button.js";
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
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const CSS_VAR_TEXT = Symbol("");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    return fn(event, ...args);
  });
};
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const DupeableTags = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
const TagsWithInnerContent = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
const HasElementTags = /* @__PURE__ */ new Set([
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
const ValidHeadTags = /* @__PURE__ */ new Set([
  "title",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
const UniqueTags = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
const TagConfigKeys = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
const UsesMergeStrategy = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
const MetaTagsArrayable = /* @__PURE__ */ new Set([
  "theme-color",
  "google-site-verification",
  "og",
  "article",
  "book",
  "profile",
  "twitter",
  "author"
]);
const allowedMetaProperties = ["name", "property", "http-equiv"];
const StandardSingleMetaTags = /* @__PURE__ */ new Set([
  "viewport",
  "description",
  "keywords",
  "robots"
]);
function isMetaArrayDupeKey(v) {
  const parts = v.split(":");
  if (!parts.length)
    return false;
  return MetaTagsArrayable.has(parts[1]);
}
function dedupeKey(tag) {
  const { props, tag: name } = tag;
  if (UniqueTags.has(name))
    return name;
  if (name === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  if (tag.tag === "meta") {
    for (const n of allowedMetaProperties) {
      if (props[n] !== void 0) {
        const propValue = props[n];
        const isStructured = propValue.includes(":");
        const isStandardSingle = StandardSingleMetaTags.has(propValue);
        const shouldAlwaysDedupe = isStructured || isStandardSingle;
        const keyPart = !shouldAlwaysDedupe && tag.key ? `:key:${tag.key}` : "";
        return `${name}:${propValue}${keyPart}`;
      }
    }
  }
  if (tag.key) {
    return `${name}:key:${tag.key}`;
  }
  if (props.id) {
    return `${name}:id:${props.id}`;
  }
  if (TagsWithInnerContent.has(name)) {
    const v = tag.textContent || tag.innerHTML;
    if (v) {
      return `${name}:content:${v}`;
    }
  }
}
function hashTag(tag) {
  const dedupe = tag._h || tag._d;
  if (dedupe)
    return dedupe;
  const inner = tag.textContent || tag.innerHTML;
  if (inner)
    return inner;
  return `${tag.tag}:${Object.entries(tag.props).map(([k, v]) => `${k}:${String(v)}`).join(",")}`;
}
function walkResolver(val, resolve, key) {
  const type = typeof val;
  if (type === "function") {
    if (!key || key !== "titleTemplate" && !(key[0] === "o" && key[1] === "n")) {
      val = val();
    }
  }
  let v;
  if (resolve) {
    v = resolve(key, val);
  }
  if (Array.isArray(v)) {
    return v.map((r) => walkResolver(r, resolve));
  }
  if (v?.constructor === Object) {
    const next = {};
    for (const key2 of Object.keys(v)) {
      next[key2] = walkResolver(v[key2], resolve, key2);
    }
    return next;
  }
  return v;
}
function normalizeStyleClassProps(key, value) {
  const store = key === "style" ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
  function processValue(rawValue) {
    const value2 = rawValue.trim();
    if (!value2)
      return;
    if (key === "style") {
      const [k, ...v] = value2.split(":").map((s) => s.trim());
      if (k && v.length)
        store.set(k, v.join(":"));
    } else {
      value2.split(" ").filter(Boolean).forEach((c2) => store.add(c2));
    }
  }
  if (typeof value === "string") {
    key === "style" ? value.split(";").forEach(processValue) : processValue(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => processValue(item));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => {
      if (v && v !== "false") {
        key === "style" ? store.set(k.trim(), v) : processValue(k);
      }
    });
  }
  return store;
}
function normalizeProps(tag, input) {
  tag.props = tag.props || {};
  if (!input) {
    return tag;
  }
  if (tag.tag === "templateParams") {
    tag.props = input;
    return tag;
  }
  Object.entries(input).forEach(([key, value]) => {
    if (value === null) {
      tag.props[key] = null;
      return;
    }
    if (key === "class" || key === "style") {
      tag.props[key] = normalizeStyleClassProps(key, value);
      return;
    }
    if (TagConfigKeys.has(key)) {
      if (["textContent", "innerHTML"].includes(key) && typeof value === "object") {
        let type = input.type;
        if (!input.type) {
          type = "application/json";
        }
        if (!type?.endsWith("json") && type !== "speculationrules") {
          return;
        }
        input.type = type;
        tag.props.type = type;
        tag[key] = JSON.stringify(value);
      } else {
        tag[key] = value;
      }
      return;
    }
    const strValue = String(value);
    const isDataKey = key.startsWith("data-");
    if (strValue === "true" || strValue === "") {
      tag.props[key] = isDataKey ? strValue : true;
    } else if (!value && isDataKey && strValue === "false") {
      tag.props[key] = "false";
    } else if (value !== void 0) {
      tag.props[key] = value;
    }
  });
  return tag;
}
function normalizeTag(tagName, _input) {
  const input = typeof _input === "object" && typeof _input !== "function" ? _input : { [tagName === "script" || tagName === "noscript" || tagName === "style" ? "innerHTML" : "textContent"]: _input };
  const tag = normalizeProps({ tag: tagName, props: {} }, input);
  if (tag.key && DupeableTags.has(tag.tag)) {
    tag.props["data-hid"] = tag._h = tag.key;
  }
  if (tag.tag === "script" && typeof tag.innerHTML === "object") {
    tag.innerHTML = JSON.stringify(tag.innerHTML);
    tag.props.type = tag.props.type || "application/json";
  }
  return Array.isArray(tag.props.content) ? tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } })) : tag;
}
function normalizeEntryToTags(input, propResolvers) {
  if (!input) {
    return [];
  }
  if (typeof input === "function") {
    input = input();
  }
  const resolvers = (key, val) => {
    for (let i = 0; i < propResolvers.length; i++) {
      val = propResolvers[i](key, val);
    }
    return val;
  };
  input = resolvers(void 0, input);
  const tags = [];
  input = walkResolver(input, resolvers);
  Object.entries(input || {}).forEach(([key, value]) => {
    if (value === void 0)
      return;
    for (const v of Array.isArray(value) ? value : [value])
      tags.push(normalizeTag(key, v));
  });
  return tags.flat();
}
const sortTags = (a, b) => a._w === b._w ? a._p - b._p : a._w - b._w;
const TAG_WEIGHTS = {
  base: -10,
  title: 10
};
const TAG_ALIASES = {
  critical: -8,
  high: -1,
  low: 2
};
const WEIGHT_MAP = {
  meta: {
    "content-security-policy": -30,
    "charset": -20,
    "viewport": -15
  },
  link: {
    "preconnect": 20,
    "stylesheet": 60,
    "preload": 70,
    "modulepreload": 70,
    "prefetch": 90,
    "dns-prefetch": 90,
    "prerender": 90
  },
  script: {
    async: 30,
    defer: 80,
    sync: 50
  },
  style: {
    imported: 40,
    sync: 60
  }
};
const ImportStyleRe = /@import/;
const isTruthy = (val) => val === "" || val === true;
function tagWeight(head, tag) {
  if (typeof tag.tagPriority === "number")
    return tag.tagPriority;
  let weight = 100;
  const offset = TAG_ALIASES[tag.tagPriority] || 0;
  const weightMap = head.resolvedOptions.disableCapoSorting ? {
    link: {},
    script: {},
    style: {}
  } : WEIGHT_MAP;
  if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  } else if (tag.tag === "meta") {
    const metaType = tag.props["http-equiv"] === "content-security-policy" ? "content-security-policy" : tag.props.charset ? "charset" : tag.props.name === "viewport" ? "viewport" : null;
    if (metaType)
      weight = WEIGHT_MAP.meta[metaType];
  } else if (tag.tag === "link" && tag.props.rel) {
    weight = weightMap.link[tag.props.rel];
  } else if (tag.tag === "script") {
    if (isTruthy(tag.props.async)) {
      weight = weightMap.script.async;
    } else if (tag.props.src && !isTruthy(tag.props.defer) && !isTruthy(tag.props.async) && tag.props.type !== "module" && !tag.props.type?.endsWith("json")) {
      weight = weightMap.script.sync;
    } else if (isTruthy(tag.props.defer) && tag.props.src && !isTruthy(tag.props.async)) {
      weight = weightMap.script.defer;
    }
  } else if (tag.tag === "style") {
    weight = tag.innerHTML && ImportStyleRe.test(tag.innerHTML) ? weightMap.style.imported : weightMap.style.sync;
  }
  return (weight || 100) + offset;
}
function registerPlugin(head, p2) {
  const plugin = typeof p2 === "function" ? p2(head) : p2;
  const key = plugin.key || String(head.plugins.size + 1);
  const exists = head.plugins.get(key);
  if (!exists) {
    head.plugins.set(key, plugin);
    head.hooks.addHooks(plugin.hooks || {});
  }
}
// @__NO_SIDE_EFFECTS__
function createUnhead(resolvedOptions = {}) {
  const hooks = createHooks();
  hooks.addHooks(resolvedOptions.hooks || {});
  const ssr = !resolvedOptions.document;
  const entries = /* @__PURE__ */ new Map();
  const plugins = /* @__PURE__ */ new Map();
  const normalizeQueue = /* @__PURE__ */ new Set();
  const head = {
    _entryCount: 1,
    // 0 is reserved for internal use
    plugins,
    dirty: false,
    resolvedOptions,
    hooks,
    ssr,
    entries,
    headEntries() {
      return [...entries.values()];
    },
    use: (p2) => registerPlugin(head, p2),
    push(input, _options) {
      const options = { ..._options || {} };
      delete options.head;
      const _i = options._index ?? head._entryCount++;
      const inst = { _i, input, options };
      const _ = {
        _poll(rm = false) {
          head.dirty = true;
          !rm && normalizeQueue.add(_i);
          hooks.callHook("entries:updated", head);
        },
        dispose() {
          if (entries.delete(_i)) {
            head.invalidate();
          }
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          if (!options.mode || options.mode === "server" && ssr || options.mode === "client" && !ssr) {
            inst.input = input2;
            entries.set(_i, inst);
            _._poll();
          }
        }
      };
      _.patch(input);
      return _;
    },
    async resolveTags() {
      const ctx = {
        tagMap: /* @__PURE__ */ new Map(),
        tags: [],
        entries: [...head.entries.values()]
      };
      await hooks.callHook("entries:resolve", ctx);
      while (normalizeQueue.size) {
        const i = normalizeQueue.values().next().value;
        normalizeQueue.delete(i);
        const e = entries.get(i);
        if (e) {
          const normalizeCtx = {
            tags: normalizeEntryToTags(e.input, resolvedOptions.propResolvers || []).map((t) => Object.assign(t, e.options)),
            entry: e
          };
          await hooks.callHook("entries:normalize", normalizeCtx);
          e._tags = normalizeCtx.tags.map((t, i2) => {
            t._w = tagWeight(head, t);
            t._p = (e._i << 10) + i2;
            t._d = dedupeKey(t);
            return t;
          });
        }
      }
      let hasFlatMeta = false;
      ctx.entries.flatMap((e) => (e._tags || []).map((t) => ({ ...t, props: { ...t.props } }))).sort(sortTags).reduce((acc, next) => {
        const k = String(next._d || next._p);
        if (!acc.has(k))
          return acc.set(k, next);
        const prev = acc.get(k);
        const strategy = next?.tagDuplicateStrategy || (UsesMergeStrategy.has(next.tag) ? "merge" : null) || (next.key && next.key === prev.key ? "merge" : null);
        if (strategy === "merge") {
          const newProps = { ...prev.props };
          Object.entries(next.props).forEach(([p2, v]) => (
            // @ts-expect-error untyped
            newProps[p2] = p2 === "style" ? new Map([...prev.props.style || /* @__PURE__ */ new Map(), ...v]) : p2 === "class" ? /* @__PURE__ */ new Set([...prev.props.class || /* @__PURE__ */ new Set(), ...v]) : v
          ));
          acc.set(k, { ...next, props: newProps });
        } else if (next._p >> 10 === prev._p >> 10 && next.tag === "meta" && isMetaArrayDupeKey(k)) {
          acc.set(k, Object.assign([...Array.isArray(prev) ? prev : [prev], next], next));
          hasFlatMeta = true;
        } else if (next._w === prev._w ? next._p > prev._p : next?._w < prev?._w) {
          acc.set(k, next);
        }
        return acc;
      }, ctx.tagMap);
      const title = ctx.tagMap.get("title");
      const titleTemplate = ctx.tagMap.get("titleTemplate");
      head._title = title?.textContent;
      if (titleTemplate) {
        const titleTemplateFn = titleTemplate?.textContent;
        head._titleTemplate = titleTemplateFn;
        if (titleTemplateFn) {
          let newTitle = typeof titleTemplateFn === "function" ? titleTemplateFn(title?.textContent) : titleTemplateFn;
          if (typeof newTitle === "string" && !head.plugins.has("template-params")) {
            newTitle = newTitle.replace("%s", title?.textContent || "");
          }
          if (title) {
            newTitle === null ? ctx.tagMap.delete("title") : ctx.tagMap.set("title", { ...title, textContent: newTitle });
          } else {
            titleTemplate.tag = "title";
            titleTemplate.textContent = newTitle;
          }
        }
      }
      ctx.tags = Array.from(ctx.tagMap.values());
      if (hasFlatMeta) {
        ctx.tags = ctx.tags.flat().sort(sortTags);
      }
      await hooks.callHook("tags:beforeResolve", ctx);
      await hooks.callHook("tags:resolve", ctx);
      await hooks.callHook("tags:afterResolve", ctx);
      const finalTags = [];
      for (const t of ctx.tags) {
        const { innerHTML, tag, props } = t;
        if (!ValidHeadTags.has(tag)) {
          continue;
        }
        if (Object.keys(props).length === 0 && !t.innerHTML && !t.textContent) {
          continue;
        }
        if (tag === "meta" && !props.content && !props["http-equiv"] && !props.charset) {
          continue;
        }
        if (tag === "script" && innerHTML) {
          if (props.type?.endsWith("json")) {
            const v = typeof innerHTML === "string" ? innerHTML : JSON.stringify(innerHTML);
            t.innerHTML = v.replace(/</g, "\\u003C");
          } else if (typeof innerHTML === "string") {
            t.innerHTML = innerHTML.replace(new RegExp(`</${tag}`, "g"), `<\\/${tag}`);
          }
          t._d = dedupeKey(t);
        }
        finalTags.push(t);
      }
      return finalTags;
    },
    invalidate() {
      for (const entry of entries.values()) {
        normalizeQueue.add(entry._i);
      }
      head.dirty = true;
      hooks.callHook("entries:updated", head);
    }
  };
  (resolvedOptions?.plugins || []).forEach((p2) => registerPlugin(head, p2));
  head.hooks.callHook("init", head);
  resolvedOptions.init?.forEach((e) => e && head.push(e));
  return head;
}
async function renderDOMHead(head, options = {}) {
  const dom = options.document || head.resolvedOptions.document;
  if (!dom || !head.dirty)
    return;
  const beforeRenderCtx = { shouldRender: true, tags: [] };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  if (head._domUpdatePromise) {
    return head._domUpdatePromise;
  }
  head._domUpdatePromise = new Promise(async (resolve) => {
    const dupeKeyCounter = /* @__PURE__ */ new Map();
    const resolveTagPromise = new Promise((resolve2) => {
      head.resolveTags().then((tags2) => {
        resolve2(
          tags2.map((tag) => {
            const count = dupeKeyCounter.get(tag._d) || 0;
            const res = {
              tag,
              id: (count ? `${tag._d}:${count}` : tag._d) || hashTag(tag),
              shouldRender: true
            };
            if (tag._d && isMetaArrayDupeKey(tag._d)) {
              dupeKeyCounter.set(tag._d, count + 1);
            }
            return res;
          })
        );
      });
    });
    let state = head._dom;
    if (!state) {
      state = {
        title: dom.title,
        elMap: (/* @__PURE__ */ new Map()).set("htmlAttrs", dom.documentElement).set("bodyAttrs", dom.body)
      };
      for (const key of ["body", "head"]) {
        const children = dom[key]?.children;
        for (const c2 of children) {
          const tag = c2.tagName.toLowerCase();
          if (!HasElementTags.has(tag)) {
            continue;
          }
          const next = normalizeProps({ tag, props: {} }, {
            innerHTML: c2.innerHTML,
            ...c2.getAttributeNames().reduce((props, name) => {
              props[name] = c2.getAttribute(name);
              return props;
            }, {}) || {}
          });
          next.key = c2.getAttribute("data-hid") || void 0;
          next._d = dedupeKey(next) || hashTag(next);
          if (state.elMap.has(next._d)) {
            let count = 1;
            let k = next._d;
            while (state.elMap.has(k)) {
              k = `${next._d}:${count++}`;
            }
            state.elMap.set(k, c2);
          } else {
            state.elMap.set(next._d, c2);
          }
        }
      }
    }
    state.pendingSideEffects = { ...state.sideEffects };
    state.sideEffects = {};
    function track(id, scope, fn) {
      const k = `${id}:${scope}`;
      state.sideEffects[k] = fn;
      delete state.pendingSideEffects[k];
    }
    function trackCtx({ id, $el, tag }) {
      const isAttrTag = tag.tag.endsWith("Attrs");
      state.elMap.set(id, $el);
      if (!isAttrTag) {
        if (tag.textContent && tag.textContent !== $el.textContent) {
          $el.textContent = tag.textContent;
        }
        if (tag.innerHTML && tag.innerHTML !== $el.innerHTML) {
          $el.innerHTML = tag.innerHTML;
        }
        track(id, "el", () => {
          $el?.remove();
          state.elMap.delete(id);
        });
      }
      for (const k in tag.props) {
        if (!Object.prototype.hasOwnProperty.call(tag.props, k))
          continue;
        const value = tag.props[k];
        if (k.startsWith("on") && typeof value === "function") {
          const dataset = $el?.dataset;
          if (dataset && dataset[`${k}fired`]) {
            const ek = k.slice(0, -5);
            value.call($el, new Event(ek.substring(2)));
          }
          if ($el.getAttribute(`data-${k}`) !== "") {
            (tag.tag === "bodyAttrs" ? dom.defaultView : $el).addEventListener(
              // onload -> load
              k.substring(2),
              value.bind($el)
            );
            $el.setAttribute(`data-${k}`, "");
          }
          continue;
        }
        const ck = `attr:${k}`;
        if (k === "class") {
          if (!value) {
            continue;
          }
          for (const c2 of value) {
            isAttrTag && track(id, `${ck}:${c2}`, () => $el.classList.remove(c2));
            !$el.classList.contains(c2) && $el.classList.add(c2);
          }
        } else if (k === "style") {
          if (!value) {
            continue;
          }
          for (const [k2, v] of value) {
            track(id, `${ck}:${k2}`, () => {
              $el.style.removeProperty(k2);
            });
            $el.style.setProperty(k2, v);
          }
        } else if (value !== false && value !== null) {
          $el.getAttribute(k) !== value && $el.setAttribute(k, value === true ? "" : String(value));
          isAttrTag && track(id, ck, () => $el.removeAttribute(k));
        }
      }
    }
    const pending = [];
    const frag = {
      bodyClose: void 0,
      bodyOpen: void 0,
      head: void 0
    };
    const tags = await resolveTagPromise;
    for (const ctx of tags) {
      const { tag, shouldRender, id } = ctx;
      if (!shouldRender)
        continue;
      if (tag.tag === "title") {
        dom.title = tag.textContent;
        track("title", "", () => dom.title = state.title);
        continue;
      }
      ctx.$el = ctx.$el || state.elMap.get(id);
      if (ctx.$el) {
        trackCtx(ctx);
      } else if (HasElementTags.has(tag.tag)) {
        pending.push(ctx);
      }
    }
    for (const ctx of pending) {
      const pos = ctx.tag.tagPosition || "head";
      ctx.$el = dom.createElement(ctx.tag.tag);
      trackCtx(ctx);
      frag[pos] = frag[pos] || dom.createDocumentFragment();
      frag[pos].appendChild(ctx.$el);
    }
    for (const ctx of tags)
      await head.hooks.callHook("dom:renderTag", ctx, dom, track);
    frag.head && dom.head.appendChild(frag.head);
    frag.bodyOpen && dom.body.insertBefore(frag.bodyOpen, dom.body.firstChild);
    frag.bodyClose && dom.body.appendChild(frag.bodyClose);
    for (const k in state.pendingSideEffects) {
      state.pendingSideEffects[k]();
    }
    head._dom = state;
    await head.hooks.callHook("dom:rendered", { renders: tags });
    resolve();
  }).finally(() => {
    head._domUpdatePromise = void 0;
    head.dirty = false;
  });
  return head._domUpdatePromise;
}
function createHead$1(options = {}) {
  const render = options.domOptions?.render || renderDOMHead;
  options.document = options.document || (typeof window !== "undefined" ? document : void 0);
  const initialPayload = options.document?.head.querySelector('script[id="unhead:payload"]')?.innerHTML || false;
  return /* @__PURE__ */ createUnhead({
    ...options,
    plugins: [
      ...options.plugins || [],
      {
        key: "client",
        hooks: {
          "entries:updated": render
        }
      }
    ],
    init: [
      initialPayload ? JSON.parse(initialPayload) : false,
      ...options.init || []
    ]
  });
}
function createDebouncedFn(callee, delayer) {
  let ctxId = 0;
  return () => {
    const delayFnCtxId = ++ctxId;
    delayer(() => {
      if (ctxId === delayFnCtxId) {
        callee();
      }
    });
  };
}
const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};
const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app2) {
      app2.config.globalProperties.$unhead = head;
      app2.config.globalProperties.$head = head;
      app2.provide(headSymbol, head);
    }
  };
  return plugin.install;
}
function injectHead() {
  if (hasInjectionContext()) {
    const instance = inject(headSymbol);
    if (!instance) {
      throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
    }
    return instance;
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}
function createHead(options = {}) {
  const head = createHead$1({
    domOptions: {
      render: createDebouncedFn(() => renderDOMHead(head), (fn) => setTimeout(fn, 0))
    },
    ...options
  });
  head.install = vueInstall(head);
  return head;
}
const C_58_47Users_47eduardoc_47Documents_47repositories_47shared_45cp_45vue_47node_modules_47_46pnpm_47_64nuxt_43ui_643_463_460__64babel_43parse_5b281630bc34f8f6c46d98745ce85891_47node_modules_47_64nuxt_47ui_47dist_47runtime_47vue_47plugins_47head_46js = {
  install(app2) {
    if (app2._context.provides.usehead) {
      return;
    }
    const head = createHead();
    app2.use(head);
  }
};
var l = { inherit: "inherit", current: "currentcolor", transparent: "transparent", black: "#000", white: "#fff", slate: { 50: "oklch(98.4% 0.003 247.858)", 100: "oklch(96.8% 0.007 247.896)", 200: "oklch(92.9% 0.013 255.508)", 300: "oklch(86.9% 0.022 252.894)", 400: "oklch(70.4% 0.04 256.788)", 500: "oklch(55.4% 0.046 257.417)", 600: "oklch(44.6% 0.043 257.281)", 700: "oklch(37.2% 0.044 257.287)", 800: "oklch(27.9% 0.041 260.031)", 900: "oklch(20.8% 0.042 265.755)", 950: "oklch(12.9% 0.042 264.695)" }, gray: { 50: "oklch(98.5% 0.002 247.839)", 100: "oklch(96.7% 0.003 264.542)", 200: "oklch(92.8% 0.006 264.531)", 300: "oklch(87.2% 0.01 258.338)", 400: "oklch(70.7% 0.022 261.325)", 500: "oklch(55.1% 0.027 264.364)", 600: "oklch(44.6% 0.03 256.802)", 700: "oklch(37.3% 0.034 259.733)", 800: "oklch(27.8% 0.033 256.848)", 900: "oklch(21% 0.034 264.665)", 950: "oklch(13% 0.028 261.692)" }, zinc: { 50: "oklch(98.5% 0 0)", 100: "oklch(96.7% 0.001 286.375)", 200: "oklch(92% 0.004 286.32)", 300: "oklch(87.1% 0.006 286.286)", 400: "oklch(70.5% 0.015 286.067)", 500: "oklch(55.2% 0.016 285.938)", 600: "oklch(44.2% 0.017 285.786)", 700: "oklch(37% 0.013 285.805)", 800: "oklch(27.4% 0.006 286.033)", 900: "oklch(21% 0.006 285.885)", 950: "oklch(14.1% 0.005 285.823)" }, neutral: { 50: "oklch(98.5% 0 0)", 100: "oklch(97% 0 0)", 200: "oklch(92.2% 0 0)", 300: "oklch(87% 0 0)", 400: "oklch(70.8% 0 0)", 500: "oklch(55.6% 0 0)", 600: "oklch(43.9% 0 0)", 700: "oklch(37.1% 0 0)", 800: "oklch(26.9% 0 0)", 900: "oklch(20.5% 0 0)", 950: "oklch(14.5% 0 0)" }, stone: { 50: "oklch(98.5% 0.001 106.423)", 100: "oklch(97% 0.001 106.424)", 200: "oklch(92.3% 0.003 48.717)", 300: "oklch(86.9% 0.005 56.366)", 400: "oklch(70.9% 0.01 56.259)", 500: "oklch(55.3% 0.013 58.071)", 600: "oklch(44.4% 0.011 73.639)", 700: "oklch(37.4% 0.01 67.558)", 800: "oklch(26.8% 0.007 34.298)", 900: "oklch(21.6% 0.006 56.043)", 950: "oklch(14.7% 0.004 49.25)" }, red: { 50: "oklch(97.1% 0.013 17.38)", 100: "oklch(93.6% 0.032 17.717)", 200: "oklch(88.5% 0.062 18.334)", 300: "oklch(80.8% 0.114 19.571)", 400: "oklch(70.4% 0.191 22.216)", 500: "oklch(63.7% 0.237 25.331)", 600: "oklch(57.7% 0.245 27.325)", 700: "oklch(50.5% 0.213 27.518)", 800: "oklch(44.4% 0.177 26.899)", 900: "oklch(39.6% 0.141 25.723)", 950: "oklch(25.8% 0.092 26.042)" }, orange: { 50: "oklch(98% 0.016 73.684)", 100: "oklch(95.4% 0.038 75.164)", 200: "oklch(90.1% 0.076 70.697)", 300: "oklch(83.7% 0.128 66.29)", 400: "oklch(75% 0.183 55.934)", 500: "oklch(70.5% 0.213 47.604)", 600: "oklch(64.6% 0.222 41.116)", 700: "oklch(55.3% 0.195 38.402)", 800: "oklch(47% 0.157 37.304)", 900: "oklch(40.8% 0.123 38.172)", 950: "oklch(26.6% 0.079 36.259)" }, amber: { 50: "oklch(98.7% 0.022 95.277)", 100: "oklch(96.2% 0.059 95.617)", 200: "oklch(92.4% 0.12 95.746)", 300: "oklch(87.9% 0.169 91.605)", 400: "oklch(82.8% 0.189 84.429)", 500: "oklch(76.9% 0.188 70.08)", 600: "oklch(66.6% 0.179 58.318)", 700: "oklch(55.5% 0.163 48.998)", 800: "oklch(47.3% 0.137 46.201)", 900: "oklch(41.4% 0.112 45.904)", 950: "oklch(27.9% 0.077 45.635)" }, yellow: { 50: "oklch(98.7% 0.026 102.212)", 100: "oklch(97.3% 0.071 103.193)", 200: "oklch(94.5% 0.129 101.54)", 300: "oklch(90.5% 0.182 98.111)", 400: "oklch(85.2% 0.199 91.936)", 500: "oklch(79.5% 0.184 86.047)", 600: "oklch(68.1% 0.162 75.834)", 700: "oklch(55.4% 0.135 66.442)", 800: "oklch(47.6% 0.114 61.907)", 900: "oklch(42.1% 0.095 57.708)", 950: "oklch(28.6% 0.066 53.813)" }, lime: { 50: "oklch(98.6% 0.031 120.757)", 100: "oklch(96.7% 0.067 122.328)", 200: "oklch(93.8% 0.127 124.321)", 300: "oklch(89.7% 0.196 126.665)", 400: "oklch(84.1% 0.238 128.85)", 500: "oklch(76.8% 0.233 130.85)", 600: "oklch(64.8% 0.2 131.684)", 700: "oklch(53.2% 0.157 131.589)", 800: "oklch(45.3% 0.124 130.933)", 900: "oklch(40.5% 0.101 131.063)", 950: "oklch(27.4% 0.072 132.109)" }, green: { 50: "oklch(98.2% 0.018 155.826)", 100: "oklch(96.2% 0.044 156.743)", 200: "oklch(92.5% 0.084 155.995)", 300: "oklch(87.1% 0.15 154.449)", 400: "oklch(79.2% 0.209 151.711)", 500: "oklch(72.3% 0.219 149.579)", 600: "oklch(62.7% 0.194 149.214)", 700: "oklch(52.7% 0.154 150.069)", 800: "oklch(44.8% 0.119 151.328)", 900: "oklch(39.3% 0.095 152.535)", 950: "oklch(26.6% 0.065 152.934)" }, emerald: { 50: "oklch(97.9% 0.021 166.113)", 100: "oklch(95% 0.052 163.051)", 200: "oklch(90.5% 0.093 164.15)", 300: "oklch(84.5% 0.143 164.978)", 400: "oklch(76.5% 0.177 163.223)", 500: "oklch(69.6% 0.17 162.48)", 600: "oklch(59.6% 0.145 163.225)", 700: "oklch(50.8% 0.118 165.612)", 800: "oklch(43.2% 0.095 166.913)", 900: "oklch(37.8% 0.077 168.94)", 950: "oklch(26.2% 0.051 172.552)" }, teal: { 50: "oklch(98.4% 0.014 180.72)", 100: "oklch(95.3% 0.051 180.801)", 200: "oklch(91% 0.096 180.426)", 300: "oklch(85.5% 0.138 181.071)", 400: "oklch(77.7% 0.152 181.912)", 500: "oklch(70.4% 0.14 182.503)", 600: "oklch(60% 0.118 184.704)", 700: "oklch(51.1% 0.096 186.391)", 800: "oklch(43.7% 0.078 188.216)", 900: "oklch(38.6% 0.063 188.416)", 950: "oklch(27.7% 0.046 192.524)" }, cyan: { 50: "oklch(98.4% 0.019 200.873)", 100: "oklch(95.6% 0.045 203.388)", 200: "oklch(91.7% 0.08 205.041)", 300: "oklch(86.5% 0.127 207.078)", 400: "oklch(78.9% 0.154 211.53)", 500: "oklch(71.5% 0.143 215.221)", 600: "oklch(60.9% 0.126 221.723)", 700: "oklch(52% 0.105 223.128)", 800: "oklch(45% 0.085 224.283)", 900: "oklch(39.8% 0.07 227.392)", 950: "oklch(30.2% 0.056 229.695)" }, sky: { 50: "oklch(97.7% 0.013 236.62)", 100: "oklch(95.1% 0.026 236.824)", 200: "oklch(90.1% 0.058 230.902)", 300: "oklch(82.8% 0.111 230.318)", 400: "oklch(74.6% 0.16 232.661)", 500: "oklch(68.5% 0.169 237.323)", 600: "oklch(58.8% 0.158 241.966)", 700: "oklch(50% 0.134 242.749)", 800: "oklch(44.3% 0.11 240.79)", 900: "oklch(39.1% 0.09 240.876)", 950: "oklch(29.3% 0.066 243.157)" }, blue: { 50: "oklch(97% 0.014 254.604)", 100: "oklch(93.2% 0.032 255.585)", 200: "oklch(88.2% 0.059 254.128)", 300: "oklch(80.9% 0.105 251.813)", 400: "oklch(70.7% 0.165 254.624)", 500: "oklch(62.3% 0.214 259.815)", 600: "oklch(54.6% 0.245 262.881)", 700: "oklch(48.8% 0.243 264.376)", 800: "oklch(42.4% 0.199 265.638)", 900: "oklch(37.9% 0.146 265.522)", 950: "oklch(28.2% 0.091 267.935)" }, indigo: { 50: "oklch(96.2% 0.018 272.314)", 100: "oklch(93% 0.034 272.788)", 200: "oklch(87% 0.065 274.039)", 300: "oklch(78.5% 0.115 274.713)", 400: "oklch(67.3% 0.182 276.935)", 500: "oklch(58.5% 0.233 277.117)", 600: "oklch(51.1% 0.262 276.966)", 700: "oklch(45.7% 0.24 277.023)", 800: "oklch(39.8% 0.195 277.366)", 900: "oklch(35.9% 0.144 278.697)", 950: "oklch(25.7% 0.09 281.288)" }, violet: { 50: "oklch(96.9% 0.016 293.756)", 100: "oklch(94.3% 0.029 294.588)", 200: "oklch(89.4% 0.057 293.283)", 300: "oklch(81.1% 0.111 293.571)", 400: "oklch(70.2% 0.183 293.541)", 500: "oklch(60.6% 0.25 292.717)", 600: "oklch(54.1% 0.281 293.009)", 700: "oklch(49.1% 0.27 292.581)", 800: "oklch(43.2% 0.232 292.759)", 900: "oklch(38% 0.189 293.745)", 950: "oklch(28.3% 0.141 291.089)" }, purple: { 50: "oklch(97.7% 0.014 308.299)", 100: "oklch(94.6% 0.033 307.174)", 200: "oklch(90.2% 0.063 306.703)", 300: "oklch(82.7% 0.119 306.383)", 400: "oklch(71.4% 0.203 305.504)", 500: "oklch(62.7% 0.265 303.9)", 600: "oklch(55.8% 0.288 302.321)", 700: "oklch(49.6% 0.265 301.924)", 800: "oklch(43.8% 0.218 303.724)", 900: "oklch(38.1% 0.176 304.987)", 950: "oklch(29.1% 0.149 302.717)" }, fuchsia: { 50: "oklch(97.7% 0.017 320.058)", 100: "oklch(95.2% 0.037 318.852)", 200: "oklch(90.3% 0.076 319.62)", 300: "oklch(83.3% 0.145 321.434)", 400: "oklch(74% 0.238 322.16)", 500: "oklch(66.7% 0.295 322.15)", 600: "oklch(59.1% 0.293 322.896)", 700: "oklch(51.8% 0.253 323.949)", 800: "oklch(45.2% 0.211 324.591)", 900: "oklch(40.1% 0.17 325.612)", 950: "oklch(29.3% 0.136 325.661)" }, pink: { 50: "oklch(97.1% 0.014 343.198)", 100: "oklch(94.8% 0.028 342.258)", 200: "oklch(89.9% 0.061 343.231)", 300: "oklch(82.3% 0.12 346.018)", 400: "oklch(71.8% 0.202 349.761)", 500: "oklch(65.6% 0.241 354.308)", 600: "oklch(59.2% 0.249 0.584)", 700: "oklch(52.5% 0.223 3.958)", 800: "oklch(45.9% 0.187 3.815)", 900: "oklch(40.8% 0.153 2.432)", 950: "oklch(28.4% 0.109 3.907)" }, rose: { 50: "oklch(96.9% 0.015 12.422)", 100: "oklch(94.1% 0.03 12.58)", 200: "oklch(89.2% 0.058 10.001)", 300: "oklch(81% 0.117 11.638)", 400: "oklch(71.2% 0.194 13.428)", 500: "oklch(64.5% 0.246 16.439)", 600: "oklch(58.6% 0.253 17.585)", 700: "oklch(51.4% 0.222 16.935)", 800: "oklch(45.5% 0.188 13.697)", 900: "oklch(41% 0.159 10.272)", 950: "oklch(27.1% 0.105 12.094)" } };
function tryOnScopeDispose$1(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const localProvidedStateMap = /* @__PURE__ */ new WeakMap();
const injectLocal = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  var _a;
  const key = args[0];
  const instance = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy;
  if (instance == null && !hasInjectionContext())
    throw new Error("injectLocal must be called in setup");
  if (instance && localProvidedStateMap.has(instance) && key in localProvidedStateMap.get(instance))
    return localProvidedStateMap.get(instance)[key];
  return inject(...args);
};
// @__NO_SIDE_EFFECTS__
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = void 0;
      scope = void 0;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose$1(dispose);
    return state;
  };
}
function toReactive(objectRef) {
  if (!isRef(objectRef))
    return reactive(objectRef);
  const proxy = new Proxy({}, {
    get(_, p2, receiver) {
      return unref(Reflect.get(objectRef.value, p2, receiver));
    },
    set(_, p2, value) {
      if (isRef(objectRef.value[p2]) && !isRef(value))
        objectRef.value[p2].value = value;
      else
        objectRef.value[p2] = value;
      return true;
    },
    deleteProperty(_, p2) {
      return Reflect.deleteProperty(objectRef.value, p2);
    },
    has(_, p2) {
      return Reflect.has(objectRef.value, p2);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive(proxy);
}
function reactiveComputed(fn) {
  return toReactive(computed(fn));
}
function reactiveOmit(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(toRefs(obj)).filter(([k, v]) => !predicate(toValue(v), k))) : Object.fromEntries(Object.entries(toRefs(obj)).filter((e) => !flatKeys.includes(e[0]))));
}
const isClient$1 = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString$1 = Object.prototype.toString;
const isObject$1 = (val) => toString$1.call(val) === "[object Object]";
const noop$2 = () => {
};
function toRef(...args) {
  if (args.length !== 1)
    return toRef$1(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop$2 }))) : ref(r);
}
function reactivePick(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(toRefs(obj)).filter(([k, v]) => predicate(toValue(v), k))) : Object.fromEntries(flatKeys.map((k) => [k, toRef(obj, k)])));
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
const bypassFilter = (invoke2) => {
  return invoke2();
};
function pausableFilter(extendFilter = bypassFilter, options = {}) {
  const {
    initialState = "active"
  } = options;
  const isActive = toRef(initialState === "active");
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter };
}
function pxValue(px) {
  return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
function getLifeCycleTarget(target) {
  return getCurrentInstance();
}
function watchWithFilter(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb
    ),
    watchOptions
  );
}
function watchPausable(source, cb, options = {}) {
  const {
    eventFilter: filter,
    initialState = "active",
    ...watchOptions
  } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter
    }
  );
  return { stop, pause, resume, isActive };
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    onMounted(fn, target);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function watchImmediate$1(source, cb, options) {
  return watch(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}
const defaultWindow$1 = isClient$1 ? window : void 0;
function unrefElement$1(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener$1(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray$1(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate$1(
    () => {
      var _a, _b;
      return [
        (_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement$1(e))) != null ? _b : [defaultWindow$1].filter((e) => e != null),
        toArray$1(toValue(firstParamTargets.value ? args[1] : args[0])),
        toArray$1(unref(firstParamTargets.value ? args[2] : args[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        toValue(firstParamTargets.value ? args[3] : args[2])
      ];
    },
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup();
      if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
        return;
      const optionsClone = isObject$1(raw_options) ? { ...raw_options } : raw_options;
      cleanups.push(
        ...raw_targets.flatMap(
          (el) => raw_events.flatMap(
            (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
          )
        )
      );
    },
    { flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose$1(cleanup);
  return stop;
}
// @__NO_SIDE_EFFECTS__
function useMounted$1() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
// @__NO_SIDE_EFFECTS__
function useSupported(callback) {
  const isMounted = /* @__PURE__ */ useMounted$1();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
const ssrWidthSymbol = Symbol("vueuse-ssr-width");
// @__NO_SIDE_EFFECTS__
function useSSRWidth() {
  const ssrWidth = hasInjectionContext() ? /* @__PURE__ */ injectLocal(ssrWidthSymbol, null) : null;
  return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow$1, ssrWidth = /* @__PURE__ */ useSSRWidth() } = options;
  const isSupported = /* @__PURE__ */ useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  const ssrSupport = shallowRef(typeof ssrWidth === "number");
  const mediaQuery = shallowRef();
  const matches = shallowRef(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  watchEffect(() => {
    if (ssrSupport.value) {
      ssrSupport.value = !isSupported.value;
      const queryStrings = toValue(query).split(",");
      matches.value = queryStrings.some((queryString) => {
        const not = queryString.includes("not all");
        const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let res = Boolean(minWidth || maxWidth);
        if (minWidth && res) {
          res = ssrWidth >= pxValue(minWidth[1]);
        }
        if (maxWidth && res) {
          res = ssrWidth <= pxValue(maxWidth[1]);
        }
        return not ? !res : res;
      });
      return;
    }
    if (!isSupported.value)
      return;
    mediaQuery.value = window2.matchMedia(toValue(query));
    matches.value = mediaQuery.value.matches;
  });
  useEventListener$1(mediaQuery, "change", handler, { passive: true });
  return computed(() => matches.value);
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
const handlers = /* @__PURE__ */ getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
// @__NO_SIDE_EFFECTS__
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
const customStorageEventName = "vueuse-storage";
function useStorage(key, defaults2, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow$1,
    eventFilter,
    onError = (e) => {
      console.error(e);
    },
    initOnMounted
  } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults2 === "function" ? defaults2() : defaults2);
  const keyComputed = computed(() => toValue(key));
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow$1) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage)
    return data;
  const rawInit = toValue(defaults2);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
    data,
    () => write(data.value),
    { flush, deep, eventFilter }
  );
  watch(keyComputed, () => update(), { flush });
  let firstMounted = false;
  const onStorageEvent = (ev) => {
    if (initOnMounted && !firstMounted) {
      return;
    }
    update(ev);
  };
  const onStorageCustomEvent = (ev) => {
    if (initOnMounted && !firstMounted) {
      return;
    }
    updateFromCustomEvent(ev);
  };
  if (window2 && listenToStorageChanges) {
    if (storage instanceof Storage)
      useEventListener$1(window2, "storage", onStorageEvent, { passive: true });
    else
      useEventListener$1(window2, customStorageEventName, onStorageCustomEvent);
  }
  if (initOnMounted) {
    tryOnMounted(() => {
      firstMounted = true;
      update();
    });
  } else {
    update();
  }
  function dispatchWriteEvent(oldValue, newValue) {
    if (window2) {
      const payload = {
        key: keyComputed.value,
        oldValue,
        newValue,
        storageArea: storage
      };
      window2.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, {
        detail: payload
      }));
    }
  }
  function write(v) {
    try {
      const oldValue = storage.getItem(keyComputed.value);
      if (v == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(keyComputed.value);
      } else {
        const serialized = serializer.write(v);
        if (oldValue !== serialized) {
          storage.setItem(keyComputed.value, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage.setItem(keyComputed.value, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== keyComputed.value)
      return;
    pauseWatch();
    try {
      if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
        data.value = read(event);
    } catch (e) {
      onError(e);
    } finally {
      if (event)
        nextTick(resumeWatch);
      else
        resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}
const CSS_DISABLE_TRANS = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function useColorMode(options = {}) {
  const {
    selector = "html",
    attribute = "class",
    initialValue = "auto",
    window: window2 = defaultWindow$1,
    storage,
    storageKey = "vueuse-color-scheme",
    listenToStorageChanges = true,
    storageRef,
    emitAuto,
    disableTransition = true
  } = options;
  const modes = {
    auto: "",
    light: "light",
    dark: "dark",
    ...options.modes || {}
  };
  const preferredDark = /* @__PURE__ */ usePreferredDark({ window: window2 });
  const system = computed(() => preferredDark.value ? "dark" : "light");
  const store = storageRef || (storageKey == null ? toRef(initialValue) : useStorage(storageKey, initialValue, storage, { window: window2, listenToStorageChanges }));
  const state = computed(() => store.value === "auto" ? system.value : store.value);
  const updateHTMLAttrs = getSSRHandler(
    "updateHTMLAttrs",
    (selector2, attribute2, value) => {
      const el = typeof selector2 === "string" ? window2 == null ? void 0 : window2.document.querySelector(selector2) : unrefElement$1(selector2);
      if (!el)
        return;
      const classesToAdd = /* @__PURE__ */ new Set();
      const classesToRemove = /* @__PURE__ */ new Set();
      let attributeToChange = null;
      if (attribute2 === "class") {
        const current = value.split(/\s/g);
        Object.values(modes).flatMap((i) => (i || "").split(/\s/g)).filter(Boolean).forEach((v) => {
          if (current.includes(v))
            classesToAdd.add(v);
          else
            classesToRemove.add(v);
        });
      } else {
        attributeToChange = { key: attribute2, value };
      }
      if (classesToAdd.size === 0 && classesToRemove.size === 0 && attributeToChange === null)
        return;
      let style;
      if (disableTransition) {
        style = window2.document.createElement("style");
        style.appendChild(document.createTextNode(CSS_DISABLE_TRANS));
        window2.document.head.appendChild(style);
      }
      for (const c2 of classesToAdd) {
        el.classList.add(c2);
      }
      for (const c2 of classesToRemove) {
        el.classList.remove(c2);
      }
      if (attributeToChange) {
        el.setAttribute(attributeToChange.key, attributeToChange.value);
      }
      if (disableTransition) {
        window2.getComputedStyle(style).opacity;
        document.head.removeChild(style);
      }
    }
  );
  function defaultOnChanged(mode) {
    var _a;
    updateHTMLAttrs(selector, attribute, (_a = modes[mode]) != null ? _a : mode);
  }
  function onChanged(mode) {
    if (options.onChanged)
      options.onChanged(mode, defaultOnChanged);
    else
      defaultOnChanged(mode);
  }
  watch(state, onChanged, { flush: "post", immediate: true });
  tryOnMounted(() => onChanged(state.value));
  const auto = computed({
    get() {
      return emitAuto ? store.value : state.value;
    },
    set(v) {
      store.value = v;
    }
  });
  return Object.assign(auto, { store, system, state });
}
function useDark(options = {}) {
  const {
    valueDark = "dark",
    valueLight = ""
  } = options;
  const mode = useColorMode({
    ...options,
    onChanged: (mode2, defaultHandler) => {
      var _a;
      if (options.onChanged)
        (_a = options.onChanged) == null ? void 0 : _a.call(options, mode2 === "dark", defaultHandler, mode2);
      else
        defaultHandler(mode2);
    },
    modes: {
      dark: valueDark,
      light: valueLight
    }
  });
  const system = computed(() => mode.system.value);
  const isDark = computed({
    get() {
      return mode.value === "dark";
    },
    set(v) {
      const modeVal = v ? "dark" : "light";
      if (system.value === modeVal)
        mode.value = "auto";
      else
        mode.value = modeVal;
    }
  });
  return isDark;
}
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
const noop$1 = () => {
};
const isArray = Array.isArray;
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => {
    const to = unref(props.to);
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p2 = router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop$1);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) {
        document.startViewTransition(() => p2);
      }
      return p2;
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
function useRoute(_name) {
  return inject(routeLocationKey);
}
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p2, c2) => _defu(p2, c2, "", merger), {})
  );
}
const defu = createDefu();
// @__NO_SIDE_EFFECTS__
function defineLocale(options) {
  return defu(options, { dir: "ltr" });
}
function serialize(o) {
  return typeof o == "string" ? `'${o}'` : new c().serialize(o);
}
const c = /* @__PURE__ */ function() {
  class o {
    #t = /* @__PURE__ */ new Map();
    compare(t, r) {
      const e = typeof t, n = typeof r;
      return e === "string" && n === "string" ? t.localeCompare(r) : e === "number" && n === "number" ? t - r : String.prototype.localeCompare.call(this.serialize(t, true), this.serialize(r, true));
    }
    serialize(t, r) {
      if (t === null) return "null";
      switch (typeof t) {
        case "string":
          return r ? t : `'${t}'`;
        case "bigint":
          return `${t}n`;
        case "object":
          return this.$object(t);
        case "function":
          return this.$function(t);
      }
      return String(t);
    }
    serializeObject(t) {
      const r = Object.prototype.toString.call(t);
      if (r !== "[object Object]") return this.serializeBuiltInType(r.length < 10 ? `unknown:${r}` : r.slice(8, -1), t);
      const e = t.constructor, n = e === Object || e === void 0 ? "" : e.name;
      if (n !== "" && globalThis[n] === e) return this.serializeBuiltInType(n, t);
      if (typeof t.toJSON == "function") {
        const i = t.toJSON();
        return n + (i !== null && typeof i == "object" ? this.$object(i) : `(${this.serialize(i)})`);
      }
      return this.serializeObjectEntries(n, Object.entries(t));
    }
    serializeBuiltInType(t, r) {
      const e = this["$" + t];
      if (e) return e.call(this, r);
      if (typeof r?.entries == "function") return this.serializeObjectEntries(t, r.entries());
      throw new Error(`Cannot serialize ${t}`);
    }
    serializeObjectEntries(t, r) {
      const e = Array.from(r).sort((i, a) => this.compare(i[0], a[0]));
      let n = `${t}{`;
      for (let i = 0; i < e.length; i++) {
        const [a, l2] = e[i];
        n += `${this.serialize(a, true)}:${this.serialize(l2)}`, i < e.length - 1 && (n += ",");
      }
      return n + "}";
    }
    $object(t) {
      let r = this.#t.get(t);
      return r === void 0 && (this.#t.set(t, `#${this.#t.size}`), r = this.serializeObject(t), this.#t.set(t, r)), r;
    }
    $function(t) {
      const r = Function.prototype.toString.call(t);
      return r.slice(-15) === "[native code] }" ? `${t.name || ""}()[native]` : `${t.name}(${t.length})${r.replace(/\s*\n\s*/g, "")}`;
    }
    $Array(t) {
      let r = "[";
      for (let e = 0; e < t.length; e++) r += this.serialize(t[e]), e < t.length - 1 && (r += ",");
      return r + "]";
    }
    $Date(t) {
      try {
        return `Date(${t.toISOString()})`;
      } catch {
        return "Date(null)";
      }
    }
    $ArrayBuffer(t) {
      return `ArrayBuffer[${new Uint8Array(t).join(",")}]`;
    }
    $Set(t) {
      return `Set${this.$Array(Array.from(t).sort((r, e) => this.compare(r, e)))}`;
    }
    $Map(t) {
      return this.serializeObjectEntries("Map", t.entries());
    }
  }
  for (const s of ["Error", "RegExp", "URL"]) o.prototype["$" + s] = function(t) {
    return `${s}(${t})`;
  };
  for (const s of ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]) o.prototype["$" + s] = function(t) {
    return `${s}[${t.join(",")}]`;
  };
  for (const s of ["BigInt64Array", "BigUint64Array"]) o.prototype["$" + s] = function(t) {
    return `${s}[${t.join("n,")}${t.length > 0 ? "n" : ""}]`;
  };
  return o;
}();
function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize(object1) === serialize(object2)) {
    return true;
  }
  return false;
}
function diff(obj1, obj2) {
  const h1 = _toHashedObject(obj1);
  const h2 = _toHashedObject(obj2);
  return _diff(h1, h2);
}
function _diff(h1, h2) {
  const diffs = [];
  const allProps = /* @__PURE__ */ new Set([
    ...Object.keys(h1.props || {}),
    ...Object.keys(h2.props || {})
  ]);
  if (h1.props && h2.props) {
    for (const prop of allProps) {
      const p1 = h1.props[prop];
      const p2 = h2.props[prop];
      if (p1 && p2) {
        diffs.push(..._diff(h1.props?.[prop], h2.props?.[prop]));
      } else if (p1 || p2) {
        diffs.push(
          new DiffEntry((p2 || p1).key, p1 ? "removed" : "added", p2, p1)
        );
      }
    }
  }
  if (allProps.size === 0 && h1.hash !== h2.hash) {
    diffs.push(new DiffEntry((h2 || h1).key, "changed", h2, h1));
  }
  return diffs;
}
function _toHashedObject(obj, key = "") {
  if (obj && typeof obj !== "object") {
    return new DiffHashedObject(key, obj, serialize(obj));
  }
  const props = {};
  const hashes = [];
  for (const _key in obj) {
    props[_key] = _toHashedObject(obj[_key], key ? `${key}.${_key}` : _key);
    hashes.push(props[_key].hash);
  }
  return new DiffHashedObject(key, obj, `{${hashes.join(":")}}`, props);
}
class DiffEntry {
  constructor(key, type, newValue, oldValue) {
    this.key = key;
    this.type = type;
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    switch (this.type) {
      case "added": {
        return `Added   \`${this.key}\``;
      }
      case "removed": {
        return `Removed \`${this.key}\``;
      }
      case "changed": {
        return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || "-"}\` to \`${this.newValue.toString()}\``;
      }
    }
  }
}
class DiffHashedObject {
  constructor(key, value, hash, props) {
    this.key = key;
    this.value = value;
    this.hash = hash;
    this.props = props;
  }
  toString() {
    if (this.props) {
      return `{${Object.keys(this.props).join(",")}}`;
    } else {
      return JSON.stringify(this.value);
    }
  }
  toJSON() {
    const k = this.key || ".";
    if (this.props) {
      return `${k}({${Object.keys(this.props).join(",")}})`;
    }
    return `${k}(${this.value})`;
  }
}
function omit(data, keys) {
  const result = { ...data };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
function mergeClasses(appConfigClass, propClass) {
  if (!appConfigClass && !propClass) {
    return "";
  }
  return [
    ...Array.isArray(appConfigClass) ? appConfigClass : [appConfigClass],
    propClass
  ].filter(Boolean);
}
function buildTranslator(locale) {
  return (path, option) => translate(path, option, unref(locale));
}
function translate(path, option, locale) {
  const prop = get(locale, `messages.${path}`, path);
  return prop.replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  );
}
function buildLocaleContext(locale) {
  const lang = computed(() => unref(locale).name);
  const code = computed(() => unref(locale).code);
  const dir = computed(() => unref(locale).dir);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(locale)
  };
}
const en = /* @__PURE__ */ defineLocale({
  name: "English",
  code: "en",
  messages: {
    inputMenu: {
      noMatch: "No matching data",
      noData: "No data",
      create: 'Create "{label}"'
    },
    calendar: {
      prevYear: "Previous year",
      nextYear: "Next year",
      prevMonth: "Previous month",
      nextMonth: "Next month"
    },
    inputNumber: {
      increment: "Increment",
      decrement: "Decrement"
    },
    commandPalette: {
      placeholder: "Type a command or search...",
      noMatch: "No matching data",
      noData: "No data",
      close: "Close",
      back: "Back"
    },
    selectMenu: {
      noMatch: "No matching data",
      noData: "No data",
      create: 'Create "{label}"',
      search: "Search..."
    },
    toast: {
      close: "Close"
    },
    carousel: {
      prev: "Prev",
      next: "Next",
      dots: "Choose slide to display",
      goto: "Go to slide {slide}"
    },
    modal: {
      close: "Close"
    },
    slideover: {
      close: "Close"
    },
    alert: {
      close: "Close"
    },
    table: {
      noData: "No data"
    }
  }
});
const localeContextInjectionKey = Symbol.for("nuxt-ui.locale-context");
const _useLocale = (localeOverrides) => {
  const locale = localeOverrides || toRef$1(inject(localeContextInjectionKey, en));
  return buildLocaleContext(computed(() => locale.value || en));
};
const useLocale = /* @__PURE__ */ createSharedComposable(_useLocale);
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
function getColor(color, shade) {
  if (color in l && typeof l[color] === "object" && shade in l[color]) {
    return l[color][shade];
  }
  return "";
}
function generateShades(key, value) {
  return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value, shade)});`).join("\n  ")}`;
}
function generateColor(key, shade) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}
const C_58_47Users_47eduardoc_47Documents_47repositories_47shared_45cp_45vue_47node_modules_47_46pnpm_47_64nuxt_43ui_643_463_460__64babel_43parse_5b281630bc34f8f6c46d98745ce85891_47node_modules_47_64nuxt_47ui_47dist_47runtime_47plugins_47colors_46js = defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  useNuxtApp();
  const root = computed(() => {
    const { neutral, ...colors2 } = appConfig.ui.colors;
    return `@layer base {
  :root {
  ${Object.entries(appConfig.ui.colors).map(([key, value]) => generateShades(key, value)).join("\n  ")}
  }
  :root, .light {
  ${Object.keys(colors2).map((key) => generateColor(key, 500)).join("\n  ")}
  }
  .dark {
  ${Object.keys(colors2).map((key) => generateColor(key, 400)).join("\n  ")}
  }
}`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors"
    }]
  };
  {
    const style = document.createElement("style");
    style.innerHTML = root.value;
    style.setAttribute("data-nuxt-ui-colors", "");
    document.head.appendChild(style);
    headData.script = [{
      innerHTML: "document.head.removeChild(document.querySelector('[data-nuxt-ui-colors]'))"
    }];
  }
  useHead(headData);
});
const C_58_47Users_47eduardoc_47Documents_47repositories_47shared_45cp_45vue_47node_modules_47_46pnpm_47_64nuxt_43ui_643_463_460__64babel_43parse_5b281630bc34f8f6c46d98745ce85891_47node_modules_47_64nuxt_47ui_47dist_47runtime_47vue_47plugins_47color_45mode_46js = {
  install() {
    useDark();
  }
};
const ui = {
  install(app2) {
    app2.use(C_58_47Users_47eduardoc_47Documents_47repositories_47shared_45cp_45vue_47node_modules_47_46pnpm_47_64nuxt_43ui_643_463_460__64babel_43parse_5b281630bc34f8f6c46d98745ce85891_47node_modules_47_64nuxt_47ui_47dist_47runtime_47vue_47plugins_47head_46js);
    app2.use(C_58_47Users_47eduardoc_47Documents_47repositories_47shared_45cp_45vue_47node_modules_47_46pnpm_47_64nuxt_43ui_643_463_460__64babel_43parse_5b281630bc34f8f6c46d98745ce85891_47node_modules_47_64nuxt_47ui_47dist_47runtime_47plugins_47colors_46js);
    app2.use(C_58_47Users_47eduardoc_47Documents_47repositories_47shared_45cp_45vue_47node_modules_47_46pnpm_47_64nuxt_43ui_643_463_460__64babel_43parse_5b281630bc34f8f6c46d98745ce85891_47node_modules_47_64nuxt_47ui_47dist_47runtime_47vue_47plugins_47color_45mode_46js);
  }
};
function renderSlotFragments(children) {
  if (!children)
    return [];
  return children.flatMap((child) => {
    if (child.type === Fragment)
      return renderSlotFragments(child.children);
    return [child];
  });
}
const Slot = defineComponent({
  name: "PrimitiveSlot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default)
        return null;
      const children = renderSlotFragments(slots.default());
      const firstNonCommentChildrenIndex = children.findIndex((child) => child.type !== Comment);
      if (firstNonCommentChildrenIndex === -1)
        return children;
      const firstNonCommentChildren = children[firstNonCommentChildrenIndex];
      delete firstNonCommentChildren.props?.ref;
      const mergedProps = firstNonCommentChildren.props ? mergeProps(attrs, firstNonCommentChildren.props) : attrs;
      const cloned = cloneVNode({ ...firstNonCommentChildren, props: {} }, mergedProps);
      if (children.length === 1)
        return cloned;
      children[firstNonCommentChildrenIndex] = cloned;
      return children;
    };
  }
});
const SELF_CLOSING_TAGS = ["area", "img", "input"];
const Primitive = defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(props, { attrs, slots }) {
    const asTag = props.asChild ? "template" : props.as;
    if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag))
      return () => h(asTag, attrs);
    if (asTag !== "template")
      return () => h(props.as, attrs, { default: slots.default });
    return () => h(Slot, attrs, { default: slots.default });
  }
});
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "VisuallyHidden",
  props: {
    feature: { default: "focusable" },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "aria-hidden": _ctx.feature === "focusable" ? "true" : void 0,
        "data-hidden": _ctx.feature === "fully-hidden" ? "" : void 0,
        tabindex: _ctx.feature === "fully-hidden" ? "-1" : void 0,
        style: {
          // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
          position: "absolute",
          border: 0,
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          wordWrap: "normal"
        }
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-hidden", "data-hidden", "tabindex"]);
    };
  }
});
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const isDef = (val) => typeof val !== "undefined";
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  const isPending = shallowRef(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    if (immediateCallback)
      cb();
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, toValue(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
function useTimeout(interval = 1e3, options = {}) {
  const {
    controls: exposeControls = false,
    callback
  } = options;
  const controls = useTimeoutFn(
    callback != null ? callback : noop,
    interval,
    options
  );
  const ready = computed(() => !controls.isPending.value);
  if (exposeControls) {
    return {
      ready,
      ...controls
    };
  } else {
    return ready;
  }
}
function watchImmediate(source, cb, options) {
  return watch(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}
const defaultWindow = isClient ? window : void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(
    () => {
      var _a, _b;
      return [
        (_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
        toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
        toArray(unref(firstParamTargets.value ? args[2] : args[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        toValue(firstParamTargets.value ? args[3] : args[2])
      ];
    },
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup();
      if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
        return;
      const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
      cleanups.push(
        ...raw_targets.flatMap(
          (el) => raw_events.flatMap(
            (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
          )
        )
      );
    },
    { flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop;
}
function useMounted() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
function createKeyPredicate(keyFilter) {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const {
    target = defaultWindow,
    eventName = "keydown",
    passive = false,
    dedupe = false
  } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (e.repeat && toValue(dedupe))
      return;
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    fpsLimit = void 0,
    window: window2 = defaultWindow,
    once = false
  } = options;
  const isActive = shallowRef(false);
  const intervalLimit = computed(() => {
    return fpsLimit ? 1e3 / toValue(fpsLimit) : null;
  });
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2)
      return;
    if (!previousFrameTimestamp)
      previousFrameTimestamp = timestamp2;
    const delta = timestamp2 - previousFrameTimestamp;
    if (intervalLimit.value && delta < intervalLimit.value) {
      rafId = window2.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp2;
    fn({ delta, timestamp: timestamp2 });
    if (once) {
      isActive.value = false;
      rafId = null;
      return;
    }
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
  let event = eventName;
  if (!key) {
    key = "modelValue";
  }
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue2 = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value);
    } else {
      _emit(event, value);
    }
  };
  if (passive) {
    const initialValue = getValue2();
    const proxy = ref(initialValue);
    let isUpdating = false;
    watch(
      () => props[key],
      (v) => {
        if (!isUpdating) {
          isUpdating = true;
          proxy.value = cloneFn(v);
          nextTick(() => isUpdating = false);
        }
      }
    );
    watch(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key] || deep))
          triggerEmit(v);
      },
      { deep }
    );
    return proxy;
  } else {
    return computed({
      get() {
        return getValue2();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }
}
function createContext(providerComponentName, contextName) {
  const symbolDescription = typeof providerComponentName === "string" && !contextName ? `${providerComponentName}Context` : contextName;
  const injectionKey = Symbol(symbolDescription);
  const injectContext = (fallback) => {
    const context2 = inject(injectionKey, fallback);
    if (context2)
      return context2;
    if (context2 === null)
      return context2;
    throw new Error(
      `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(
        ", "
      )}` : `\`${providerComponentName}\``}`
    );
  };
  const provideContext = (contextValue) => {
    provide(injectionKey, contextValue);
    return contextValue;
  };
  return [injectContext, provideContext];
}
function isNullish(value) {
  return value === null || value === void 0;
}
const [injectConfigProviderContext, provideConfigProviderContext] = createContext("ConfigProvider");
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ConfigProvider",
  props: {
    dir: { default: "ltr" },
    locale: { default: "en" },
    scrollBody: { type: [Boolean, Object], default: true },
    nonce: { default: void 0 },
    useId: { type: Function, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { dir, locale, scrollBody, nonce } = toRefs(props);
    provideConfigProviderContext({
      dir,
      locale,
      scrollBody,
      nonce,
      useId: props.useId
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
function useForwardExpose() {
  const instance = getCurrentInstance();
  const currentRef = ref();
  const currentElement = computed(() => {
    return ["#text", "#comment"].includes(currentRef.value?.$el.nodeName) ? currentRef.value?.$el.nextElementSibling : unrefElement(currentRef);
  });
  const localExpose = Object.assign({}, instance.exposed);
  const ret = {};
  for (const key in instance.props) {
    Object.defineProperty(ret, key, {
      enumerable: true,
      configurable: true,
      get: () => instance.props[key]
    });
  }
  if (Object.keys(localExpose).length > 0) {
    for (const key in localExpose) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        configurable: true,
        get: () => localExpose[key]
      });
    }
  }
  Object.defineProperty(ret, "$el", {
    enumerable: true,
    configurable: true,
    get: () => instance.vnode.el
  });
  instance.exposed = ret;
  function forwardRef(ref2) {
    currentRef.value = ref2;
    if (!ref2)
      return;
    Object.defineProperty(ret, "$el", {
      enumerable: true,
      configurable: true,
      get: () => ref2 instanceof Element ? ref2 : ref2.$el
    });
    instance.exposed = ret;
  }
  return { forwardRef, currentRef, currentElement };
}
function useStateMachine(initialState, machine) {
  const state = ref(initialState);
  function reducer(event) {
    const nextState = machine[state.value][event];
    return nextState ?? state.value;
  }
  const dispatch = (event) => {
    state.value = reducer(event);
  };
  return {
    state,
    dispatch
  };
}
function usePresence(present, node) {
  const stylesRef = ref({});
  const prevAnimationNameRef = ref("none");
  const prevPresentRef = ref(present);
  const initialState = present.value ? "mounted" : "unmounted";
  let timeoutId;
  const ownerWindow = node.value?.ownerDocument.defaultView ?? defaultWindow;
  const { state, dispatch } = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  const dispatchCustomEvent = (name) => {
    if (isClient) {
      const customEvent = new CustomEvent(name, { bubbles: false, cancelable: false });
      node.value?.dispatchEvent(customEvent);
    }
  };
  watch(
    present,
    async (currentPresent, prevPresent) => {
      const hasPresentChanged = prevPresent !== currentPresent;
      await nextTick();
      if (hasPresentChanged) {
        const prevAnimationName = prevAnimationNameRef.value;
        const currentAnimationName = getAnimationName(node.value);
        if (currentPresent) {
          dispatch("MOUNT");
          dispatchCustomEvent("enter");
          if (currentAnimationName === "none")
            dispatchCustomEvent("after-enter");
        } else if (currentAnimationName === "none" || currentAnimationName === "undefined" || stylesRef.value?.display === "none") {
          dispatch("UNMOUNT");
          dispatchCustomEvent("leave");
          dispatchCustomEvent("after-leave");
        } else {
          const isAnimating = prevAnimationName !== currentAnimationName;
          if (prevPresent && isAnimating) {
            dispatch("ANIMATION_OUT");
            dispatchCustomEvent("leave");
          } else {
            dispatch("UNMOUNT");
            dispatchCustomEvent("after-leave");
          }
        }
      }
    },
    { immediate: true }
  );
  const handleAnimationEnd = (event) => {
    const currentAnimationName = getAnimationName(node.value);
    const isCurrentAnimation = currentAnimationName.includes(
      event.animationName
    );
    const directionName = state.value === "mounted" ? "enter" : "leave";
    if (event.target === node.value && isCurrentAnimation) {
      dispatchCustomEvent(`after-${directionName}`);
      dispatch("ANIMATION_END");
      if (!prevPresentRef.value) {
        const currentFillMode = node.value.style.animationFillMode;
        node.value.style.animationFillMode = "forwards";
        timeoutId = ownerWindow?.setTimeout(() => {
          if (node.value?.style.animationFillMode === "forwards") {
            node.value.style.animationFillMode = currentFillMode;
          }
        });
      }
    }
    if (event.target === node.value && currentAnimationName === "none")
      dispatch("ANIMATION_END");
  };
  const handleAnimationStart = (event) => {
    if (event.target === node.value) {
      prevAnimationNameRef.value = getAnimationName(node.value);
    }
  };
  const watcher = watch(
    node,
    (newNode, oldNode) => {
      if (newNode) {
        stylesRef.value = getComputedStyle(newNode);
        newNode.addEventListener("animationstart", handleAnimationStart);
        newNode.addEventListener("animationcancel", handleAnimationEnd);
        newNode.addEventListener("animationend", handleAnimationEnd);
      } else {
        dispatch("ANIMATION_END");
        if (timeoutId !== void 0)
          ownerWindow?.clearTimeout(timeoutId);
        oldNode?.removeEventListener("animationstart", handleAnimationStart);
        oldNode?.removeEventListener("animationcancel", handleAnimationEnd);
        oldNode?.removeEventListener("animationend", handleAnimationEnd);
      }
    },
    { immediate: true }
  );
  const stateWatcher = watch(state, () => {
    const currentAnimationName = getAnimationName(node.value);
    prevAnimationNameRef.value = state.value === "mounted" ? currentAnimationName : "none";
  });
  onUnmounted(() => {
    watcher();
    stateWatcher();
  });
  const isPresent = computed(
    () => ["mounted", "unmountSuspended"].includes(state.value)
  );
  return {
    isPresent
  };
}
function getAnimationName(node) {
  return node ? getComputedStyle(node).animationName || "none" : "none";
}
const Presence = defineComponent({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: true
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(props, { slots, expose }) {
    const { present, forceMount } = toRefs(props);
    const node = ref();
    const { isPresent } = usePresence(present, node);
    expose({ present: isPresent });
    let children = slots.default({ present: isPresent.value });
    children = renderSlotFragments(children || []);
    const instance = getCurrentInstance();
    if (children && children?.length > 1) {
      const componentName = instance?.parent?.type.name ? `<${instance.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((line) => `  - ${line}`).join("\n")
        ].join("\n")
      );
    }
    return () => {
      if (forceMount.value || present.value || isPresent.value) {
        return h(slots.default({ present: isPresent.value })[0], {
          ref: (v) => {
            const el = unrefElement(v);
            if (typeof el?.hasAttribute === "undefined")
              return el;
            if (el?.hasAttribute("data-reka-popper-content-wrapper"))
              node.value = el.firstElementChild;
            else
              node.value = el;
            return el;
          }
        });
      } else {
        return null;
      }
    };
  }
});
function useEmitAsProps(emit) {
  const vm = getCurrentInstance();
  const events = vm?.type.emits;
  const result = {};
  if (!events?.length) {
    console.warn(
      `No emitted event found. Please check component: ${vm?.type.__name}`
    );
  }
  events?.forEach((ev) => {
    result[toHandlerKey(camelize(ev))] = (...arg) => emit(ev, ...arg);
  });
  return result;
}
function getActiveElement() {
  let activeElement = document.activeElement;
  if (activeElement == null) {
    return null;
  }
  while (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = getActiveElement();
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (getActiveElement() !== previouslyFocusedElement)
      return true;
  }
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = getActiveElement();
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select) {
      element.select();
    }
  }
}
const context = reactive({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const isMounted = useMounted();
    return (_ctx, _cache) => {
      return unref(isMounted) || _ctx.forceMount ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: _ctx.to,
        disabled: _ctx.disabled,
        defer: _ctx.defer
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["to", "disabled", "defer"])) : createCommentVNode("", true);
    };
  }
});
function useForwardProps(props) {
  const vm = getCurrentInstance();
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
    const defaultValue = (vm?.type.props[curr]).default;
    if (defaultValue !== void 0)
      prev[curr] = defaultValue;
    return prev;
  }, {});
  const refProps = toRef$1(props);
  return computed(() => {
    const preservedProps = {};
    const assignedProps = vm?.vnode.props ?? {};
    Object.keys(assignedProps).forEach((key) => {
      preservedProps[camelize(key)] = assignedProps[key];
    });
    return Object.keys({ ...defaultProps, ...preservedProps }).reduce((prev, curr) => {
      if (refProps.value[curr] !== void 0)
        prev[curr] = refProps.value[curr];
      return prev;
    }, {});
  });
}
function useForwardPropsEmits(props, emit) {
  const parsedProps = useForwardProps(props);
  const emitsAsProps = emit ? useEmitAsProps(emit) : {};
  return computed(() => ({
    ...parsedProps.value,
    ...emitsAsProps
  }));
}
function usePrimitiveElement() {
  const primitiveElement = ref();
  const currentElement = computed(() => ["#text", "#comment"].includes(primitiveElement.value?.$el.nodeName) ? primitiveElement.value?.$el.nextElementSibling : unrefElement(primitiveElement));
  return {
    primitiveElement,
    currentElement
  };
}
const ITEM_DATA_ATTR = "data-reka-collection-item";
function useCollection(options = {}) {
  const { key = "", isProvider = false } = options;
  const injectionKey = `${key}CollectionProvider`;
  let context2;
  if (isProvider) {
    const itemMap = ref(/* @__PURE__ */ new Map());
    const collectionRef = ref();
    context2 = {
      collectionRef,
      itemMap
    };
    provide(injectionKey, context2);
  } else {
    context2 = inject(injectionKey);
  }
  const getItems = (includeDisabledItem = false) => {
    const collectionNode = context2.collectionRef.value;
    if (!collectionNode)
      return [];
    const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
    const items = Array.from(context2.itemMap.value.values());
    const orderedItems = items.sort(
      (a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref)
    );
    if (includeDisabledItem)
      return orderedItems;
    else
      return orderedItems.filter((i) => i.ref.dataset.disabled !== "");
  };
  const CollectionSlot = defineComponent({
    name: "CollectionSlot",
    setup(_, { slots }) {
      const { primitiveElement, currentElement } = usePrimitiveElement();
      watch(currentElement, () => {
        context2.collectionRef.value = currentElement.value;
      });
      return () => h(Slot, { ref: primitiveElement }, slots);
    }
  });
  const CollectionItem = defineComponent({
    name: "CollectionItem",
    inheritAttrs: false,
    props: {
      value: {
        // It accepts any value
        validator: () => true
      }
    },
    setup(props, { slots, attrs }) {
      const { primitiveElement, currentElement } = usePrimitiveElement();
      watchEffect((cleanupFn) => {
        if (currentElement.value) {
          const key2 = markRaw(currentElement.value);
          context2.itemMap.value.set(key2, { ref: currentElement.value, value: props.value });
          cleanupFn(() => context2.itemMap.value.delete(key2));
        }
      });
      return () => h(Slot, { ...attrs, [ITEM_DATA_ATTR]: "", ref: primitiveElement }, slots);
    }
  });
  const reactiveItems = computed(() => Array.from(context2.itemMap.value.values()));
  const itemMapSize = computed(() => context2.itemMap.value.size);
  return { getItems, reactiveItems, itemMapSize, CollectionSlot, CollectionItem };
}
const DEFAULT_MAX = 100;
const [injectProgressRootContext, provideProgressRootContext] = createContext("ProgressRoot");
const isNumber = (v) => typeof v === "number";
function validateValue(value, max) {
  const isValidValueError = isNullish(value) || isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0;
  if (isValidValueError)
    return value;
  console.error(`Invalid prop \`value\` of value \`${value}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`);
  return null;
}
function validateMax(max) {
  const isValidMaxError = isNumber(max) && !Number.isNaN(max) && max > 0;
  if (isValidMaxError)
    return max;
  console.error(
    `Invalid prop \`max\` of value \`${max}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
  );
  return DEFAULT_MAX;
}
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: DEFAULT_MAX },
    getValueLabel: { type: Function, default: (value, max) => isNumber(value) ? `${Math.round(value / max * DEFAULT_MAX)}%` : void 0 },
    getValueText: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useForwardExpose();
    const modelValue = useVModel(props, "modelValue", emit, {
      passive: props.modelValue === void 0
    });
    const max = useVModel(props, "max", emit, {
      passive: props.max === void 0
    });
    watch(
      () => modelValue.value,
      async (value) => {
        const correctedValue = validateValue(value, props.max);
        if (correctedValue !== value) {
          await nextTick();
          modelValue.value = correctedValue;
        }
      },
      { immediate: true }
    );
    watch(
      () => props.max,
      (newMax) => {
        const correctedMax = validateMax(props.max);
        if (correctedMax !== newMax)
          max.value = correctedMax;
      },
      { immediate: true }
    );
    const progressState = computed(() => {
      if (isNullish(modelValue.value))
        return "indeterminate";
      if (modelValue.value === max.value)
        return "complete";
      return "loading";
    });
    provideProgressRootContext({
      modelValue,
      max,
      progressState
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "aria-valuemax": unref(max),
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(unref(modelValue)) ? unref(modelValue) : void 0,
        "aria-valuetext": _ctx.getValueText?.(unref(modelValue), unref(max)),
        "aria-label": _ctx.getValueLabel(unref(modelValue), unref(max)),
        role: "progressbar",
        "data-state": progressState.value,
        "data-value": unref(modelValue) ?? void 0,
        "data-max": unref(max)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
        ]),
        _: 3
      }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]);
    };
  }
});
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectProgressRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "data-state": unref(rootContext).progressState.value,
        "data-value": unref(rootContext).modelValue?.value ?? void 0,
        "data-max": unref(rootContext).max.value
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
});
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "ToastAnnounceExclude",
  props: {
    altText: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-reka-toast-announce-exclude": "",
        "data-reka-toast-announce-alt": _ctx.altText || void 0
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-reka-toast-announce-alt"]);
    };
  }
});
const [injectToastProviderContext, provideToastProviderContext] = createContext("ToastProvider");
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ToastProvider",
  props: {
    label: { default: "Notification" },
    duration: { default: 5e3 },
    swipeDirection: { default: "right" },
    swipeThreshold: { default: 50 }
  },
  setup(__props) {
    const props = __props;
    const { label, duration, swipeDirection, swipeThreshold } = toRefs(props);
    useCollection({ isProvider: true });
    const viewport = ref();
    const toastCount = ref(0);
    const isFocusedToastEscapeKeyDownRef = ref(false);
    const isClosePausedRef = ref(false);
    if (props.label && typeof props.label === "string" && !props.label.trim()) {
      const error = "Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.";
      throw new Error(error);
    }
    provideToastProviderContext({
      label,
      duration,
      swipeDirection,
      swipeThreshold,
      toastCount,
      viewport,
      onViewportChange(el) {
        viewport.value = el;
      },
      onToastAdd() {
        toastCount.value++;
      },
      onToastRemove() {
        toastCount.value--;
      },
      isFocusedToastEscapeKeyDownRef,
      isClosePausedRef
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "ToastAnnounce",
  setup(__props) {
    const providerContext = injectToastProviderContext();
    const isAnnounced = useTimeout(1e3);
    const renderAnnounceText = ref(false);
    useRafFn(() => {
      renderAnnounceText.value = true;
    });
    return (_ctx, _cache) => {
      return unref(isAnnounced) || renderAnnounceText.value ? (openBlock(), createBlock(unref(_sfc_main$u), { key: 0 }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(unref(providerContext).label.value) + " ", 1),
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      })) : createCommentVNode("", true);
    };
  }
});
const TOAST_SWIPE_START = "toast.swipeStart";
const TOAST_SWIPE_MOVE = "toast.swipeMove";
const TOAST_SWIPE_CANCEL = "toast.swipeCancel";
const TOAST_SWIPE_END = "toast.swipeEnd";
const VIEWPORT_PAUSE = "toast.viewportPause";
const VIEWPORT_RESUME = "toast.viewportResume";
function handleAndDispatchCustomEvent(name, handler, detail) {
  const currentTarget = detail.originalEvent.currentTarget;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail
  });
  if (handler)
    currentTarget.addEventListener(name, handler, { once: true });
  currentTarget.dispatchEvent(event);
}
function isDeltaInDirection(delta, direction, threshold = 0) {
  const deltaX = Math.abs(delta.x);
  const deltaY = Math.abs(delta.y);
  const isDeltaX = deltaX > deltaY;
  if (direction === "left" || direction === "right")
    return isDeltaX && deltaX > threshold;
  else
    return !isDeltaX && deltaY > threshold;
}
function isHTMLElement(node) {
  return node.nodeType === node.ELEMENT_NODE;
}
function getAnnounceTextContent(container) {
  const textContent = [];
  const childNodes = Array.from(container.childNodes);
  childNodes.forEach((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent)
      textContent.push(node.textContent);
    if (isHTMLElement(node)) {
      const isHidden = node.ariaHidden || node.hidden || node.style.display === "none";
      const isExcluded = node.dataset.rekaToastAnnounceExclude === "";
      if (!isHidden) {
        if (isExcluded) {
          const altText = node.dataset.rekaToastAnnounceAlt;
          if (altText)
            textContent.push(altText);
        } else {
          textContent.push(...getAnnounceTextContent(node));
        }
      }
    }
  });
  return textContent;
}
const [injectToastRootContext, provideToastRootContext] = createContext("ToastRoot");
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ToastRootImpl",
  props: {
    type: {},
    open: { type: Boolean, default: false },
    duration: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  emits: ["close", "escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const providerContext = injectToastProviderContext();
    const pointerStartRef = ref(null);
    const swipeDeltaRef = ref(null);
    const duration = computed(
      () => typeof props.duration === "number" ? props.duration : providerContext.duration.value
    );
    const closeTimerStartTimeRef = ref(0);
    const closeTimerRemainingTimeRef = ref(duration.value);
    const closeTimerRef = ref(0);
    const remainingTime = ref(duration.value);
    const remainingRaf = useRafFn(() => {
      const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef.value;
      remainingTime.value = Math.max(closeTimerRemainingTimeRef.value - elapsedTime, 0);
    }, { fpsLimit: 60 });
    function startTimer(duration2) {
      if (duration2 <= 0 || duration2 === Number.POSITIVE_INFINITY)
        return;
      if (!isClient)
        return;
      window.clearTimeout(closeTimerRef.value);
      closeTimerStartTimeRef.value = (/* @__PURE__ */ new Date()).getTime();
      closeTimerRef.value = window.setTimeout(handleClose, duration2);
    }
    function handleClose(event) {
      const isNonPointerEvent = event?.pointerType === "";
      const isFocusInToast = currentElement.value?.contains(getActiveElement());
      if (isFocusInToast && isNonPointerEvent)
        providerContext.viewport.value?.focus();
      if (isNonPointerEvent) {
        providerContext.isClosePausedRef.value = false;
      }
      emits("close");
    }
    const announceTextContent = computed(() => currentElement.value ? getAnnounceTextContent(currentElement.value) : null);
    if (props.type && !["foreground", "background"].includes(props.type)) {
      const error = "Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.";
      throw new Error(error);
    }
    watchEffect((cleanupFn) => {
      const viewport = providerContext.viewport.value;
      if (viewport) {
        const handleResume = () => {
          startTimer(closeTimerRemainingTimeRef.value);
          remainingRaf.resume();
          emits("resume");
        };
        const handlePause = () => {
          const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef.value;
          closeTimerRemainingTimeRef.value = closeTimerRemainingTimeRef.value - elapsedTime;
          window.clearTimeout(closeTimerRef.value);
          remainingRaf.pause();
          emits("pause");
        };
        viewport.addEventListener(VIEWPORT_PAUSE, handlePause);
        viewport.addEventListener(VIEWPORT_RESUME, handleResume);
        return () => {
          viewport.removeEventListener(VIEWPORT_PAUSE, handlePause);
          viewport.removeEventListener(VIEWPORT_RESUME, handleResume);
        };
      }
    });
    watch(() => [props.open, duration.value], () => {
      closeTimerRemainingTimeRef.value = duration.value;
      if (props.open && !providerContext.isClosePausedRef.value)
        startTimer(duration.value);
    }, { immediate: true });
    onKeyStroke("Escape", (event) => {
      emits("escapeKeyDown", event);
      if (!event.defaultPrevented) {
        providerContext.isFocusedToastEscapeKeyDownRef.value = true;
        handleClose();
      }
    });
    onMounted(() => {
      providerContext.onToastAdd();
    });
    onUnmounted(() => {
      providerContext.onToastRemove();
    });
    provideToastRootContext({ onClose: handleClose });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        announceTextContent.value ? (openBlock(), createBlock(_sfc_main$n, {
          key: 0,
          role: "alert",
          "aria-live": _ctx.type === "foreground" ? "assertive" : "polite",
          "aria-atomic": "true"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(announceTextContent.value), 1)
          ]),
          _: 1
        }, 8, ["aria-live"])) : createCommentVNode("", true),
        unref(providerContext).viewport.value ? (openBlock(), createBlock(Teleport, {
          key: 1,
          to: unref(providerContext).viewport.value
        }, [
          createVNode(unref(CollectionItem), null, {
            default: withCtx(() => [
              createVNode(unref(Primitive), mergeProps({
                ref: unref(forwardRef),
                role: "alert",
                "aria-live": "off",
                "aria-atomic": "true",
                tabindex: "0"
              }, _ctx.$attrs, {
                as: _ctx.as,
                "as-child": _ctx.asChild,
                "data-state": _ctx.open ? "open" : "closed",
                "data-swipe-direction": unref(providerContext).swipeDirection.value,
                style: { userSelect: "none", touchAction: "none" },
                onPointerdown: _cache[0] || (_cache[0] = withModifiers((event) => {
                  pointerStartRef.value = { x: event.clientX, y: event.clientY };
                }, ["left"])),
                onPointermove: _cache[1] || (_cache[1] = (event) => {
                  if (!pointerStartRef.value) return;
                  const x = event.clientX - pointerStartRef.value.x;
                  const y = event.clientY - pointerStartRef.value.y;
                  const hasSwipeMoveStarted = Boolean(swipeDeltaRef.value);
                  const isHorizontalSwipe = ["left", "right"].includes(unref(providerContext).swipeDirection.value);
                  const clamp = ["left", "up"].includes(unref(providerContext).swipeDirection.value) ? Math.min : Math.max;
                  const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
                  const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
                  const moveStartBuffer = event.pointerType === "touch" ? 10 : 2;
                  const delta = { x: clampedX, y: clampedY };
                  const eventDetail = { originalEvent: event, delta };
                  if (hasSwipeMoveStarted) {
                    swipeDeltaRef.value = delta;
                    unref(handleAndDispatchCustomEvent)(unref(TOAST_SWIPE_MOVE), (ev) => emits("swipeMove", ev), eventDetail);
                  } else if (unref(isDeltaInDirection)(delta, unref(providerContext).swipeDirection.value, moveStartBuffer)) {
                    swipeDeltaRef.value = delta;
                    unref(handleAndDispatchCustomEvent)(unref(TOAST_SWIPE_START), (ev) => emits("swipeStart", ev), eventDetail);
                    event.target.setPointerCapture(event.pointerId);
                  } else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
                    pointerStartRef.value = null;
                  }
                }),
                onPointerup: _cache[2] || (_cache[2] = (event) => {
                  const delta = swipeDeltaRef.value;
                  const target = event.target;
                  if (target.hasPointerCapture(event.pointerId)) {
                    target.releasePointerCapture(event.pointerId);
                  }
                  swipeDeltaRef.value = null;
                  pointerStartRef.value = null;
                  if (delta) {
                    const toast = event.currentTarget;
                    const eventDetail = { originalEvent: event, delta };
                    if (unref(isDeltaInDirection)(delta, unref(providerContext).swipeDirection.value, unref(providerContext).swipeThreshold.value)) {
                      unref(handleAndDispatchCustomEvent)(unref(TOAST_SWIPE_END), (ev) => emits("swipeEnd", ev), eventDetail);
                    } else {
                      unref(handleAndDispatchCustomEvent)(unref(TOAST_SWIPE_CANCEL), (ev) => emits("swipeCancel", ev), eventDetail);
                    }
                    toast?.addEventListener("click", (event2) => event2.preventDefault(), {
                      once: true
                    });
                  }
                })
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {
                    remaining: remainingTime.value,
                    duration: duration.value
                  })
                ]),
                _: 3
              }, 16, ["as", "as-child", "data-state", "data-swipe-direction"])
            ]),
            _: 3
          })
        ], 8, ["to"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "ToastClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectToastRootContext();
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$p, { "as-child": "" }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps(props, {
            ref: unref(forwardRef),
            type: _ctx.as === "button" ? "button" : void 0,
            onClick: unref(rootContext).onClose
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["type", "onClick"])
        ]),
        _: 3
      });
    };
  }
});
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "ToastAction",
  props: {
    altText: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    if (!props.altText)
      throw new Error("Missing prop `altText` expected on `ToastAction`");
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return _ctx.altText ? (openBlock(), createBlock(_sfc_main$p, {
        key: 0,
        "alt-text": _ctx.altText,
        "as-child": ""
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$l, {
            ref: unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["alt-text"])) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "ToastDescription",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), normalizeProps$1(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "ToastPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$s), normalizeProps$1(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "ToastRoot",
  props: {
    defaultOpen: { type: Boolean, default: true },
    forceMount: { type: Boolean },
    type: { default: "foreground" },
    open: { type: Boolean, default: void 0 },
    duration: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef } = useForwardExpose();
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(open)
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$m, mergeProps({
            ref: unref(forwardRef),
            open: unref(open),
            type: _ctx.type,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            duration: _ctx.duration
          }, _ctx.$attrs, {
            onClose: _cache[0] || (_cache[0] = ($event) => open.value = false),
            onPause: _cache[1] || (_cache[1] = ($event) => emits("pause")),
            onResume: _cache[2] || (_cache[2] = ($event) => emits("resume")),
            onEscapeKeyDown: _cache[3] || (_cache[3] = ($event) => emits("escapeKeyDown", $event)),
            onSwipeStart: _cache[4] || (_cache[4] = (event) => {
              emits("swipeStart", event);
              if (!event.defaultPrevented) {
                event.currentTarget.setAttribute("data-swipe", "start");
              }
            }),
            onSwipeMove: _cache[5] || (_cache[5] = (event) => {
              emits("swipeMove", event);
              if (!event.defaultPrevented) {
                const { x, y } = event.detail.delta;
                const target = event.currentTarget;
                target.setAttribute("data-swipe", "move");
                target.style.setProperty("--reka-toast-swipe-move-x", `${x}px`);
                target.style.setProperty("--reka-toast-swipe-move-y", `${y}px`);
              }
            }),
            onSwipeCancel: _cache[6] || (_cache[6] = (event) => {
              emits("swipeCancel", event);
              if (!event.defaultPrevented) {
                const target = event.currentTarget;
                target.setAttribute("data-swipe", "cancel");
                target.style.removeProperty("--reka-toast-swipe-move-x");
                target.style.removeProperty("--reka-toast-swipe-move-y");
                target.style.removeProperty("--reka-toast-swipe-end-x");
                target.style.removeProperty("--reka-toast-swipe-end-y");
              }
            }),
            onSwipeEnd: _cache[7] || (_cache[7] = (event) => {
              emits("swipeEnd", event);
              if (!event.defaultPrevented) {
                const { x, y } = event.detail.delta;
                const target = event.currentTarget;
                target.setAttribute("data-swipe", "end");
                target.style.removeProperty("--reka-toast-swipe-move-x");
                target.style.removeProperty("--reka-toast-swipe-move-y");
                target.style.setProperty("--reka-toast-swipe-end-x", `${x}px`);
                target.style.setProperty("--reka-toast-swipe-end-y", `${y}px`);
                open.value = false;
              }
            })
          }), {
            default: withCtx(({ remaining, duration: _duration }) => [
              renderSlot(_ctx.$slots, "default", {
                remaining,
                duration: _duration,
                open: unref(open)
              })
            ]),
            _: 3
          }, 16, ["open", "type", "as", "as-child", "duration"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "ToastTitle",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), normalizeProps$1(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "FocusProxy",
  emits: ["focusFromOutsideViewport"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const providerContext = injectToastProviderContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$u), {
        "aria-hidden": "true",
        tabindex: "0",
        style: { "position": "fixed" },
        onFocus: _cache[0] || (_cache[0] = (event) => {
          const prevFocusedElement = event.relatedTarget;
          const isFocusFromOutsideViewport = !unref(providerContext).viewport.value?.contains(prevFocusedElement);
          if (isFocusFromOutsideViewport) emits("focusFromOutsideViewport");
        })
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "DismissableLayerBranch",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = useForwardExpose();
    onMounted(() => {
      context.branches.add(currentElement.value);
    });
    onUnmounted(() => {
      context.branches.delete(currentElement.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({ ref: unref(forwardRef) }, props), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ToastViewport",
  props: {
    hotkey: { default: () => ["F8"] },
    label: { type: [String, Function], default: "Notifications ({hotkey})" },
    asChild: { type: Boolean },
    as: { default: "ol" }
  },
  setup(__props) {
    const props = __props;
    const { hotkey, label } = toRefs(props);
    const { forwardRef, currentElement } = useForwardExpose();
    const { CollectionSlot, getItems } = useCollection();
    const providerContext = injectToastProviderContext();
    const hasToasts = computed(() => providerContext.toastCount.value > 0);
    const headFocusProxyRef = ref();
    const tailFocusProxyRef = ref();
    const hotkeyMessage = computed(() => hotkey.value.join("+").replace(/Key/g, "").replace(/Digit/g, ""));
    onKeyStroke(hotkey.value, () => {
      currentElement.value.focus();
    });
    onMounted(() => {
      providerContext.onViewportChange(currentElement.value);
    });
    watchEffect((cleanupFn) => {
      const viewport = currentElement.value;
      if (hasToasts.value && viewport) {
        const handlePause = () => {
          if (!providerContext.isClosePausedRef.value) {
            const pauseEvent = new CustomEvent(VIEWPORT_PAUSE);
            viewport.dispatchEvent(pauseEvent);
            providerContext.isClosePausedRef.value = true;
          }
        };
        const handleResume = () => {
          if (providerContext.isClosePausedRef.value) {
            const resumeEvent = new CustomEvent(VIEWPORT_RESUME);
            viewport.dispatchEvent(resumeEvent);
            providerContext.isClosePausedRef.value = false;
          }
        };
        const handleFocusOutResume = (event) => {
          const isFocusMovingOutside = !viewport.contains(event.relatedTarget);
          if (isFocusMovingOutside)
            handleResume();
        };
        const handlePointerLeaveResume = () => {
          const isFocusInside = viewport.contains(getActiveElement());
          if (!isFocusInside)
            handleResume();
        };
        const handleKeyDown = (event) => {
          const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
          const isTabKey = event.key === "Tab" && !isMetaKey;
          if (isTabKey) {
            const focusedElement = getActiveElement();
            const isTabbingBackwards = event.shiftKey;
            const targetIsViewport = event.target === viewport;
            if (targetIsViewport && isTabbingBackwards) {
              headFocusProxyRef.value?.focus();
              return;
            }
            const tabbingDirection = isTabbingBackwards ? "backwards" : "forwards";
            const sortedCandidates = getSortedTabbableCandidates({ tabbingDirection });
            const index = sortedCandidates.findIndex((candidate) => candidate === focusedElement);
            if (focusFirst(sortedCandidates.slice(index + 1))) {
              event.preventDefault();
            } else {
              isTabbingBackwards ? headFocusProxyRef.value?.focus() : tailFocusProxyRef.value?.focus();
            }
          }
        };
        viewport.addEventListener("focusin", handlePause);
        viewport.addEventListener("focusout", handleFocusOutResume);
        viewport.addEventListener("pointermove", handlePause);
        viewport.addEventListener("pointerleave", handlePointerLeaveResume);
        viewport.addEventListener("keydown", handleKeyDown);
        window.addEventListener("blur", handlePause);
        window.addEventListener("focus", handleResume);
        cleanupFn(() => {
          viewport.removeEventListener("focusin", handlePause);
          viewport.removeEventListener("focusout", handleFocusOutResume);
          viewport.removeEventListener("pointermove", handlePause);
          viewport.removeEventListener("pointerleave", handlePointerLeaveResume);
          viewport.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("blur", handlePause);
          window.removeEventListener("focus", handleResume);
        });
      }
    });
    function getSortedTabbableCandidates({ tabbingDirection }) {
      const toastItems = getItems().map((i) => i.ref);
      const tabbableCandidates = toastItems.map((toastNode) => {
        const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)];
        return tabbingDirection === "forwards" ? toastTabbableCandidates : toastTabbableCandidates.reverse();
      });
      return (tabbingDirection === "forwards" ? tabbableCandidates.reverse() : tabbableCandidates).flat();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$e), {
        role: "region",
        "aria-label": typeof unref(label) === "string" ? unref(label).replace("{hotkey}", hotkeyMessage.value) : unref(label)(hotkeyMessage.value),
        tabindex: "-1",
        style: normalizeStyle({
          // incase list has size when empty (e.g. padding), we remove pointer events so
          // it doesn't prevent interactions with page elements that it overlays
          pointerEvents: hasToasts.value ? void 0 : "none"
        })
      }, {
        default: withCtx(() => [
          hasToasts.value ? (openBlock(), createBlock(_sfc_main$f, {
            key: 0,
            ref: (node) => {
              headFocusProxyRef.value = unref(unrefElement)(node);
              return void 0;
            },
            onFocusFromOutsideViewport: _cache[0] || (_cache[0] = () => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "forwards"
              });
              unref(focusFirst)(tabbableCandidates);
            })
          }, null, 512)) : createCommentVNode("", true),
          createVNode(unref(CollectionSlot), null, {
            default: withCtx(() => [
              createVNode(unref(Primitive), mergeProps({
                ref: unref(forwardRef),
                tabindex: "-1",
                as: _ctx.as,
                "as-child": _ctx.asChild
              }, _ctx.$attrs), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["as", "as-child"])
            ]),
            _: 3
          }),
          hasToasts.value ? (openBlock(), createBlock(_sfc_main$f, {
            key: 1,
            ref: (node) => {
              tailFocusProxyRef.value = unref(unrefElement)(node);
              return void 0;
            },
            onFocusFromOutsideViewport: _cache[1] || (_cache[1] = () => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "backwards"
              });
              unref(focusFirst)(tabbableCandidates);
            })
          }, null, 512)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["aria-label", "style"]);
    };
  }
});
const [injectTooltipProviderContext, provideTooltipProviderContext] = createContext("TooltipProvider");
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TooltipProvider",
  props: {
    delayDuration: { default: 700 },
    skipDelayDuration: { default: 300 },
    disableHoverableContent: { type: Boolean, default: false },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { delayDuration, skipDelayDuration, disableHoverableContent, disableClosingTrigger, ignoreNonKeyboardFocus, disabled } = toRefs(props);
    useForwardExpose();
    const isOpenDelayed = ref(true);
    const isPointerInTransitRef = ref(false);
    const { start: startTimer, stop: clearTimer } = useTimeoutFn(() => {
      isOpenDelayed.value = true;
    }, skipDelayDuration, { immediate: false });
    provideTooltipProviderContext({
      isOpenDelayed,
      delayDuration,
      onOpen() {
        clearTimer();
        isOpenDelayed.value = false;
      },
      onClose() {
        startTimer();
      },
      isPointerInTransitRef,
      disableHoverableContent,
      disableClosingTrigger,
      disabled,
      ignoreNonKeyboardFocus
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
const portalTargetInjectionKey = Symbol("nuxt-ui.portal-target");
function usePortal(portal) {
  const portalTarget = inject(portalTargetInjectionKey, void 0);
  const to = computed(() => {
    if (typeof portal.value === "boolean" || portal.value === void 0) {
      return portalTarget?.value ?? "body";
    }
    return portal.value;
  });
  const disabled = computed(() => typeof portal.value === "boolean" ? !portal.value : false);
  provide(portalTargetInjectionKey, computed(() => to.value));
  return computed(() => ({
    to: to.value,
    disabled: disabled.value
  }));
}
function useToast() {
  const toasts = useState("toasts", () => []);
  const running = ref(false);
  const queue = [];
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  async function processQueue() {
    if (running.value || queue.length === 0) {
      return;
    }
    running.value = true;
    while (queue.length > 0) {
      const toast = queue.shift();
      await nextTick();
      toasts.value = [...toasts.value, toast].slice(-5);
    }
    running.value = false;
  }
  function add(toast) {
    const body = {
      id: generateId(),
      open: true,
      ...toast
    };
    queue.push(body);
    processQueue();
    return body;
  }
  function update(id, toast) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value[index] = {
        ...toasts.value[index],
        ...toast
      };
    }
  }
  function remove(id) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value[index] = {
        ...toasts.value[index],
        open: false
      };
    }
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 200);
  }
  function clear() {
    toasts.value = [];
  }
  return {
    toasts,
    add,
    update,
    remove,
    clear
  };
}
const _sfc_main$b = {
  __name: "Icon",
  props: {
    name: { type: String, required: true }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Icon), {
        icon: __props.name.replace(/^i-/, "")
      }, null, 8, ["icon"]);
    };
  }
};
const ImageComponent = "img";
const avatarGroupInjectionKey = Symbol("nuxt-ui.avatar-group");
function useAvatarGroup(props) {
  const avatarGroup = inject(avatarGroupInjectionKey, void 0);
  const size = computed(() => props.size ?? avatarGroup?.value.size);
  provide(avatarGroupInjectionKey, computed(() => ({ size: size.value })));
  return {
    size
  };
}
const theme$6 = {
  "slots": {
    "root": "relative inline-flex items-center justify-center shrink-0",
    "base": "rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap"
  },
  "variants": {
    "color": {
      "primary": "bg-primary",
      "secondary": "bg-secondary",
      "success": "bg-success",
      "info": "bg-info",
      "warning": "bg-warning",
      "error": "bg-error",
      "neutral": "bg-inverted"
    },
    "size": {
      "3xs": "h-[4px] min-w-[4px] text-[4px]",
      "2xs": "h-[5px] min-w-[5px] text-[5px]",
      "xs": "h-[6px] min-w-[6px] text-[6px]",
      "sm": "h-[7px] min-w-[7px] text-[7px]",
      "md": "h-[8px] min-w-[8px] text-[8px]",
      "lg": "h-[9px] min-w-[9px] text-[9px]",
      "xl": "h-[10px] min-w-[10px] text-[10px]",
      "2xl": "h-[11px] min-w-[11px] text-[11px]",
      "3xl": "h-[12px] min-w-[12px] text-[12px]"
    },
    "position": {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0"
    },
    "inset": {
      "false": ""
    },
    "standalone": {
      "false": "absolute"
    }
  },
  "compoundVariants": [
    {
      "position": "top-right",
      "inset": false,
      "class": "-translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "bottom-right",
      "inset": false,
      "class": "translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "top-left",
      "inset": false,
      "class": "-translate-y-1/2 -translate-x-1/2 transform"
    },
    {
      "position": "bottom-left",
      "inset": false,
      "class": "translate-y-1/2 -translate-x-1/2 transform"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "position": "top-right"
  }
};
const _sfc_main$a = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Chip",
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    text: { type: [String, Number], required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    position: { type: null, required: false },
    inset: { type: Boolean, required: false, default: false },
    standalone: { type: Boolean, required: false, default: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  }, {
    "show": { type: Boolean, ...{ default: true } },
    "showModifiers": {}
  }),
  emits: ["update:show"],
  setup(__props) {
    const props = __props;
    const show = useModel(__props, "show", { type: Boolean, ...{ default: true } });
    const { size } = useAvatarGroup(props);
    const appConfig = useAppConfig();
    const ui2 = computed(() => tv({ extend: tv(theme$6), ...appConfig.ui?.chip || {} })({
      color: props.color,
      size: size.value,
      position: props.position,
      inset: props.inset,
      standalone: props.standalone
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: __props.as,
        class: normalizeClass(ui2.value.root({ class: [props.ui?.root, props.class] }))
      }, {
        default: withCtx(() => [
          createVNode(unref(Slot), normalizeProps$1(guardReactiveProps(_ctx.$attrs)), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16),
          show.value ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(ui2.value.base({ class: props.ui?.base }))
          }, [
            renderSlot(_ctx.$slots, "content", {}, () => [
              createTextVNode(toDisplayString(__props.text), 1)
            ])
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["as", "class"]);
    };
  }
});
const theme$5 = {
  "slots": {
    "root": "inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle bg-elevated",
    "image": "h-full w-full rounded-[inherit] object-cover",
    "fallback": "font-medium leading-none text-muted truncate",
    "icon": "text-muted shrink-0"
  },
  "variants": {
    "size": {
      "3xs": {
        "root": "size-4 text-[8px]"
      },
      "2xs": {
        "root": "size-5 text-[10px]"
      },
      "xs": {
        "root": "size-6 text-xs"
      },
      "sm": {
        "root": "size-7 text-sm"
      },
      "md": {
        "root": "size-8 text-base"
      },
      "lg": {
        "root": "size-9 text-lg"
      },
      "xl": {
        "root": "size-10 text-xl"
      },
      "2xl": {
        "root": "size-11 text-[22px]"
      },
      "3xl": {
        "root": "size-12 text-2xl"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$9 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Avatar",
  props: {
    as: { type: null, required: false, default: "span" },
    src: { type: String, required: false },
    alt: { type: String, required: false },
    icon: { type: String, required: false },
    text: { type: String, required: false },
    size: { type: null, required: false },
    chip: { type: [Boolean, Object], required: false },
    class: { type: null, required: false },
    style: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const fallback = computed(() => props.text || (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2));
    const appConfig = useAppConfig();
    const { size } = useAvatarGroup(props);
    const ui2 = computed(() => tv({ extend: tv(theme$5), ...appConfig.ui?.avatar || {} })({
      size: size.value
    }));
    const sizePx = computed(() => ({
      "3xs": 16,
      "2xs": 20,
      "xs": 24,
      "sm": 28,
      "md": 32,
      "lg": 36,
      "xl": 40,
      "2xl": 44,
      "3xl": 48
    })[props.size || "md"]);
    const error = ref(false);
    watch(() => props.src, () => {
      if (error.value) {
        error.value = false;
      }
    });
    function onError() {
      error.value = true;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(props.chip ? _sfc_main$a : unref(Primitive)), mergeProps({ as: __props.as }, props.chip ? typeof props.chip === "object" ? { inset: true, ...props.chip } : { inset: true } : {}, {
        class: ui2.value.root({ class: [props.ui?.root, props.class] }),
        style: props.style
      }), {
        default: withCtx(() => [
          __props.src && !error.value ? (openBlock(), createBlock(resolveDynamicComponent(unref(ImageComponent)), mergeProps({
            key: 0,
            role: "img",
            src: __props.src,
            alt: __props.alt,
            width: sizePx.value,
            height: sizePx.value
          }, _ctx.$attrs, {
            class: ui2.value.image({ class: props.ui?.image }),
            onError
          }), null, 16, ["src", "alt", "width", "height", "class"])) : (openBlock(), createBlock(unref(Slot), normalizeProps$1(mergeProps({ key: 1 }, _ctx.$attrs)), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, () => [
                __props.icon ? (openBlock(), createBlock(_sfc_main$b, {
                  key: 0,
                  name: __props.icon,
                  class: normalizeClass(ui2.value.icon({ class: props.ui?.icon }))
                }, null, 8, ["name", "class"])) : (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(ui2.value.fallback({ class: props.ui?.fallback }))
                }, toDisplayString(fallback.value || " "), 3))
              ])
            ]),
            _: 3
          }, 16))
        ]),
        _: 3
      }, 16, ["as", "class", "style"]);
    };
  }
});
function useComponentIcons(componentProps) {
  const appConfig = useAppConfig();
  const props = computed(() => toValue(componentProps));
  const isLeading = computed(() => props.value.icon && props.value.leading || props.value.icon && !props.value.trailing || props.value.loading && !props.value.trailing || !!props.value.leadingIcon);
  const isTrailing = computed(() => props.value.icon && props.value.trailing || props.value.loading && props.value.trailing || !!props.value.trailingIcon);
  const leadingIconName = computed(() => {
    if (props.value.loading) {
      return props.value.loadingIcon || appConfig.ui.icons.loading;
    }
    return props.value.leadingIcon || props.value.icon;
  });
  const trailingIconName = computed(() => {
    if (props.value.loading && !isLeading.value) {
      return props.value.loadingIcon || appConfig.ui.icons.loading;
    }
    return props.value.trailingIcon || props.value.icon;
  });
  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName
  };
}
const buttonGroupInjectionKey = Symbol("nuxt-ui.button-group");
function useButtonGroup(props) {
  const buttonGroup = inject(buttonGroupInjectionKey, void 0);
  return {
    orientation: computed(() => buttonGroup?.value.orientation),
    size: computed(() => props?.size ?? buttonGroup?.value.size)
  };
}
const formLoadingInjectionKey = Symbol("nuxt-ui.form-loading");
function pickLinkProps(link) {
  const keys = Object.keys(link);
  const ariaKeys = keys.filter((key) => key.startsWith("aria-"));
  const dataKeys = keys.filter((key) => key.startsWith("data-"));
  const propsToInclude = [
    "active",
    "activeClass",
    "ariaCurrentValue",
    "as",
    "disabled",
    "exact",
    "exactActiveClass",
    "exactHash",
    "exactQuery",
    "external",
    "href",
    "download",
    "inactiveClass",
    "noPrefetch",
    "noRel",
    "prefetch",
    "prefetchedClass",
    "rel",
    "replace",
    "target",
    "to",
    "type",
    "title",
    "onClick",
    ...ariaKeys,
    ...dataKeys
  ];
  return reactivePick(link, ...propsToInclude);
}
function isPartiallyEqual(item1, item2) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === "added") {
      filtered.add(q.key);
    }
    return filtered;
  }, /* @__PURE__ */ new Set());
  const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)));
  const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)));
  return isEqual(item1Filtered, item2Filtered);
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
const _sfc_main$8 = {
  __name: "LinkBase",
  props: {
    as: { type: String, required: false, default: "button" },
    type: { type: String, required: false, default: "button" },
    disabled: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    href: { type: String, required: false },
    navigate: { type: Function, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    active: { type: Boolean, required: false },
    isExternal: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    function onClickWrapper(e) {
      if (props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (props.onClick) {
        for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
          onClick(e);
        }
      }
      if (props.href && props.navigate && !props.isExternal) {
        props.navigate(e);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(__props.href ? {
        "as": "a",
        "href": __props.disabled ? void 0 : __props.href,
        "aria-disabled": __props.disabled ? "true" : void 0,
        "role": __props.disabled ? "link" : void 0,
        "tabindex": __props.disabled ? -1 : void 0
      } : __props.as === "button" ? {
        as: __props.as,
        type: __props.type,
        disabled: __props.disabled
      } : {
        as: __props.as
      }, {
        rel: __props.rel,
        target: __props.target,
        onClick: onClickWrapper
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["rel", "target"]);
    };
  }
};
const theme$4 = {
  "base": "focus-visible:outline-primary",
  "variants": {
    "active": {
      "true": "text-primary",
      "false": "text-muted"
    },
    "disabled": {
      "true": "cursor-not-allowed opacity-75"
    }
  },
  "compoundVariants": [
    {
      "active": false,
      "disabled": false,
      "class": [
        "hover:text-default",
        "transition-colors"
      ]
    }
  ]
};
const _sfc_main$7 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Link",
  props: {
    as: { type: null, required: false, default: "button" },
    type: { type: null, required: false, default: "button" },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false, default: void 0 },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false, default: "" },
    custom: { type: Boolean, required: false },
    raw: { type: Boolean, required: false },
    class: { type: null, required: false },
    to: { type: null, required: false },
    href: { type: null, required: false },
    external: { type: Boolean, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    noRel: { type: Boolean, required: false },
    prefetchedClass: { type: String, required: false },
    prefetch: { type: Boolean, required: false },
    prefetchOn: { type: [String, Object], required: false },
    noPrefetch: { type: Boolean, required: false },
    activeClass: { type: String, required: false, default: "" },
    exactActiveClass: { type: String, required: false },
    ariaCurrentValue: { type: String, required: false, default: "page" },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const appConfig = useAppConfig();
    const routerLinkProps = useForwardProps(reactiveOmit(props, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "to", "href", "raw", "custom", "class"));
    const ui2 = computed(() => tv({
      extend: tv(theme$4),
      ...defu({
        variants: {
          active: {
            true: props.activeClass,
            false: props.inactiveClass
          }
        }
      }, appConfig.ui?.link || {})
    }));
    const to = computed(() => props.to ?? props.href);
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      if (!to.value) {
        return false;
      }
      return typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true });
    });
    function isLinkActive({ route: linkRoute, isActive, isExactActive }) {
      if (props.active !== void 0) {
        return props.active;
      }
      if (!to.value) {
        return false;
      }
      if (props.exactQuery === "partial") {
        if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
      } else if (props.exactQuery === true) {
        if (!isEqual(linkRoute.query, route.query)) return false;
      }
      if (props.exactHash && linkRoute.hash !== route.hash) {
        return false;
      }
      if (props.exact && isExactActive) {
        return true;
      }
      if (!props.exact && isActive) {
        return true;
      }
      return false;
    }
    function resolveLinkClass({ route: route2, isActive, isExactActive } = {}) {
      const active = isLinkActive({ route: route2, isActive, isExactActive });
      if (props.raw) {
        return [props.class, active ? props.activeClass : props.inactiveClass];
      }
      return ui2.value({ class: props.class, active, disabled: props.disabled });
    }
    return (_ctx, _cache) => {
      return !isExternal.value && !!to.value ? (openBlock(), createBlock(unref(RouterLink), mergeProps({ key: 0 }, unref(routerLinkProps), {
        to: to.value,
        custom: ""
      }), {
        default: withCtx(({ href, navigate, route: linkRoute, isActive, isExactActive }) => [
          __props.custom ? renderSlot(_ctx.$slots, "default", normalizeProps$1(mergeProps({ key: 0 }, {
            ..._ctx.$attrs,
            ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
            as: __props.as,
            type: __props.type,
            disabled: __props.disabled,
            href,
            navigate,
            active: isLinkActive({ route: linkRoute, isActive, isExactActive })
          }))) : (openBlock(), createBlock(_sfc_main$8, mergeProps({ key: 1 }, {
            ..._ctx.$attrs,
            ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
            as: __props.as,
            type: __props.type,
            disabled: __props.disabled,
            href,
            navigate
          }, {
            class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              })
            ]),
            _: 2
          }, 1040, ["class"]))
        ]),
        _: 3
      }, 16, ["to"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        __props.custom ? renderSlot(_ctx.$slots, "default", normalizeProps$1(mergeProps({ key: 0 }, {
          ..._ctx.$attrs,
          as: __props.as,
          type: __props.type,
          disabled: __props.disabled,
          href: to.value,
          target: isExternal.value ? "_blank" : void 0,
          active: __props.active,
          isExternal: isExternal.value
        }))) : (openBlock(), createBlock(_sfc_main$8, mergeProps({ key: 1 }, {
          ..._ctx.$attrs,
          as: __props.as,
          type: __props.type,
          disabled: __props.disabled,
          href: to.value,
          target: isExternal.value ? "_blank" : void 0,
          isExternal: isExternal.value
        }, {
          class: resolveLinkClass()
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", { active: __props.active })
          ]),
          _: 3
        }, 16, ["class"]))
      ], 64));
    };
  }
});
const theme$3 = {
  "slots": {
    "base": [
      "rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "ghost": "",
      "link": ""
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "block": {
      "true": {
        "base": "w-full justify-center",
        "trailingIcon": "ms-auto"
      }
    },
    "square": {
      "true": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "active": {
      "true": {
        "base": ""
      },
      "false": {
        "base": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary hover:bg-secondary/75 active:bg-secondary/75 disabled:bg-secondary aria-disabled:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success hover:bg-success/75 active:bg-success/75 disabled:bg-success aria-disabled:bg-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info hover:bg-info/75 active:bg-info/75 disabled:bg-info aria-disabled:bg-info focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning hover:bg-warning/75 active:bg-warning/75 disabled:bg-warning aria-disabled:bg-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error hover:bg-error/75 active:bg-error/75 disabled:bg-error aria-disabled:bg-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success hover:bg-success/10 active:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info hover:bg-info/10 active:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error hover:bg-error/10 active:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 focus:outline-none focus-visible:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10 hover:bg-success/15 active:bg-success/15 focus:outline-none focus-visible:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10 hover:bg-info/15 active:bg-info/15 focus:outline-none focus-visible:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10 hover:bg-warning/15 active:bg-warning/15 focus:outline-none focus-visible:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10 hover:bg-error/15 active:bg-error/15 focus:outline-none focus-visible:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10 hover:bg-success/15 active:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10 hover:bg-info/15 active:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10 hover:bg-warning/15 active:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10 hover:bg-error/15 active:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": "ghost",
      "class": "text-primary hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "secondary",
      "variant": "ghost",
      "class": "text-secondary hover:bg-secondary/10 active:bg-secondary/10 focus:outline-none focus-visible:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "success",
      "variant": "ghost",
      "class": "text-success hover:bg-success/10 active:bg-success/10 focus:outline-none focus-visible:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "info",
      "variant": "ghost",
      "class": "text-info hover:bg-info/10 active:bg-info/10 focus:outline-none focus-visible:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "warning",
      "variant": "ghost",
      "class": "text-warning hover:bg-warning/10 active:bg-warning/10 focus:outline-none focus-visible:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "error",
      "variant": "ghost",
      "class": "text-error hover:bg-error/10 active:bg-error/10 focus:outline-none focus-visible:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "primary",
      "variant": "link",
      "class": "text-primary hover:text-primary/75 active:text-primary/75 disabled:text-primary aria-disabled:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": "text-secondary hover:text-secondary/75 active:text-secondary/75 disabled:text-secondary aria-disabled:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "link",
      "class": "text-success hover:text-success/75 active:text-success/75 disabled:text-success aria-disabled:text-success focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "link",
      "class": "text-info hover:text-info/75 active:text-info/75 disabled:text-info aria-disabled:text-info focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "link",
      "class": "text-warning hover:text-warning/75 active:text-warning/75 disabled:text-warning aria-disabled:text-warning focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "link",
      "class": "text-error hover:text-error/75 active:text-error/75 disabled:text-error aria-disabled:text-error focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": "ghost",
      "class": "text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": "text-muted hover:text-default active:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-2"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-2"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$6 = {
  __name: "Button",
  props: {
    label: { type: String, required: false },
    color: { type: null, required: false },
    activeColor: { type: null, required: false },
    variant: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false },
    to: { type: null, required: false },
    href: { type: null, required: false },
    external: { type: Boolean, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    noRel: { type: Boolean, required: false },
    prefetchedClass: { type: String, required: false },
    prefetch: { type: Boolean, required: false },
    prefetchOn: { type: [String, Object], required: false },
    noPrefetch: { type: Boolean, required: false },
    activeClass: { type: String, required: false },
    exactActiveClass: { type: String, required: false },
    ariaCurrentValue: { type: String, required: false },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const { orientation, size: buttonSize } = useButtonGroup(props);
    const linkProps = useForwardProps(pickLinkProps(props));
    const loadingAutoState = ref(false);
    const formLoading = inject(formLoadingInjectionKey, void 0);
    async function onClickWrapper(event) {
      loadingAutoState.value = true;
      const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
      try {
        await Promise.all(callbacks.map((fn) => fn?.(event)));
      } finally {
        loadingAutoState.value = false;
      }
    }
    const isLoading = computed(() => {
      return props.loading || props.loadingAuto && (loadingAutoState.value || formLoading?.value && props.type === "submit");
    });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
      computed(() => ({ ...props, loading: isLoading.value }))
    );
    const ui2 = computed(() => tv({
      extend: tv(theme$3),
      ...defu({
        variants: {
          active: {
            true: {
              base: mergeClasses(appConfig.ui?.button?.variants?.active?.true?.base, props.activeClass)
            },
            false: {
              base: mergeClasses(appConfig.ui?.button?.variants?.active?.false?.base, props.inactiveClass)
            }
          }
        }
      }, appConfig.ui?.button || {})
    })({
      color: props.color,
      variant: props.variant,
      size: buttonSize.value,
      loading: isLoading.value,
      block: props.block,
      square: props.square || !slots.default && !props.label,
      leading: isLeading.value,
      trailing: isTrailing.value,
      buttonGroup: orientation.value
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$7, mergeProps({
        type: __props.type,
        disabled: __props.disabled || isLoading.value
      }, unref(omit)(unref(linkProps), ["type", "disabled", "onClick"]), { custom: "" }), {
        default: withCtx(({ active, ...slotProps }) => [
          createVNode(_sfc_main$8, mergeProps(slotProps, {
            class: ui2.value.base({
              class: [props.ui?.base, props.class],
              active,
              ...active && __props.activeVariant ? { variant: __props.activeVariant } : {},
              ...active && __props.activeColor ? { color: __props.activeColor } : {}
            }),
            onClick: onClickWrapper
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "leading", {}, () => [
                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$b, {
                  key: 0,
                  name: unref(leadingIconName),
                  class: normalizeClass(ui2.value.leadingIcon({ class: props.ui?.leadingIcon, active }))
                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$9, mergeProps({
                  key: 1,
                  size: props.ui?.leadingAvatarSize || ui2.value.leadingAvatarSize()
                }, __props.avatar, {
                  class: ui2.value.leadingAvatar({ class: props.ui?.leadingAvatar, active })
                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "default", {}, () => [
                __props.label !== void 0 && __props.label !== null ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(ui2.value.label({ class: props.ui?.label, active }))
                }, toDisplayString(__props.label), 3)) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "trailing", {}, () => [
                unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$b, {
                  key: 0,
                  name: unref(trailingIconName),
                  class: normalizeClass(ui2.value.trailingIcon({ class: props.ui?.trailingIcon, active }))
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ])
            ]),
            _: 2
          }, 1040, ["class"])
        ]),
        _: 3
      }, 16, ["type", "disabled"]);
    };
  }
};
const theme$2 = {
  "slots": {
    "root": "gap-2",
    "base": "relative overflow-hidden rounded-full bg-accented",
    "indicator": "rounded-full size-full transition-transform duration-200 ease-out",
    "status": "flex justify-end text-dimmed transition-[width] duration-200",
    "steps": "grid items-end",
    "step": "truncate text-end row-start-1 col-start-1 transition-opacity"
  },
  "variants": {
    "animation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "color": {
      "primary": {
        "indicator": "bg-primary",
        "steps": "text-primary"
      },
      "secondary": {
        "indicator": "bg-secondary",
        "steps": "text-secondary"
      },
      "success": {
        "indicator": "bg-success",
        "steps": "text-success"
      },
      "info": {
        "indicator": "bg-info",
        "steps": "text-info"
      },
      "warning": {
        "indicator": "bg-warning",
        "steps": "text-warning"
      },
      "error": {
        "indicator": "bg-error",
        "steps": "text-error"
      },
      "neutral": {
        "indicator": "bg-inverted",
        "steps": "text-inverted"
      }
    },
    "size": {
      "2xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "sm": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "md": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "lg": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "xl": {
        "status": "text-base",
        "steps": "text-base"
      },
      "2xl": {
        "status": "text-base",
        "steps": "text-base"
      }
    },
    "step": {
      "active": {
        "step": "opacity-100"
      },
      "first": {
        "step": "opacity-100 text-muted"
      },
      "other": {
        "step": "opacity-0"
      },
      "last": {
        "step": ""
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex flex-col",
        "base": "w-full",
        "status": "flex-row"
      },
      "vertical": {
        "root": "h-full flex flex-row-reverse",
        "base": "h-full",
        "status": "flex-col"
      }
    },
    "inverted": {
      "true": {
        "status": "self-end"
      }
    }
  },
  "compoundVariants": [
    {
      "inverted": true,
      "orientation": "horizontal",
      "class": {
        "step": "text-start",
        "status": "flex-row-reverse"
      }
    },
    {
      "inverted": true,
      "orientation": "vertical",
      "class": {
        "steps": "items-start",
        "status": "flex-col-reverse"
      }
    },
    {
      "orientation": "horizontal",
      "size": "2xs",
      "class": "h-px"
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": "h-0.5"
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": "h-1"
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": "h-2"
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": "h-3"
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": "h-4"
    },
    {
      "orientation": "horizontal",
      "size": "2xl",
      "class": "h-5"
    },
    {
      "orientation": "vertical",
      "size": "2xs",
      "class": "w-px"
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": "w-0.5"
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": "w-1"
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": "w-2"
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": "w-3"
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": "w-4"
    },
    {
      "orientation": "vertical",
      "size": "2xl",
      "class": "w-5"
    },
    {
      "orientation": "horizontal",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "animation": "carousel",
    "color": "primary",
    "size": "md"
  }
};
const _sfc_main$5 = {
  __name: "Progress",
  props: {
    as: { type: null, required: false },
    max: { type: [Number, Array], required: false },
    status: { type: Boolean, required: false },
    inverted: { type: Boolean, required: false, default: false },
    size: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    animation: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    getValueLabel: { type: Function, required: false },
    getValueText: { type: Function, required: false },
    modelValue: { type: [Number, null], required: false, default: null }
  },
  emits: ["update:modelValue", "update:max"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { dir } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "getValueLabel", "getValueText", "modelValue"), emits);
    const isIndeterminate = computed(() => rootProps.value.modelValue === null);
    const hasSteps = computed(() => Array.isArray(props.max));
    const realMax = computed(() => {
      if (isIndeterminate.value || !props.max) {
        return void 0;
      }
      if (Array.isArray(props.max)) {
        return props.max.length - 1;
      }
      return Number(props.max);
    });
    const percent = computed(() => {
      if (isIndeterminate.value) {
        return void 0;
      }
      switch (true) {
        case rootProps.value.modelValue < 0:
          return 0;
        case rootProps.value.modelValue > (realMax.value ?? 100):
          return 100;
        default:
          return Math.round(rootProps.value.modelValue / (realMax.value ?? 100) * 100);
      }
    });
    const indicatorStyle = computed(() => {
      if (percent.value === void 0) {
        return;
      }
      if (props.orientation === "vertical") {
        return {
          transform: `translateY(${props.inverted ? "" : "-"}${100 - percent.value}%)`
        };
      } else {
        if (dir.value === "rtl") {
          return {
            transform: `translateX(${props.inverted ? "-" : ""}${100 - percent.value}%)`
          };
        } else {
          return {
            transform: `translateX(${props.inverted ? "" : "-"}${100 - percent.value}%)`
          };
        }
      }
    });
    const statusStyle = computed(() => {
      return {
        [props.orientation === "vertical" ? "height" : "width"]: percent.value ? `${percent.value}%` : "fit-content"
      };
    });
    function isActive(index) {
      return index === Number(props.modelValue);
    }
    function isFirst(index) {
      return index === 0;
    }
    function isLast(index) {
      return index === realMax.value;
    }
    function stepVariant(index) {
      index = Number(index);
      if (isActive(index) && !isFirst(index)) {
        return "active";
      }
      if (isFirst(index) && isActive(index)) {
        return "first";
      }
      if (isLast(index) && isActive(index)) {
        return "last";
      }
      return "other";
    }
    const ui2 = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.progress || {} })({
      animation: props.animation,
      size: props.size,
      color: props.color,
      orientation: props.orientation,
      inverted: props.inverted
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: __props.as,
        class: normalizeClass(ui2.value.root({ class: [props.ui?.root, props.class] }))
      }, {
        default: withCtx(() => [
          !isIndeterminate.value && (__props.status || !!slots.status) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(ui2.value.status({ class: props.ui?.status })),
            style: normalizeStyle(statusStyle.value)
          }, [
            renderSlot(_ctx.$slots, "status", { percent: percent.value }, () => [
              createTextVNode(toDisplayString(percent.value) + "% ", 1)
            ])
          ], 6)) : createCommentVNode("", true),
          createVNode(unref(_sfc_main$r), mergeProps(unref(rootProps), {
            max: realMax.value,
            class: ui2.value.base({ class: props.ui?.base }),
            style: { "transform": "translateZ(0)" }
          }), {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$q), {
                class: normalizeClass(ui2.value.indicator({ class: props.ui?.indicator })),
                style: normalizeStyle(indicatorStyle.value)
              }, null, 8, ["class", "style"])
            ]),
            _: 1
          }, 16, ["max", "class"]),
          hasSteps.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(ui2.value.steps({ class: props.ui?.steps }))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.max, (step, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: normalizeClass(ui2.value.step({ class: props.ui?.step, step: stepVariant(index) }))
              }, [
                renderSlot(_ctx.$slots, `step-${index}`, { step }, () => [
                  createTextVNode(toDisplayString(step), 1)
                ])
              ], 2);
            }), 128))
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["as", "class"]);
    };
  }
};
const theme$1 = {
  "slots": {
    "root": "relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none",
    "wrapper": "w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium text-highlighted",
    "description": "text-sm text-muted",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "progress": "absolute inset-x-0 bottom-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
        "icon": "text-primary"
      },
      "secondary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary",
        "icon": "text-secondary"
      },
      "success": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success",
        "icon": "text-success"
      },
      "info": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info",
        "icon": "text-info"
      },
      "warning": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning",
        "icon": "text-warning"
      },
      "error": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error",
        "icon": "text-error"
      },
      "neutral": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted",
        "icon": "text-highlighted"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "defaultVariants": {
    "color": "primary"
  }
};
const _sfc_main$4 = {
  __name: "Toast",
  props: {
    as: { type: null, required: false },
    title: { type: [String, Object, Function], required: false },
    description: { type: [String, Object, Function], required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: String, required: false },
    actions: { type: Array, required: false },
    progress: { type: [Boolean, Object], required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    type: { type: String, required: false },
    duration: { type: Number, required: false }
  },
  emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultOpen", "open", "duration", "type"), emits);
    const ui2 = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.toast || {} })({
      color: props.color,
      orientation: props.orientation,
      title: !!props.title || !!slots.title
    }));
    const el = ref();
    const height = ref(0);
    onMounted(() => {
      if (!el.value) {
        return;
      }
      nextTick(() => {
        height.value = el.value?.$el?.getBoundingClientRect()?.height;
      });
    });
    __expose({
      height
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$h), mergeProps({
        ref_key: "el",
        ref: el
      }, unref(rootProps), {
        "data-orientation": __props.orientation,
        class: ui2.value.root({ class: [props.ui?.root, props.class] }),
        style: { "--height": height.value }
      }), {
        default: withCtx(({ remaining, duration, open }) => [
          renderSlot(_ctx.$slots, "leading", {}, () => [
            __props.avatar ? (openBlock(), createBlock(_sfc_main$9, mergeProps({
              key: 0,
              size: props.ui?.avatarSize || ui2.value.avatarSize()
            }, __props.avatar, {
              class: ui2.value.avatar({ class: props.ui?.avatar })
            }), null, 16, ["size", "class"])) : __props.icon ? (openBlock(), createBlock(_sfc_main$b, {
              key: 1,
              name: __props.icon,
              class: normalizeClass(ui2.value.icon({ class: props.ui?.icon }))
            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(ui2.value.wrapper({ class: props.ui?.wrapper }))
          }, [
            __props.title || !!slots.title ? (openBlock(), createBlock(unref(_sfc_main$g), {
              key: 0,
              class: normalizeClass(ui2.value.title({ class: props.ui?.title }))
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  typeof __props.title === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title()), { key: 0 })) : typeof __props.title === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title), { key: 1 })) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ], 64))
                ])
              ]),
              _: 3
            }, 8, ["class"])) : createCommentVNode("", true),
            __props.description || !!slots.description ? (openBlock(), createBlock(unref(_sfc_main$j), {
              key: 1,
              class: normalizeClass(ui2.value.description({ class: props.ui?.description }))
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "description", {}, () => [
                  typeof __props.description === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description()), { key: 0 })) : typeof __props.description === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description), { key: 1 })) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ], 64))
                ])
              ]),
              _: 3
            }, 8, ["class"])) : createCommentVNode("", true),
            __props.orientation === "vertical" && (__props.actions?.length || !!slots.actions) ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(ui2.value.actions({ class: props.ui?.actions }))
            }, [
              renderSlot(_ctx.$slots, "actions", {}, () => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                  return openBlock(), createBlock(unref(_sfc_main$k), {
                    key: index,
                    "alt-text": action.label || "Action",
                    "as-child": "",
                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$6, mergeProps({
                        size: "xs",
                        color: __props.color
                      }, { ref_for: true }, action), null, 16, ["color"])
                    ]),
                    _: 2
                  }, 1032, ["alt-text"]);
                }), 128))
              ])
            ], 2)) : createCommentVNode("", true)
          ], 2),
          __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) || __props.close ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(ui2.value.actions({ class: props.ui?.actions, orientation: "horizontal" }))
          }, [
            __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) ? renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                return openBlock(), createBlock(unref(_sfc_main$k), {
                  key: index,
                  "alt-text": action.label || "Action",
                  "as-child": "",
                  onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                  }, ["stop"]))
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$6, mergeProps({
                      size: "xs",
                      color: __props.color
                    }, { ref_for: true }, action), null, 16, ["color"])
                  ]),
                  _: 2
                }, 1032, ["alt-text"]);
              }), 128))
            ]) : createCommentVNode("", true),
            __props.close || !!slots.close ? (openBlock(), createBlock(unref(_sfc_main$l), {
              key: 1,
              "as-child": ""
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "close", { ui: ui2.value }, () => [
                  __props.close ? (openBlock(), createBlock(_sfc_main$6, mergeProps({
                    key: 0,
                    icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                    color: "neutral",
                    variant: "link",
                    "aria-label": unref(t)("toast.close")
                  }, typeof __props.close === "object" ? __props.close : {}, {
                    class: ui2.value.close({ class: props.ui?.close }),
                    onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                    }, ["stop"]))
                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                ])
              ]),
              _: 3
            })) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true),
          __props.progress && open && remaining > 0 && duration ? (openBlock(), createBlock(_sfc_main$5, mergeProps({
            key: 1,
            "model-value": remaining / duration * 100,
            color: __props.color
          }, typeof __props.progress === "object" ? __props.progress : {}, {
            size: "sm",
            class: ui2.value.progress({ class: props.ui?.progress })
          }), null, 16, ["model-value", "color", "class"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["data-orientation", "class", "style"]);
    };
  }
};
const theme = {
  "slots": {
    "viewport": "fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] data-[expanded=true]:h-(--height) focus:outline-none",
    "base": "pointer-events-auto absolute inset-x-0 z-(--index) transform-(--transform) data-[expanded=false]:data-[front=false]:h-(--front-height) data-[expanded=false]:data-[front=false]:*:opacity-0 data-[front=false]:*:transition-opacity data-[front=false]:*:duration-100 data-[state=closed]:animate-[toast-closed_200ms_ease-in-out] data-[state=closed]:data-[expanded=false]:data-[front=false]:animate-[toast-collapsed-closed_200ms_ease-in-out] data-[swipe=move]:transition-none transition-[transform,translate,height] duration-200 ease-out"
  },
  "variants": {
    "position": {
      "top-left": {
        "viewport": "left-4"
      },
      "top-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "top-right": {
        "viewport": "right-4"
      },
      "bottom-left": {
        "viewport": "left-4"
      },
      "bottom-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "bottom-right": {
        "viewport": "right-4"
      }
    },
    "swipeDirection": {
      "up": "data-[swipe=end]:animate-[toast-slide-up_200ms_ease-out]",
      "right": "data-[swipe=end]:animate-[toast-slide-right_200ms_ease-out]",
      "down": "data-[swipe=end]:animate-[toast-slide-down_200ms_ease-out]",
      "left": "data-[swipe=end]:animate-[toast-slide-left_200ms_ease-out]"
    }
  },
  "compoundVariants": [
    {
      "position": [
        "top-left",
        "top-center",
        "top-right"
      ],
      "class": {
        "viewport": "top-4",
        "base": "top-0 data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out]"
      }
    },
    {
      "position": [
        "bottom-left",
        "bottom-center",
        "bottom-right"
      ],
      "class": {
        "viewport": "bottom-4",
        "base": "bottom-0 data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out]"
      }
    },
    {
      "swipeDirection": [
        "left",
        "right"
      ],
      "class": "data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=cancel]:translate-x-0"
    },
    {
      "swipeDirection": [
        "up",
        "down"
      ],
      "class": "data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y) data-[swipe=end]:translate-y-(--reka-toast-swipe-end-y) data-[swipe=cancel]:translate-y-0"
    }
  ],
  "defaultVariants": {
    "position": "bottom-right"
  }
};
const __default__$1 = {
  name: "Toaster"
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign(__default__$1, {
  props: {
    position: { type: null, required: false },
    expand: { type: Boolean, required: false, default: true },
    progress: { type: Boolean, required: false, default: true },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    label: { type: String, required: false },
    duration: { type: Number, required: false, default: 5e3 },
    swipeThreshold: { type: Number, required: false }
  },
  setup(__props) {
    const props = __props;
    const { toasts, remove } = useToast();
    const appConfig = useAppConfig();
    const providerProps = useForwardProps(reactivePick(props, "duration", "label", "swipeThreshold"));
    const portalProps = usePortal(toRef$1(() => props.portal));
    const swipeDirection = computed(() => {
      switch (props.position) {
        case "top-center":
          return "up";
        case "top-right":
        case "bottom-right":
          return "right";
        case "bottom-center":
          return "down";
        case "top-left":
        case "bottom-left":
          return "left";
      }
      return "right";
    });
    const ui2 = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.toaster || {} })({
      position: props.position,
      swipeDirection: swipeDirection.value
    }));
    function onUpdateOpen(value, id) {
      if (value) {
        return;
      }
      remove(id);
    }
    const hovered = ref(false);
    const expanded = computed(() => props.expand || hovered.value);
    const refs = ref([]);
    const height = computed(() => refs.value.reduce((acc, { height: height2 }) => acc + height2 + 16, 0));
    const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0);
    function getOffset(index) {
      return refs.value.slice(index + 1).reduce((acc, { height: height2 }) => acc + height2 + 16, 0);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$o), mergeProps({ "swipe-direction": swipeDirection.value }, unref(providerProps)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(toasts), (toast, index) => {
            return openBlock(), createBlock(_sfc_main$4, mergeProps({
              key: toast.id,
              ref_for: true,
              ref_key: "refs",
              ref: refs,
              progress: __props.progress
            }, { ref_for: true }, unref(omit)(toast, ["id", "close"]), {
              close: toast.close,
              "data-expanded": expanded.value,
              "data-front": !expanded.value && index === unref(toasts).length - 1,
              style: {
                "--index": index - unref(toasts).length + unref(toasts).length,
                "--before": unref(toasts).length - 1 - index,
                "--offset": getOffset(index),
                "--scale": expanded.value ? "1" : "calc(1 - var(--before) * var(--scale-factor))",
                "--translate": expanded.value ? "calc(var(--offset) * var(--translate-factor))" : "calc(var(--before) * var(--gap))",
                "--transform": "translateY(var(--translate)) scale(var(--scale))"
              },
              class: ui2.value.base({ class: [props.ui?.base, toast.onClick ? "cursor-pointer" : void 0] }),
              "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
              onClick: ($event) => toast.onClick && toast.onClick(toast)
            }), null, 16, ["progress", "close", "data-expanded", "data-front", "style", "class", "onUpdate:open", "onClick"]);
          }), 128)),
          createVNode(unref(_sfc_main$i), normalizeProps$1(guardReactiveProps(unref(portalProps))), {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$d), {
                "data-expanded": expanded.value,
                class: normalizeClass(ui2.value.viewport({ class: [props.ui?.viewport, props.class] })),
                style: normalizeStyle({
                  "--scale-factor": "0.05",
                  "--translate-factor": __props.position?.startsWith("top") ? "1px" : "-1px",
                  "--gap": __props.position?.startsWith("top") ? "16px" : "-16px",
                  "--front-height": `${frontHeight.value}px`,
                  "--height": `${height.value}px`
                }),
                onMouseenter: _cache[0] || (_cache[0] = ($event) => hovered.value = true),
                onMouseleave: _cache[1] || (_cache[1] = ($event) => hovered.value = false)
              }, null, 8, ["data-expanded", "class", "style"])
            ]),
            _: 1
          }, 16)
        ]),
        _: 3
      }, 16, ["swipe-direction"]);
    };
  }
});
function _useOverlay() {
  const overlays = shallowReactive([]);
  const create = (component, _options) => {
    const { props, defaultOpen, destroyOnClose } = _options || {};
    const options = reactive({
      id: Symbol(import.meta.dev ? "useOverlay" : ""),
      isOpen: !!defaultOpen,
      component: markRaw(component),
      isMounted: !!defaultOpen,
      destroyOnClose: !!destroyOnClose,
      originalProps: props || {},
      props: { ...props }
    });
    overlays.push(options);
    return {
      ...options,
      open: (props2) => open(options.id, props2),
      close: (value) => close(options.id, value),
      patch: (props2) => patch(options.id, props2)
    };
  };
  const open = (id, props) => {
    const overlay = getOverlay(id);
    if (props) {
      overlay.props = { ...overlay.originalProps, ...props };
    } else {
      overlay.props = { ...overlay.originalProps };
    }
    overlay.isOpen = true;
    overlay.isMounted = true;
    return {
      id,
      isMounted: overlay.isMounted,
      isOpen: overlay.isOpen,
      result: new Promise((resolve) => overlay.resolvePromise = resolve)
    };
  };
  const close = (id, value) => {
    const overlay = getOverlay(id);
    overlay.isOpen = false;
    if (overlay.resolvePromise) {
      overlay.resolvePromise(value);
      overlay.resolvePromise = void 0;
    }
  };
  const closeAll = () => {
    overlays.forEach((overlay) => close(overlay.id));
  };
  const unmount = (id) => {
    const overlay = getOverlay(id);
    overlay.isMounted = false;
    if (overlay.destroyOnClose) {
      const index = overlays.findIndex((overlay2) => overlay2.id === id);
      overlays.splice(index, 1);
    }
  };
  const patch = (id, props) => {
    const overlay = getOverlay(id);
    overlay.props = { ...overlay.props, ...props };
  };
  const getOverlay = (id) => {
    const overlay = overlays.find((overlay2) => overlay2.id === id);
    if (!overlay) {
      throw new Error("Overlay not found");
    }
    return overlay;
  };
  const isOpen = (id) => {
    const overlay = getOverlay(id);
    return overlay.isOpen;
  };
  return {
    overlays,
    open,
    close,
    closeAll,
    create,
    patch,
    unmount,
    isOpen
  };
}
const useOverlay = /* @__PURE__ */ createSharedComposable(_useOverlay);
const _sfc_main$2 = {
  __name: "OverlayProvider",
  setup(__props) {
    const { overlays, unmount, close } = useOverlay();
    const mountedOverlays = computed(() => overlays.filter((overlay) => overlay.isMounted));
    const onAfterLeave = (id) => {
      close(id);
      unmount(id);
    };
    const onClose = (id, value) => {
      close(id, value);
    };
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(mountedOverlays.value, (overlay) => {
        return openBlock(), createBlock(resolveDynamicComponent(overlay.component), mergeProps({
          key: overlay.id
        }, { ref_for: true }, overlay.props, {
          open: overlay.isOpen,
          "onUpdate:open": ($event) => overlay.isOpen = $event,
          onClose: (value) => onClose(overlay.id, value),
          "onAfter:leave": ($event) => onAfterLeave(overlay.id)
        }), null, 16, ["open", "onUpdate:open", "onClose", "onAfter:leave"]);
      }), 128);
    };
  }
};
const __default__ = {
  name: "App"
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    tooltip: { type: Object, required: false },
    toaster: { type: [Object, null], required: false },
    locale: { type: null, required: false },
    portal: { type: null, required: false, default: "body" },
    scrollBody: { type: [Boolean, Object], required: false },
    nonce: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const configProviderProps = useForwardProps(reactivePick(props, "scrollBody"));
    const tooltipProps = toRef$1(() => props.tooltip);
    const toasterProps = toRef$1(() => props.toaster);
    const locale = toRef$1(() => props.locale);
    provide(localeContextInjectionKey, locale);
    const portal = toRef$1(() => props.portal);
    provide(portalTargetInjectionKey, portal);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$t), mergeProps({
        "use-id": () => useId(),
        dir: locale.value?.dir,
        locale: locale.value?.code
      }, unref(configProviderProps)), {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$c), normalizeProps$1(guardReactiveProps(tooltipProps.value)), {
            default: withCtx(() => [
              __props.toaster !== null ? (openBlock(), createBlock(_sfc_main$3, normalizeProps$1(mergeProps({ key: 0 }, toasterProps.value)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
              createVNode(_sfc_main$2)
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 16, ["use-id", "dir", "locale"]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_UApp = _sfc_main$1;
  return openBlock(), createBlock(_component_UApp, null, {
    default: withCtx(() => _cache[0] || (_cache[0] = [
      createBaseVNode("shared-button", null, null, -1)
    ])),
    _: 1,
    __: [0]
  });
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const app = createApp(App);
app.use(ui);
app.mount("#app");
