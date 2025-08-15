import { d as defineComponent, e as computed, f as onMounted, g as onUnmounted, c as createBlock, o as openBlock, w as withCtx, h as createVNode, u as unref, P as Primitive, r as renderSlot, n as nextTick, i as createContext, t as toRefs, j as useForwardExpose, k as useVModel, l as ref, m as normalizeStyle, p as createCommentVNode, q as watch, s as useResizeObserver, v as mergeProps, x as withKeys, y as withModifiers, z as useTimeout, A as useRafFn, B as createTextVNode, C as toDisplayString, D as watchEffect, E as onKeyStroke, F as createElementBlock, T as Teleport, G as Fragment, H as isClient, I as normalizeProps, J as guardReactiveProps, K as unrefElement, L as useTimeoutFn, M as useState, N as useSlots, O as useLocale, Q as useForwardPropsEmits, R as reactivePick, S as tv, U as useAppConfig, a as createBaseVNode, _ as _sfc_main$G, V as _sfc_main$H, W as normalizeClass, X as resolveDynamicComponent, Y as renderList, Z as _sfc_main$I, $ as useForwardProps, a0 as toRef, a1 as omit, a2 as createSharedComposable, a3 as shallowReactive, a4 as reactive, a5 as markRaw, a6 as useId$1, a7 as provide, a8 as localeContextInjectionKey, a9 as defu, aa as toHandlers, ab as get, ac as useFormField, ad as useButtonGroup, ae as useComponentIcons, af as looseToNumber, ag as createSlots, ah as tryOnMounted, ai as tryOnScopeDispose, aj as isRef, ak as toValue, al as useTemplateRef, am as shallowRef, an as Suspense, ao as inject, ap as resolveComponent, aq as onBeforeUnmount, ar as defineCustomElement, as as tailwindStyles } from "./main.js";
import { i as injectRovingFocusGroupContext, u as useId, a as useCollection, g as getFocusIntent, w as wrapArray, f as focusFirst, b as useDirection, P as Presence, _ as _sfc_main$D, c as _sfc_main$E, d as getActiveElement, e as _sfc_main$F, h as context, j as focusFirst$1, k as getTabbableCandidates, l as usePortal, m as _sfc_main$K, p as portalTargetInjectionKey, H as HoverCard, n as Popover, o as useVModel$1, q as _sfc_main$M, r as _sfc_main$N, s as defaultDocument, t as unrefElement$1, v as meIconStyles } from "./me-icon.min.js";
import { _ as _sfc_main$J, a as _sfc_main$L, b as _export_sfc } from "./_plugin-vue_export-helper.js";
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {},
    focusable: { type: Boolean, default: true },
    active: { type: Boolean },
    allowShiftKey: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const context2 = injectRovingFocusGroupContext();
    const randomId = useId();
    const id = computed(() => props.tabStopId || randomId);
    const isCurrentTabStop = computed(
      () => context2.currentTabStopId.value === id.value
    );
    const { getItems, CollectionItem } = useCollection();
    onMounted(() => {
      if (props.focusable)
        context2.onFocusableItemAdd();
    });
    onUnmounted(() => {
      if (props.focusable)
        context2.onFocusableItemRemove();
    });
    function handleKeydown(event) {
      if (event.key === "Tab" && event.shiftKey) {
        context2.onItemShiftTab();
        return;
      }
      if (event.target !== event.currentTarget)
        return;
      const focusIntent = getFocusIntent(
        event,
        context2.orientation.value,
        context2.dir.value
      );
      if (focusIntent !== void 0) {
        if (event.metaKey || event.ctrlKey || event.altKey || (props.allowShiftKey ? false : event.shiftKey))
          return;
        event.preventDefault();
        let candidateNodes = [...getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "")];
        if (focusIntent === "last") {
          candidateNodes.reverse();
        } else if (focusIntent === "prev" || focusIntent === "next") {
          if (focusIntent === "prev")
            candidateNodes.reverse();
          const currentIndex = candidateNodes.indexOf(
            event.currentTarget
          );
          candidateNodes = context2.loop.value ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
        }
        nextTick(() => focusFirst(candidateNodes));
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            tabindex: isCurrentTabStop.value ? 0 : -1,
            "data-orientation": unref(context2).orientation.value,
            "data-active": _ctx.active ? "" : void 0,
            "data-disabled": !_ctx.focusable ? "" : void 0,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            onMousedown: _cache[0] || (_cache[0] = (event) => {
              if (!_ctx.focusable) event.preventDefault();
              else unref(context2).onItemFocus(id.value);
            }),
            onFocus: _cache[1] || (_cache[1] = ($event) => unref(context2).onItemFocus(id.value)),
            onKeydown: handleKeydown
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
        ]),
        _: 3
      });
    };
  }
});
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
const [injectTabsRootContext, provideTabsRootContext] = createContext("TabsRoot");
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "TabsRoot",
  props: {
    defaultValue: {},
    orientation: { default: "horizontal" },
    dir: {},
    activationMode: { default: "automatic" },
    modelValue: {},
    unmountOnHide: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { orientation, unmountOnHide, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    useForwardExpose();
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const tabsList = ref();
    provideTabsRootContext({
      modelValue,
      changeModelValue: (value) => {
        modelValue.value = value;
      },
      orientation,
      dir,
      unmountOnHide,
      activationMode: props.activationMode,
      baseId: useId(void 0, "reka-tabs"),
      tabsList
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        dir: unref(dir),
        "data-orientation": unref(orientation),
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
        ]),
        _: 3
      }, 8, ["dir", "data-orientation", "as-child", "as"]);
    };
  }
});
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectTabsRootContext();
    const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
    const contentId = computed(() => makeContentId(rootContext.baseId, props.value));
    const isSelected = computed(() => props.value === rootContext.modelValue.value);
    const isMountAnimationPreventedRef = ref(isSelected.value);
    onMounted(() => {
      requestAnimationFrame(() => {
        isMountAnimationPreventedRef.value = false;
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || isSelected.value,
        "force-mount": ""
      }, {
        default: withCtx(({ present }) => [
          createVNode(unref(Primitive), {
            id: contentId.value,
            ref: unref(forwardRef),
            "as-child": _ctx.asChild,
            as: _ctx.as,
            role: "tabpanel",
            "data-state": isSelected.value ? "active" : "inactive",
            "data-orientation": unref(rootContext).orientation.value,
            "aria-labelledby": triggerId.value,
            hidden: !present,
            tabindex: "0",
            style: normalizeStyle({
              animationDuration: isMountAnimationPreventedRef.value ? "0s" : void 0
            })
          }, {
            default: withCtx(() => [
              (unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["id", "as-child", "as", "data-state", "data-orientation", "aria-labelledby", "hidden", "style"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "TabsIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const context2 = injectTabsRootContext();
    useForwardExpose();
    const activeTab = ref();
    const indicatorStyle = ref({
      size: null,
      position: null
    });
    watch(() => [context2.modelValue.value, context2?.dir.value], async () => {
      await nextTick();
      updateIndicatorStyle();
    }, { immediate: true });
    useResizeObserver([context2.tabsList, activeTab], updateIndicatorStyle);
    function updateIndicatorStyle() {
      activeTab.value = context2.tabsList.value?.querySelector('[role="tab"][data-state="active"]');
      if (!activeTab.value)
        return;
      if (context2.orientation.value === "horizontal") {
        indicatorStyle.value = {
          size: activeTab.value.offsetWidth,
          position: activeTab.value.offsetLeft
        };
      } else {
        indicatorStyle.value = {
          size: activeTab.value.offsetHeight,
          position: activeTab.value.offsetTop
        };
      }
    }
    return (_ctx, _cache) => {
      return typeof indicatorStyle.value.size === "number" ? (openBlock(), createBlock(unref(Primitive), mergeProps({ key: 0 }, props, {
        style: {
          "--reka-tabs-indicator-size": `${indicatorStyle.value.size}px`,
          "--reka-tabs-indicator-position": `${indicatorStyle.value.position}px`
        }
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  props: {
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { loop } = toRefs(props);
    const { forwardRef, currentElement } = useForwardExpose();
    const context2 = injectTabsRootContext();
    context2.tabsList = currentElement;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$D), {
        "as-child": "",
        orientation: unref(context2).orientation.value,
        dir: unref(context2).dir.value,
        loop: unref(loop)
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            role: "tablist",
            "as-child": _ctx.asChild,
            as: _ctx.as,
            "aria-orientation": unref(context2).orientation.value
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as-child", "as", "aria-orientation"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  props: {
    value: {},
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectTabsRootContext();
    const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
    const contentId = computed(() => makeContentId(rootContext.baseId, props.value));
    const isSelected = computed(() => props.value === rootContext.modelValue.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$C), {
        "as-child": "",
        focusable: !_ctx.disabled,
        active: isSelected.value
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            id: triggerId.value,
            ref: unref(forwardRef),
            role: "tab",
            type: _ctx.as === "button" ? "button" : void 0,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-selected": isSelected.value ? "true" : "false",
            "aria-controls": contentId.value,
            "data-state": isSelected.value ? "active" : "inactive",
            disabled: _ctx.disabled,
            "data-disabled": _ctx.disabled ? "" : void 0,
            "data-orientation": unref(rootContext).orientation.value,
            onMousedown: _cache[0] || (_cache[0] = withModifiers((event) => {
              if (!_ctx.disabled && event.ctrlKey === false) {
                unref(rootContext).changeModelValue(_ctx.value);
              } else {
                event.preventDefault();
              }
            }, ["left"])),
            onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => unref(rootContext).changeModelValue(_ctx.value), ["enter", "space"])),
            onFocus: _cache[2] || (_cache[2] = () => {
              const isAutomaticActivation = unref(rootContext).activationMode !== "manual";
              if (!isSelected.value && !_ctx.disabled && isAutomaticActivation) {
                unref(rootContext).changeModelValue(_ctx.value);
              }
            })
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "type", "as", "as-child", "aria-selected", "aria-controls", "data-state", "disabled", "data-disabled", "data-orientation"])
        ]),
        _: 3
      }, 8, ["focusable", "active"]);
    };
  }
});
const _sfc_main$w = /* @__PURE__ */ defineComponent({
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
const _sfc_main$v = /* @__PURE__ */ defineComponent({
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
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "ToastAnnounce",
  setup(__props) {
    const providerContext = injectToastProviderContext();
    const isAnnounced = useTimeout(1e3);
    const renderAnnounceText = ref(false);
    useRafFn(() => {
      renderAnnounceText.value = true;
    });
    return (_ctx, _cache) => {
      return unref(isAnnounced) || renderAnnounceText.value ? (openBlock(), createBlock(unref(_sfc_main$E), { key: 0 }, {
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
const _sfc_main$t = /* @__PURE__ */ defineComponent({
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
        announceTextContent.value ? (openBlock(), createBlock(_sfc_main$u, {
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
const _sfc_main$s = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createBlock(_sfc_main$w, { "as-child": "" }, {
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
const _sfc_main$r = /* @__PURE__ */ defineComponent({
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
      return _ctx.altText ? (openBlock(), createBlock(_sfc_main$w, {
        key: 0,
        "alt-text": _ctx.altText,
        "as-child": ""
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$s, {
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
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "ToastDescription",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$p = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createBlock(unref(_sfc_main$F), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$o = /* @__PURE__ */ defineComponent({
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
          createVNode(_sfc_main$t, mergeProps({
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
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "ToastTitle",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "FocusProxy",
  emits: ["focusFromOutsideViewport"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const providerContext = injectToastProviderContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$E), {
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
const _sfc_main$l = /* @__PURE__ */ defineComponent({
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
const _sfc_main$k = /* @__PURE__ */ defineComponent({
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
            const index2 = sortedCandidates.findIndex((candidate) => candidate === focusedElement);
            if (focusFirst$1(sortedCandidates.slice(index2 + 1))) {
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
      return openBlock(), createBlock(unref(_sfc_main$l), {
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
          hasToasts.value ? (openBlock(), createBlock(_sfc_main$m, {
            key: 0,
            ref: (node) => {
              headFocusProxyRef.value = unref(unrefElement)(node);
              return void 0;
            },
            onFocusFromOutsideViewport: _cache[0] || (_cache[0] = () => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "forwards"
              });
              unref(focusFirst$1)(tabbableCandidates);
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
          hasToasts.value ? (openBlock(), createBlock(_sfc_main$m, {
            key: 1,
            ref: (node) => {
              tailFocusProxyRef.value = unref(unrefElement)(node);
              return void 0;
            },
            onFocusFromOutsideViewport: _cache[1] || (_cache[1] = () => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "backwards"
              });
              unref(focusFirst$1)(tabbableCandidates);
            })
          }, null, 512)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["aria-label", "style"]);
    };
  }
});
const [injectTooltipProviderContext, provideTooltipProviderContext] = createContext("TooltipProvider");
const _sfc_main$j = /* @__PURE__ */ defineComponent({
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
    const index2 = toasts.value.findIndex((t) => t.id === id);
    if (index2 !== -1) {
      toasts.value[index2] = {
        ...toasts.value[index2],
        ...toast
      };
    }
  }
  function remove(id) {
    const index2 = toasts.value.findIndex((t) => t.id === id);
    if (index2 !== -1) {
      toasts.value[index2] = {
        ...toasts.value[index2],
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
const theme$4 = {
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
const _sfc_main$i = {
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
    const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig.ui?.toast || {} })({
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
      return openBlock(), createBlock(unref(_sfc_main$o), mergeProps({
        ref_key: "el",
        ref: el
      }, unref(rootProps), {
        "data-orientation": __props.orientation,
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        style: { "--height": height.value }
      }), {
        default: withCtx(({ remaining, duration, open }) => [
          renderSlot(_ctx.$slots, "leading", {}, () => [
            __props.avatar ? (openBlock(), createBlock(_sfc_main$G, mergeProps({
              key: 0,
              size: props.ui?.avatarSize || ui.value.avatarSize()
            }, __props.avatar, {
              class: ui.value.avatar({ class: props.ui?.avatar })
            }), null, 16, ["size", "class"])) : __props.icon ? (openBlock(), createBlock(_sfc_main$H, {
              key: 1,
              name: __props.icon,
              class: normalizeClass(ui.value.icon({ class: props.ui?.icon }))
            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(ui.value.wrapper({ class: props.ui?.wrapper }))
          }, [
            __props.title || !!slots.title ? (openBlock(), createBlock(unref(_sfc_main$n), {
              key: 0,
              class: normalizeClass(ui.value.title({ class: props.ui?.title }))
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
            __props.description || !!slots.description ? (openBlock(), createBlock(unref(_sfc_main$q), {
              key: 1,
              class: normalizeClass(ui.value.description({ class: props.ui?.description }))
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
              class: normalizeClass(ui.value.actions({ class: props.ui?.actions }))
            }, [
              renderSlot(_ctx.$slots, "actions", {}, () => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (action, index2) => {
                  return openBlock(), createBlock(unref(_sfc_main$r), {
                    key: index2,
                    "alt-text": action.label || "Action",
                    "as-child": "",
                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$I, mergeProps({
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
            class: normalizeClass(ui.value.actions({ class: props.ui?.actions, orientation: "horizontal" }))
          }, [
            __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) ? renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (action, index2) => {
                return openBlock(), createBlock(unref(_sfc_main$r), {
                  key: index2,
                  "alt-text": action.label || "Action",
                  "as-child": "",
                  onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                  }, ["stop"]))
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$I, mergeProps({
                      size: "xs",
                      color: __props.color
                    }, { ref_for: true }, action), null, 16, ["color"])
                  ]),
                  _: 2
                }, 1032, ["alt-text"]);
              }), 128))
            ]) : createCommentVNode("", true),
            __props.close || !!slots.close ? (openBlock(), createBlock(unref(_sfc_main$s), {
              key: 1,
              "as-child": ""
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                  __props.close ? (openBlock(), createBlock(_sfc_main$I, mergeProps({
                    key: 0,
                    icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                    color: "neutral",
                    variant: "link",
                    "aria-label": unref(t)("toast.close")
                  }, typeof __props.close === "object" ? __props.close : {}, {
                    class: ui.value.close({ class: props.ui?.close }),
                    onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                    }, ["stop"]))
                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                ])
              ]),
              _: 3
            })) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true),
          __props.progress && open && remaining > 0 && duration ? (openBlock(), createBlock(_sfc_main$J, mergeProps({
            key: 1,
            "model-value": remaining / duration * 100,
            color: __props.color
          }, typeof __props.progress === "object" ? __props.progress : {}, {
            size: "sm",
            class: ui.value.progress({ class: props.ui?.progress })
          }), null, 16, ["model-value", "color", "class"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["data-orientation", "class", "style"]);
    };
  }
};
const theme$3 = {
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
const _sfc_main$h = /* @__PURE__ */ Object.assign(__default__$1, {
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
    const portalProps = usePortal(toRef(() => props.portal));
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
    const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.toaster || {} })({
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
    function getOffset(index2) {
      return refs.value.slice(index2 + 1).reduce((acc, { height: height2 }) => acc + height2 + 16, 0);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$v), mergeProps({ "swipe-direction": swipeDirection.value }, unref(providerProps)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(toasts), (toast, index2) => {
            return openBlock(), createBlock(_sfc_main$i, mergeProps({
              key: toast.id,
              ref_for: true,
              ref_key: "refs",
              ref: refs,
              progress: __props.progress
            }, { ref_for: true }, unref(omit)(toast, ["id", "close"]), {
              close: toast.close,
              "data-expanded": expanded.value,
              "data-front": !expanded.value && index2 === unref(toasts).length - 1,
              style: {
                "--index": index2 - unref(toasts).length + unref(toasts).length,
                "--before": unref(toasts).length - 1 - index2,
                "--offset": getOffset(index2),
                "--scale": expanded.value ? "1" : "calc(1 - var(--before) * var(--scale-factor))",
                "--translate": expanded.value ? "calc(var(--offset) * var(--translate-factor))" : "calc(var(--before) * var(--gap))",
                "--transform": "translateY(var(--translate)) scale(var(--scale))"
              },
              class: ui.value.base({ class: [props.ui?.base, toast.onClick ? "cursor-pointer" : void 0] }),
              "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
              onClick: ($event) => toast.onClick && toast.onClick(toast)
            }), null, 16, ["progress", "close", "data-expanded", "data-front", "style", "class", "onUpdate:open", "onClick"]);
          }), 128)),
          createVNode(unref(_sfc_main$p), normalizeProps(guardReactiveProps(unref(portalProps))), {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$k), {
                "data-expanded": expanded.value,
                class: normalizeClass(ui.value.viewport({ class: [props.ui?.viewport, props.class] })),
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
      const index2 = overlays.findIndex((overlay2) => overlay2.id === id);
      overlays.splice(index2, 1);
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
const _sfc_main$g = {
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
const _sfc_main$f = /* @__PURE__ */ Object.assign(__default__, {
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
    const tooltipProps = toRef(() => props.tooltip);
    const toasterProps = toRef(() => props.toaster);
    const locale = toRef(() => props.locale);
    provide(localeContextInjectionKey, locale);
    const portal = toRef(() => props.portal);
    provide(portalTargetInjectionKey, portal);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$K), mergeProps({
        "use-id": () => useId$1(),
        dir: locale.value?.dir,
        locale: locale.value?.code
      }, unref(configProviderProps)), {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$j), normalizeProps(guardReactiveProps(tooltipProps.value)), {
            default: withCtx(() => [
              __props.toaster !== null ? (openBlock(), createBlock(_sfc_main$h, normalizeProps(mergeProps({ key: 0 }, toasterProps.value)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
              createVNode(_sfc_main$g)
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 16, ["use-id", "dir", "locale"]);
    };
  }
});
function useSanitizeURL(url) {
  try {
    const parsed = new URL(url, window.location.origin);
    const isSafeProtocol = ["http:", "https:"].includes(parsed.protocol);
    if (!isSafeProtocol) {
      return "#";
    }
    return parsed.href;
  } catch {
    return "#";
  }
}
const _hoisted_1$c = ["href", "target"];
const _hoisted_2$6 = ["src"];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderBrand",
  props: {
    brand: { type: Object }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", {
        href: unref(useSanitizeURL)(_ctx.brand.link),
        target: _ctx.brand.newTab ? "_blank" : "_self",
        class: "px-4"
      }, [
        createBaseVNode("img", {
          src: _ctx.brand.logo,
          alt: "logo",
          class: "max-w-[75px] max-h-[32px]"
        }, null, 8, _hoisted_2$6)
      ], 8, _hoisted_1$c);
    };
  }
});
const theme$2 = {
  "slots": {
    "content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
    "arrow": "fill-default"
  }
};
const _sfc_main$d = {
  __name: "Popover",
  props: {
    mode: { type: String, required: false, default: "click" },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    reference: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    modal: { type: Boolean, required: false },
    openDelay: { type: Number, required: false, default: 0 },
    closeDelay: { type: Number, required: false, default: 0 }
  },
  emits: ["close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const pick = props.mode === "hover" ? reactivePick(props, "defaultOpen", "open", "openDelay", "closeDelay") : reactivePick(props, "defaultOpen", "open", "modal");
    const rootProps = useForwardPropsEmits(pick, emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {};
    });
    const arrowProps = toRef(() => props.arrow);
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.popover || {} })({
      side: contentProps.value.side
    }));
    const Component = computed(() => props.mode === "hover" ? HoverCard : Popover);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Component).Root, normalizeProps(guardReactiveProps(unref(rootProps))), {
        default: withCtx(({ open }) => [
          !!slots.default || !!__props.reference ? (openBlock(), createBlock(unref(Component).Trigger, {
            key: 0,
            "as-child": "",
            reference: __props.reference,
            class: normalizeClass(props.class)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { open })
            ]),
            _: 2
          }, 1032, ["reference", "class"])) : createCommentVNode("", true),
          "Anchor" in Component.value && !!slots.anchor ? (openBlock(), createBlock(unref(Component).Anchor, {
            key: 1,
            "as-child": ""
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "anchor")
            ]),
            _: 3
          })) : createCommentVNode("", true),
          createVNode(unref(Component).Portal, normalizeProps(guardReactiveProps(unref(portalProps))), {
            default: withCtx(() => [
              createVNode(unref(Component).Content, mergeProps(contentProps.value, {
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, toHandlers(contentEvents.value)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "content"),
                  !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                    class: ui.value.arrow({ class: props.ui?.arrow })
                  }), null, 16, ["class"])) : createCommentVNode("", true)
                ]),
                _: 3
              }, 16, ["class"])
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 16);
    };
  }
};
const theme$1 = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "focus:outline-none w-full"
  },
  "variants": {
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
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};
const _sfc_main$c = {
  __name: "Tabs",
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    content: { type: Boolean, required: false, default: true },
    labelKey: { type: String, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultValue: { type: null, required: false, default: "0" },
    modelValue: { type: null, required: false },
    activationMode: { type: String, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "modelValue", "defaultValue", "orientation", "activationMode", "unmountOnHide"), emits);
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.tabs || {} })({
      color: props.color,
      variant: props.variant,
      size: props.size,
      orientation: props.orientation
    }));
    const triggersRef = ref([]);
    __expose({
      triggersRef
    });
    return (_ctx, _cache) => {
      const _component_UBadge = _sfc_main$L;
      return openBlock(), createBlock(unref(_sfc_main$B), mergeProps(unref(rootProps), {
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }), {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$y), {
            class: normalizeClass(ui.value.list({ class: props.ui?.list }))
          }, {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$z), {
                class: normalizeClass(ui.value.indicator({ class: props.ui?.indicator }))
              }, null, 8, ["class"]),
              renderSlot(_ctx.$slots, "list-leading"),
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, index2) => {
                return openBlock(), createBlock(unref(_sfc_main$x), {
                  key: index2,
                  ref_for: true,
                  ref: (el) => triggersRef.value[index2] = el,
                  value: item.value || String(index2),
                  disabled: item.disabled,
                  class: normalizeClass(ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] }))
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "leading", {
                      item,
                      index: index2
                    }, () => [
                      item.icon ? (openBlock(), createBlock(_sfc_main$H, {
                        key: 0,
                        name: item.icon,
                        class: normalizeClass(ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] }))
                      }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$G, mergeProps({
                        key: 1,
                        size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                      }, { ref_for: true }, item.avatar, {
                        class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ]),
                    unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(ui.value.label({ class: [props.ui?.label, item.ui?.label] }))
                    }, [
                      renderSlot(_ctx.$slots, "default", {
                        item,
                        index: index2
                      }, () => [
                        createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                      ])
                    ], 2)) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "trailing", {
                      item,
                      index: index2
                    }, () => [
                      item.badge !== void 0 ? (openBlock(), createBlock(_component_UBadge, mergeProps({
                        key: 0,
                        color: "neutral",
                        variant: "outline",
                        size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                      }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                        class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "disabled", "class"]);
              }), 128)),
              renderSlot(_ctx.$slots, "list-trailing")
            ]),
            _: 3
          }, 8, ["class"]),
          !!__props.content ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.items, (item, index2) => {
            return openBlock(), createBlock(unref(_sfc_main$A), {
              key: index2,
              value: item.value || String(index2),
              class: normalizeClass(ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] }))
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, item.slot || "content", {
                  item,
                  index: index2
                }, () => [
                  createTextVNode(toDisplayString(item.content), 1)
                ])
              ]),
              _: 2
            }, 1032, ["value", "class"]);
          }), 128)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
};
const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
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
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
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
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _hoisted_1$b = ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete"];
const _sfc_main$b = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Input",
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: null, required: false, default: "text" },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autocomplete: { type: null, required: false, default: "off" },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modelValue = useVModel$1(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, {});
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const inputSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.input || {} })({
      type: props.type,
      color: color.value,
      variant: props.variant,
      size: inputSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      buttonGroup: orientation.value
    }));
    const inputRef = ref(null);
    function updateInput(value) {
      if (props.modelModifiers?.trim) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number || props.type === "number") {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullify) {
        value ||= null;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    function autoFocus() {
      if (props.autofocus) {
        inputRef.value?.focus();
      }
    }
    onMounted(() => {
      setTimeout(() => {
        autoFocus();
      }, props.autofocusDelay);
    });
    __expose({
      inputRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: __props.as,
        class: normalizeClass(ui.value.root({ class: [props.ui?.root, props.class] }))
      }, {
        default: withCtx(() => [
          createBaseVNode("input", mergeProps({
            id: unref(id),
            ref_key: "inputRef",
            ref: inputRef,
            type: __props.type,
            value: unref(modelValue),
            name: unref(name),
            placeholder: __props.placeholder,
            class: ui.value.base({ class: props.ui?.base }),
            disabled: unref(disabled),
            required: __props.required,
            autocomplete: __props.autocomplete
          }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
            onInput,
            onBlur,
            onChange,
            onFocus: _cache[0] || (_cache[0] = (...args) => unref(emitFormFocus) && unref(emitFormFocus)(...args))
          }), null, 16, _hoisted_1$b),
          renderSlot(_ctx.$slots, "default"),
          unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(ui.value.leading({ class: props.ui?.leading }))
          }, [
            renderSlot(_ctx.$slots, "leading", {}, () => [
              unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$H, {
                key: 0,
                name: unref(leadingIconName),
                class: normalizeClass(ui.value.leadingIcon({ class: props.ui?.leadingIcon }))
              }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$G, mergeProps({
                key: 1,
                size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
              }, __props.avatar, {
                class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
            ])
          ], 2)) : createCommentVNode("", true),
          unref(isTrailing) || !!slots.trailing ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: normalizeClass(ui.value.trailing({ class: props.ui?.trailing }))
          }, [
            renderSlot(_ctx.$slots, "trailing", {}, () => [
              unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$H, {
                key: 0,
                name: unref(trailingIconName),
                class: normalizeClass(ui.value.trailingIcon({ class: props.ui?.trailingIcon }))
              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
            ])
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["as", "class"]);
    };
  }
});
const state = reactive({
  navigationItems: [],
  siteMapItems: []
});
const setNavigationItems = (items) => {
  state.navigationItems = items;
};
const setSiteMapItems = (items) => {
  state.siteMapItems = items;
};
function useNavigationStore() {
  return {
    ...toRefs(state),
    setNavigationItems,
    setSiteMapItems
  };
}
const _hoisted_1$a = { class: "overflow-y-auto max-h-[280px]" };
const _hoisted_2$5 = { class: "space-y-2" };
const _hoisted_3$3 = ["onClick"];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderTabsSiteMapItems",
  setup(__props) {
    const { siteMapItems } = useNavigationStore();
    const searchTerm = ref("");
    const normalize = (text) => text.trim().toLowerCase();
    const matchesSearch = (item, term) => {
      if (!term) return true;
      if (normalize(item.description).includes(term)) return true;
      return item.children?.some((child) => matchesSearch(child, term)) ?? false;
    };
    const filterSiteMap = (items, term) => items.map((section) => {
      const matchingChildren = section.children.filter(
        (child) => matchesSearch(child, term)
      );
      if (matchingChildren.length) {
        return { ...section, children: matchingChildren };
      }
      return matchesSearch(section, term) ? section : null;
    }).filter((section) => section !== null);
    const filteredSiteMap = computed(() => {
      if (!siteMapItems.value) return [];
      const term = normalize(searchTerm.value);
      return term ? filterSiteMap(siteMapItems.value, term) : siteMapItems.value;
    });
    const accordionItems = computed(() => {
      return filteredSiteMap.value.map((section, index2) => ({
        label: section.description,
        value: `section-${index2}`,
        children: section.children
      }));
    });
    const handleItemClick = (item) => {
      if (item.url) {
        window.open(item.url, "_self");
      }
    };
    return (_ctx, _cache) => {
      const _component_UInput = _sfc_main$b;
      const _component_UAccordion = _sfc_main$N;
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_UInput, {
          modelValue: searchTerm.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => searchTerm.value = $event),
          icon: "i-lucide-search",
          size: "md",
          variant: "outline",
          placeholder: "Buscar",
          class: "mb-3 w-full"
        }, createSlots({ _: 2 }, [
          searchTerm.value?.length ? {
            name: "trailing",
            fn: withCtx(() => [
              createBaseVNode("button", {
                type: "button",
                class: "inline-flex cursor-pointer items-center justify-center rounded-md p-0 text-sm font-medium transition-colors ring-offset-background size-8 hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                onClick: _cache[0] || (_cache[0] = ($event) => searchTerm.value = "")
              }, [
                createVNode(_sfc_main$M, { icon: "me-icon-l icon-xmark" })
              ])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"]),
        createBaseVNode("div", _hoisted_1$a, [
          createVNode(_component_UAccordion, {
            type: "multiple",
            items: accordionItems.value,
            class: "w-full pr-2",
            ui: {
              item: "border-none",
              header: "border-none",
              trigger: "border-none"
            }
          }, {
            content: withCtx(({ item }) => [
              createBaseVNode("div", _hoisted_2$5, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                  return openBlock(), createElementBlock("div", {
                    key: childIndex,
                    class: "cursor-pointer rounded-md p-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors",
                    onClick: ($event) => handleItemClick(childItem)
                  }, toDisplayString(childItem.description), 9, _hoisted_3$3);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["items"])
        ])
      ]);
    };
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
var version = "1.15.6";
function userAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches(el, selector) {
  if (!selector) return;
  selector[0] === ">" && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest(el, selector, ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx) break;
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state2) {
  if (el && name) {
    if (el.classList) {
      el.classList[state2 ? "add" : "remove"](name);
    } else {
      var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
      el.className = (className + (state2 ? " " + name : "")).replace(R_SPACE, " ");
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf("webkit") === -1) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, "transform");
      if (transform && transform !== "none") {
        appliedTransforms = transform + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }
    return list;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    container = container || el.parentNode;
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
          var containerRect = container.getBoundingClientRect();
          top -= containerRect.top + parseInt(css(container, "border-top-width"));
          left -= containerRect.left + parseInt(css(container, "border-left-width"));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide], visible = void 0;
    {
      visible = elSideVal >= parentSideVal;
    }
    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0, i = 0, children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}
function index(el, selector) {
  var index2 = 0;
  if (!el || !el.parentNode) {
    return -1;
  }
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index2++;
    }
  }
  return index2;
}
function getRelativeScrollOffset(el) {
  var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}
function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function() {
    if (!_throttleTimeout) {
      var args = arguments, _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
function getChildContainingRectFromElement(container, options, ghostEl2) {
  var rect = {};
  Array.from(container.children).forEach(function(child) {
    var _rect$left, _rect$top, _rect$right, _rect$bottom;
    if (!closest(child, options.draggable, container, false) || child.animated || child === ghostEl2) return;
    var childRect = getRect(child);
    rect.left = Math.min((_rect$left = rect.left) !== null && _rect$left !== void 0 ? _rect$left : Infinity, childRect.left);
    rect.top = Math.min((_rect$top = rect.top) !== null && _rect$top !== void 0 ? _rect$top : Infinity, childRect.top);
    rect.right = Math.max((_rect$right = rect.right) !== null && _rect$right !== void 0 ? _rect$right : -Infinity, childRect.right);
    rect.bottom = Math.max((_rect$bottom = rect.bottom) !== null && _rect$bottom !== void 0 ? _rect$bottom : -Infinity, childRect.bottom);
  });
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function AnimationStateManager() {
  var animationStates = [], animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function(child) {
        if (css(child, "display") === "none" || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state2) {
      animationStates.push(state2);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === "function") callback();
        return;
      }
      var animating = false, animationTime = 0;
      animationStates.forEach(function(state2) {
        var time = 0, target = state2.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state2.rect, targetMatrix = matrix(target, true);
        if (targetMatrix) {
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function() {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === "function") callback();
      } else {
        animationCallbackId = setTimeout(function() {
          if (typeof callback === "function") callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, "transition", "");
        css(target, "transform", "");
        var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
        this.forRepaintDummy = repaint(target);
        css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
        css(target, "transform", "translate3d(0,0,0)");
        typeof target.animated === "number" && clearTimeout(target.animated);
        target.animated = setTimeout(function() {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}
var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    for (var option2 in defaults) {
      if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
        plugin[option2] = defaults[option2];
      }
    }
    plugins.forEach(function(p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function() {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + "Global";
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable
        }, evt));
      }
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
    plugins.forEach(function(plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;
      _extends(defaults2, initialized.defaults);
    });
    for (var option2 in sortable.options) {
      if (!sortable.options.hasOwnProperty(option2)) continue;
      var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
      if (typeof modified !== "undefined") {
        sortable.options[option2] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function(plugin) {
      if (typeof plugin.eventProperties !== "function") return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};
function dispatchEvent(_ref) {
  var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl2 && rootEl2[expando];
  if (!sortable) return;
  var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl2;
  evt.from = fromEl || rootEl2;
  evt.item = targetEl || rootEl2;
  evt.clone = cloneEl2;
  evt.oldIndex = oldIndex2;
  evt.newIndex = newIndex2;
  evt.oldDraggableIndex = oldDraggableIndex2;
  evt.newDraggableIndex = newDraggableIndex2;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option2 in allEventProperties) {
    evt[option2] = allEventProperties[option2];
  }
  if (rootEl2) {
    rootEl2.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}
var _excluded = ["evt"];
var pluginEvent2 = function pluginEvent3(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable,
        name,
        originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, info));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (!documentExists) return;
  if (IE11OrLess) {
    return false;
  }
  var el = document.createElement("x");
  el.style.cssText = "pointer-events:auto";
  return el.style.pointerEvents === "auto";
}(), _detectDirection = function _detectDirection2(el, options) {
  var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
  if (elCSS.display === "flex") {
    return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  }
  if (elCSS.display === "grid") {
    return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  }
  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
    var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
    return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
  }
  return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
}, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
  var ret;
  sortables.some(function(sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable)) return;
    var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
}, _prepareGroup = function _prepareGroup2(options) {
  function toFn(value, pull) {
    return function(to, from, dragEl2, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
      if (value == null && (pull || sameGroup)) {
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === "clone") {
        return value;
      } else if (typeof value === "function") {
        return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }
  var group = {};
  var originalGroup = options.group;
  if (!originalGroup || _typeof(originalGroup) != "object") {
    originalGroup = {
      name: originalGroup
    };
  }
  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
}, _hideGhostForTarget = function _hideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "none");
  }
}, _unhideGhostForTarget = function _unhideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "");
  }
};
if (documentExists && !ChromeForAndroid) {
  document.addEventListener("click", function(evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el;
  this.options = options = _extends({}, options);
  el[expando] = this;
  var defaults2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl2) {
      dataTransfer.setData("Text", dragEl2.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && (!Safari || IOS),
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults2);
  for (var name in defaults2) {
    !(name in options) && (options[name] = defaults2[name]);
  }
  _prepareGroup(options);
  for (var fn in this) {
    if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
      this[fn] = this[fn].bind(this);
    }
  }
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    this.options.touchStartThreshold = 1;
  }
  if (options.supportPointer) {
    on(el, "pointerdown", this._onTapStart);
  } else {
    on(el, "mousedown", this._onTapStart);
    on(el, "touchstart", this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, "dragover", this);
    on(el, "dragenter", this);
  }
  sortables.push(this.el);
  options.store && options.store.get && this.sort(options.store.get(this) || []);
  _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(evt) {
    if (!evt.cancelable) return;
    var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
    _saveInputCheckedState(el);
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return;
    }
    if (originalTarget.isContentEditable) {
      return;
    }
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      return;
    }
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);
    if (typeof filter === "function") {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: "filter",
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent2("filter", _this, {
          evt
        });
        preventOnFilter && evt.preventDefault();
        return;
      }
    } else if (filter) {
      filter = filter.split(",").some(function(criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: "filter",
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.preventDefault();
        return;
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(evt, touch, target) {
    var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style["will-change"] = "all";
      dragStartFn = function dragStartFn2() {
        pluginEvent2("delayEnded", _this, {
          evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }
        _this._triggerDragStart(evt, touch);
        _dispatchEvent({
          sortable: _this,
          name: "choose",
          originalEvent: evt
        });
        toggleClass(dragEl, options.chosenClass, true);
      };
      options.ignore.split(",").forEach(function(criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
      if (options.supportPointer) {
        on(ownerDocument, "pointerup", _this._onDrop);
        !this.nativeDraggable && on(ownerDocument, "pointercancel", _this._onDrop);
      } else {
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop);
      }
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent2("delayStart", this, {
        evt
      });
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        if (options.supportPointer) {
          on(ownerDocument, "pointerup", _this._disableDelayedDrag);
          on(ownerDocument, "pointercancel", _this._disableDelayedDrag);
        } else {
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
        }
        on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
        on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._disableDelayedDrag);
    off(ownerDocument, "touchend", this._disableDelayedDrag);
    off(ownerDocument, "touchcancel", this._disableDelayedDrag);
    off(ownerDocument, "pointerup", this._disableDelayedDrag);
    off(ownerDocument, "pointercancel", this._disableDelayedDrag);
    off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(evt, touch) {
    touch = touch || evt.pointerType == "touch" && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, "pointermove", this._onTouchMove);
      } else if (touch) {
        on(document, "touchmove", this._onTouchMove);
      } else {
        on(document, "mousemove", this._onTouchMove);
      }
    } else {
      on(dragEl, "dragend", this);
      on(rootEl, "dragstart", this._onDragStart);
    }
    try {
      if (document.selection) {
        _nextTick(function() {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {
    }
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent2("dragStarted", this, {
        evt
      });
      if (this.nativeDraggable) {
        on(document, "dragover", _checkOutsideTargetEl);
      }
      var options = this.options;
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();
      _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent;
        } while (parent = getParentOrHost(parent));
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(evt) {
    if (tapEvt) {
      var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, "webkitTransform", cssMatrix);
        css(ghostEl, "mozTransform", cssMatrix);
        css(ghostEl, "msTransform", cssMatrix);
        css(ghostEl, "transform", cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
      if (PositionGhostAbsolutely) {
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, "transition", "");
      css(ghostEl, "transform", "");
      css(ghostEl, "box-sizing", "border-box");
      css(ghostEl, "margin", 0);
      css(ghostEl, "top", rect.top);
      css(ghostEl, "left", rect.left);
      css(ghostEl, "width", rect.width);
      css(ghostEl, "height", rect.height);
      css(ghostEl, "opacity", "0.8");
      css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
      css(ghostEl, "zIndex", "100000");
      css(ghostEl, "pointerEvents", "none");
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);
      css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function _onDragStart(evt, fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent2("dragStart", this, {
      evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent2("setupClone", this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.removeAttribute("id");
      cloneEl.draggable = false;
      cloneEl.style["will-change"] = "";
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }
    _this.cloneId = _nextTick(function() {
      pluginEvent2("clone", _this);
      if (Sortable.eventCanceled) return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: "clone"
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      off(document, "mouseup", _this._onDrop);
      off(document, "touchend", _this._onDrop);
      off(document, "touchcancel", _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = "move";
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, "drop", _this);
      css(dragEl, "transform", "translateZ(0)");
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, "selectstart", _this);
    moved = true;
    window.getSelection().removeAllRanges();
    if (Safari) {
      css(document.body, "user-select", "none");
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(evt) {
    var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
    if (_silent) return;
    function dragOverEvent(name, extra) {
      pluginEvent2(name, _this, _objectSpread2({
        evt,
        isOwner,
        axis: vertical ? "vertical" : "horizontal",
        revert,
        dragRect,
        targetRect,
        canSort,
        fromSortable,
        target,
        completed,
        onMove: function onMove(target2, after2) {
          return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
        },
        changed
      }, extra));
    }
    function capture() {
      dragOverEvent("dragOverAnimationCapture");
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }
    function completed(insertion) {
      dragOverEvent("dragOverCompleted", {
        insertion
      });
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function() {
          dragOverEvent("dragOverAnimationComplete");
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: "change",
        toEl: el,
        newIndex,
        newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent("dragOver");
    if (Sortable.eventCanceled) return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === "vertical";
      dragRect = getRect(dragEl);
      dragOverEvent("dragOverValid");
      if (Sortable.eventCanceled) return completedFired;
      if (revert) {
        parentEl = rootEl;
        capture();
        this._hideClone();
        dragOverEvent("revert");
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        if (elLastChild === dragEl) {
          return completed(false);
        }
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          if (elLastChild && elLastChild.nextSibling) {
            el.insertBefore(dragEl, elLastChild.nextSibling);
          } else {
            el.appendChild(dragEl);
          }
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
        }
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling, after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode;
          if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, "mousemove", this._onTouchMove);
    off(document, "touchmove", this._onTouchMove);
    off(document, "pointermove", this._onTouchMove);
    off(document, "dragover", nearestEmptyInsertDetectEvent);
    off(document, "mousemove", nearestEmptyInsertDetectEvent);
    off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._onDrop);
    off(ownerDocument, "touchend", this._onDrop);
    off(ownerDocument, "pointerup", this._onDrop);
    off(ownerDocument, "pointercancel", this._onDrop);
    off(ownerDocument, "touchcancel", this._onDrop);
    off(document, "selectstart", this);
  },
  _onDrop: function _onDrop(evt) {
    var el = this.el, options = this.options;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent2("drop", this, {
      evt
    });
    parentEl = dragEl && dragEl.parentNode;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);
    if (this.nativeDraggable) {
      off(document, "drop", this);
      off(el, "dragstart", this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, "user-select", "");
    }
    css(dragEl, "transform", "");
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, "dragend", this);
        }
        _disableDraggable(dragEl);
        dragEl.style["will-change"] = "";
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);
        _dispatchEvent({
          sortable: this,
          name: "unchoose",
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            _dispatchEvent({
              rootEl: parentEl,
              name: "add",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "remove",
              toEl: parentEl,
              originalEvent: evt
            });
            _dispatchEvent({
              rootEl: parentEl,
              name: "sort",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "sort",
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              _dispatchEvent({
                sortable: this,
                name: "update",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: "end",
            toEl: parentEl,
            originalEvent: evt
          });
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent2("nulling", this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function(el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(evt) {
    switch (evt.type) {
      case "drop":
      case "dragend":
        this._onDrop(evt);
        break;
      case "dragenter":
      case "dragover":
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case "selectstart":
        evt.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {}, rootEl2 = this.el;
    this.toArray().forEach(function(id, i) {
      var el = rootEl2.children[i];
      if (closest(el, this.options.draggable, rootEl2, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function(id) {
      if (items[id]) {
        rootEl2.removeChild(items[id]);
        rootEl2.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== "undefined") {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === "group") {
        _prepareGroup(options);
      }
    }
  },
  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent2("destroy", this);
    var el = this.el;
    el[expando] = null;
    off(el, "mousedown", this._onTapStart);
    off(el, "touchstart", this._onTapStart);
    off(el, "pointerdown", this._onTapStart);
    if (this.nativeDraggable) {
      off(el, "dragover", this);
      off(el, "dragenter", this);
    }
    Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
      el2.removeAttribute("draggable");
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent2("hideClone", this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, "display", "none");
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable2) {
    if (putSortable2.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent2("showClone", this);
      if (Sortable.eventCanceled) return;
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, "display", "");
      cloneHidden = false;
    }
  }
};
function _globalDragOver(evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent("move", true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl2;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var firstElRect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX < childContainingRect.left - spacer || evt.clientY < firstElRect.top && evt.clientX < firstElRect.right : evt.clientY < childContainingRect.top - spacer || evt.clientY < firstElRect.bottom && evt.clientX < firstElRect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var lastElRect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX > childContainingRect.right + spacer || evt.clientY > lastElRect.bottom && evt.clientX > lastElRect.left : evt.clientY > childContainingRect.bottom + spacer || evt.clientX > lastElRect.right && evt.clientY > lastElRect.top;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
  if (!invertSwap) {
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName("input");
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}
if (documentExists) {
  on(document, "touchmove", function(evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild,
  expando
};
Sortable.get = function(element) {
  return element[expando];
};
Sortable.mount = function() {
  for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins2[_key] = arguments[_key];
  }
  if (plugins2[0].constructor === Array) plugins2 = plugins2[0];
  plugins2.forEach(function(plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
Sortable.create = function(el, options) {
  return new Sortable(el, options);
};
Sortable.version = version;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted2(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, "dragover", this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, "touchmove", this._handleFallbackAutoScroll);
        } else {
          on(document, "mousemove", this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop3() {
      if (this.sortable.nativeDraggable) {
        off(document, "dragover", this._handleAutoScroll);
      } else {
        off(document, "pointermove", this._handleFallbackAutoScroll);
        off(document, "touchmove", this._handleFallbackAutoScroll);
        off(document, "mousemove", this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt;
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          pointerElemChangedInterval = setInterval(function() {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(autoScroll2) {
    clearInterval(autoScroll2.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
  var scrollThisInstance = false, scrollCustomFn;
  if (scrollRootEl !== rootEl2) {
    scrollRootEl = rootEl2;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl2, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        autoScrolls[layersOut].pid = setInterval((function() {
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1);
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === "function") {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }).bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance;
}, 30);
var drop = function drop2(_ref) {
  var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable2 || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent("spill");
    this.onSpill({
      dragEl: dragEl2,
      putSortable: putSortable2
    });
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex2 = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex2;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable2) {
      putSortable2.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl2, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl2);
    }
    this.sortable.animateAll();
    if (putSortable2) {
      putSortable2.animateAll();
    }
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function onSpill2(_ref4) {
    var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
    var parentSortable = putSortable2 || this.sortable;
    parentSortable.captureAnimationState();
    dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
    parentSortable.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
function useSortable(el, list, options = {}) {
  let sortable;
  const { document: document2 = defaultDocument, ...resetOptions } = options;
  const defaultOptions = {
    onUpdate: (e) => {
      moveArrayElement(list, e.oldIndex, e.newIndex, e);
    }
  };
  const start = () => {
    const target = typeof el === "string" ? document2 == null ? void 0 : document2.querySelector(el) : unrefElement$1(el);
    if (!target || sortable !== void 0)
      return;
    sortable = new Sortable(target, { ...defaultOptions, ...resetOptions });
  };
  const stop = () => {
    sortable == null ? void 0 : sortable.destroy();
    sortable = void 0;
  };
  const option2 = (name, value) => {
    if (value !== void 0)
      sortable == null ? void 0 : sortable.option(name, value);
    else
      return sortable == null ? void 0 : sortable.option(name);
  };
  tryOnMounted(start);
  tryOnScopeDispose(stop);
  return {
    stop,
    start,
    option: option2
  };
}
function insertNodeAt(parentElement, element, index2) {
  const refElement = parentElement.children[index2];
  parentElement.insertBefore(element, refElement);
}
function removeNode(node) {
  if (node.parentNode)
    node.parentNode.removeChild(node);
}
function moveArrayElement(list, from, to, e = null) {
  if (e != null) {
    removeNode(e.item);
    insertNodeAt(e.from, e.item, from);
  }
  const _valueIsRef = isRef(list);
  const array = _valueIsRef ? [...toValue(list)] : toValue(list);
  if (to >= 0 && to < array.length) {
    const element = array.splice(from, 1)[0];
    nextTick(() => {
      array.splice(to, 0, element);
      if (_valueIsRef)
        list.value = array;
    });
  }
}
const _hoisted_1$9 = {
  key: 0,
  class: "h-px bg-gray-300 w-full"
};
const _hoisted_2$4 = {
  key: 1,
  class: "flex items-center gap-2"
};
const _hoisted_3$2 = { class: "text-sm font-medium" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderTabsNavigationItems",
  setup(__props) {
    const { navigationItems } = useNavigationStore();
    const el = useTemplateRef("el");
    const navigationItemsShallow = shallowRef(navigationItems.value || []);
    useSortable(el, navigationItemsShallow, {
      animation: 150,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag"
      // onUpdate: (evt: any) => {
      //   console.log('Item movido:', {
      //     from: evt.oldIndex,
      //     to: evt.newIndex,
      //     item: navigationItemsShallow.value[evt.newIndex!]
      //   })
      // }
    });
    watch(
      () => navigationItems.value,
      (newItems) => {
        if (newItems) {
          navigationItemsShallow.value = newItems;
        }
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "el",
        ref: el,
        class: "flex flex-col gap-2 p-4"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(navigationItemsShallow.value, (item, index2) => {
          return openBlock(), createElementBlock("div", {
            key: index2,
            class: "h-20 bg-gray-500/5 rounded p-3 cursor-move hover:bg-gray-500/10 transition-colors"
          }, [
            "separator" in item ? (openBlock(), createElementBlock("div", _hoisted_1$9)) : "label" in item ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
              item.icon ? (openBlock(), createBlock(_sfc_main$M, {
                key: 0,
                icon: item.icon,
                class: "text-gray-600"
              }, null, 8, ["icon"])) : createCommentVNode("", true),
              createBaseVNode("span", _hoisted_3$2, toDisplayString(item.label), 1)
            ])) : createCommentVNode("", true)
          ]);
        }), 128))
      ], 512);
    };
  }
});
const _style_0 = "\n.sortable-ghost[data-v-27a92816] {\n  opacity: 0.4;\n  background-color: #f3f4f6;\n}\n.sortable-chosen[data-v-27a92816] {\n  background-color: #e5e7eb;\n}\n.sortable-drag[data-v-27a92816] {\n  opacity: 0.8;\n  transform: rotate(5deg);\n}\n";
const TheHeaderTabsNavigationItems = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["styles", [_style_0]], ["__scopeId", "data-v-27a92816"]]);
const _hoisted_1$8 = { class: "p-4 w-[384px]" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderTabs",
  setup(__props) {
    const items = ref([
      {
        label: "Apps",
        slot: "navigationItems"
      },
      {
        label: "Outras funcionalidades",
        slot: "siteMapItems"
      }
    ]);
    const handleTabChange = (index2) => {
    };
    onMounted(() => {
    });
    return (_ctx, _cache) => {
      const _component_UTabs = _sfc_main$c;
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createVNode(_component_UTabs, {
          items: items.value,
          class: "w-full",
          size: "xs",
          variant: "pill",
          color: "neutral",
          ui: {
            list: "grid grid-cols-2 w-full",
            trigger: "flex-1 text-center cursor-pointer data-[state=active]:bg-white data-[state=active]:text-gray-900 focus:outline-none focus-visible:outline-none",
            indicator: "bg-white"
          },
          onChange: handleTabChange
        }, {
          navigationItems: withCtx(() => [
            createBaseVNode("keep-alive", null, [
              (openBlock(), createBlock(Suspense, null, {
                fallback: withCtx(() => _cache[0] || (_cache[0] = [
                  createBaseVNode("div", { class: "p-4 text-center text-gray-500" }, "Carregando...", -1)
                ])),
                default: withCtx(() => [
                  createVNode(TheHeaderTabsNavigationItems)
                ]),
                _: 1
              }))
            ])
          ]),
          siteMapItems: withCtx(() => [
            createBaseVNode("keep-alive", null, [
              (openBlock(), createBlock(Suspense, null, {
                fallback: withCtx(() => _cache[1] || (_cache[1] = [
                  createBaseVNode("div", { class: "p-4 text-center text-gray-500" }, "Carregando...", -1)
                ])),
                default: withCtx(() => [
                  createVNode(_sfc_main$a)
                ]),
                _: 1
              }))
            ])
          ]),
          _: 1
        }, 8, ["items"])
      ]);
    };
  }
});
const _hoisted_1$7 = { class: "flex items-center justify-center" };
const _hoisted_2$3 = { class: "text-xs py-[6px] text-[var(--header-icon-color)]" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderNavigationItemContent",
  props: {
    icon: { type: String },
    label: { type: String },
    iconColor: { type: String },
    active: { type: Boolean },
    click: { type: Function }
  },
  setup(__props) {
    const props = __props;
    function handleClick() {
      props.click?.(props);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "grid place-items-center gap-1 px-2 py-1 cursor-pointer relative transition-colors duration-200 hover:bg-[rgba(0,0,0,0.1)] text-[var(--color-neutral-300)] text-center",
          _ctx.active === true && "after:content-[''] after:bg-[var(--header-icon-color)] after:h-1 after:rounded-full after:absolute after:block after:w-[80%] after:bottom-0 after:left-1/2 after:-translate-x-1/2"
        ]),
        style: normalizeStyle({ "--header-icon-color": _ctx.iconColor }),
        onClick: withModifiers(handleClick, ["prevent", "stop"])
      }, [
        createBaseVNode("div", _hoisted_1$7, [
          createVNode(_sfc_main$M, {
            icon: _ctx.icon,
            "custom-size": 24,
            color: _ctx.iconColor
          }, null, 8, ["icon", "color"])
        ]),
        createBaseVNode("p", _hoisted_2$3, toDisplayString(_ctx.label), 1)
      ], 6);
    };
  }
});
const _hoisted_1$6 = {
  key: 0,
  class: "relative"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderNavigationItem",
  props: {
    iconColor: { type: String },
    icon: { type: String },
    label: { type: String },
    active: { type: Boolean },
    click: { type: Function },
    siteMap: { type: Boolean }
  },
  setup(__props) {
    const isOpen = ref(false);
    const headerBackdrop = inject("headerBackdrop");
    function handlePopoverUpdate(open) {
      isOpen.value = open;
      if (open) {
        headerBackdrop?.show(9999);
      } else {
        headerBackdrop?.close();
      }
    }
    watch(isOpen, (newValue) => {
      if (!newValue) {
        headerBackdrop?.close();
      }
    });
    return (_ctx, _cache) => {
      const _component_TheHeaderTabs = _sfc_main$8;
      const _component_UPopover = _sfc_main$d;
      return _ctx.siteMap ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
        createVNode(_component_UPopover, {
          open: isOpen.value,
          ui: {
            content: "z-[10001]",
            arrow: "z-[10001]"
          },
          mode: "click",
          arrow: "",
          "onUpdate:open": handlePopoverUpdate
        }, {
          content: withCtx(() => [
            createVNode(_component_TheHeaderTabs)
          ]),
          default: withCtx(() => [
            createVNode(_sfc_main$7, {
              icon: _ctx.icon,
              label: _ctx.label,
              iconColor: _ctx.iconColor,
              active: _ctx.active,
              click: _ctx.click
            }, null, 8, ["icon", "label", "iconColor", "active", "click"])
          ]),
          _: 1
        }, 8, ["open"])
      ])) : (openBlock(), createBlock(_sfc_main$7, {
        key: 1,
        icon: _ctx.icon,
        label: _ctx.label,
        iconColor: _ctx.iconColor,
        active: _ctx.active,
        click: _ctx.click
      }, null, 8, ["icon", "label", "iconColor", "active", "click"]));
    };
  }
});
const _hoisted_1$5 = { class: "ml-auto flex justify-center gap-6" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderNavigation",
  props: {
    iconColor: { type: String }
  },
  setup(__props) {
    const { navigationItems } = useNavigationStore();
    function isSeparator(item) {
      return "separator" in item && item.separator === true;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(navigationItems), (item, index2) => {
          return openBlock(), createElementBlock(Fragment, {
            key: isSeparator(item) ? `separator-${index2}` : item.label
          }, [
            isSeparator(item) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "my-2 border-l",
              style: normalizeStyle({ borderColor: _ctx.iconColor })
            }, null, 4)) : (openBlock(), createBlock(_sfc_main$6, mergeProps({
              key: 1,
              ref_for: true
            }, item, { iconColor: _ctx.iconColor }), null, 16, ["iconColor"]))
          ], 64);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$4 = { class: "cursor-pointer overflow-hidden rounded-bl-lg" };
const _hoisted_2$2 = ["href", "onClick"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderAvatarMenuItem",
  props: {
    profileItems: { type: Array },
    setVisibleToFalse: { type: Function },
    nested: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    function accordionItems(item) {
      const { icon, ...rest } = item;
      return [
        {
          ...rest,
          label: icon ? `${icon.class} ${item.label || ""}` : item.label || "",
          children: item.children || []
        }
      ];
    }
    function handleClick(item) {
      if (item.url) {
        const isExternal = /^https?:\/\//.test(item.url);
        if (isExternal) {
          window.open(item.url, "_self");
        } else {
          window.location.href = item.url;
        }
        return props.setVisibleToFalse();
      }
      if (item?.click) {
        item.click();
        props.setVisibleToFalse();
      }
    }
    return (_ctx, _cache) => {
      const _component_TheHeaderAvatarMenuItem = resolveComponent("TheHeaderAvatarMenuItem", true);
      const _component_UAccordion = _sfc_main$N;
      return openBlock(), createElementBlock("ul", _hoisted_1$4, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.profileItems, (item, index2) => {
          return openBlock(), createElementBlock("li", { key: index2 }, [
            item.children ? (openBlock(), createBlock(_component_UAccordion, {
              key: 0,
              items: accordionItems(item),
              ui: {
                body: "p-0",
                trigger: `py-2 px-4 hover:bg-blue-100 hover:text-primary flex navigationItems-center gap-2 cursor-pointer font-normal ${item.active ? "text-primary" : ""}`
              }
            }, {
              body: withCtx(({ item: accordionItem }) => [
                createVNode(_component_TheHeaderAvatarMenuItem, {
                  "profile-items": accordionItem.children || [],
                  "set-visible-to-false": _ctx.setVisibleToFalse,
                  nested: ""
                }, null, 8, ["profile-items", "set-visible-to-false"])
              ]),
              _: 2
            }, 1032, ["items", "ui"])) : (openBlock(), createElementBlock("a", {
              key: 1,
              class: "flex h-10 cursor-pointer items-center gap-2 px-4 py-2 group hover:text-primary hover:bg-blue-100",
              href: item.url || "#",
              onClick: withModifiers(() => handleClick(item), ["prevent"])
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["text-gray-500 group-hover:text-primary", {
                  "text-[var(--color-neutral-400)] font-semibold": props.nested && !item.active
                }])
              }, toDisplayString(item.label), 3),
              createBaseVNode("span", null, [
                item.icon ? (openBlock(), createBlock(_sfc_main$M, {
                  key: 0,
                  icon: item.icon.class,
                  "custom-size": 16,
                  color: item.icon.color,
                  class: "leading-none"
                }, null, 8, ["icon", "color"])) : createCommentVNode("", true)
              ])
            ], 8, _hoisted_2$2))
          ]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$3 = { class: "relative flex select-none flex-col items-end" };
const _hoisted_2$1 = { class: "flex justify-between gap-4 px-4 py-2 align-center" };
const _hoisted_3$1 = { class: "grid w-[168px]" };
const _hoisted_4 = { class: "mb-0 truncate text-gray-500" };
const _hoisted_5 = { class: "block truncate text-xs text-gray-400" };
const _hoisted_6 = { class: "text-2xl font-normal no-underline" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderAvatarMenu",
  props: {
    user: { type: Object },
    profileItems: { type: Array },
    setVisibleToFalse: { type: Function }
  },
  setup(__props) {
    const menuAvatar = useTemplateRef("menuAvatar");
    const avatar = useTemplateRef("avatar");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", {
          ref_key: "menuAvatar",
          ref: menuAvatar,
          class: "absolute rounded-bl-lg bg-white text-sm top-[-1px] right-[-8px]"
        }, [
          createBaseVNode("div", _hoisted_2$1, [
            createBaseVNode("div", _hoisted_3$1, [
              createBaseVNode("p", _hoisted_4, toDisplayString(_ctx.user.name), 1),
              createBaseVNode("small", _hoisted_5, toDisplayString(_ctx.user.role || _ctx.user.email || ""), 1)
            ]),
            createBaseVNode("div", {
              ref_key: "avatar",
              ref: avatar,
              class: "flex cursor-pointer items-center justify-center rounded-full text-white size-12 bg-primary"
            }, [
              createBaseVNode("span", _hoisted_6, toDisplayString(_ctx.user.acronym), 1)
            ], 512)
          ]),
          createVNode(_sfc_main$4, {
            profileItems: _ctx.profileItems,
            "set-visible-to-false": _ctx.setVisibleToFalse
          }, null, 8, ["profileItems", "set-visible-to-false"])
        ], 512)
      ]);
    };
  }
});
const _hoisted_1$2 = { class: "group py-2 px-4 hover:bg-[rgba(0,0,0,0.1)] cursor-pointer" };
const _hoisted_2 = { class: "flex items-center justify-center size-12 rounded-full bg-[rgba(0,0,0,0.4)] mx-auto border-transparent border group-hover:border-white group-hover:border-2" };
const _hoisted_3 = { class: "text-2xl uppercase" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderAvatar",
  props: {
    user: { type: Object },
    profileItems: { type: Array }
  },
  setup(__props) {
    const props = __props;
    const visibleMenu = ref(false);
    const headerBackdrop = inject("headerBackdrop");
    function handlePopoverUpdate(open) {
      if (open) {
        headerBackdrop?.show(9999);
      } else {
        headerBackdrop?.close();
      }
    }
    function setVisibleToFalse() {
      visibleMenu.value = false;
      headerBackdrop?.close();
    }
    watch(visibleMenu, (newValue) => {
      if (!newValue) {
        headerBackdrop?.close();
      }
    });
    onBeforeUnmount(() => {
      setVisibleToFalse();
    });
    return (_ctx, _cache) => {
      const _component_UPopover = _sfc_main$d;
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_UPopover, {
          open: visibleMenu.value,
          "onUpdate:open": [
            _cache[0] || (_cache[0] = ($event) => visibleMenu.value = $event),
            handlePopoverUpdate
          ],
          content: {
            align: "end",
            side: "bottom",
            sideOffset: -63
          },
          ui: {
            content: "z-[10003]"
          },
          mode: "click"
        }, {
          content: withCtx(() => [
            createVNode(_sfc_main$3, {
              user: props.user,
              profileItems: props.profileItems,
              "set-visible-to-false": setVisibleToFalse
            }, null, 8, ["user", "profileItems"])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$2, [
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("span", _hoisted_3, toDisplayString(props.user.acronym), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["open"])
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "size-full" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppBackdrop",
  props: {
    teleportTo: { default: "body", type: String },
    class: { type: String },
    zIndex: { default: 1e4, type: Number }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: _ctx.teleportTo }, [
        createBaseVNode("div", {
          class: normalizeClass([
            "size-full fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]",
            __props.class
          ]),
          style: normalizeStyle({ zIndex: _ctx.zIndex })
        }, [
          createBaseVNode("div", _hoisted_1$1, [
            renderSlot(_ctx.$slots, "default")
          ])
        ], 6)
      ], 8, ["to"]);
    };
  }
});
const _hoisted_1 = { class: "flex items-center justify-between" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TheHeader.ce",
  setup(__props) {
    const navigationStore = useNavigationStore();
    const backdropState = ref({
      visible: false,
      zIndex: 9999
    });
    function showBackdrop(zIndex = 9999) {
      backdropState.value = {
        visible: true,
        zIndex
      };
    }
    function closeBackdrop() {
      backdropState.value.visible = false;
    }
    provide("headerBackdrop", {
      show: showBackdrop,
      close: closeBackdrop,
      state: backdropState
    });
    const brand = ref({
      logo: "https://eletrods.me.com.br/logo.svg",
      link: "https://me.com.br",
      newTab: true,
      background: {
        // primaryColor: '#343434',
        // secondaryColor: '#009900',
        // iconColor: 'peachPuff'
        // repeatImage: 'https://conteudo.imguol.com.br/c/home/46/2020/03/02/balaio-do-kotscho-150-1583157444753_100x100.jpg.webp',
        // mainImage: 'https://conteudo.imguol.com.br/c/noticias/90/2019/04/01/leonardo-sakamoto-1554157201028_v2_100x100.jpg.webp',
      }
    });
    const user = ref({
      name: "Renato Dias",
      role: "Developer",
      acronym: "RD",
      badge: {
        variant: "danger",
        icon: "me-icon-l icon-exclamation"
      }
    });
    const profileItems = ref([
      {
        label: "Profile",
        click: () => console.log("Profile"),
        icon: {
          class: "me-icon-l icon-user-alt",
          color: "var(--me-primary-1)"
        }
      },
      {
        label: "Change Password",
        url: "#",
        icon: {
          class: "me-icon-l icon-key",
          color: "var(--me-warning-2)"
        }
      },
      {
        label: "Português (pt-BR)",
        active: true,
        children: [
          { label: "Espanhol (es-MX)", url: "#" },
          { label: "Francês (fr-FR)", click: () => console.log("French") },
          { label: "Inglês (en-US)", url: "#" },
          { label: "Português (pt-PT)", url: "#" }
        ]
      },
      {
        label: "Logoff",
        url: "#"
      }
    ]);
    navigationStore.setNavigationItems([
      {
        icon: "me-icon-l icon-objects-column",
        label: "Dashboard",
        click: (e) => console.log(e),
        active: true
      },
      {
        separator: true
      },
      {
        icon: "me-icon-l icon-store",
        label: "Fornecedores",
        click: (e) => console.log(e)
      },
      {
        label: "Mais",
        icon: "me-icon-l icon-ellipsis-h",
        siteMap: true
      }
    ]);
    navigationStore.setSiteMapItems([
      {
        $id: "2",
        name: "1",
        description: "Painel de Controle",
        url: "",
        children: [
          {
            $id: "3",
            name: "1_1",
            description: "Compras",
            url: "/Mercado.asp",
            children: []
          },
          {
            $id: "4",
            name: "1_2",
            description: "Vendas",
            url: "/MeuMercadoVendas.asp",
            children: []
          },
          {
            $id: "5",
            name: "1_5",
            description: "Vendas (Projetos)",
            url: "/ME/PainelControleVendasProjetos.aspx",
            children: []
          }
        ]
      },
      {
        $id: "6",
        name: "2",
        description: "Usuários",
        url: "",
        children: [
          {
            $id: "7",
            name: "2_0",
            description: "Usuários",
            url: "/user/",
            children: []
          },
          {
            $id: "8",
            name: "2_1",
            description: "Perfis",
            url: "/ME/Perfil.aspx",
            children: []
          },
          {
            $id: "9",
            name: "2_8",
            description: "Perfis Planeamento",
            url: "/ME/PerfilPlaneamento.aspx",
            children: []
          },
          {
            $id: "10",
            name: "2_3",
            description: "Grupos De Usuários",
            url: "/ME/ListaGruposUsuariosWF.aspx",
            children: []
          },
          {
            $id: "11",
            name: "2_6",
            description: "Monitoramento de Usuários",
            url: "/ME/MonitoraUsuariosWF.aspx",
            children: []
          },
          {
            $id: "12",
            name: "2_7",
            description: "Histórico de Substituição",
            url: "/do/HistoricoSubstituicaoPerfil.mvc",
            children: []
          }
        ]
      },
      {
        $id: "13",
        name: "3",
        description: "Produtos",
        url: "",
        children: [
          {
            $id: "14",
            name: "3_0",
            description: "Meus Produtos",
            url: "/ListaTodosProdutosIE.asp",
            children: []
          },
          {
            $id: "15",
            name: "3_1",
            description: "Grupos de Produtos",
            url: "/ListaGruposProd.asp",
            children: []
          },
          {
            $id: "16",
            name: "3_7",
            description: "Flows de Produtos",
            url: "/ME/ListaFlows.aspx",
            children: []
          },
          {
            $id: "17",
            name: "3_3",
            description: "Catálogo de Compras",
            url: "/ListaProdutos.asp",
            children: []
          },
          {
            $id: "18",
            name: "3_5",
            description: "Catálogos Fornecedores",
            url: "/do/Suppliers.mvc/Catalogo",
            children: []
          },
          {
            $id: "19",
            name: "3_10",
            description: "Templates de Cotação",
            url: "/CotacaoTemplate.asp",
            children: []
          },
          {
            $id: "20",
            name: "3_11",
            description: "Gerenciamento de Contratos",
            url: "/ME/GerenciamentoContrato.aspx",
            children: []
          },
          {
            $id: "21",
            name: "3_23",
            description: "Categorias de Contratos",
            url: "/do/CategoriaContrato.mvc",
            children: []
          },
          {
            $id: "22",
            name: "3_22",
            description: "Grupo de Workflow",
            url: "/ME/GrupoWorkflow.aspx",
            children: []
          },
          {
            $id: "23",
            name: "3_12",
            description: "Templates de Requisição",
            url: "/ME/TemplateReq.aspx",
            children: []
          },
          {
            $id: "24",
            name: "3_16",
            description: "Taxas de ICMS",
            url: "/ME/TaxaICMS.aspx",
            children: []
          },
          {
            $id: "25",
            name: "3_14",
            description: "Exceções de ICMS",
            url: "/ME/ExcecaoICMS.aspx",
            children: []
          },
          {
            $id: "26",
            name: "3_15",
            description: "Exceções de IPI",
            url: "/ME/ExcecaoIPI.aspx",
            children: []
          },
          {
            $id: "27",
            name: "3_17",
            description: "Controle de NBM",
            url: "/do/NBM.mvc",
            children: []
          },
          {
            $id: "28",
            name: "3_18",
            description: "Fator de Conversão de Unidade",
            url: "/ME/ConversaoUnidadeSimples.aspx",
            children: []
          },
          {
            $id: "29",
            name: "3_19",
            description: "Atributos Produtos",
            url: "/Produtos.asp?action=listaAtributosProduto",
            children: []
          },
          {
            $id: "30",
            name: "3_20",
            description: "Abreviaturas",
            url: "/Produtos.asp?action=listaAbreviaturas",
            children: []
          },
          {
            $id: "31",
            name: "3_21",
            description: "Sinônimos",
            url: "/Produtos.asp?action=listaSinonimos",
            children: []
          },
          {
            $id: "32",
            name: "3_25",
            description: "Templates de Carrinho",
            url: "/ME/TemplateCarrinho.aspx",
            children: []
          },
          {
            $id: "33",
            name: "3_28",
            description: "Associação Produto X Fornecedor X Fabricante",
            url: "/do/FornecedorFabricanteProduto.mvc",
            children: []
          },
          {
            $id: "34",
            name: "3_29",
            description: "Situação de Estoque e Previsão de Demanda",
            url: "/do/SituacaoEstoque.mvc",
            children: []
          },
          {
            $id: "35",
            name: "3_30",
            description: "Associação Fornecedor X Previsão Demanda",
            url: "/do/AssociacaoFornecedorPrevisaoDemanda.mvc",
            children: []
          },
          {
            $id: "36",
            name: "3_31",
            description: "Tipos de Documento",
            url: "/DO/TipoDocumento.mvc/",
            children: []
          },
          {
            $id: "37",
            name: "3_32",
            description: "Reajustes Automáticos de Contrato",
            url: "/DO/Reajuste.mvc//Index/false",
            children: []
          }
        ]
      },
      {
        $id: "38",
        name: "4",
        description: "Fornecedores",
        url: "",
        children: [
          {
            $id: "39",
            name: "4_3",
            description: "Atributos de Fornecedores",
            url: "/ME/AtributosMeusFornecedores.aspx",
            children: []
          },
          {
            $id: "40",
            name: "4_8",
            description: "Grupos de Fornecedores",
            url: "/do/GrupoFornecedor.mvc",
            children: []
          },
          {
            $id: "41",
            name: "4_5",
            description: "Fornecedores do Workflow de Documentos",
            url: "/DO/WFD/FornecedorWFD.mvc",
            children: []
          },
          {
            $id: "42",
            name: "4_6",
            description: "Fornecedores ME",
            url: "/supplier/",
            children: []
          },
          {
            $id: "43",
            name: "4_9",
            description: "Status Homologação Fornecedor",
            url: "/DO/StatusHomologacaoFornecedor.mvc",
            children: []
          }
        ]
      },
      {
        $id: "44",
        name: "5",
        description: "Preferências",
        url: "",
        children: [
          {
            $id: "45",
            name: "5_1",
            description: "Locais",
            url: "/do/Locais.mvc",
            children: []
          },
          {
            $id: "46",
            name: "5_7",
            description: "Cia ERP",
            url: "/do/CiaERP.mvc",
            children: []
          },
          {
            $id: "47",
            name: "5_2",
            description: "Centros de Custos",
            url: "/ME/ListaCCustoWF.aspx",
            children: []
          },
          {
            $id: "48",
            name: "5_3",
            description: "Conta Contábil",
            url: "/ME/ListaContaContabilWF.aspx",
            children: []
          },
          {
            $id: "49",
            name: "5_6",
            description: "Conta Devedora",
            url: "/do/ContaDevedora.mvc",
            children: []
          },
          {
            $id: "50",
            name: "5_5",
            description: "Referências Devedora",
            url: "/do/ReferenciaDevedora.mvc",
            children: []
          },
          {
            $id: "51",
            name: "5_9",
            description: "Nomenclatura Recusar/Cancelar",
            url: "/NomenclaturaCancelarRecusarWF.asp",
            children: []
          },
          {
            $id: "52",
            name: "5_8",
            description: "FUP de Entregas",
            url: "/FUPConfiguraWF.asp",
            children: []
          },
          {
            $id: "53",
            name: "5_11",
            description: "Mapa Comparativo Excel",
            url: "/MapaComparativoExcelGenericoConfigura.asp",
            children: []
          },
          {
            $id: "54",
            name: "5_10",
            description: "FUP (Criticidade)",
            url: "/do/FUPCriticidade.mvc",
            children: []
          },
          {
            $id: "55",
            name: "5_12",
            description: "Customização de e-mails",
            url: "/CustomMail.asp",
            children: []
          },
          {
            $id: "56",
            name: "5_23",
            description: "Nova Customização de e-mails",
            url: "/ME/CustomMail.aspx",
            children: []
          },
          {
            $id: "57",
            name: "5_19",
            description: "Manutenção de Feriados",
            url: "/do/Feriadowf.mvc",
            children: []
          },
          {
            $id: "58",
            name: "5_22",
            description: "Configurações (Fornecedor)",
            url: "/ME/PreferenciasWFF.aspx",
            children: []
          },
          {
            $id: "59",
            name: "5_18",
            description: "Tipos de Tarefas",
            url: "/ME/TipoTarefa.aspx",
            children: []
          },
          {
            $id: "60",
            name: "5_26",
            description: "Cesta Índice de Reajuste",
            url: "/ME/CestaIndiceReajuste.aspx",
            children: []
          },
          {
            $id: "61",
            name: "5_29",
            description: "Configuração de Impostos",
            url: "/do/Imposto.mvc",
            children: []
          },
          {
            $id: "62",
            name: "5_30",
            description: "Associação Centro Custo/Utilizador",
            url: "/ME/ListaCCustoUsuarioBorgWF.aspx",
            children: []
          },
          {
            $id: "63",
            name: "5_31",
            description: "Justificativas de Classif. Qualitativa",
            url: "/do/RecebimentoPedidoJustificativaCQ.mvc",
            children: []
          },
          {
            $id: "64",
            name: "5_34",
            description: "Personalizar elementos do Tema",
            url: "/DO/Theme.mvc",
            children: []
          },
          {
            $id: "65",
            name: "5_36",
            description: "Personalizar Header (Cabeçalho)",
            url: "/DO/Theme.mvc/Header",
            children: []
          },
          {
            $id: "66",
            name: "5_37",
            description: "Personalizar Tela de Login",
            url: "/DO/Theme.mvc/Home",
            children: []
          },
          {
            $id: "67",
            name: "5_35",
            description: "Agendamento",
            url: "/DO/Scheduler.mvc",
            children: []
          }
        ]
      },
      {
        $id: "68",
        name: "6",
        description: "WorkFlow",
        url: "",
        children: [
          {
            $id: "69",
            name: "6_1",
            description: "Permissões",
            url: "/do/PermissaoWF.mvc",
            children: []
          },
          {
            $id: "70",
            name: "6_33",
            description: "Permissão Catálogo",
            url: "/do/PermissaoCatalogo.mvc",
            children: []
          },
          {
            $id: "71",
            name: "6_2",
            description: "Estados",
            url: "/VerEstadosWF.asp",
            children: []
          },
          {
            $id: "72",
            name: "6_37",
            description: "Validação de Regras",
            url: "/ME/ValidadorRegras.aspx",
            children: []
          },
          {
            $id: "73",
            name: "6_38",
            description: "Carga de Regras",
            url: "/ME/CargaRegras.aspx",
            children: []
          },
          {
            $id: "74",
            name: "6_88",
            description: "Automação",
            url: "/automation",
            children: []
          },
          {
            $id: "75",
            name: "6_77",
            description: "Importação / Exportação Cargas",
            url: "/dataload/LoadHistory",
            children: []
          },
          {
            $id: "76",
            name: "6_3",
            description: "Cargos",
            url: "/ME/ListaCargosWF.aspx",
            children: []
          },
          {
            $id: "77",
            name: "6_4",
            description: "Catálogo",
            url: "/ME/MarcaCatalogosWF.aspx",
            children: []
          },
          {
            $id: "78",
            name: "6_5",
            description: "Atributos Requisição",
            url: "/do/AtributoRequisicao.mvc",
            children: []
          },
          {
            $id: "79",
            name: "6_10",
            description: "Atributos Pré-Pedido",
            url: "/ME/ListaAtributosPrePedidoWF.aspx",
            children: []
          },
          {
            $id: "80",
            name: "6_38",
            description: "Atributos Pedido",
            url: "/do/AtributoPedido.mvc",
            children: []
          },
          {
            $id: "81",
            name: "6_39",
            description: "Atributos Contrato",
            url: "/do/AtributoContrato.mvc",
            children: []
          },
          {
            $id: "82",
            name: "6_15",
            description: "Atributos Cotação",
            url: "/do/AtributoCotacao.mvc",
            children: []
          },
          {
            $id: "83",
            name: "6_6",
            description: "Categorias Requisição",
            url: "/ME/ListaCategoriasWF.aspx",
            children: []
          },
          {
            $id: "84",
            name: "6_11",
            description: "Categorias Pré-Pedido",
            url: "/ME/ListaCategoriasPrePedidoWF.aspx",
            children: []
          },
          {
            $id: "85",
            name: "6_53",
            description: "Categorias de NF",
            url: "/do/CategoriaNF.mvc",
            children: []
          },
          {
            $id: "86",
            name: "6_75",
            description: "Tipo de Documento de NF",
            url: "/do/TipoDocumentoNF.mvc",
            children: []
          },
          {
            $id: "87",
            name: "6_14",
            description: "Categorias Cotação",
            url: "/ME/ListaCategoriasCotacao.aspx",
            children: []
          },
          {
            $id: "88",
            name: "6_18",
            description: "Categorias Anexo",
            url: "/do/CategoriaAnexo.mvc",
            children: []
          },
          {
            $id: "89",
            name: "6_21",
            description: "Templates Anexo",
            url: "/do/Anexo.mvc",
            children: []
          },
          {
            $id: "90",
            name: "6_8",
            description: "Substituições de Usuário",
            url: "/do/Substituicao.mvc",
            children: []
          },
          {
            $id: "91",
            name: "6_97",
            description: "Setor Industrial",
            url: "/DO/SetorIndustrial.mvc",
            children: []
          },
          {
            $id: "92",
            name: "6_98",
            description: "Grupo de Contas",
            url: "/DO/GrupoConta.mvc",
            children: []
          },
          {
            $id: "93",
            name: "6_35",
            description: "Ver Histórico de Substituição de Aprovador",
            url: "/do/HistoricoSubstituicaoAprovador.mvc",
            children: []
          },
          {
            $id: "94",
            name: "6_9",
            description: "Conta Corrente",
            url: "/ME/ContaCorrenteWF.aspx",
            children: []
          },
          {
            $id: "95",
            name: "6_12",
            description: "Compras / Centros De Custo",
            url: "/do/GastoCCWF.mvc",
            children: []
          },
          {
            $id: "96",
            name: "6_13",
            description: "Verba",
            url: "/ME/EditaVerbasWF.aspx",
            children: []
          },
          {
            $id: "97",
            name: "6_16",
            description: "Cadastrar Taxa de Conversão",
            url: "/ME/EditaTaxaDolarWF.aspx",
            children: []
          },
          {
            $id: "98",
            name: "6_17",
            description: "Relatórios de Workflow",
            url: "/RelatLinksRelatoriosWF.asp",
            children: []
          },
          {
            $id: "99",
            name: "6_22",
            description: "Informações de Compras",
            url: "/InformacaoCompras.asp",
            children: []
          },
          {
            $id: "100",
            name: "6_24",
            description: "Material de Treinamento",
            url: "/MaterialTreinamento.asp",
            children: []
          },
          {
            $id: "101",
            name: "6_25",
            description: "Unid. Req. de Cotação",
            url: "/ME/VerUnidReqCotWF.aspx",
            children: []
          },
          {
            $id: "102",
            name: "6_30",
            description: "Manutenção Aplicação",
            url: "/ME/ManutencaoAplicacao.aspx",
            children: []
          },
          {
            $id: "103",
            name: "6_29",
            description: "Manutenção IVA",
            url: "/ME/ManutencaoIVA.aspx",
            children: []
          },
          {
            $id: "104",
            name: "6_31",
            description: "Relatório de Verba por Ordem Interna",
            url: "/ME/RelatorioVerbasOI.aspx",
            children: []
          },
          {
            $id: "105",
            name: "6_32",
            description: "Motivo da recusa",
            url: "/DO/MotivoRecusa.mvc",
            children: []
          },
          {
            $id: "106",
            name: "6_40",
            description: "Monitor de Requisição",
            url: "/MonitoraReqIntegracao.asp",
            children: []
          },
          {
            $id: "107",
            name: "6_41",
            description: "Área Funcional",
            url: "/ME/CadastroAreaFuncional.aspx",
            children: []
          },
          {
            $id: "108",
            name: "6_48",
            description: "Cadastro de gestão de frete",
            url: "/Cadastros.asp",
            children: []
          },
          {
            $id: "109",
            name: "6_99",
            description: "Cadastro de Frete",
            url: "/DO/Frete.mvc",
            children: []
          },
          {
            $id: "110",
            name: "6_52",
            description: "Alertas",
            url: "/do/ManutencaoAlerta.mvc",
            children: []
          },
          {
            $id: "111",
            name: "6_56",
            description: "Marketplace",
            url: "/PlanoEmpresa.asp",
            children: []
          },
          {
            $id: "112",
            name: "6_55",
            description: "Critérios de Avaliação",
            url: "/do/CriterioAvaliacao.mvc",
            children: []
          },
          {
            $id: "113",
            name: "6_59",
            description: "Condições de Pagamento",
            url: "/do/CondicaoPagamento.mvc",
            children: []
          },
          {
            $id: "114",
            name: "6_61",
            description: "Condições de Fornecimento",
            url: "/do/CondicaoFornecimento.mvc",
            children: []
          },
          {
            $id: "115",
            name: "6_63",
            description: "Categoria de Item de Requisição",
            url: "/ME/CategoriasItemWF.aspx",
            children: []
          },
          {
            $id: "116",
            name: "6_64",
            description: "Categoria de Ordem",
            url: "/ME/CategoriasOrdemWF.aspx",
            children: []
          },
          {
            $id: "117",
            name: "7_01",
            description: "Moedas",
            url: "/DO/Currency/Currency.mvc",
            children: []
          },
          {
            $id: "118",
            name: "7_02",
            description: "Cadastro de Origem de Material",
            url: "/do/OrigemMaterial/OrigemMaterial.mvc",
            children: []
          },
          {
            $id: "119",
            name: "7_03",
            description: "Cadastro de Unidades",
            url: "/DO/Unit/Unit.mvc",
            children: []
          },
          {
            $id: "120",
            name: "6_67",
            description: "Tipo Conta de Consumo",
            url: "/ME/TipoContaConsumo.aspx",
            children: []
          },
          {
            $id: "121",
            name: "6_70",
            description: "Cadastro de Grupo de Compras",
            url: "/ME/GrupoCompraWF.aspx",
            children: []
          },
          {
            $id: "122",
            name: "6_80",
            description: "Cadastro de Roteamento",
            url: "/ME/CadastroRoteamento.aspx",
            children: []
          },
          {
            $id: "123",
            name: "6_112",
            description: "Configuração Mapa Comparativo Hipster",
            url: "/comparative-panel/config",
            children: []
          },
          {
            $id: "124",
            name: "6_71",
            description: "Cadastro de Categoria do Material",
            url: "/ME/CategoriaMaterial.aspx",
            children: []
          },
          {
            $id: "125",
            name: "6_72",
            description: "Cadastro de Classificação do Serviço",
            url: "/ME/ClassificacaoFiscalServico.aspx",
            children: []
          },
          {
            $id: "126",
            name: "6_74",
            description: "Textos Genéricos",
            url: "/ME/TextoGenerico.aspx",
            children: []
          },
          {
            $id: "127",
            name: "6_75",
            description: "Cadastro de Elemento PEP",
            url: "/ME/ElementoPEP.aspx",
            children: []
          },
          {
            $id: "128",
            name: "6_81",
            description: "Administração de Macro Áreas",
            url: "/ME/MacroAreas.aspx",
            children: []
          },
          {
            $id: "129",
            name: "6_86",
            description: "REIDI",
            url: "/do/Reidi.mvc",
            children: []
          },
          {
            $id: "130",
            name: "6_87",
            description: "Anexo Fornecedor",
            url: "/ME/AnexoFornecedor.aspx",
            children: []
          },
          {
            $id: "131",
            name: "6_90",
            description: "Regras de Follow UP (Novo Motor)",
            url: "/DO/FUP/Configuration.mvc",
            children: []
          },
          {
            $id: "132",
            name: "6_91",
            description: "Cadastro de Tipo de Entidade",
            url: "/do/TipoEntidade.mvc",
            children: []
          },
          {
            $id: "133",
            name: "6_93",
            description: "Cadastro de Operações Comerciais",
            url: "/DO/OperacaoComercial.mvc",
            children: []
          },
          {
            $id: "134",
            name: "6_94",
            description: "Cadastro de Diagramas de Rede",
            url: "/DO/DiagramaRede.mvc",
            children: []
          },
          {
            $id: "135",
            name: "6_97",
            description: "Tipos de Fornecedor Parceiro",
            url: "/DO/TipoFornecedorParceiro.mvc/",
            children: []
          },
          {
            $id: "136",
            name: "6_98",
            description: "Formas de Pagamento",
            url: "/DO/FormaPagamento.mvc/",
            children: []
          },
          {
            $id: "137",
            name: "6_99",
            description: "Catálogo de Traduções",
            url: "/DO/CatalogoTraducao.mvc",
            children: []
          },
          {
            $id: "138",
            name: "6_100",
            description: "Categoria FRS",
            url: "/DO/CategoriaFRS.mvc",
            children: []
          },
          {
            $id: "139",
            name: "6_101",
            description: "Cadastro de Regionais",
            url: "/DO/Regional.mvc",
            children: []
          },
          {
            $id: "140",
            name: "6_105",
            description: "Pacotes e Condições de Melhor Compra",
            url: "/DO/PacoteMelhorCompra.mvc",
            children: []
          },
          {
            $id: "141",
            name: "6_108",
            description: "Cadastro de Tipo de Exportação",
            url: "/do/TipoExportacao.mvc",
            children: []
          },
          {
            $id: "142",
            name: "6_92",
            description: "Cadastro de Comunicados",
            url: "/ME/CadastroComunicado.aspx",
            children: []
          },
          {
            $id: "143",
            name: "6_93",
            description: "Gerenciar o cadastro de Determinação de IVA",
            url: "/do/DeterminacaoIVA.mvc",
            children: []
          },
          {
            $id: "144",
            name: "2_8",
            description: "Cadastro de Ordem",
            url: "/do/OrdemWF.mvc",
            children: []
          }
        ]
      },
      {
        $id: "145",
        name: "7",
        description: "Relatórios",
        url: "",
        children: [
          {
            $id: "146",
            name: "7_1",
            description: "Ver gráficos",
            url: "/Graficos.asp",
            children: []
          },
          {
            $id: "147",
            name: "7_5",
            description: "Relatório Gerencial",
            url: "/RelatorioGestaoPedidos.asp",
            children: []
          },
          {
            $id: "148",
            name: "7_6",
            description: "Acompanhamento de Relatórios",
            url: "/ME/ListaExtracaoRelatorio.aspx",
            children: []
          },
          {
            $id: "149",
            name: "7_7",
            description: "Extração de Relatório",
            url: "/ME/ExtracaoRelatorio.aspx",
            children: []
          },
          {
            $id: "150",
            name: "7_2",
            description: "Relatórios de Workflow",
            url: "/RelatLinksRelatoriosWF.asp",
            children: []
          },
          {
            $id: "151",
            name: "27_1",
            description: "Relatórios e-Business Intelligence",
            url: "/MERG.asp",
            children: []
          }
        ]
      },
      {
        $id: "152",
        name: "9",
        description: "WorkFlow Central",
        url: "",
        children: []
      },
      {
        $id: "153",
        name: "12",
        description: "Contas Pagas",
        url: "",
        children: []
      },
      {
        $id: "154",
        name: "25",
        description: "Notas Fiscais",
        url: "",
        children: [
          {
            $id: "155",
            name: "25_1",
            description: "Lista de Notas Fiscais",
            url: "/NF.asp?action=lista",
            children: []
          },
          {
            $id: "156",
            name: "25_3",
            description: "Período Fiscal",
            url: "/do/PeriodoFiscal.mvc",
            children: []
          }
        ]
      },
      {
        $id: "157",
        name: "14",
        description: "RoundTrip",
        url: "",
        children: [
          {
            $id: "158",
            name: "14_1",
            description: "Catálogos",
            url: "/do/RoundTripWF.mvc",
            children: []
          },
          {
            $id: "159",
            name: "14_2",
            description: "Usuários",
            url: "/do/RoundTripUser.mvc",
            children: []
          }
        ]
      },
      {
        $id: "160",
        name: "18",
        description: "Monitor de Integração",
        url: "",
        children: []
      },
      {
        $id: "161",
        name: "19",
        description: "Amarrações",
        url: "",
        children: [
          {
            $id: "162",
            name: "19_1",
            description: "Conta Razão x Ordem Interna",
            url: "/do/ContaRazaoOrdemInterna.mvc",
            children: []
          },
          {
            $id: "163",
            name: "19_2",
            description: "Conta Razão x Centro de Custo",
            url: "/ME/ContaRazaoCentroCusto.aspx",
            children: []
          },
          {
            $id: "164",
            name: "19_3",
            description: "Conta Razão x Área Funcional",
            url: "/ME/ContaRazaoAreaFuncional.aspx",
            children: []
          },
          {
            $id: "165",
            name: "19_4",
            description: "Conta Razão x Ordem",
            url: "/do/ContaRazaoOrdem.mvc",
            children: []
          },
          {
            $id: "166",
            name: "19_5",
            description: "Centro de Custo x Área Funcional",
            url: "/do/AreaFuncionalCentroCusto.mvc",
            children: []
          },
          {
            $id: "167",
            name: "19_6",
            description: "Usuário x Área Funcional",
            url: "/do/AreaFuncionalUsuario.mvc",
            children: []
          }
        ]
      },
      {
        $id: "168",
        name: "21",
        description: "Links Personalizados",
        url: "",
        children: []
      },
      {
        $id: "169",
        name: "23",
        description: "Consulta Serasa",
        url: "",
        children: []
      },
      {
        $id: "170",
        name: "29",
        description: "Motor de Regras 3",
        url: "",
        children: [
          {
            $id: "171",
            name: "29_1",
            description: "Tabelas",
            url: "/ME/ConsultarTabelas.aspx",
            children: []
          },
          {
            $id: "172",
            name: "29_2",
            description: "Regras",
            url: "/ME/CadastroRegras.aspx",
            children: []
          }
        ]
      },
      {
        $id: "173",
        name: "32",
        description: "Integração",
        url: "",
        children: [
          {
            $id: "174",
            name: "32_1",
            description: "Enviar Arquivo",
            url: "/do/Integracao.mvc/SendFile",
            children: []
          },
          {
            $id: "175",
            name: "32_2",
            description: "Visão Geral",
            url: "/do/Integracao.mvc/FilaVisao",
            children: []
          },
          {
            $id: "176",
            name: "32_3",
            description: "Processos",
            url: "/do/Integracao.mvc/Fila",
            children: []
          }
        ]
      },
      {
        $id: "177",
        name: "33",
        description: "Log",
        url: "",
        children: [
          {
            $id: "178",
            name: "33_1",
            description: "Cadastro de Produto",
            url: "/do/Log/Produto.mvc",
            children: []
          },
          {
            $id: "179",
            name: "33_2",
            description: "Flags de Preferências",
            url: "/do/Log/Flags.mvc/Index/Workflow",
            children: []
          }
        ]
      },
      {
        $id: "180",
        name: "34",
        description: "Minha Conta",
        url: "",
        children: [
          {
            $id: "181",
            name: "34_1",
            description: "Meus Dados",
            url: "/RegEdit.asp",
            children: []
          },
          {
            $id: "182",
            name: "34_2",
            description: "Relatórios",
            url: "/ME/ExtracaoRelatorio.aspx",
            children: []
          },
          {
            $id: "183",
            name: "34_5",
            description: "Acompanhamento de Relatórios",
            url: "/ME/ListaExtracaoRelatorio.aspx",
            children: []
          },
          {
            $id: "184",
            name: "34_3",
            description: "Notas / Boletos / Extratos",
            url: "/do/Fornecedor.mvc/ListaFornecedorFinanceiro",
            children: []
          }
        ]
      },
      {
        $id: "185",
        name: "40",
        description: "Links úteis",
        url: "",
        children: [
          {
            $id: "186",
            name: "40_0",
            description: "Pedidos para Enviar",
            url: "/ListaPedidosProntosWF.asp",
            children: []
          },
          {
            $id: "187",
            name: "41_1",
            description: "Meus Pré-Pedidos para Enviar",
            url: "/ListaPedidosProntosWF.asp",
            children: []
          },
          {
            $id: "188",
            name: "41_2",
            description: "Pendências de Contrato",
            url: "/DO/RFQ/Create.mvc/Contract",
            children: []
          },
          {
            $id: "189",
            name: "41_3",
            description: "Pendência de Reaproveitamento de SO",
            url: "/DO/ReaproveitamentoCotacao.mvc",
            children: []
          },
          {
            $id: "190",
            name: "41_7",
            description: "Pendências de alteração de data de entrega",
            url: "/DO/Orders/Pendency.mvc",
            children: []
          },
          {
            $id: "191",
            name: "41_8",
            description: "Aprovação de Produtos PDM",
            url: "/PDM/AprovarProdutos.aspx",
            children: []
          },
          {
            $id: "192",
            name: "41_9",
            description: "Aprovação de Tarefas",
            url: "/ME/ListarTarefas.aspx",
            children: []
          },
          {
            $id: "193",
            name: "41_10",
            description: "Solicitações de Orçamento",
            url: "/ListaRequisicoesWF.asp?Oper=so",
            children: []
          },
          {
            $id: "194",
            name: "41_11",
            description: "Requisições Emergenciais",
            url: "/ListaRequisicoesWF.asp?Emergencial=2",
            children: []
          },
          {
            $id: "195",
            name: "41_12",
            description: "Mapa Comparativo",
            url: "/do/MapaComparativo.mvc/ListaMapaComparativo",
            children: []
          },
          {
            $id: "196",
            name: "41_13",
            description: "Relatório de Acompanhamento",
            url: "/RelatAcompanhamentoWF.asp",
            children: []
          },
          {
            $id: "197",
            name: "41_15",
            description: "Documentos ME",
            url: "/do/RepositorioDocumentoME/Home.mvc",
            children: []
          },
          {
            $id: "198",
            name: "41_17",
            description: "Gestão de Compras",
            url: "/do/ControleDeCompras.mvc/Backlog",
            children: []
          },
          {
            $id: "199",
            name: "41_18",
            description: "Substituir Usuário",
            url: "/do/ChangeUser.mvc",
            children: []
          },
          {
            $id: "200",
            name: "41_20",
            description: "Substituir Usuário do Mesmo Perfil",
            url: "/TrocaUsuarioPerfilWF.asp",
            children: []
          },
          {
            $id: "201",
            name: "41_27",
            description: "Substituição de Workflow",
            url: "/do/Usuario.mvc/SubstituirWorkflow",
            children: []
          },
          {
            $id: "202",
            name: "41_23",
            description: "Recebimento",
            url: "/ME/RecebimentoWF.aspx",
            children: []
          },
          {
            $id: "203",
            name: "41_24",
            description: "Pedidos Agendados",
            url: "/PedidosAgendadosWF.asp",
            children: []
          },
          {
            $id: "204",
            name: "41_26",
            description: "Evento Online",
            url: "/do/Leilao/CriarLeilao.mvc/listaEventos",
            children: []
          },
          {
            $id: "205",
            name: "41_28",
            description: "Importação / Exportação Cargas",
            url: "/dataload/LoadHistory",
            children: []
          }
        ]
      }
    ]);
    const headerClasses = computed(() => {
      const baseClasses = "shadow-lg";
      return `${baseClasses} text-white`;
    });
    const headerStyles = computed(() => {
      const styles = {};
      const bg = brand.value.background || {};
      const hasMainImage = Boolean(bg.mainImage);
      const hasRepeatImage = Boolean(bg.repeatImage);
      const hasPrimaryColor = Boolean(bg.primaryColor);
      const hasSecondaryColor = Boolean(bg.secondaryColor);
      if (hasMainImage && hasRepeatImage && bg.mainImage && bg.repeatImage) {
        styles.backgroundImage = `url(${bg.mainImage}), url(${bg.repeatImage})`;
        styles.backgroundSize = "cover, auto";
        styles.backgroundPosition = "center, center";
        styles.backgroundRepeat = "no-repeat, repeat";
      } else if (hasMainImage && hasPrimaryColor && bg.mainImage && bg.primaryColor) {
        styles.backgroundColor = bg.primaryColor;
        styles.backgroundImage = `url(${bg.mainImage})`;
        styles.backgroundSize = "contain";
        styles.backgroundPosition = "center";
        styles.backgroundRepeat = "no-repeat";
      } else if (hasRepeatImage && !hasMainImage && bg.repeatImage) {
        styles.backgroundImage = `url(${bg.repeatImage})`;
        styles.backgroundSize = "auto";
        styles.backgroundPosition = "center";
        styles.backgroundRepeat = "repeat";
      } else if (hasPrimaryColor && hasSecondaryColor && !hasMainImage && !hasRepeatImage && bg.primaryColor && bg.secondaryColor) {
        styles.background = `linear-gradient(135deg, ${bg.primaryColor} 0%, ${bg.secondaryColor} 100%)`;
      } else if (hasPrimaryColor && !hasSecondaryColor && !hasMainImage && !hasRepeatImage && bg.primaryColor) {
        styles.backgroundColor = bg.primaryColor;
      } else {
        styles.backgroundColor = "var(--ui-primary)";
      }
      return styles;
    });
    const iconColor = computed(() => {
      return brand.value.background?.iconColor || "white";
    });
    return (_ctx, _cache) => {
      const _component_UApp = _sfc_main$f;
      return openBlock(), createBlock(_component_UApp, null, {
        default: withCtx(() => [
          createBaseVNode("header", {
            class: normalizeClass(headerClasses.value),
            style: normalizeStyle(headerStyles.value)
          }, [
            createBaseVNode("nav", _hoisted_1, [
              createVNode(_sfc_main$e, { brand: brand.value }, null, 8, ["brand"]),
              createVNode(_sfc_main$5, { iconColor: iconColor.value }, null, 8, ["iconColor"]),
              createVNode(_sfc_main$2, {
                user: user.value,
                profileItems: profileItems.value
              }, null, 8, ["user", "profileItems"])
            ])
          ], 6),
          backdropState.value.visible ? (openBlock(), createBlock(_sfc_main$1, {
            key: 0,
            "z-index": backdropState.value.zIndex,
            onClick: closeBackdrop
          }, null, 8, ["z-index"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
const TheHeaderElement = defineCustomElement(_sfc_main, {
  shadowRoot: true,
  styles: [meIconStyles, tailwindStyles]
});
if (!customElements.get("the-header")) {
  customElements.define("the-header", TheHeaderElement);
}
export {
  _sfc_main$f as _
};
