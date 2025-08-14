import { d as defineComponent, e as computed, f as onMounted, g as onUnmounted, c as createBlock, o as openBlock, w as withCtx, h as createVNode, u as unref, P as Primitive, r as renderSlot, n as nextTick, i as createContext, t as toRefs, j as useForwardExpose, k as useVModel, l as ref, m as normalizeStyle, p as createCommentVNode, q as watch, s as useResizeObserver, v as mergeProps, x as withKeys, y as withModifiers, z as useTimeout, A as useRafFn, B as createTextVNode, C as toDisplayString, D as watchEffect, E as onKeyStroke, F as createElementBlock, T as Teleport, G as Fragment, H as isClient, I as normalizeProps, J as guardReactiveProps, K as unrefElement, L as useTimeoutFn, M as useState, N as useSlots, O as useLocale, Q as useForwardPropsEmits, R as reactivePick, S as tv, U as useAppConfig, a as createBaseVNode, _ as _sfc_main$D, V as _sfc_main$E, W as normalizeClass, X as resolveDynamicComponent, Y as renderList, Z as _sfc_main$F, $ as useForwardProps, a0 as toRef, a1 as omit, a2 as createSharedComposable, a3 as shallowReactive, a4 as reactive, a5 as markRaw, a6 as useId$1, a7 as provide, a8 as localeContextInjectionKey, a9 as defu, aa as toHandlers, ab as resolveComponent, ac as useTemplateRef, ad as inject, ae as onBeforeUnmount, af as get, ag as tailwindStyles, ah as defineCustomElement } from "./main.js";
import { i as injectRovingFocusGroupContext, u as useId, a as useCollection, g as getFocusIntent, w as wrapArray, f as focusFirst, b as useDirection, P as Presence, _ as _sfc_main$A, c as _sfc_main$B, d as getActiveElement, e as _sfc_main$C, h as context, j as focusFirst$1, k as getTabbableCandidates, l as usePortal, m as _sfc_main$H, p as portalTargetInjectionKey, H as HoverCard, n as Popover, o as _sfc_main$I, q as _sfc_main$J, r as meIconStyles } from "./me-icon.min.js";
import { _ as _sfc_main$G, a as _sfc_main$K } from "./Badge.js";
const _sfc_main$z = /* @__PURE__ */ defineComponent({
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
const _sfc_main$y = /* @__PURE__ */ defineComponent({
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
const _sfc_main$x = /* @__PURE__ */ defineComponent({
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
const _sfc_main$w = /* @__PURE__ */ defineComponent({
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
const _sfc_main$v = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createBlock(unref(_sfc_main$A), {
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
const _sfc_main$u = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createBlock(unref(_sfc_main$z), {
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
const _sfc_main$t = /* @__PURE__ */ defineComponent({
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
const _sfc_main$s = /* @__PURE__ */ defineComponent({
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
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "ToastAnnounce",
  setup(__props) {
    const providerContext = injectToastProviderContext();
    const isAnnounced = useTimeout(1e3);
    const renderAnnounceText = ref(false);
    useRafFn(() => {
      renderAnnounceText.value = true;
    });
    return (_ctx, _cache) => {
      return unref(isAnnounced) || renderAnnounceText.value ? (openBlock(), createBlock(unref(_sfc_main$B), { key: 0 }, {
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
const _sfc_main$q = /* @__PURE__ */ defineComponent({
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
        announceTextContent.value ? (openBlock(), createBlock(_sfc_main$r, {
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
const _sfc_main$p = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createBlock(_sfc_main$t, { "as-child": "" }, {
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
const _sfc_main$o = /* @__PURE__ */ defineComponent({
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
      return _ctx.altText ? (openBlock(), createBlock(_sfc_main$t, {
        key: 0,
        "alt-text": _ctx.altText,
        "as-child": ""
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$p, {
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
const _sfc_main$n = /* @__PURE__ */ defineComponent({
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
const _sfc_main$m = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createBlock(unref(_sfc_main$C), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$l = /* @__PURE__ */ defineComponent({
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
          createVNode(_sfc_main$q, mergeProps({
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
const _sfc_main$k = /* @__PURE__ */ defineComponent({
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
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "FocusProxy",
  emits: ["focusFromOutsideViewport"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const providerContext = injectToastProviderContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$B), {
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
const _sfc_main$i = /* @__PURE__ */ defineComponent({
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
const _sfc_main$h = /* @__PURE__ */ defineComponent({
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
            if (focusFirst$1(sortedCandidates.slice(index + 1))) {
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
      return openBlock(), createBlock(unref(_sfc_main$i), {
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
          hasToasts.value ? (openBlock(), createBlock(_sfc_main$j, {
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
          hasToasts.value ? (openBlock(), createBlock(_sfc_main$j, {
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
const _sfc_main$g = /* @__PURE__ */ defineComponent({
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
const theme$3 = {
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
const _sfc_main$f = {
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
    const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.toast || {} })({
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
      return openBlock(), createBlock(unref(_sfc_main$l), mergeProps({
        ref_key: "el",
        ref: el
      }, unref(rootProps), {
        "data-orientation": __props.orientation,
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        style: { "--height": height.value }
      }), {
        default: withCtx(({ remaining, duration, open }) => [
          renderSlot(_ctx.$slots, "leading", {}, () => [
            __props.avatar ? (openBlock(), createBlock(_sfc_main$D, mergeProps({
              key: 0,
              size: props.ui?.avatarSize || ui.value.avatarSize()
            }, __props.avatar, {
              class: ui.value.avatar({ class: props.ui?.avatar })
            }), null, 16, ["size", "class"])) : __props.icon ? (openBlock(), createBlock(_sfc_main$E, {
              key: 1,
              name: __props.icon,
              class: normalizeClass(ui.value.icon({ class: props.ui?.icon }))
            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(ui.value.wrapper({ class: props.ui?.wrapper }))
          }, [
            __props.title || !!slots.title ? (openBlock(), createBlock(unref(_sfc_main$k), {
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
            __props.description || !!slots.description ? (openBlock(), createBlock(unref(_sfc_main$n), {
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
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                  return openBlock(), createBlock(unref(_sfc_main$o), {
                    key: index,
                    "alt-text": action.label || "Action",
                    "as-child": "",
                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$F, mergeProps({
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
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                return openBlock(), createBlock(unref(_sfc_main$o), {
                  key: index,
                  "alt-text": action.label || "Action",
                  "as-child": "",
                  onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                  }, ["stop"]))
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$F, mergeProps({
                      size: "xs",
                      color: __props.color
                    }, { ref_for: true }, action), null, 16, ["color"])
                  ]),
                  _: 2
                }, 1032, ["alt-text"]);
              }), 128))
            ]) : createCommentVNode("", true),
            __props.close || !!slots.close ? (openBlock(), createBlock(unref(_sfc_main$p), {
              key: 1,
              "as-child": ""
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                  __props.close ? (openBlock(), createBlock(_sfc_main$F, mergeProps({
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
          __props.progress && open && remaining > 0 && duration ? (openBlock(), createBlock(_sfc_main$G, mergeProps({
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
const theme$2 = {
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
const _sfc_main$e = /* @__PURE__ */ Object.assign(__default__$1, {
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
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.toaster || {} })({
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
      return openBlock(), createBlock(unref(_sfc_main$s), mergeProps({ "swipe-direction": swipeDirection.value }, unref(providerProps)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(toasts), (toast, index) => {
            return openBlock(), createBlock(_sfc_main$f, mergeProps({
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
              class: ui.value.base({ class: [props.ui?.base, toast.onClick ? "cursor-pointer" : void 0] }),
              "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
              onClick: ($event) => toast.onClick && toast.onClick(toast)
            }), null, 16, ["progress", "close", "data-expanded", "data-front", "style", "class", "onUpdate:open", "onClick"]);
          }), 128)),
          createVNode(unref(_sfc_main$m), normalizeProps(guardReactiveProps(unref(portalProps))), {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$h), {
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
const _sfc_main$d = {
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
const _sfc_main$c = /* @__PURE__ */ Object.assign(__default__, {
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
      return openBlock(), createBlock(unref(_sfc_main$H), mergeProps({
        "use-id": () => useId$1(),
        dir: locale.value?.dir,
        locale: locale.value?.code
      }, unref(configProviderProps)), {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$g), normalizeProps(guardReactiveProps(tooltipProps.value)), {
            default: withCtx(() => [
              __props.toaster !== null ? (openBlock(), createBlock(_sfc_main$e, normalizeProps(mergeProps({ key: 0 }, toasterProps.value)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
              createVNode(_sfc_main$d)
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 16, ["use-id", "dir", "locale"]);
    };
  }
});
const theme$1 = {
  "slots": {
    "content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
    "arrow": "fill-default"
  }
};
const _sfc_main$b = {
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
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.popover || {} })({
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
const _hoisted_1$9 = { class: "cursor-pointer overflow-hidden rounded-bl-lg" };
const _hoisted_2$4 = ["href", "onClick"];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
      const _component_UAccordion = _sfc_main$I;
      return openBlock(), createElementBlock("ul", _hoisted_1$9, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.profileItems, (item, index) => {
          return openBlock(), createElementBlock("li", { key: index }, [
            item.children ? (openBlock(), createBlock(_component_UAccordion, {
              key: 0,
              items: accordionItems(item),
              ui: {
                body: "p-0",
                trigger: `py-2 px-4 hover:bg-blue-100 hover:text-primary flex items-center gap-2 cursor-pointer font-normal ${item.active ? "text-primary" : ""}`
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
              class: "py-2 px-4 hover:bg-blue-100 hover:text-primary flex items-center gap-2 cursor-pointer h-10 group",
              href: item.url || "#",
              onClick: withModifiers(() => handleClick(item), ["prevent"])
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["group-hover:text-primary text-gray-500", {
                  "text-[var(--color-neutral-400)] font-semibold": props.nested && !item.active
                }])
              }, toDisplayString(item.label), 3),
              createBaseVNode("span", null, [
                item.icon ? (openBlock(), createBlock(_sfc_main$J, {
                  key: 0,
                  icon: item.icon.class,
                  "custom-size": 16,
                  color: item.icon.color,
                  class: "leading-none"
                }, null, 8, ["icon", "color"])) : createCommentVNode("", true)
              ])
            ], 8, _hoisted_2$4))
          ]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$8 = { class: "flex select-none flex-col items-end relative" };
const _hoisted_2$3 = { class: "flex justify-between gap-4 px-4 py-2 align-center" };
const _hoisted_3$1 = { class: "grid w-[168px]" };
const _hoisted_4 = { class: "truncate mb-0 text-gray-500" };
const _hoisted_5 = { class: "block truncate text-xs text-gray-400" };
const _hoisted_6 = { class: "text-2xl font-normal no-underline" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("div", {
          ref_key: "menuAvatar",
          ref: menuAvatar,
          class: "rounded-bl-lg bg-white text-sm absolute top-[-1px] right-[-8px]"
        }, [
          createBaseVNode("div", _hoisted_2$3, [
            createBaseVNode("div", _hoisted_3$1, [
              createBaseVNode("p", _hoisted_4, toDisplayString(_ctx.user.name), 1),
              createBaseVNode("small", _hoisted_5, toDisplayString(_ctx.user.role || _ctx.user.email || ""), 1)
            ]),
            createBaseVNode("div", {
              ref_key: "avatar",
              ref: avatar,
              class: "flex items-center justify-center size-12 rounded-full bg-primary cursor-pointer text-white"
            }, [
              createBaseVNode("span", _hoisted_6, toDisplayString(_ctx.user.acronym), 1)
            ], 512)
          ]),
          createVNode(_sfc_main$a, {
            profileItems: _ctx.profileItems,
            "set-visible-to-false": _ctx.setVisibleToFalse
          }, null, 8, ["profileItems", "set-visible-to-false"])
        ], 512)
      ]);
    };
  }
});
const _hoisted_1$7 = { class: "group py-2 px-4 hover:bg-[rgba(0,0,0,0.1)] cursor-pointer" };
const _hoisted_2$2 = { class: "flex items-center justify-center size-12 rounded-full bg-[rgba(0,0,0,0.4)] mx-auto border-transparent border group-hover:border-white group-hover:border-2" };
const _hoisted_3 = { class: "text-2xl uppercase" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
      const _component_UPopover = _sfc_main$b;
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
            createVNode(_sfc_main$9, {
              user: props.user,
              profileItems: props.profileItems,
              "set-visible-to-false": setVisibleToFalse
            }, null, 8, ["user", "profileItems"])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$7, [
              createBaseVNode("div", _hoisted_2$2, [
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
const _hoisted_1$6 = ["href", "target"];
const _hoisted_2$1 = ["src"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
        }, null, 8, _hoisted_2$1)
      ], 8, _hoisted_1$6);
    };
  }
});
const theme = {
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
const _sfc_main$6 = {
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
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.tabs || {} })({
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
      const _component_UBadge = _sfc_main$K;
      return openBlock(), createBlock(unref(_sfc_main$y), mergeProps(unref(rootProps), {
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }), {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$v), {
            class: normalizeClass(ui.value.list({ class: props.ui?.list }))
          }, {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$w), {
                class: normalizeClass(ui.value.indicator({ class: props.ui?.indicator }))
              }, null, 8, ["class"]),
              renderSlot(_ctx.$slots, "list-leading"),
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, index) => {
                return openBlock(), createBlock(unref(_sfc_main$u), {
                  key: index,
                  ref_for: true,
                  ref: (el) => triggersRef.value[index] = el,
                  value: item.value || String(index),
                  disabled: item.disabled,
                  class: normalizeClass(ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] }))
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "leading", {
                      item,
                      index
                    }, () => [
                      item.icon ? (openBlock(), createBlock(_sfc_main$E, {
                        key: 0,
                        name: item.icon,
                        class: normalizeClass(ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] }))
                      }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$D, mergeProps({
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
                        index
                      }, () => [
                        createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                      ])
                    ], 2)) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "trailing", {
                      item,
                      index
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
          !!__props.content ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.items, (item, index) => {
            return openBlock(), createBlock(unref(_sfc_main$x), {
              key: index,
              value: item.value || String(index),
              class: normalizeClass(ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] }))
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, item.slot || "content", {
                  item,
                  index
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
const _hoisted_1$5 = { class: "p-4 max-w-[384px] w-[384px]" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderTabs",
  setup(__props) {
    const items = ref([
      {
        label: "Apps",
        slot: "apps"
      },
      {
        label: "Outras funcionalidades",
        slot: "others"
      }
    ]);
    return (_ctx, _cache) => {
      const _component_UTabs = _sfc_main$6;
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
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
          }
        }, {
          apps: withCtx(() => _cache[0] || (_cache[0] = [
            createBaseVNode("div", { class: "p-4" }, [
              createBaseVNode("p", null, "Apps content goes here.")
            ], -1)
          ])),
          others: withCtx(() => _cache[1] || (_cache[1] = [
            createBaseVNode("div", { class: "p-4" }, [
              createBaseVNode("p", null, "Other functionalities content goes here.")
            ], -1)
          ])),
          _: 1
        }, 8, ["items"])
      ]);
    };
  }
});
const _hoisted_1$4 = { class: "flex items-center justify-center" };
const _hoisted_2 = { class: "text-xs py-[6px] text-[var(--header-icon-color)]" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
        createBaseVNode("div", _hoisted_1$4, [
          createVNode(_sfc_main$J, {
            icon: _ctx.icon,
            "custom-size": 24,
            color: _ctx.iconColor
          }, null, 8, ["icon", "color"])
        ]),
        createBaseVNode("p", _hoisted_2, toDisplayString(_ctx.label), 1)
      ], 6);
    };
  }
});
const _hoisted_1$3 = {
  key: 0,
  class: "relative"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      const _component_TheHeaderTabs = _sfc_main$5;
      const _component_UPopover = _sfc_main$b;
      return _ctx.siteMap ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
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
            createVNode(_sfc_main$4, normalizeProps(guardReactiveProps(_ctx.$props)), null, 16)
          ]),
          _: 1
        }, 8, ["open"])
      ])) : (openBlock(), createBlock(_sfc_main$4, normalizeProps(mergeProps({ key: 1 }, _ctx.$props)), null, 16));
    };
  }
});
const _hoisted_1$2 = { class: "flex justify-center gap-6 ml-auto" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TheHeaderNavigation",
  props: {
    iconColor: { type: String },
    items: { type: Array }
  },
  setup(__props) {
    function isSeparator(item) {
      return "separator" in item && item.separator === true;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
          return openBlock(), createElementBlock(Fragment, {
            key: isSeparator(item) ? `separator-${index}` : item.label
          }, [
            isSeparator(item) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "border-l my-2",
              style: normalizeStyle({ borderColor: _ctx.iconColor })
            }, null, 4)) : (openBlock(), createBlock(_sfc_main$3, mergeProps({
              key: 1,
              ref_for: true
            }, { ...item, iconColor: _ctx.iconColor }), null, 16))
          ], 64);
        }), 128))
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
          class: normalizeClass(["size-full fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]", __props.class]),
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
const _hoisted_1 = { class: "flex justify-between items-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TheHeader.ce",
  setup(__props) {
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
    const navigationItems = ref([
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
    const headerClasses = computed(() => {
      const baseClasses = "shadow-lg";
      return `${baseClasses} text-white`;
    });
    const headerStyles = computed(() => {
      const styles2 = {};
      const bg = brand.value.background || {};
      const hasMainImage = Boolean(bg.mainImage);
      const hasRepeatImage = Boolean(bg.repeatImage);
      const hasPrimaryColor = Boolean(bg.primaryColor);
      const hasSecondaryColor = Boolean(bg.secondaryColor);
      if (hasMainImage && hasRepeatImage && bg.mainImage && bg.repeatImage) {
        styles2.backgroundImage = `url(${bg.mainImage}), url(${bg.repeatImage})`;
        styles2.backgroundSize = "cover, auto";
        styles2.backgroundPosition = "center, center";
        styles2.backgroundRepeat = "no-repeat, repeat";
      } else if (hasMainImage && hasPrimaryColor && bg.mainImage && bg.primaryColor) {
        styles2.backgroundColor = bg.primaryColor;
        styles2.backgroundImage = `url(${bg.mainImage})`;
        styles2.backgroundSize = "contain";
        styles2.backgroundPosition = "center";
        styles2.backgroundRepeat = "no-repeat";
      } else if (hasRepeatImage && !hasMainImage && bg.repeatImage) {
        styles2.backgroundImage = `url(${bg.repeatImage})`;
        styles2.backgroundSize = "auto";
        styles2.backgroundPosition = "center";
        styles2.backgroundRepeat = "repeat";
      } else if (hasPrimaryColor && hasSecondaryColor && !hasMainImage && !hasRepeatImage && bg.primaryColor && bg.secondaryColor) {
        styles2.background = `linear-gradient(135deg, ${bg.primaryColor} 0%, ${bg.secondaryColor} 100%)`;
      } else if (hasPrimaryColor && !hasSecondaryColor && !hasMainImage && !hasRepeatImage && bg.primaryColor) {
        styles2.backgroundColor = bg.primaryColor;
      } else {
        styles2.backgroundColor = "var(--ui-primary)";
      }
      return styles2;
    });
    const iconColor = computed(() => {
      return brand.value.background?.iconColor || "white";
    });
    return (_ctx, _cache) => {
      const _component_TheHeaderAvatar = _sfc_main$8;
      const _component_UApp = _sfc_main$c;
      return openBlock(), createBlock(_component_UApp, null, {
        default: withCtx(() => [
          createBaseVNode("header", {
            class: normalizeClass(headerClasses.value),
            style: normalizeStyle(headerStyles.value)
          }, [
            createBaseVNode("nav", _hoisted_1, [
              createVNode(_sfc_main$7, { brand: brand.value }, null, 8, ["brand"]),
              createVNode(_sfc_main$2, {
                "icon-color": iconColor.value,
                items: navigationItems.value
              }, null, 8, ["icon-color", "items"]),
              createVNode(_component_TheHeaderAvatar, {
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
typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.includes("localhost"));
let styles = [tailwindStyles, meIconStyles];
{
  try {
    const resetStyles = require("../../assets/web-component-reset.css?inline");
    styles.unshift(resetStyles);
  } catch (error) {
    console.warn("Reset CSS não encontrado, usando estilos padrão");
  }
}
const TheHeaderElement = defineCustomElement(_sfc_main, {
  shadowRoot: true,
  styles
});
if (!customElements.get("the-header")) {
  customElements.define("the-header", TheHeaderElement);
}
export {
  _sfc_main$c as _
};
